import express from "express";
import path from 'path';
import {router as admin} from './routes/admin';

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send('first app');
});

app.use('/admin', admin);

app.listen(port, () => {
    console.log('Express listening on port', port);
});