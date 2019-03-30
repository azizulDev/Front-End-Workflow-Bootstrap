let gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create()


// HTML task
gulp.task('html', () => {
  browserSync.reload()
})



// Watch task
gulp.task('watch', () => {

  browserSync.init({
    notify: false,
    server: {
      baseDir: 'app'
    }
  })

  watch('./app/index.html').on('change', gulp.series('html'))
})