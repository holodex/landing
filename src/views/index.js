var React = require('react')
var assign = require('object-assign')
var r = require('r-dom')
var Stylesheet = require('stilr')

var Layout = require('../partials/layout')

var vars = {
  fontBase: 14,
  gutterWidth: 60,
// colors chosen from https://www.google.com/design/spec/style/color.html#color-color-palette
//
// primary Purple
//  500  #9C27B0
//  100  #E1BEE7
//  800  #6A1B9A
//
// secondary Teal
//  A700 #00BFA5
  }
var colors = {
  primary: '#9C27B0',
  primaryLight: '#E1BEE7',
  primaryDark: '#6A1B9A',
  secondary: '#00BFA5',
  secondaryLight: '',
  secondaryDark: ''
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
    backgroundColor: colors.primary,
    //backgroundImage: '-webkit-linear-gradient(top, #6f27ff, rgba(0,0,0,0));',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  introH1: {
    marginBottom: 0,
    fontSize: vars.fontBase * 3.8,
    fontWeight: 700,
    lineHeight: 1.1,
    color: colors.primaryLight
  },
  introH2: {
    fontSize: vars.fontBase * 2,
    fontWeight: 300,
    lineHeight: 1.1,
    width: '75%',
    color: colors.primaryLight
  },
  aboutBlock: {
    backgroundColor: colors.primaryLight
  },
  aboutH1: {

  },
  aboutP: {

  },
  aboutCarousel: {

  },
  whoBlock: {
    display: 'none'
  },
  actionBlock: {
    backgroundColor: colors.primaryDark

  },
  actionButton: {
    height: vars.fontBase * 4,
    width: vars.fontBase * 24,
    fontSize: vars.fontBase * 1.6,
    border: '2px solid black',
    borderRadius: 10,
    color: 'black',
    outline: 0,
    fontWeight: 300
  },
  button: {
    'WebkitAppearance': 'button',
    cursor: 'pointer',
    alignItems: 'flex-start',
    textAlign: 'center',
    color: 'buttontext',
    backgroundColor: 'buttonface',
    textDecoration: 'none'
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
          }, [
            r.button({
              className: style.button + ' ' + style.actionButton,
            }, props.callToAction.text)
          ])
        ]),
        r.section({
          className: style.block + ' ' + style.aboutBlock
        }, [
          r.h1({
            className: style.aboutH1
          }, "What is " + props.name + "?"),
          r.p({
            className: style.aboutP
          }, props.description)
        ]),
        r.section({
          className: style.block + ' ' + style.whoBlock
        }),
        r.section({
          className: style.block + ' ' + style.actionBlock
        }, [
          r.p({
            className: style.actionP
          }, props.callToAction.text)
        ])
      ])
    ])
  }
})
