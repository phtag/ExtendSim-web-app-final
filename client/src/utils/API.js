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
    return axios.post('/api/users/signup', data);
  },
  login: function(data) {
   return axios.post('/api/users/login', data)
    // return axios.post('/api/users/login', data);
  },
  validateToken: function(t) {
    return axios.post('/api/users/validate', { token: t });
  },
  createScenarioFolder: function(userLoginSessionID, scenarioFolderName) {
    return axios.post('/api/ExtendSim/createScenarioFolder', 
    { 
      userLoginSessionID: userLoginSessionID, 
      scenarioFolderName: scenarioFolderName 
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
  getScenarioResults: function (filepathname, userLoginSessionID) {
    return axios.post('/api/ExtendSim/getscenarioresults',
    {
      filepathname: filepathname,
      userLoginSessionID: userLoginSessionID
    });
    // return response.data;
  },
  getUserScenarios: function (userLoginSessionID) {
    return axios.post('/api/ExtendSim/getuserscenarios',
    {
      userLoginSessionID: userLoginSessionID
    });
  }
};
