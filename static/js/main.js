///////////////////////////////////////////////////////////////////////////////
//
// Main
//
//// TODO /////////////////////////////////////////////////////////////////////

//[x] jsxify various things
//[x] Implement folders

//// IMPORTS  /////////////////////////////////////////////////////////////////

const React    = require('react/addons');
let MediaLists = require('./components/media-lists');
let Uploader   = require('./components/uploader');
let Confirm    = require('./components/confirm.jsx');
let dispatcher = require('./dispatcher/dispatcher');

//// SCENE ////////////////////////////////////////////////////////////////////

let mediaLists = MediaLists({ dispatcher : dispatcher });
let uploader   = Uploader();
let confirmer  = Confirm({ dispatcher : dispatcher });

let mountEl    = document.getElementById('mount');
let formEl     = document.getElementById('upload');
let maskEl     = document.getElementById('mask');

React.render(mediaLists, mountEl);
React.render(uploader, formEl);
React.render(confirmer, maskEl);

///////////////////////////////////////////////////////////////////////////////
