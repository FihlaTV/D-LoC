'use strict';

const bnUtil = require('./bn-connection-util');

// This creates the business network connection object
// and calls connect() on it. Calls the callback method 
// 'main' with error
bnUtil.connect(main);

// Callback function passed to the BN Connection utility
// Error has value if there was an error in connect()
function main(error){
    // Check for the connection error
    if(error){
        console.log(error);
        process.exit(1);
    }

    console.log("1. Successfully Connected !!!");

    // ping for any errors
    bnUtil.ping((response, error)=>{
        if(error){
            console.log(error);
        } else {
            console.log("2. Received Ping Response:");
            console.log(response);
        }

        // Disconnect
        bnUtil.disconnect();

        console.log("3. Disconnected");
    });
}
