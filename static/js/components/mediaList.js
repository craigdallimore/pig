///////////////////////////////////////////////////////////////////////////////
//
// MediaList component
//
///////////////////////////////////////////////////////////////////////////////

//// LIBS /////////////////////////////////////////////////////////////////////

var React = require('react');
var DOM   = React.DOM;

var MediaList = React.createClass({


  render : function render() {

    // var children = this.props.children.

    return DOM.ul({
      className : 'media-list'
    });

  }

});
