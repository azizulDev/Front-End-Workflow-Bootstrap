let gulp = require('gulp'),
watch = require('gulp-watch'),
sass = require('gulp-sass'),
autoPrefixer = require('gulp-autoprefixer'),
browserSync = require('browser-sync').create()


// HTML task
gulp.task('html', () => {
  browserSync.reload()
})

// Sass to Css task
gulp.task('sassToCss', () => {
  return gulp.src('./app/assets/sass/custom/style.scss')
  .pipe(sass())
  .pipe(autoPrefixer())
  .pipe(gulp.dest('./app/temp/css'))
})

// Css inject task
gulp.task('cssInject', gulp.series('sassToCss', () => {
  return gulp.src('./app/temp/css/style.css')
  .pipe(browserSync.stream())
}))


// Bootstrap Sass to Css
gulp.task('bootstrapSassToCss', () => {
  return gulp.src('./app/assets/sass/bootstrap/bootstrap.scss')
  .pipe(sass())
  .pipe(gulp.dest('./app/temp/css'))
})


// Bootstrap Css Inject
gulp.task('bootstrapCssInject', gulp.series('bootstrapSassToCss', () => {
  return gulp.src('./app/temp/css/bootstrap.css')
  .pipe(browserSync.stream())
}))



// Watch task
gulp.task('watch', () => {

  browserSync.init({
    notify: false,
    server: {
      baseDir: 'app'
    }
  })

  watch('./app/index.html').on('change', gulp.series('html'))
  watch('./app/assets/sass/custom/**/*.scss').on('change', gulp.series('cssInject'))
  watch('./app/assets/sass/bootstrap/**/*.scss').on('change', gulp.series('bootstrapCssInject'))
})