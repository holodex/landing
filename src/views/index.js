var React = require('react')
var assign = require('object-assign')
var r = require('r-dom')

var Layout = require('../partials/layout')

var style = {
  blocks: {
    minWidth: 970
  },
  block: {
    minHeight: 560,
    padding: '60px 0'
  },
  whyBlock: {

  },
  whyH1: {

  },
  whyH2: {

  },
  what: {

  },
  whatH1: {

  },
  whatP: {

  },
  how: {

  },
  who: {

  },
  actionButton: {

  }
}

module.exports = React.createClass({
  render: function () {
    var props = this.props

    return r(Layout, props, [
      r.main({
        style: style.blocks
      }, [
        r.header({
          style: assign(style.block, style.whyBlock)
        }, [
          r.h1({
            style: style.whyH1
          }, props.pitchPhrase),
          r.h2({
            style: style.whyH2
          }, props.pitchSentence),
          r.button({
            style: style.actionButton
          }, props.callToAction)
        ]),
        r.section({}, [
          
        ])
      ])
    ])
  }
})
