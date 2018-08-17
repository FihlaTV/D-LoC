'use strict';

const FileSystemCardStore = require('composer-common').FileSystemCardStore;
const AdminConnection = require('composer-admin').AdminConnection;
const BusinessNetworkDefinition = require('composer-common').BusinessNetworkDefinition;

const cardNameForPeerAdmin = "PeerAdmin@hlfv1";
const appName = "test-bna";
// This where I have the archive file for v2.0 of airlinev7
// Changing This Directory 
const bnaDirectory = "./test-bna/";
const bnaArchive = "./test-bna/dist/test-bna@0.0.2.bna";
// Creating the AdminConnection instance
var cardType = { type: 'composer-wallet-filesystem' }
const adminConnection = new AdminConnection(cardType);

// Connecting using the card for the Network Admin
return adminConnection.connect(cardNameForPeerAdmin).then(function(){
    console.log("Admin Connection Successful!!!");

    // Updating the BNA
    upgradeApp();
}).catch(function(error){
    console.log(error);
});


// Deploying a network app using the admin connection

function upgradeApp(){
    // Creating a Business Network Definition object from directory
    var bnaDef = {}
    BusinessNetworkDefinition.fromDirectory(bnaDirectory).then(function(definition){
        bnaDef = definition;
        console.log("Successfully created the definition!!! ",bnaDef.getName())

        // Installing the new version of the BNA
        return adminConnection.install(bnaDef);
        
    }).then(()=>{

        // Updating the application
        console.log("Install successful")
        return adminConnection.upgrade(appName, '0.0.2');

    }).then(()=>{

        console.log('App updated successfully!! ', bnaDef.getName(),'  ',bnaDef.getVersion());

        // Disconnecting
        adminConnection.disconnect();

    }).catch(function(error){
        console.log(error);
    });

}
