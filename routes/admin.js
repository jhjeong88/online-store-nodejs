import express from 'express';
export const router = express.Router();
import {ProductsModel} from '../models/ProductsModel';
import {CommentsModel} from '../models/CommentsModel';
router.get('/', (req, res) => {
    res.send('admin page');
});

const myObj = {
    name: 'ji',
    age: 31
}

router.get('/products', (req, res) => {
    ProductsModel.find({}, (err, products) => {
        res.render('admin/products', {
            "products": products
        });
    });
});

router.get('/products/write', (req, res) => {
    res.render('admin/form', {"product": ""});
});

router.post('/products/write', (req, res) => {
    const product = new ProductsModel({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    });

    product.save((err) => {
        res.redirect('/admin/products');
    });
});

router.get('/products/detail/:id', (req, res) => {
    ProductsModel.findOne({id:req.params.id}, (err, product) => {
        res.render('admin/productsDetail', {"product":product});
    });
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
