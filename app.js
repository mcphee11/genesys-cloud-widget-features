const express = require('express')
const cors = require('cors')
const genesys = require('./genesys')
var multer = require('multer');

const app = express()
app.use(cors())
const port = process.env.PORT || 3000

// for parsing multipart/form-data Needed for sendMessage POST body
var upload = multer();
app.use(upload.array());
app.use(express.static('public'));
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//Widget get "ewt" API call
app.get('/status/ewt2', async (req, res) => {
  //Response setup
  res.contentType('application/json')
  res.setHeader('Transfer-Encoding', 'chunked')
  res.statusCode = 200
  let response = req.query.vq   //create response string
  let status

  //Check if Multilply users are queried
  if ((response).includes(',')) {
    console.log('Multiply Users: ', response)
    console.log('Status: ', status)
    let body = '{'
    var array = response.split(',')
    for (item of array) {
      console.log('item: ', item)
      let user = await genesys.getUser(item)    //For Demo using the direct UserId in production use Queue EWT 
      console.log('user: ', user.status)
      if (user.status === 'OFF_QUEUE') status = 9999.999
      if (user.status === 'IDLE') status = 0.999
      if (item === 'test') status = 300.999   //Added in a test element to show ewt of 5min warning
      console.log('Status: ', status)
      body = body + '"' + item + '"' + ': {"ewt": ' + status + '}, '
    }
    body = body.substr(0, body.length - 2)
    body = body + '}'
    console.log('Body= ', body)
    error = await res.write(body)
  }

  else {
    console.log('Single User: ', response)
    let user = await genesys.getUser(response)    //For Demo using the direct UserId in production use Queue EWT 
    console.log('user: ', user)
    console.log('user: ', user.status)

    if (user.status === 'OFF_QUEUE') status = 9999.999
    if (user.status === 'IDLE') status = 0.999
    if (response === 'test') status = 300.999   //Added in a test element to show ewt of 5min warning
    console.log('Status: ', status)
    error = await res.write(JSON.stringify({
      "ewt": status
    }))

  }

  //Send data to Widget
  res.end()
  console.log(`method: ${req.method}`)
  console.log('query: ', req.query)
})

//Widget sendMessage (email) to Genesys Cloud
app.post('/sendmessage/:emailFlowId', async (req, res) => {
  let emailFlowId = req.params.emailFlowId
  //send email
  let email = await genesys.sendEmail(emailFlowId, req.body.fromAddress, req.body.firstName, req.body.subject, req.body.text)
  console.log('Email sent: ', email)

  //Response setup
  res.contentType('application/json')
  res.setHeader('Transfer-Encoding', 'chunked')
  res.statusCode = 200
  res.write(JSON.stringify({
    "statusCode": 0,
    "interactionId": email.id
  }))
  res.end()
  console.log(`method: ${req.method}`)
  console.dir(req.body)
})

//Widget callBack to Genesys Cloud
app.post('/callback/:callBackQueueId', async (req, res) => {
  const callBackQueueId = req.params.callBackQueueId
  let callBack

  //Check if immediate or Scheduled
  if(req.body._desired_time){
  //send Scheduled callBack
  callBack = await genesys.sendScheduledCallBack(callBackQueueId, req.body.firstname, req.body._customer_number, req.body._desired_time)
  console.log('Scheduled callBack sent: ', callBack)
  }
  if(!req.body._desired_time){
  //send Immediate callBack
  callBack = await genesys.sendCallBack(callBackQueueId, req.body.firstname, req.body._customer_number)
  console.log('Immediate callBack sent: ', callBack)
  }

  //Response setup
  res.contentType('application/json')
  res.setHeader('Transfer-Encoding', 'chunked')
  res.statusCode = 200
  res.write(JSON.stringify({
    "reason": "started",
    "_id": callBack.conversation.id,
    "status": "OK"
  }))
  res.end()
  console.log(`method: ${req.method}`)
  console.dir(req.body)
})

//Widget Scheduled callBack Calandar check to Genesys Cloud
app.get('/callback/:callBackQueueId/availability', async (req, res) => {
  const callBackQueueId = req.params.callBackQueueId
  //send callBack calandar check
  //Response setup
  res.contentType('application/json')
  res.setHeader('Transfer-Encoding', 'chunked')
  res.statusCode = 200
  let date =  (req.query.start).substr(0,11)

  console.log('Date: ',date)
  //in realworld call external calandar to check what times are avaliable.
  error = await res.write('{"'+date+'20:00:00.000Z" :220, "'+date+'20:15:00.000Z" : 220, "'+date+'20:30:00.000Z" : 220, "'+date+'20:45:00.000Z" : 220, "'+date+'21:00:00.000Z" : 220, "'+date+'21:15:00.000Z" : 220, "'+date+'21:30:00.000Z" : 220, "'+date+'21:45:00.000Z" : 220, "'+date+'22:00:00.000Z" : 220, "'+date+'22:15:00.000Z" : 220, "'+date+'22:30:00.000Z" : 220, "'+date+'22:45:00.000Z" : 220, "'+date+'23:00:00.000Z" : 220, "'+date+'23:15:00.000Z" : 220, "'+date+'23:30:00.000Z" : 220, "'+date+'23:45:00.000Z" : 220, "'+date+'00:00:00.000Z" : 220, "'+date+'00:15:00.000Z" : 220, "'+date+'00:30:00.000Z" : 220, "'+date+'00:45:00.000Z" : 220, "'+date+'01:00:00.000Z" : 220, "'+date+'01:15:00.000Z" : 220, "'+date+'01:30:00.000Z" : 220, "'+date+'01:45:00.000Z" : 220, "'+date+'02:00:00.000Z" : 220, "'+date+'02:15:00.000Z" : 220, "'+date+'02:30:00.000Z" : 220, "'+date+'02:45:00.000Z" : 220, "'+date+'03:00:00.000Z" : 220, "'+date+'03:15:00.000Z" : 220, "'+date+'03:30:00.000Z" : 220, "'+date+'03:45:00.000Z" : 220, "'+date+'04:00:00.000Z" : 220, "'+date+'04:15:00.000Z" : 220, "'+date+'04:30:00.000Z" : 220, "'+date+'04:45:00.000Z" : 220, "'+date+'05:00:00.000Z" : 220, "'+date+'05:15:00.000Z" : 220, "'+date+'05:30:00.000Z" : 220, "'+date+'05:45:00.000Z" : 220, "'+date+'06:00:00.000Z" : 20}')

  //Send data to Widget
  res.end()
  console.log(`method: ${req.method}`)
  console.log('query: ', req.query)

})

const server = app.listen(port, () => console.log('Server ready on: http://localhost:', port))

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated')
  })
})