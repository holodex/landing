var React = require('react')

var props = require('./props')
var component = React.createFactory(require('./views/index'))
var element = component(props)

React.render(element, document)
