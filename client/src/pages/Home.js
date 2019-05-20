import React, { Component } from 'react';
import "../assets/css/style.css";

function Home() {
  return (
    <div id="home">
      <div className="container">
          <div className="row">
              <header id="ExtendSim-header">
              </header>
          </div>
          <div className="row">
              <div className="col-8 offset-2">
                  <h2>ExtendSim Web Simulation Home Page</h2>
              </div>
          </div>
      </div>
      <div className="container">
        <img src="../assets/images/es10-home-billboard-hover.png" alt="ExtendSim billboard" id="ExtendSim-home-billboard-image "></img>
      </div>
      </div>
  
  );
}

export default Home;
