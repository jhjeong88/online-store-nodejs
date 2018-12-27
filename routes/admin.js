import express from 'express';
export const router = express.Router();
import {ProductsModel} from '../models/ProductsModel';
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
    res.render('admin/form');
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
