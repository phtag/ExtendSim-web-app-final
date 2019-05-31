import React, { Component, useCallback } from 'react';
import {useDropzone} from 'react-dropzone';

function BasicDropArea(props) {
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        getFilesFromEvent: event => myCustomFileGetter(event, props.handleDropEvents)
      });
    
      const files = acceptedFiles.map(file => (
        <li key={file.name}>
          {file.name} - {file.size} bytes
        </li>
      ));
    
      return (
        <div>
          <aside>
              <label htmlFor="scenario-input-files-list" className="scenario-input-labels">Selected Scenario Input Files:</label>
              <ul>{files}</ul>        
          </aside>
          <label htmlFor="drop-area" className="scenario-input-labels">Scenario Input Files Drop Zone:</label>
          <div {...getRootProps({className: 'dropzone'})} id="drop-area">
          <form className="my-form">
            <input {...getInputProps()} type="file" id="fileElem" multiple></input>
            <p>Drag 'n' drop some files here, or click to select files</p>
          </form>
          </div>
        </div>
      )
    
    }
    
    async function myCustomFileGetter(event, handleDropEvents) {
      const files = [];
      const fileList = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    
      for (var i = 0; i < fileList.length; i++) {
        const file = fileList.item(i);
        
        Object.defineProperty(file, 'myProp', {
          value: true
        });
    
        files.push(file);
      }
      handleDropEvents(files);
      return files;
    }export default BasicDropArea;