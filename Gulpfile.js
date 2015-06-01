var gulp = require('gulp')
var render = require('gulp-react-render')

var SRC = 'src/views/*.js'
var DEST = 'build'

gulp.task('build-html', function () {
  return gulp.src(SRC, { read: false })
    .pipe(render('markup', {
      some: 'default',
      props: 'to',
      pass: 'on'
    }))
    .pipe(gulp.dest(DEST))
})

gulp.task('watch-html', ['build-html'], function () {
  gulp.watch(SRC, ['build-html'])
})
