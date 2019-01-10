import express from "express";
import path from 'path';

import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import flash from 'connect-flash';
import passport from 'passport';
import session from 'express-session';

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
import {router as accounts} from './routes/accounts';

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 미들웨어 "라우팅 세팅 전에 와야 함!"
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/uploads', express.static('./uploads'));

app.use(session({
    secret: 'fastcampus',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 2000 * 60 * 60
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.get('/', (req, res) => {
    res.send('first app');
});

app.use('/admin', admin);
app.use('/contacts', contacts);
app.use('/accounts', accounts);

app.listen(port, () => {
    console.log('Express listening on port', port);
});