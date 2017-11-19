var azure = require('azure-storage')
var uuencode = require('uuencode')
var switcher = require('./switching.js')

var queueSvcConfig = require('./queueSvcConfig.js')

var queueSvc = azure.createQueueService(queueSvcConfig.accountName, queueSvcConfig.accountKey)

setInterval(handleMessages, 1000);

function handleMessages(){

    queueSvc.getMessages('raspberrydemo', function(error, result, response){
        if(!error){       
            if(result.length > 0){
                    // Message text is in messages[0].messageText
                var message = result[0];
                var msgTextBase64 = new Buffer(message.messageText, 'base64')
                var msgText = msgTextBase64.toString()

                //ToDo: Decrypt with public key of Bot to ensure origin message
                var mandateActions = JSON.parse(msgText)
                console.log('Processing action: ' + mandateActions.id)
                if(mandateActions.mandate.signature == '46115BA2-E609-4AD8-947D-FCF7DBDD0F6E')
                {
                    console.log("Signature " + mandateActions.name + " approved")
                    handleActions(mandateActions);
                }
                else
                {
                    console.log("Signature not approved")
                }

                queueSvc.deleteMessage('raspberrydemo', message.messageId, message.popReceipt, function(error, response) {
                    if(!error){
                    console.log('Deleted')
                    }
                })
            }
            else {
                console.log(new Date())
            }
        }          
     })

    function handleActions(mandateActions) {
        for (var i = 0; i < mandateActions.actions.length; i++) {
            var scopes = mandateActions.mandate.scope.split(' ');
            var deviceAction = mandateActions.actions[i];
            var newState = deviceAction.action == "Switch.On" ? 1 : 0;
            if (newState) {
                if (scopes.indexOf('Switch.On') >= 0) {
                    switcher.setSwitch(action.device,newState)
                    console.log('Set ' + deviceAction.device + ' ' + newState);
                }
                else {
                    console.log('Not Authorized for Switch.On');
                }
            }
            else {
                if (scopes.indexOf('Switch.Off') >= 0) {
                    switcher.setSwitch(action.device,newState)
                    console.log('Set ' + deviceAction.device + ' ' + newState);
                }
                else {
                    console.log('Not Authorized for Switch.Off');
                }
            }
        }
    }
 }
