var React = require('react')
var r = require('r-dom')
var Html = require('react-html')

module.exports = React.createClass({
  render: function () {
    var props = this.props

    return r(Html, {
      title: props.name + " - " + props.pitchPhrase,
      description: props.description,
      author: "Holodex",
      favicon: false,
      javascripts: ['js/index.js'],
      stylesheets: ['css/index.css', 'css/fonts.css']
    }, props.children)
  }
})
