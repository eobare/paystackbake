

  //Dependencies
const express = require('express')
const app = express()
var paystack = require("paystack-api")("sk_test_a86c111389696a0915908589f08d52b6df21eb1f");
const cors = require('cors')
const bodyParser = require("./node_modules/body-parser")

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors())
app.use(express.urlencoded())
app.use(bodyParser.json());

// Initiate Transfer
app.route('/api/transfer').post((req, res) => {
  paystack.transfer
    .create({
      source: "balance",
      amount: req.body.amount,
      recipient: req.body.recipient,
    })
    .then(function(body) {
      // console.log(error);
      console.log(body);
      console.log('Loooger');
      res.send(body);     
    })
    .catch(function(error) {
      console.log(error);  
  });
})

// Get Single Transfer
app.route('/api/transfer/:id').get((req, res) => {
  let id2 = req.params.id; 
  paystack.transfer
    .get(`{id}`)
    .then(function(body) {
      res.send({body})
      console.log(body);
    })
    .catch(function(error) {
      console.log(error);
  });
})

// Create Transfer Recepient
app.route('/api/transfer_recipients').post((req, res) => {
  //console.log(req);
  paystack.transfer_recipient
    .create({
      type: "nuban",
      name: req.body.name,
      account_number: req.body.accountNumber,
      bank_code: req.body.bankCode,
      description: req.body.description
    })
    .then(function(body) {
      // console.log(error);
      console.log(body);
      console.log('Loooger');
      res.send(body);     
    })
    .catch(function(error) {
      console.log(error);  
  });
})

// List Transfer Recepients
app.route('/api/transfer_recipients').get((req, res) => {
  paystack.transfer_recipient
    .list()
    .then(function(body) {
      res.send({body})
      console.log(body);
    })
    .catch(function(error) {
      console.log(error);
  });
})

// Update Transfer Recepient
app.route('/api/transfer_recipients:id').put((req, res) => {
  paystack.transfer_recipient
    .update()
    .then(function(body) {
      console.log(body);
      res.send({body});  
    })
    .catch(function(error) {
      console.log(error);
  });
})

// List All Transfers
app.route('/api/transfers').get((req, res) => {
  paystack.transfer
    .list()
    .then(function(body) {
      res.send({body})
      console.log(body);
    })
    .catch(function(error) {
      console.log(error);
  });
})

// List Banks
app.route('/api/banks').get((req, res) => {
  paystack.misc
    .list_banks()
    .then(function(body) {
      res.send({body})
      console.log(body);
    })
    .catch(function(error) {
      console.log(error);
  });
})

// Check Balance
app.route('/api/balance').get((req, res) => {
  paystack.transfer_control
    .balance()
    .then(function(body) {
      res.send({body})
      console.log(body);
    })
    .catch(function(error) {
      console.log(error);
  });
})

// Create a Server
var server = app.listen(4000, function () { 
  var host = server.address().address
  var port = server.address().port
  console.log("App listening at http://%s:%s", host, port) 
})
