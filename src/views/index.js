var React = require('react')
var assign = require('object-assign')
var r = require('r-dom')
var Stylesheet = require('stilr')

var Layout = require('../partials/layout')

var vars = {
  fontBase: 14,
  gutterWidth: 60,
}

var style = Stylesheet.create({
  blocks: {
    width: '100%'
  },
  block: {
    margin: 0,
    minHeight: 320,
    padding: vars.gutterWidth
  },
  introBlock: {
    backgroundImage: 'linear-gradient(top, #6f27ff, rgba(0,0,0,0));'
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
    'WebkitAppearance': 'button',
    cursor: 'pointer'
  }
})

module.exports = React.createClass({
  render: function () {
    var props = this.props

    return r(Layout, props, [
      r.main({
        className: style.blocks
      }, [
        r.header({
          className: style.block + ' ' + style.introBlock
        }, [
          r.h1({
            className: style.introH1
          }, props.pitchPhrase),
          r.h2({
            className: style.introH2
          }, props.pitchSentence),
          r.a({
            className: style.actionButton,
            href: props.callToAction.url
          }, props.callToAction.text)
        ]),
        r.section({}, [
          
        ])
      ])
    ])
  }
})
