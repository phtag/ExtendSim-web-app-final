import axios from 'axios';

export default {
  // Gets all posts
  getPosts: function() {
    return axios.get('/api/posts');
  },
  createPost: function(data) {
    return axios.post('/api/posts', data);
  },
  signup: function(data) {
    return axios.post('/api/users/signup', 
    {
      username: data.username,
      password: data.password
    });
  },
  login: function(data) {
   return axios.post('/api/users/login', data)
    // return axios.post('/api/users/login', data);
  },
  validateToken: function(t) {
    return axios.post('/api/users/validate', { token: t });
  },
  createScenario: function(data) {
    const { username, userLoginSessionID, scenarioName } = data;
    return axios.post('/api/server/createscenario', 
    { 
      username: username,
      userLoginSessionID: userLoginSessionID, 
      scenarioName: scenarioName 
    }); 
  },
  createScenarioFolder: function(userLoginSessionID, scenarioFolderName, scenarioName) {
    alert("createScenarioFolder: userLoginSessionID=" + userLoginSessionID + " scenarioFolderName=" + scenarioFolderName);
    return axios.post('/api/ExtendSim/createScenarioFolder', 
    { 
      userLoginSessionID: userLoginSessionID, 
      scenarioFolderName: scenarioFolderName,
      scenarioName: scenarioName 
    }); 
  },
  copyModelToScenarioFolder: function(modelPathname, scenarioFolderPathname, copyFolderContents) {
    return axios.post('/api/ExtendSim/copyModelToScenarioFolder', 
      { 
        modelPathname: modelPathname,
        scenarioFolderPathname: scenarioFolderPathname,
        copyFolderContents: copyFolderContents
      }); 
  },
  sendfile: function(
    scenarioFolderPathname, 
    filename, 
    filedata) {
    // return axios.post('/api/ExtendSim/sendfilepathname', 
    return axios.post('/api/ExtendSim/sendfile', 
    { 
      scenarioFolderPathname: scenarioFolderPathname,
      filename: filename,
      filedata: filedata
    })
  },
  submitSimulationScenario: function(
    userLoginSessionID,
    modelPathname,
    removeFolderOnCompletion) {
    // Invoke call to server
    return axios.post('/api/ExtendSim/submitsimulationscenario', 
    { 
      userLoginSessionID: userLoginSessionID,
      modelPathname: modelPathname,
      removeFolderOnCompletion: removeFolderOnCompletion
    })
  },
  checkmodelrunstatus: function(
    scenarioID) {
    return axios.post('/api/ExtendSim/checkmodelrunstatus', 
    { 
      scenarioID: scenarioID,
    })
  },
  getcycletimeresults: function (filepathname, userLoginSessionID, scenarioID, username) {
    return axios.post('/api/ExtendSim/getcycletimeresults',
    {
      filepathname: filepathname,
      userLoginSessionID: userLoginSessionID,
      scenarioID: scenarioID,
      username: username
    });
    // return response.data;
  },
  getUserScenarios: function (username) {
    return axios.post('/api/ExtendSim/getuserscenarios',
    {
      username: username
    });
  },
  getScenarioCycletimeData: function (scenarioID, username) {
    return axios.post('/api/ExtendSim/getscenariocycletimedata',
    {
      scenarioID: scenarioID,
      username: username
    });
  }
};
