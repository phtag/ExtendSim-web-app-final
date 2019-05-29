var db = require('../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var axios = require("axios");
var fs = require("fs");
var reader = require('filereader');

const saltRounds = 10;

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

// Routes
// =============================================================
module.exports = {
  validateToken: function(req, res) {
    return jwt.verify(req.body.token, 'shhhhh', function(err, decoded) {
      if (err) {
        return res.status(400).send({ msg: 'The token is bad!' });
      }
      return res.status(200).send({ msg: 'The token is good!' });
    });
  },
  login: function(req, res) {
    console.log("Login: req.username=" + req.body.username + " password=" + req.body.password);
    db.user.findOne(
    { 
      where: { username: req.body.username } 
    }).
    then(dbresult => {
      if (!dbresult) {
        res.status(400).send({ msg: 'Invalid username' });
      } else {
        bcrypt.compare(req.body.password, dbresult.password, function(err, bRes) 
        {
          if (!bRes) {
            res.status(400).send({ msg: 'Invalid  Password' });
          } else {
            var token = jwt.sign({ username: dbresult.bRes }, 'shhhhh');
            var queryURL = "http://" + IPaddress + ":8090/StreamingService/web/LoginToServer";
            myMethod = "POST"   
            var myheaders = { 
              accept: "application/json", 
            }; 
            var options_textPOST = {
              method : "POST",
              accept : "application/json",
              contentType: "application/json;charset=utf-8",
              headers : myheaders,
              muteHttpExceptions : false
            };
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
            }).
            then(function(response) {
              console.log('ExtendSimASP_login: ' + response.data);
              db.scenario.create({
                userLoginSessionID: response.data,
                username: req.body.username,
                scenarioName: "",
                scenarioID: null,
                scenarioSubmissionDataTime: null,
                scenarioCompletionDataTime: null
              }).
              then(function(dbResponse) {
                return res.json({ userLoginSessionID: response.data,
                                  token: token });
              });
            });
          };
        });
      };
    });
  },
  signup: function(req, res) {
    const password = bcrypt.hashSync(req.body.password, 10);
    const username = req.body.username;
    db.user
      .create({ username, password })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
