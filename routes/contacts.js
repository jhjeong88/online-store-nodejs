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