let gulp = require('gulp'),
watch = require('gulp-watch'),
sass = require('gulp-sass'),
autoPrefixer = require('gulp-autoprefixer'),
webpack = require('webpack'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
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


// JS task with Webpack
gulp.task('scripts', (callback)=> {
  webpack(require('./webpack.config.js'), (err, stats) => {
    if(err){
      console.log(err.toString())
    }
    console.log(stats.toString())
    callback()
  })
})


// JS refresh
gulp.task('scriptsRefresh', gulp.series('scripts', () => {
  browserSync.reload()
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
  watch('./app/assets/scripts/**/*.js').on('change', gulp.series('scriptsRefresh'))
})


// Delete dist folder
gulp.task('deleteDistFolder', () => {
  return del('./dist')
})


// Image optimization task
gulp.task('optimizeImages', gulp.series('deleteDistFolder', () => {
  return gulp.src('./app/assets/img/**/*')
  .pipe(imagemin({
    progressive: true,
    interlaced: true,
    multipass: true
  }))
  .pipe(gulp.dest('./dist/assets/img'))
}))


// Usemin task
gulp.task('usemin', gulp.series('deleteDistFolder', 'sassToCss', 'bootstrapSassToCss', () => {
  return gulp.src('./app/index.html')
  .pipe(usemin({
    css: [() => {return rev()}, () => {return cssnano()}, () => {return autoPrefixer()}],
    js: [() => {return rev()}, () => {return uglify()}]
  }))
  .pipe(gulp.dest('./dist'))
}))


// Preview Dist Folder
gulp.task('previewDist', () => {
  browserSync.init({
    notify: false,
    server: {
      baseDir: 'dist'
    }
  })
})


// Build task
gulp.task('build', gulp.series('deleteDistFolder', 'optimizeImages','usemin'))