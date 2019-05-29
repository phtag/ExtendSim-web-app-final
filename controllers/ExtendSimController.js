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
            // return res.json({ scenarioFolderPathname: response.data });
            db.scenario.update({
                scenarioFolderPathname: response.data,
                scenarioName: req.body.scenarioName
            }, {
                where: {
                    userLoginSessionID: req.body.userLoginSessionID
                }
            }).then(function(dbresponse) {
                return res.json({ scenarioFolderPathname: response.data });
            });
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
    submitsimulationscenario: function(req, res) {
        const myheaders = { 
            accept: "application/json", 
        };
        const userLoginSessionID = req.body.userLoginSessionID;
        const modelPathname = req.body.modelPathname;
        const removeFolderOnCompletion = req.body.modelPathname;
        var scenarioID;
        var queryURL = "http://" + IPaddress + ":8080/ExtendSimService/web/SubmitSimulationScenario_TF";
        console.log("ExtendSimSubmitScenario: submitting simulation scenario for userLoginSessionID=" + req.body.userLoginSessionID);
        return axios({
            url: queryURL,
            method: 'post',
            accept : "application/json",
            contentType: "application/json;charset=utf-8",
            headers : myheaders,
            muteHttpExceptions : false,
            params: 
            {
                userLoginSession_ID: req.body.userLoginSessionID,
                modelPathname: req.body.modelPathname,
                removeScenarioFolderOnCompletion: req.body.removeFolderOnCompletion
            }
        }).then(function(response) {
            scenarioID = response.data;
            // ExtendSimCheckModelRunStatus(userLoginSessionID);
            console.log("ExtendSimSubmitScenario: scenarioID=" + response.data);
            // update the user's scenario ID and submission time in the database
            db.scenario.update({
                scenarioID: response.data,
                scenarioSubmissionDateTime: new Date(),
            }, {
                where: {
                    userLoginSessionID: userLoginSessionID
                }
            }).then(function(dbresponse) {
                return res.json({scenarioID: response.data});     
            });
        });
    },
    checkmodelrunstatus: function(req, res) {
        var myheaders = { 
            accept: "application/json", 
        };
        var queryURL = "http://" + IPaddress + ":8080/ExtendSimService/web/CheckModelRunStatus";
        console.log("ExtendSimCheckModelRunStatus: Making call to server...");
        return axios({
            url: queryURL,
            method: 'get',
            accept : "application/json",
            contentType: "application/json;charset=utf-8",
            headers : myheaders,
            muteHttpExceptions : false,
            params: 
            {
                scenario_ID: req.body.scenarioID
            }
        }).then(function(response) {
            var modelRunStatus = response.data;
            console.log("ExtendSimCheckModelRunStatus: Model run status=" + modelRunStatus);
            return res.json({modelRunStatus: response.data});
        });
    },
    getcycletimeresults: function(req, res) {
        var queryURL = "http://" + IPaddress + ":8090/StreamingService/web/GetServerFileStream";
        var myheaders = { 
            accept: "application/json", 
            }; 
        var scenarioResults;
        console.log("ExtendSimASPgetScenarioResults: Getting scenario results from server for userSessionID=" + req.body.userLoginSessionID + " filename=" + req.body.filepathname);
        return axios({
            url: queryURL,
            method: 'post',
            accept : "application/json",
            // contentType: "application/octet-stream",
            responseType: "blob",
            headers : myheaders,
            muteHttpExceptions : false,
            params: 
            {
                filename: req.body.filepathname
            }
        }).then(function(response) {
            scenarioResults = response.data;
            console.log("ExtendSimASPgetScenarioResults: response=" + response.data);
            db.scenario.update({
                scenarioCompletionDateTime: new Date(),
            }, {
                where: {
                    userLoginSessionID: req.body.userLoginSessionID
                }
            }).then(function(dbresponse) {
                // reader.readAsText(scenarioResults);
                // reader.readAsBinaryString(scenarioResults);
                var myResult = JSON.stringify(scenarioResults);
                console.log("MyResult=" + myResult);
                var textArr = myResult.split(/\r\n|\r|\n/g);
                console.log("textArr.length =" + textArr.length);
                var scenarioResultsArray = scenarioResults.split('\r\n').map(function(ln){
                    return ln.split('\t');
                });
                // Remove last empty element from array
                scenarioResultsArray.pop();
                console.log("scenarioResultsArray.length =" + scenarioResultsArray.length);
                var row = 1;
                scenarioResultsArray.forEach(function(element) {
                    db.cycletime.create({
                        username: req.body.username,
                        scenarioID: req.body.scenarioID,
                        userLoginSessionID: req.body.userLoginSessionID,
                        stepname: element[0],
                        resourceRequirement: element[1],
                        totalJobsProcessed: element[2],
                        totalProcessTime: element[3],
                        totalWaitTime: element[4],
                        avgProcessTime: element[5],
                        avgWaitTime: element[6],
                        avgCycleTime: element[7],
                        CoVarrivals: element[8],
                        CoVdepartures: element[9]
                    });
                });
                // console.log("splitArray =" + splitArray);            
                return res.json({cycleTimeData: scenarioResults});     
            });    
        });
    },
    getscenariocycletimedata: function(req, res) {
        var queryURL = "http://" + IPaddress + ":8090/StreamingService/web/GetServerFileStream";
        var myheaders = { 
            accept: "application/json", 
            }; 
        console.log("getscenariocycletimedata:Querying database for userLoginSessionID=" + req.body.userLoginSessionID);
        db.cycletime.findAll({
            where: {
                scenarioID: req.body.scenarioID,
                username: req.body.username
            },
            order: [
                ['id', 'ASC']
                // ['totalWaitTime', 'DESC']
            ],
          }).then(function(dbresponse) {
            console.log("Response=" + dbresponse);
            return res.json({cycleTimeData: dbresponse});     
        });    
    },
    getuserscenarios: function(req, res) {
        var queryURL = "http://" + IPaddress + ":8090/StreamingService/web/GetServerFileStream";
        var myheaders = { 
            accept: "application/json", 
            }; 
        console.log("ExtendSimASPgetScenarioResults: Getting scenario results from server for userSessionID=" + req.body.userLoginSessionID);
        db.scenario.findAll({
            where: {
                username: req.body.username
            }
          }).then(function(dbresponse) {
              console.log("Response=" + dbresponse[0].userLoginSessionID + " length=" + dbresponse.length);         
                return res.json({userScenarios: dbresponse});     
            });    
    }

};
