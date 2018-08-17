'use strict';

 // Constant values - change as per your needs
 const namespace = "org.fabriccare.organ";
 const transactionType = "donateOrgan";

// Connecting to airlinev7
const bnUtil = require('./bn-connection-util');
bnUtil.connect(main);

function main(error){
    
    // Check for error
    if(error){
        console.log(error);
        process.exit(1);
    }

    // Getting the Business Network Definition
    let bnDef =  bnUtil.connection.getBusinessNetwork();
    console.log("2. Received Definition from Runtime: ",
                   bnDef.getName(),"  ",bnDef.getVersion());

    // Getting the factory
    let factory = bnDef.getFactory();
   
    // Create an instance of transaction
    let options = {
        generate: false,
        includeOptionalFields: false
    }
    // Tring on demo id
    let organId = "AE105-05-06-2019";
    let transaction = factory.newTransaction(namespace,transactionType,organId,options);

    // Setting up the properties of the transaction object
   
    transaction.setPropertyValue('organId','3344');
    transaction.setPropertyValue('type',1);
    transaction.setPropertyValue('donorName', 'Jasmeet');
    transaction.setPropertyValue('bloodgroup' , 'O+');
    transaction.setPropertyValue('donorId' , 101);


    // Submitting the transaction
    return bnUtil.connection.submitTransaction(transaction).then(()=>{
        console.log("6. Transaction Submitted/Processed Successfully!!")

        bnUtil.disconnect();

    }).catch((error)=>{
        console.log(error);

        bnUtil.disconnect();
    });
}
