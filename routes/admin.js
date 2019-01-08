import express from 'express';
export const router = express.Router();
import {ProductsModel} from '../models/ProductsModel';
import {CommentsModel} from '../models/CommentsModel';

// csrf
import csrf from 'csurf';
const csrfProtection = csrf({ cookie: true });

router.get('/', (req, res) => {
    res.send('admin page');
});

router.get('/products/write', csrfProtection, (req, res) => {
    res.render('admin/form', {product: "", csrfToken: req.csrfToken() });
});

router.post('/products/write', csrfProtection, (req, res) => {
    const product = new ProductsModel({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    });

    if(!product.validateSync()){
        product.save((err) => {
            res.redirect('/admin/products');
        });
    }
});

router.get('/products', (req, res) => {
    ProductsModel.find({}, (err, products) => {
        res.render('admin/products', {
            "products": products
        });
    });
});

router.get('/products/detail/:id', (req, res) => {
    ProductsModel.findOne({id:req.params.id}, (err, product) => {
        CommentsModel.find({product_id: req.params.id}, (err, comments) => {
            res.render('admin/productsDetail', {product: product, comments: comments});
        });
    });
});

router.get('/products/edit/:id', (req, res) => {
    ProductsModel.findOne({id:req.params.id}, (err, product) => {
        res.render('admin/form', {'product': product});
    });
});

router.post('/products/edit/:id', (req, res) => {
    const query = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    }

    ProductsModel.update({id:req.params.id}, {$set:query}, (err) => {
        res.redirect('/admin/products/detail/' + req.params.id);
    });
});

router.get('/products/delete/:id', (req, res) => {
    ProductsModel.remove({id: req.params.id}, (err) => {
        res.redirect('/admin/products');
    })
});

router.post('/products/ajax_comment/insert', (req, res) => {
    const comment = new CommentsModel({
        content: req.body.content,
        product_id: parseInt(req.body.product_id)
    });

    comment.save(function(err, comment){
        res.json({
            id: comment.id,
            content: comment.content,
            message: 'success'
        });
    });
});

router.post('/products/ajax_comment/delete', function(req, res){
    CommentsModel.remove({id: req.body.comment_id}, (err)=>{
        res.json({message: 'success'});
    });
});

