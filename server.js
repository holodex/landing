var connect = require('connect')

var env = process.env
var nodeEnv = env.NODE_ENV

var app = connect()

if (nodeEnv === 'development') {
  app.use(require('connect-livereload')({
    port: env.LIVERELOAD_PORT || 35729
  }))
}

app.use(require('ecstatic')({
  root: __dirname + '/build',
  cache: nodeEnv === 'production' ? 3600 : 0,
  showDir: false,
  autoIndex: true
}))

var port = env.PORT || 5000
app.listen(port, function () {
  console.log("server running on port", port)
})
