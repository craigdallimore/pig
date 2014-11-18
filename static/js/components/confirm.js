///////////////////////////////////////////////////////////////////////////////
//
// Confirm component
//
///////////////////////////////////////////////////////////////////////////////

//// LIBS /////////////////////////////////////////////////////////////////////

const { Flux } = require('delorean');
const React    = require('react/addons');
const DOM      = React.DOM;
const { CSSTransitionGroup } = React.addons;

//// COMPONENT ////////////////////////////////////////////////////////////////

let Confirm = React.createClass({

  mixins : [ Flux.mixins.storeListener ],

  getInitialState() {

    return {

      isHidden : true

    };

  },

  _onCancelClick() {

    this.state.isHidden = true;

  },

  render : function render() {

    let { confirmRemoveMessage } = this.getStore('fileStore');
    let className = 'dialog' + (confirmRemoveMessage ? '' : ' zoom-out');

    console.log('rcsstg', CSSTransitionGroup);

    return React.createElement(CSSTransitionGroup({
      transitionName : 'zoom-out',
      component      : 'div'
      }, DOM.div({
        className :  className,
        key       : 'dialog'
      },
        DOM.h3(null, confirmRemoveMessage || ''),
        DOM.button({
          className : 'btn-ok'
        }, 'OK'),
        DOM.button({
          className : 'btn-cancel',
          onClick   : this._onCancelClick
        }, 'Cancel')
      )
    ));

  }

});

//// EXPORTS //////////////////////////////////////////////////////////////////

module.exports = React.createFactory(Confirm);

///////////////////////////////////////////////////////////////////////////////
