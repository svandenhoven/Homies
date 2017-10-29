var azure = require('azure-storage');
var uuencode = require('uuencode');
var switcher = require('./switching.js')

var queueSvcConfig = require('./queueSvcConfig.js')

var queueSvc = azure.createQueueService(queueSvcConfig.accountName, queueSvcConfig.accountKey)
setInterval(handleMessages, 1000);

function handleMessages(){

    queueSvc.getMessages('raspberry', function(error, result, response){
        if(!error){       
            if(result.length > 0){
                    // Message text is in messages[0].messageText
                var message = result[0];
                console.log(message.messageText)
                var msgTextBase64 = new Buffer(message.messageText, 'base64')
                var msgText = msgTextBase64.toString();
                var action = JSON.parse(msgText);
              
                var newState = 0
                if(action.state == "on")
                {
                    newState = 1
                } 

                console.log('Set ' + action.device + ' ' + newState)
                switcher.setSwitch(action.device,newState)
                queueSvc.deleteMessage('raspberry', message.messageId, message.popReceipt, function(error, response){
                    if(!error){
                    console.log('Deleted');
                    }
                });
            }
            else{
                console.log(new Date())
            }
        }          
     });
 }
