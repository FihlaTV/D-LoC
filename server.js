const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(`${__dirname}/`));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', `${log}\n`, err => {
        if (err) {
            console.log('Unable to write log');
        }
    });
    next();
});

app.get('/', (req, res) => {
    console.log('here');
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    res.render('index.html');
});

app.post('/shipment', (req, res) => {
    console.log(req.body);
    res.redirect('/');
});
app.post('/transaction', (req, res) => {
    console.log(req.body);
    res.redirect('/');
});

app.listen(port, () => console.log(`Server is up on port ${port}`));
