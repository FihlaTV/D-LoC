'use strict';

 module.exports = {
    // Properties used for creating instance of the BN connection
    cardStore : require('composer-common').FileSystemCardStore,
    BusinessNetworkConnection : require('composer-client').BusinessNetworkConnection,
    // Used for connect()
    cardName : "admin@flipflop",
   
    // Holds the Business Network Connection
    connection: {},

    // This is the function that is called by the app
    connect : function(callback) {

        // Create instance of file system card store
        var cardType = { type: 'composer-wallet-filesystem' }
        this.connection = new this.BusinessNetworkConnection(cardType);

        // Invoke connect
        return this.connection.connect(this.cardName).then(function(){
            callback();
        }).catch((error)=>{
            callback(error);
        });
    },

    // Disconnects the bn connection
    disconnect : function(callback) {
        this.connection.disconnect();
    },

    // Pings the network
    ping : function(callback){
        return this.connection.ping().then((response)=>{
            callback(response);
        }).catch((error)=>{
            callback({}, error);
        });
    }
 }
