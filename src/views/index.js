var React = require('react')
var assign = require('object-assign')
var r = require('r-dom')

var Layout = require('../partials/layout')

var vars = {
  fontBase: 14,
  gutterWidth: 60,
}

var style = {
  blocks: {
    width: '100%'
  },
  block: {
    margin: 0,
    minHeight: 320,
    padding: vars.gutterWidth
  },
  introBlock: {
    backgroundImage: '-webkit-linear-gradient(top, #6f27ff, rgba(0,0,0,0));'
  },
  introH1: {
    fontSize: vars.fontBase * 3,
    fontWeight: 700,
    lineHeight: 1.1
  },
  introH2: {
    fontSize: vars.fontBase * 2,
    fontWeight: 300,
    lineHeight: 1.1
  },
  about: {

  },
  aboutH1: {

  },
  aboutP: {

  },
  value: {

  },
  who: {

  },
  actionButton: {
    outline: 0,
    '-webkitAppearance': 'button',
    cursor: 'pointer'
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
          style: assign(style.block, style.introBlock)
        }, [
          r.h1({
            style: style.introH1
          }, props.pitchPhrase),
          r.h2({
            style: style.introH2
          }, props.pitchSentence),
          r.a({
            style: style.actionButton,
            href: props.callToAction.url
          }, props.callToAction.text)
        ]),
        r.section({}, [
          
        ])
      ])
    ])
  }
})
