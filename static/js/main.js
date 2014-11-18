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
//[/] Implement file rename
//[/] Implement filter
//[/] Move socket out of store
//[x] jsxify various things
//[x] Implement delete confirm
//[x] Implement folders

//// IMPORTS  /////////////////////////////////////////////////////////////////

const React    = require('react');
let MediaLists = require('./components/media-lists');
let Uploader   = require('./components/uploader');
let Confirm    = require('./components/confirm');
let dispatcher = require('./dispatcher/dispatcher');

//// SCENE ////////////////////////////////////////////////////////////////////

let mediaLists = MediaLists({ dispatcher : dispatcher });
let uploader   = Uploader();
let confirmer  = Confirm({ dispatcher : dispatcher });

let mountEl    = document.getElementById('mount');
let formEl     = document.getElementById('upload');
let horizon    = document.getElementById('horizon');

React.render(mediaLists, mountEl);
React.render(uploader, formEl);
React.render(confirmer, horizon);

///////////////////////////////////////////////////////////////////////////////
