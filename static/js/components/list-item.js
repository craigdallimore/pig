  ///////////////////////////////////////////////////////////////////////////////
//
// List Item
//
///////////////////////////////////////////////////////////////////////////////

//// LIBS /////////////////////////////////////////////////////////////////////

const { Flux } = require('delorean');
const React    = require('react');
const DOM      = React.DOM;

//// FLUX /////////////////////////////////////////////////////////////////////

let actions = require('../actions/actions');

//// COMPONENT ////////////////////////////////////////////////////////////////

let ListItem = React.createClass({

  mixins : [ Flux.mixins.storeListener ],

  _onDelete() {

    actions.removeItem({
      type : this.props.type,
      name : this.props.name
    });

  },

  render() {

    let { href, name, percentage } = this.props;

    // <li> Normal listing
    let li = DOM.li(null,

      DOM.button({

        className : 'btn-remove',
        onClick   : this._onDelete

      }, 'x'),

      DOM.a({ href : href }, name)

    );

    // <li> Uploading listing
    let uploadLi = DOM.li(null,

      DOM.p(null, 'Uploading ' + name),

      DOM.div({
        className : 'progress',
        style     : { width : percentage + '%' }
      })

    );

    return percentage ? uploadLi : li;

  }

});

//// EXPORTS //////////////////////////////////////////////////////////////////

module.exports = React.createFactory(ListItem);

///////////////////////////////////////////////////////////////////////////////
