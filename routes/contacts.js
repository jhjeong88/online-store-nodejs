import express from 'express';
export const router = express.Router();
import {ContactsModel} from '../models/ContactsModel';

router.get('/', (req, res) => {
    ContactsModel.find({}, (err, contacts) => {
        res.render('contacts/list', {
            "contacts": contacts
        });
    });
});

router.get('/write', (req, res) => {
    res.render('contacts/form');
})

router.post('/write', (req, res) => {
    const contact = new ContactsModel({
        name: req.body.name,
        phone: req.body.phone,
        age: req.body.age,
        email: req.body.email
    });

    contact.save((err) => {
        res.redirect('/contacts');
    });
});

router.get('/delete/:id', (req, res) =>{
    ContactsModel.remove({id:req.params.id}, (err) => {
        res.redirect('/contacts');
    })
});

router.get('/detail/:id', (req, res) => {
    ContactsModel.findOne({id:req.params.id}, (err, contact)=> {
        res.render('contacts/contactsDetail', {'contact': contact});
    });
});

router.get('/edit/:id', (req, res) => {
    ContactsModel.findOne({id:req.params.id}, (err, contact)=> {
        res.render('contacts/form', {'contact': contact});
    });
});

router.post('/edit/:id', (req, res) => {
    const query = {
        name: req.body.name,
        phone: req.body.phone,
        age: req.body.age,
        email: req.body.email
    }

    ContactsModel.update({id: req.params.id}, {$set:query}, (err) => {
        res.redirect('/contacts');
    });
});