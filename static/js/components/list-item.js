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

let { removeItem, renameItem } = require('../actions/server');

//// COMPONENT ////////////////////////////////////////////////////////////////

let ListItem = React.createClass({

  mixins : [ Flux.mixins.storeListener ],

  getInitialState() {

    return {
      isRenaming : false
    };

  },

  _onClick() {

    this.setState({ isRenaming : true });

  },

  _onBlur(e) {

    console.log('onBlur', e.target.value);
    this.setState({ isRenaming : false });

    renameItem(this.props, e.target.value);

  },

  _onDelete() {

    removeItem({
      type : this.props.type,
      name : this.props.name
    });

  },

  render() {

    let { path, name, percentage } = this.props;

    let nameEl = this.state.isRenaming ?

      // <input>
      DOM.input({
        ref          : 'nameInput',
        type         : 'text',
        defaultValue : name,
        onBlur       : this._onBlur
      })

      : // or

      // <p>
      DOM.p({
        className : 'name',
        onClick   : this._onClick
      }, name);

    // <li> Normal listing
    let normalLi = DOM.li(null,

      DOM.button({

        className : 'btn-remove',
        onClick   : this._onDelete

      }, 'x'),

      DOM.a({
        className : 'link',
        href      : path
      }, '▾ Download'),

      nameEl

    );

    // <li> Uploading listing
    let uploadLi = DOM.li(null,

      DOM.p(null, 'Uploading ' + name),

      DOM.div({
        className : 'progress',
        style     : { width : percentage + '%' }
      })

    );

    return percentage ? uploadLi : normalLi;

  }

});

//// EXPORTS //////////////////////////////////////////////////////////////////

module.exports = React.createFactory(ListItem);

///////////////////////////////////////////////////////////////////////////////
