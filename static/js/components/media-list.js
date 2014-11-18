///////////////////////////////////////////////////////////////////////////////
//
// MediaList component
//
///////////////////////////////////////////////////////////////////////////////

//// IMPORTS //////////////////////////////////////////////////////////////////

const { Flux }  = require('delorean');
const React     = require('react/addons');
const DOM       = React.DOM;
let   { toLowerCase, strIndexOf } = require('ramda');

//// COMPONENT ////////////////////////////////////////////////////////////////

let ListItem = require('./list-item');

let MediaList = React.createClass({

  mixins : [ Flux.mixins.storeListener ],

  render : function render() {

    let { types, filterTerm } = this.getStore('fileStore');
    let { type, name }        = this.props;
    let id                    = this.props.key;

    // Children are filtered by name
    let nameFilter = (x) => {

      if (!filterTerm) { return true; }

      let lTerm = toLowerCase(filterTerm);
      let lName = toLowerCase(x.name);
      let index = strIndexOf(lTerm, lName);

      return index > -1;

    };

    let children = types[type].filter(nameFilter);

    return DOM.li({
      className : 'media-list',
      id        : id,
      key       : id
    },
      DOM.h2(null, name),
      DOM.ul(null, children.map(ListItem))
    );

  }

});

//// EXPORTS //////////////////////////////////////////////////////////////////

module.exports = React.createFactory(MediaList);

///////////////////////////////////////////////////////////////////////////////
