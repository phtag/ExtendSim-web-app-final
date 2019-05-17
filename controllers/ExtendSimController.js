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
              return res.json(response.data);
        });
    }      
};

//   function sendFile(scenarioFolderPathname, files, fileIndex) {
//     var queryNameURL = urlPrefix + "/api/sendfilename/";
//     var reader = new FileReader();
//     reader.onload = function(event) {
//       var filename = files[fileIndex].name;
//       event.preventDefault();
//       // Here you can use `e.target.result` or `this.result`
//       // and `f.name`.
//       console.log("Reader result=" + reader.result);
//       $.ajax({
//         url: queryNameURL,
//         method: "get",
//         accept: "application/json",
//         // contentType: "multipart/form-data",
//         contentType: "application/json;charset=utf-8",
//         headers: myheaders,
//         // data: reader.result,
//         muteHttpExceptions: false,
//         data: {
//           scenarioFolderPathname: scenarioFolderPathname,
//           filename: filename,
//           filedata: reader.result
//         }
//       }).then(function(response) {
//         console.log("Response=" + response);
//         fileIndex++;
//         if (fileIndex < files.length) {
//           sendFile(scenarioFolderPathname, files, fileIndex++);
//         } else {
//           ExtendSimASPsubmitSimulationScenario(
//             $userloginSessionID.val(),
//             $scenarioFolderPathname.val() + ExtendSimModelName,
//             true
//           );
//         }
//       });
//     };
//     reader.readAsBinaryString(files[fileIndex]);
//   }
  
//   function ExtendSimASPsendFiles(scenarioFolderPathname, files) {
//     // var queryDataURL = urlPrefix + "/api/sendfiledata/";
//     if (files.length) {
//       sendFile(scenarioFolderPathname, files, 0);
//     }
//   }
  
//   function ExtendSimASPsubmitSimulationScenario(
//     userLoginSessionID,
//     ExtendSimModelPath,
//     removeFolderOnCompletion
//   ) {
//     // Execute WCF service to create a scenario folder
//     // var queryURL = "http://184.171.246.58:8090/StreamingService/web/CreateScenarioFolder?scenarioFoldername=myScenarioFolder"
//     // var queryURL = urlPrefix + "/api/copymodeltoscenariofolder/" + encodeURIComponent(ExtendSimModelPath) + "&" + encodeURIComponent(scenarioFolderPathname) + "&" + true;
//     var queryURL = urlPrefix + "/api/submitsimulationscenario";
//     //   "Submitting the scenario now for userLoginSessionID=" + userLoginSessionID
//     // );
//     $.ajax({
//       url: queryURL,
//       method: "get",
//       // accept : 'application/json',
//       contentType: "application/json;charset=utf-8",
//       headers: myheaders,
//       muteHttpExceptions: false,
//       data: {
//         userLoginSessionID: userLoginSessionID,
//         modelPathname: ExtendSimModelPath,
//         removeFolderOnCompletion: removeFolderOnCompletion
//       }
//     }).then(function(response) {
//       console.log("ExtendSimASPsubmitSimulationScenario: " + response);
//       var scenarioID = response;
//       $scenarioID.val(scenarioID);
//       checkModelStatusTimer = setInterval(ExtendSimASPCheckModelRunStatus, 1000);
//       // ExtendSimASPCheckModelRunStatus().then(function(result) {
//       //   console.log("Status=" + result);
//       // });
//     });
//   }
  
//   function ExtendSimASPCheckModelRunStatus() {
//     var queryURL = urlPrefix + "/api/checkmodelrunstatus";
//     $.ajax({
//       url: queryURL,
//       method: "get",
//       // accept : 'application/json',
//       contentType: "application/json;charset=utf-8",
//       headers: myheaders,
//       muteHttpExceptions: false,
//       data: {
//         scenarioID: $scenarioID.val()
//       }
//     }).then(function(response) {
//       console.log("ExtendSimCheckModelRunStatus: status=" + response);
//       if (response === runCompletedScenarioStatus) {
//         $scenarioRunStatus.val("Completed");
//         clearInterval(checkModelStatusTimer);
//         // pull results for the scenario
//         ExtendSimASPgetScenarioResults(
//           cycleTimeResultsFilename,
//           $userloginSessionID.val()
//         );
//         $showScenarioResultsBtn.show();
//         // ExtendSimASPCheckModelRunStatus(scenarioID);
//       } else {
//         $scenarioRunStatus.val("Running...");
//       }
//       return response;
//     });
//   }
  
//   function ExtendSimASPgetScenarioResults(filename, userLoginSessionID) {
//     var queryURL = urlPrefix + "/api/getscenarioresults";
//     var myheaders = {
//       accept: "application/json"
//     };
//     $.ajax({
//       url: queryURL,
//       method: "get",
//       // accept : 'application/json',
//       contentType: "application/json;charset=utf-8",
//       headers: myheaders,
//       muteHttpExceptions: false,
//       data: {
//         userLoginSessionID: userLoginSessionID,
//         filepath: $scenarioFolderPathname.val() + filename
//       }
//     }).then(function(response) {
//       console.log("ExtendSimASPgetScenarioResults: results=" + response);
//       return response;
//     });
//   }
  
