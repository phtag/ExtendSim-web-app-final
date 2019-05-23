import React, { Component, useCallback } from 'react';
import {useDropzone} from 'react-dropzone';

function BasicDropArea(props) {
  const onDrop = useCallback(acceptedFiles => {
    props.handleDropEvents(acceptedFiles)});
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop});
  
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
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
          <p>Upload multiple files with the file dialog or by dragging and dropping images onto the dashed region</p>
          <input {...getInputProps()} type="file" id="fileElem" multiple onChange={props.handleDropEvents}></input>
          <label className="button" htmlFor="fileElem">Select some files</label>
        </form>
      </div>
    </div>
  );
}

export default BasicDropArea;