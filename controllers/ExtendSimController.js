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
    createScenarioFolder: function(req, res) {
        const scenarioFolderName = req.body.scenarioFolderName;
        console.log("createScenarioFolder: folder name=" + scenarioFolderName);
            // Execute WCF service to create a scenario folder  
            // var queryURL = "http://" + IPaddress + ":8090/StreamingService/web/CreateScenarioFolder?scenarioFoldername=myScenarioFolder"
        var queryURL = "http://" + IPaddress + ":8090/StreamingService/web/CreateScenarioFolder"
        var myheaders = { 
            accept: "application/json", 
        }; 
        var options1 = {
            method : "GET",
            accept : "application/json",
            contentType: "application/json;charset=utf-8",
            headers : myheaders,
            muteHttpExceptions : false
        };
        //  var response = UrlFetchApp.fetch(url_createScenarioFolder, options1).getContentText()
        axios({
            url: queryURL,
            method: 'get',
            accept : 'application/json',
            contentType: 'application/json;charset=utf-8',
            headers : myheaders,
            muteHttpExceptions : false,
            params : {
                scenarioFoldername : scenarioFolderName
            }
        }).then(function(response) {
            console.log('createScenarioFolder: response=' + response.data);
            scenarioFolderPathname = response.data;
            return res.json({ scenarioFolderPathname: response.data });
        });
    },
    copyModelToScenarioFolder: function(req, res) {
        const modelPathname = req.body.modelPathname;
        const scenarioFolderPathname = req.body.scenarioFolderPathname;
        const copyFolderContents = req.body.copyFolderContents;
        console.log("copyModelToScenarioFolder: scenarioFolderPathname=" + scenarioFolderPathname);
        // Execute WCF service to copy the model folder to the scenario folder 
          var myheaders = { 
              accept: "application/json", 
          };
          var options2 = {
              method : "POST",
              accept : "application/json",
              contentType: "application/json;charset=utf-8",
              headers : myheaders,
              muteHttpExceptions : false
            };
            var queryURL = "http://" + IPaddress + ":8090/StreamingService/web/CopyModelToScenarioFolder";
          axios({
              url: queryURL,
              method: 'post',
              accept: 'application/json',
              contentType: 'application/json;charset=utf-8',
              headers: myheaders,
              muteHttpExceptions : false,
              params: {
                modelPathname : modelPathname,
                scenarioFolderpath: scenarioFolderPathname,
                copyFolderContents: copyFolderContents
              }
          }).then(function(response) {
              console.log('copyModelToScenarioFolder: ' + response.data); 
              return res.json({result: response.data});
        });
    },
    sendfile: function(req, res) {
        var myheaders = { 
            accept: "application/json", 
        };     
        var queryURL =  "http://" + IPaddress + ":8090/StreamingService/web/UploadPathname";
        // ?filepathname=" + encodeURIComponent(req.body.scenarioFolderPathname + "/" + req.body.filename);
        console.log("sendfile - filepathname=" + req.body.scenarioFolderPathname + "/" + req.body.filename);
        return axios({
            url: queryURL,
            method: 'post',
            accept : "application/json",
            contentType: "application/json;charset=utf-8",
            headers : myheaders,
            muteHttpExceptions : false,
            params: {
                filepathname : req.body.scenarioFolderPathname + "/" + req.body.filename
            }
        }).then(function(response){
            var queryURL =  "http://" + IPaddress + ":8090/StreamingService/web/UploadStream";
            console.log("UploadStream: req.body.filedata=" + req.body.filedata);
            return axios({
                url: queryURL,
                method: 'post',
                accept : 'application/json',
                //    contentType: 'application/json;charset=utf-8',
                contentType: 'multipart/form-data',
                headers : myheaders,
                data: req.body.filedata,
                //    payload : result,
                muteHttpExceptions : false
            }).then(function(uploadResponse) 
            { 
                console.log("Upload RETURN");
                return res.json({result: uploadResponse.data})
            })
        })
    },
};
