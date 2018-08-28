/**
 * Create Flight Transaction
 * @param {org.dloc.transaction.beginShipment} shipmentData
 * @transaction
 */

function    beginShipment(shipmentData) {
    // 1. Get the asset registry
    return getAssetRegistry('org.dloc.transaction.Shipment')
        .then(function(shipmentRegistry){
            // 2. Get resource factory
            var  factory = getFactory();
            var  NS =  'org.dloc.transaction';

            // 3. Create the Resource instance            
            var  shipment = factory.newResource(NS,'Shipment',shipmentData.shipmentId);

      		shipment.location = shipmentData.location;
      		shipment.contactName = shipmentData.contactName;
      		shipment.contactSubject = shipmentData.contactSubject;
      		shipment.description = shipmentData.description;
      		shipment.date = shipmentData.date;
      		shipment.time = shipmentData.time;
      		shipment.volume = shipmentData.volume;
      		shipment.contactMessage = shipmentData.contactMessage;
      		
            
            // 5. Creating a new concepts using the factory & set the data in it

     
            // 6. Emit the event DonorCreated
            var event = factory.newEvent(NS, 'shipmentRecorded');
            event.shipmentId = shipmentData.shipmentId;
            emit(event);

            return shipmentRegistry.addAll([shipment]);
        });
}

