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
  createScenarioFolder: function(scenarioFolderName) {
    return axios.post('/api/ExtendSim/createScenarioFolder', { scenarioFolderName: scenarioFolderName }); 
  },
  copyModelToScenarioFolder: function(modelPathname, scenarioFolderName, copyFolderContents) {
    alert('copyModelToScenarioFolder: sendoff...');
    return axios.post('/api/ExtendSim/copyModelToScenarioFolder', 
      { 
        modelPathname: modelPathname,
        scenarioFolderName: scenarioFolderName,
        copyFolderContents: false
      }); 
  }
};
