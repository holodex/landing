var gulp = require('gulp')
var render = require('gulp-react-render')
var plumber = require('gulp-plumber')
var watch = require('gulp-watch')
var gutil = require('gulp-util')

var env = process.env
var nodeEnv = env.NODE_ENV

var lr

var props = {
  name: "Holodex",
  pitchPhrase: "Humans do better together",
  pitchSentence: "Holodex empowers you to find people, understand relationships, and manage roles.",
  description: "Holodex is a web-based directory to search, visualize, and organize your human networks.",
  valueProps: [],
  callToAction: "Request an invite"
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

//gulp.task('watch-html', ['build-html'], function (cb) {
//  watch('src/**/*.js', function (vinyl) {
//    // invalidate require cache of file
//    delete require.cache[vinyl.path]
//    gulp.start('build-html')
//  })
//})

function livereload (cb) {
  lr = require('gulp-livereload')
  lr.listen(env.LIVERELOAD_PORT || 35729, cb)
}

gulp.task('livereload', livereload)

gulp.task('watch', ['livereload', 'watch-html'])
gulp.task('build', ['build-html'])
