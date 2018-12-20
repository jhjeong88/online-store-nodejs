import express from 'express';
export const router = express.Router();

router.get('/', (req, res) => {
    res.send('admin page');
});

const myObj = {
    name: 'ji',
    age: 31
}

router.get('/products', (req, res) => {
    res.render('admin/products', {
        message: 'hello', 
        school: 'nodejs',
        myObj: myObj
    })
});

