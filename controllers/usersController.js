var db = require('../models');
var jwt = require('jsonwebtoken');
var axios = require("axios");
var fs = require("fs");
var reader = require('filereader');
// const JSON = require('circular-json');
// const FileDownload = require('js-file-download');

// Heroku IP address
var IPaddress = "184.171.246.58";

// UC Davis Extension IP address
// var IPaddress = "10.0.20.228";
var scenarioFolderPathname;
var scenarioFilenames = ['Resource Classes.txt',
                         'Model Parameters.txt',
                         'Pools.txt',
                         'Process Route.txt',
                         'Resource Requirement Expressions.txt',
                         'Resources.txt'];

const c_ExtendSimModelPath = "C:/Users/Administrator/Documents/ExtendSim10ASP_Prod/ASP/ASP Servers/ExtendSim Models/ASP example model (GS).mox"

const bcrypt = require('bcrypt');
const saltRounds = 10;

// Routes
// =============================================================
module.exports = {
  validateToken: function(req, res) {
    return jwt.verify(req.body.token, 'shhhhh', function(err, decoded) {
      if (err) {
        return res.status(400).send({ msg: 'yo token is bad!' });
      }
      return res.status(200).send({ msg: 'yo token is good!' });
    });
  },
  login: function(req, res) {
    console.log("Login: req.username=" + req.body.username + " password=" + req.body.password);
    // db.User.findOne({ where: { email: req.body.email } }).then(u => {
    //   if (!u) res.status(400).send({ msg: 'Invalid Email or Password' });

    //   bcrypt.compare(req.body.password, u.password, function(err, bRes) {
    //     if (!bRes) res.status(400).send({ msg: 'Invalid Email or Password' });
    //     var token = jwt.sign({ email: u.email }, 'shhhhh');
    //     res.json({ email: u.email, token: token });
    //   });
    // });

      // var queryURL = "http://" + IPaddress + ":8090/StreamingService/web/LoginToServer?username=" + username + "&password=" + password;
      // var queryURL = "http://10.0.20.228:8090/StreamingService/web/LoginToServer?username=" + username + "&password=" + password;
      var queryURL = "http://" + IPaddress + ":8090/StreamingService/web/LoginToServer";
      // var queryURL = "http://10.0.20.228:8090/StreamingService/web/LoginToServer";
  
      myMethod = "POST"   
      var myheaders = { 
                accept: "application/json", 
        }; 
      
      var options_textPOST = {method : "POST",
                    accept : "application/json",
                    contentType: "application/json;charset=utf-8",
                    headers : myheaders,
                    muteHttpExceptions : false};
      console.log('ExtendSimASP_login entry. Logging into host ' + queryURL + " for username=" + req.body.username + " password=" + req.body.password);
      axios({
          url: queryURL,
          method: 'post',
          accept : 'application/json',
          contentType: 'application/json;charset=utf-8',
          headers : myheaders,
          params: {
              username: req.body.username,
              password: req.body.password
          }
        }).then(function(response) {
          console.log('ExtendSimASP_login: ' + response.data);
          db.scenario.create({
            userLoginSessionID: response.data,
            username: req.body.username,
            scenarioID: null,
            scenarioSubmissionDataTime: null,
            scenarioCompletionDataTime: null
        }).then(function(dbResponse) {
                // We have access to the new todo as an argument inside of the callback function
              return res.json({ userLoginSessionID: response.data });
            });

          // return res.json({ userLoginSessionID: response.data });
          // var serverResponse = {
          //   userSessionID: '',
          //   token: ''
          // };
          // db.scenario.create({
          //     userLoginSessionID: response.data,
          //     username: username,
          //     scenarioID: null,
          //     scenarioSubmissionDataTime: null,
          //     scenarioCompletionDataTime: null
          // }).then(function(dbTodo) {
          //         // We have access to the new todo as an argument inside of the callback function
          //     res.json(response.data);
          // });
          // serverResponse.userSessionID = response.data;
          // res.json(serverResponse);
      });
  },
  signup: function(req, res) {
    // validateEmailWithRegex(req.body.email)
    // if it is invalid
    // return res.status(400).send({msg: "Invalid Email or Password"})
    db.User.findOne({ where: { email: req.body.email } }).then(u => {
      if (u) res.status(400).send({ msg: 'Invalid Email or Password' });
      bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
          db.User.create({
            email: req.body.email,
            password: hash,
          }).then(function(user) {
            var token = jwt.sign({ email: user.email }, 'shhhhh');
            res.json({ email: user.email, token: token });
          });
        });
      });
    });
  },
};
