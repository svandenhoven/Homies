var azure = require('azure-storage');
var uuencode = require('uuencode');

var queueSvc = azure.createQueueService('mindparkwebjobs', '');


queueSvc.createMessage('raspberry', 'ew0KICAiZGV2aWNlIjogIkFsbCIsDQogICJzdGF0ZSI6ICJvZmYiDQp9', function(error, result, response){
    if(!error){
      console.log("message added");
    }
  });