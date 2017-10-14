var azure = require('azure-storage');
var uuencode = require('uuencode');

var queueSvc = azure.createQueueService('mindparkwebjobs', 'D6BZdyaZq+kGMxq5H1oAXy9rMElxmcQFMy581uh8lbtDrt3cDEiiOzLoogQu8y6uO2WWixXQbVojURIJKCi3TA==');


queueSvc.createMessage('raspberry', 'ew0KICAiZGV2aWNlIjogIkFsbCIsDQogICJzdGF0ZSI6ICJvZmYiDQp9', function(error, result, response){
    if(!error){
      console.log("message added");
    }
  });