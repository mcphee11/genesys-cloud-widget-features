const clientId = process.env.CLIENTID           //OAuth2
const clientSecret = process.env.CLIENTSECRET   //OAuth2
const region = process.env.REGION               //eg: mypurecloud.com.au

const platformClient = require('purecloud-platform-client-v2');

const client = platformClient.ApiClient.instance
const uapi = new platformClient.UsersApi()
const rapi = new platformClient.RoutingApi()
const capi = new platformClient.ConversationsApi()

client.setEnvironment(region)
client.setPersistSettings(true, '_mm_')

console.log('Logging in to Genesys Cloud')
if(!clientId) {console.log('Missing CLIENTID'); process.exit()}
if(!clientSecret) {console.log('Missing CLIENTSECRET'); process.exit()}
if(!region) {console.log('Missing REGION'); process.exit()}
client.loginClientCredentialsGrant(clientId, clientSecret)
.then(() => {
    console.log('Authenticated')
  })
  .catch((err) => {
    console.log('Authentication Error Please check OAuth Details: ', err.message);
  });

module.exports = {
    getEwt: async function getEwt(ewtQueueId, ewtMediaType){        //not used in demo due to getting single user queue status for demos
        try{
            let ewt = await rapi.getRoutingQueueMediatypeEstimatedwaittime(ewtQueueId, ewtMediaType)
            return ewt
        }
        catch(ex){
            return ex
        }        
    },
    getUser: async function getUser(userId){
        try{
            let userStatus = await uapi.getUserRoutingstatus(userId)
            return userStatus
        }
        catch(ex){
            return ex
        }        
    },
    sendEmail: async function sendEmail(emailFlowId, fromAddress, fromName, subject, textBody){
        try{
            let email = await capi.postConversationsEmails({
                "flowId": emailFlowId,
                "provider": "widgetMessage",
                "fromAddress": fromAddress,
                "fromName": fromName,
                "subject": subject,
                "direction": "INBOUND",
                "htmlBody": textBody
            })
            return email
        }
        catch(ex){
            return ex
        }        
    },
    sendCallBack: async function sendCallBack(callBackQueueId, callbackUserName, callbackNumbers){
        try{
            let callBack = await capi.postConversationsCallbacks({
                "queueId": callBackQueueId,
                "callbackUserName": callbackUserName,
                "callbackNumbers": [callbackNumbers],
                "validateCallbackNumbers": true
            })
            return callBack
        }
        catch(ex){
            return ex
        }        
    },
    sendScheduledCallBack: async function sendScheduledCallBack(callBackQueueId, callbackUserName, callbackNumbers, time){
        try{
            let callBack = await capi.postConversationsCallbacks({
                "queueId": callBackQueueId,
                "callbackUserName": callbackUserName,
                "callbackNumbers": [callbackNumbers],
                "callbackScheduledTime": time,
                "validateCallbackNumbers": true
            })
            return callBack
        }
        catch(ex){
            return ex
        }        
    }

}