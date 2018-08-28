const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;

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

let id = 0;
app.post('/shipment', (req, res) => {
    console.log(req.body);

    ('use strict');

    // Constant values - change as per your needs
    const namespace = 'org.dloc.transaction';
    const transactionType = 'beginShipment';

    // Connecting to main card
    const bnUtil = require('./bn-connection-util');
    bnUtil.connect(main);

    function main(error) {
        // Checking for error
        if (error) {
            console.log(error);
            process.exit(1);
        }

        // Getting the Business Network Definition
        let bnDef = bnUtil.connection.getBusinessNetwork();
        console.log(
            '2. Received Definition from Runtime: ',
            bnDef.getName(),
            '  ',
            bnDef.getVersion()
        );

        // Getting the factory
        let factory = bnDef.getFactory();

        // Creating an instance of transaction
        let options = {
            generate: false,
            includeOptionalFields: false
        };
        // Trying with demo id
        let shipmentId = 'AE105-05-06-20'+id;
        let transaction = factory.newTransaction(
            namespace,
            transactionType,
            shipmentId,
            options
        );

        // Set up the properties of the transaction object

        transaction.setPropertyValue('shipmentId',shipmentId);
        transaction.setPropertyValue('location', req.body.location);
        transaction.setPropertyValue('contactName', req.body.contactName);
        transaction.setPropertyValue('contactSubject', req.body.contactSubject);
        transaction.setPropertyValue('description', req.body.description);
        transaction.setPropertyValue('date', req.body.date);
        transaction.setPropertyValue('time', req.body.time);
        transaction.setPropertyValue('volume', req.body.volume);
        transaction.setPropertyValue('contactMessage', req.body.contactMessage);

    

        // Submitting the transaction
        return bnUtil.connection
            .submitTransaction(transaction)
            .then(() => {
                console.log(
                    '6. Transaction Submitted/Processed Successfully!!'
                );

                bnUtil.disconnect();
            })
            .catch(error => {
                console.log(error);

                bnUtil.disconnect();
            });
    }
    res.redirect('/');
});
app.post('/transaction', (req, res) => {
    console.log(req.body);
    res.redirect('/');
});

app.listen(port, () => console.log(`Server is up on port ${port}`));
