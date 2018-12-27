import express from "express";
import path from 'path';

import logger from 'morgan';
import bodyParser from 'body-parser';

//MongoDB
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    console.log('mongodb connect');
});

mongoose.connect('mongodb://127.0.0.1:27017/fastcampus');

import {router as admin} from './routes/admin';
import {router as contacts} from './routes/contacts';

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 미들웨어 "라우팅 세팅 전에 와야 함!"
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('first app');
});

app.use('/admin', admin);
app.use('/contacts', contacts);

app.listen(port, () => {
    console.log('Express listening on port', port);
});