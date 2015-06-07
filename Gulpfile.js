var fs = require('fs')
var Path = require('path')
var gulp = require('gulp')
var forEach = require('lodash.foreach')
var assign = require('lodash.assign')
var render = require('gulp-react-render')
var plumber = require('gulp-plumber')
var watch = require('gulp-watch')
var gutil = require('gulp-util')

var env = process.env
var nodeEnv = env.NODE_ENV

var isDeploy = function (env) {
  return env === 'production' || env === 'staging'
}

var lr

//
// html
//

function html () {
  var props = require('./src/props')
  return gulp.src('src/views/*.js', { read: false })
    .pipe(plumber())
    .pipe(render('string', props))
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

//
// js
//

var browserify = require('browserify')
var mold = require('mold-source-map')
var buffer = require('vinyl-buffer')
var source = require('vinyl-source-stream')
var sourcemaps = require('gulp-sourcemaps')

var scripts = function (isWatch) {

  var views = ['index.js']
  //var views = fs.readdirSync(__dirname + '/src/')
  //.filter(function (path) {
  //  return /.*\.js/.test(path)
  //})

  return function () {
    var plugin = function (bundler) {
      return bundler
        .plugin(require('bundle-collapser/plugin'))
        //.plugin(require('factor-bundle', {
        //  outputs: views.map(function (v) { return 'js/' + v })
        //}))
    }

    var bundle = function (bundler) {
      return bundler.bundle()
        .on('error', gutil.log.bind(gutil, "browserify error"))
        .pipe(plumber())
        .pipe(mold.transformSourcesRelativeTo('./src'))
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(isDeploy(nodeEnv) ? require('gulp-uglify')() : gutil.noop())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('build/js'))
        .pipe(lr ? lr() : gutil.noop())
    }

    args = {
      entries: views.map(function (v) { return './src/' + v }),
      debug: true
    }

    if (isWatch) {
      watchify = require('watchify')
      bundler = watchify(browserify(assign(args, watchify.args)))
      rebundle = function () { bundle(bundler) }
      bundler.on('update', rebundle)
      bundler.on('log', console.log.bind(console))
      rebundle()
    } else {
      bundle(plugin(browserify(args)))
    }
  }
}

gulp.task('build-js', scripts(false))
gulp.task('watch-js', scripts(true))

//
// assets
//

var assetPaths = {
  "src/assets/**/*": "build"
}

function assets (isWatch) {
  return function () {
    forEach(assetPaths, function (to, from) {
      gulp.src(from, { dot: true })
        .pipe(isWatch ? watch(from) : gutil.noop())
        .pipe(gulp.dest(to))
        .pipe(lr ? require('gulp-livereload')(lr) : gutil.noop())
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

gulp.task('watch', ['livereload', 'watch-html', 'watch-assets', 'watch-js'])
gulp.task('build', ['build-html', 'build-assets', 'build-js'])
