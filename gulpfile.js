var gulp = require('gulp');
var webserver = require('gulp-webserver');
var stylus = require('gulp-stylus');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var hb = require('gulp-hb');

var baseDir = 'src';
var buildDir = 'build';
var buildImagesDir = buildDir + '/images';
var stylesDir = baseDir + '/styles';
var imagesDir = baseDir + '/images';
var partialsDir = baseDir + '/html/partials';
var dataDir = baseDir + '/data';

// default task, run 'gulp'
gulp.task('default', ['build', 'server'], function() { });

/* BUILD FILES */
gulp.task('build', ['clean', 'html', 'handlebars', 'styles', 'images']);

gulp.task('clean', function() {
  gulp.src(buildDir + '/**/*.*', {read: false})
    .pipe(clean());
});

gulp.task('html', function() {
  gulp.src(baseDir + '/*.html')
    .pipe(gulp.dest(buildDir));
});

gulp.task('handlebars', function() {
  return gulp
    .src(baseDir + '/html/*.html')
    .pipe(hb({
      partials: partialsDir + '/**/*.hbs',
      data: dataDir + '/**/*.json'
    }))
    .pipe(gulp.dest(buildDir));
});

gulp.task('styles', function() {
  gulp.src(stylesDir + '/main.styl')
    .pipe(stylus())
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(buildDir));
});

gulp.task('images', function() {
  gulp.src(imagesDir + '/*.*')
    .pipe(gulp.dest(buildImagesDir));
});
/* END BUILD FILES */

/* SERVE FILES */
gulp.task('server', function() {
  gulp.src(buildDir)
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

// watch for file changes in the src folder and re-run the build task
// gulp-webserver will detect changes to files in the build folder and refresh the browser
gulp.watch(baseDir + '/**/*.*', ['build']);
/* END SERVE FILES */
