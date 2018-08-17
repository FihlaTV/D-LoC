'use strict';

// The card store instance
const AdminConnection = require('composer-admin').AdminConnection;

// Used as the card for all calls
const   cardNameForPeerAdmin   = "PeerAdmin@hlfv1";
const   cardNameForNetworkAdmin   = "admin@airlinev7";
const   appToBePinged = "airlinev7";

var cardType = { type: 'composer-wallet-filesystem' }
const adminConnection = new AdminConnection(cardType);
console.log("Admin Connected Successfully!!!");

// Initiate a connection as PeerAdmin
return adminConnection.connect(cardNameForPeerAdmin).then(function(){

    console.log("Admin Connected Successfully!!!");
    // Display the name and version of the network app
   listBusinessNetwork();
}).catch((error)=>{
    console.log(error);
});


// Extracts information about the network
function listBusinessNetwork(){
    // List of the network apps
    adminConnection.list().then((networks)=>{
        console.log("Successfully retrieved the deployed Networks: ",networks);

        networks.forEach((businessNetwork) => {
            console.log('Deployed business network', businessNetwork);
         });
        // Disconnect
        adminConnection.disconnect();
        reconnectAsNetworkAdmin();
    }).catch((error)=>{
        console.log(error);
    });
}

// Ping the network
function reconnectAsNetworkAdmin(){

    // Reconnect with the card for network admin
    return adminConnection.connect(cardNameForNetworkAdmin).then(function(){
        console.log("Network Admin Connected Successfully!!!");
        // Ping the BNA 
        
        adminConnection.ping(appToBePinged).then(function(response){
            console.log("Ping response from "+appToBePinged+" :",response);
            // Disconnect
            adminConnection.disconnect();
        }).catch((error)=>{
            console.log(error);
        });
    });

    
}
