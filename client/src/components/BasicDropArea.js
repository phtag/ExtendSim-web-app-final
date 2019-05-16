import React, { Component } from 'react';
import {useDropzone} from 'react-dropzone';

function BasicDropArea(props) {
  const onDrop = props.handleDropEvents;
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop});
  
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div>
    <div {...getRootProps({className: 'dropzone'})} id="drop-area">
    <form className="my-form">
      <p>Upload multiple files with the file dialog or by dragging and dropping images onto the dashed region</p>
      <input {...getInputProps()} type="file" id="fileElem" multiple onChange={props.handleDropEvents}></input>
      <label className="button" htmlFor="fileElem">Select some files</label>
    </form>
    </div>
    <aside>
      <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </div>

    // <section className="container">
    //   <div {...getRootProps({className: 'dropzone'})}>
    //     <input {...getInputProps()} />
    //     <p>Drag 'n' drop some files here, or click to select files</p>
    //   </div>
    //   <aside>
    //     <h4>Files</h4>
    //     <ul>{files}</ul>
    //   </aside>
    // </section>
  );
}

export default BasicDropArea;