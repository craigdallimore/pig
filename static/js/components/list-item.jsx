  ///////////////////////////////////////////////////////////////////////////////
//
// List Item
//
///////////////////////////////////////////////////////////////////////////////

//// LIBS /////////////////////////////////////////////////////////////////////

const { Flux } = require('delorean');
const React    = require('react/addons');

//// FLUX /////////////////////////////////////////////////////////////////////

let { renameItem }        = require('../actions/server');
let { confirmRemoveItem } = require('../actions/client');

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

    this.setState({ isRenaming : false });

    renameItem(this.props, e.target.value);

  },

  _onDelete() {

    confirmRemoveItem({
      type : this.props.type,
      name : this.props.name
    });

  },

  render() {

    let { path, name, percentage } = this.props;
    let style = { width: percentage + "%" };

    // Use a <p> or <input> if we are in edit mode or read mode
    let nameEl = this.state.isRenaming ?
      <input type="text" ref="nameInput" defaultValue={name} onBlur={this._onBlur}/> :
      <p className="name" onClick={ this._onClick}>{name}</p>

    // Normal listing
    let normalLi =
    <li>
      <button className="btn-remove" onClick={ this._onDelete }>x</button>
      <a className="link" href={path}>▾ Download</a>
      { nameEl }
    </li>

    // Listing during an upload
    let uploadLi =
    <li>
      <p>Uploading</p>
      <div className="progress" style={ style }></div>
    </li>

    return percentage ? uploadLi : normalLi;

  }

});

//// EXPORTS //////////////////////////////////////////////////////////////////

module.exports = React.createFactory(ListItem);

///////////////////////////////////////////////////////////////////////////////
