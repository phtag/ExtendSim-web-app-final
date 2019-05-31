import React, { Component, useCallback } from 'react';
import {useDropzone} from 'react-dropzone';

function BasicDropArea(props) {
    const {getRootProps, getInputProps, open, acceptedFiles} = useDropzone({onDrop});
      // // Disable click and keydown behavior
      // noClick: true,
      // noKeyboard: true
  
    const onDrop = useCallback(acceptedFiles => {
      alert("onDrop");
    });
  
    const files = acceptedFiles.map(file => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));
  
    return (
      <div className="container">
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
        <div {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here</p>
          <button type="button" onClick={open}>
            Open File Dialog
          </button>
        </div>
      </div>
    );
  }

export default BasicDropArea;