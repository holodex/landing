var gulp = require('gulp')
var forEach = require('lodash.foreach')
var render = require('gulp-react-render')
var plumber = require('gulp-plumber')
var watch = require('gulp-watch')
var gutil = require('gulp-util')

var env = process.env
var nodeEnv = env.NODE_ENV

var lr

var props = {
  name: "Holodex",
  pitchPhrase: "People and Groups",
  pitchSentence: "Holodex empowers you to find people, understand relationships, and manage roles in your groups.",
  description: "Holodex is a web-based directory to search, visualize, and organize networks of people. The system is built around you, so everyone can come together.",
  valueProps: [],
  callToAction: {
    text: "Request an invite",
    url: ""
  }
}

function html () {
  return gulp.src('src/views/*.js', { read: false })
    .pipe(plumber())
    .pipe(render('markup', props))
    .pipe(gulp.dest('build'))
    .pipe(lr ? lr() : gutil.noop())
}

gulp.task('build-html', html)
gulp.task('watch-html', ['build-html'], function () {
  var watcher = gulp.watch('src/**/*.js', ['build-html'])
  watcher.on('change', function (event) {
    // invalidate require cache of file
    delete require.cache[event.path]
  })
})

var assetPaths = {
  "src/assets/**/*": "build"
}

function assets (isWatch) {
  return function () {
    forEach(assetPaths, function (to, from) {
      gulp.src(from, { dot: true })
        .pipe(isWatch ? watch(from) : util.noop())
        .pipe(gulp.dest(to))
        .pipe(lr ? require('gulp-livereload')(lr) : util.noop())
    })
  }
}

gulp.task('build-assets', assets(false))
gulp.task('watch-assets', assets(true))

function livereload (cb) {
  lr = require('gulp-livereload')
  lr.listen(env.LIVERELOAD_PORT || 35729, cb)
}

gulp.task('livereload', livereload)

gulp.task('watch', ['livereload', 'watch-html', 'watch-assets'])
gulp.task('build', ['build-html', 'build-assets'])
