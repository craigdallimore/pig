///////////////////////////////////////////////////////////////////////////////
//
// MediaList component
//
///////////////////////////////////////////////////////////////////////////////

//// LIBS /////////////////////////////////////////////////////////////////////

var React  = require('react');
var DOM    = React.DOM;

//// COMPONENT ////////////////////////////////////////////////////////////////

var ListItem = require('./list-item');

var mediaList = React.createClass({

  render : function render() {

    var id       = this.props.key;
    var name     = this.props.name;
    var children = [];

    if (this.props.children && this.props.children.length) {

      children = this.props.children.map(function(child) {
       return ListItem(child);
      });

    }

    return DOM.li({
      className : 'media-list',
      id        : id,
      key       : id
    },
      DOM.h2(null, name),
      DOM.ul(null, children)
    );

  }

});

//// EXPORTS //////////////////////////////////////////////////////////////////

module.exports = React.createFactory(mediaList);

///////////////////////////////////////////////////////////////////////////////
