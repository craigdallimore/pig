///////////////////////////////////////////////////////////////////////////////
//
// Confirm component
//
///////////////////////////////////////////////////////////////////////////////

//// LIBS /////////////////////////////////////////////////////////////////////

const { Flux }               = require("delorean");
const React                  = require("react/addons");
const { CSSTransitionGroup } = React.addons;
let   { hideDialog }         = require("../actions/client");
let   { removeItem }         = require("../actions/server");

//// COMPONENT ////////////////////////////////////////////////////////////////

let Confirm = React.createClass({

  mixins : [ Flux.mixins.storeListener ],

  _onConfirmClick() {

    removeItem(this.getStore("fileStore").selectedItem);
    hideDialog();

  },

  _onCancelClick(e) {

    let { className } = e.target;

    if (className === "mask" || className === "btn-cancel") {
      console.log("cancel clicked");
      hideDialog();
    }

  },

  render() {

    let { visible, message } = this.getStore("fileStore").dialog;
    let maskClass = visible ? "mask" : "";

    let confirmEl = visible ? (

      <div className="dialog zoom-out" key="dialog">
        <h3>{ message }</h3>
        <button className="btn-ok" onClick={ this._onConfirmClick }>Ok</button>
        <button className="btn-cancel" onClick={ this._onCancelClick }>Cancel</button>
      </div>

    ) : null;

    return (

      <div className={maskClass} onClick={ this._onCancelClick }>
        <CSSTransitionGroup component="div" className="horizon" transitionName={ "zoom-out" }>
          { confirmEl }
        </CSSTransitionGroup>
      </div>

    );

  }

});

//// EXPORTS //////////////////////////////////////////////////////////////////

module.exports = React.createFactory(Confirm);

///////////////////////////////////////////////////////////////////////////////
