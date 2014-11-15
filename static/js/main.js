///////////////////////////////////////////////////////////////////////////////
//
// Main
//
//// TODO /////////////////////////////////////////////////////////////////////

//[/] Appraise gulpfile
//[/] Remove backbone etc
//[/] Add browserify
//[/] Use es6ify!
//[/] Add flux / react (use delorean)
//[/] Get socketio working again
//[/] Get file lists working
//[/] Get file uploads working
//[/] Implement file delete
//[/] File upload progress
//[x] Implement file rename
//[x] Implement delete confirm
//[x] Implement folders

//// LIBS /////////////////////////////////////////////////////////////////////

// React
const React = require('react');

//// SCENE ////////////////////////////////////////////////////////////////////

let MediaLists = require('./components/media-lists');
let Uploader   = require('./components/uploader');
let dispatcher = require('./dispatcher/dispatcher');

let mediaLists = MediaLists({ dispatcher : dispatcher });

let uploader   = Uploader();

let mountEl    = document.getElementById('mount');
let formEl     = document.getElementById('upload');

React.render(mediaLists, mountEl);
React.render(uploader, formEl);

///////////////////////////////////////////////////////////////////////////////
