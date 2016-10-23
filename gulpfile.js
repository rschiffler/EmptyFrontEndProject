var gulp = require('gulp');
var webserver = require('gulp-webserver');
var stylus = require('gulp-stylus');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var hb = require('gulp-hb');
var cleanCss = require ('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var rev = require('gulp-rev');
var revReplace = require("gulp-rev-replace");

var baseDir = 'src';
var buildDir = 'build';
var buildImagesDir = buildDir + '/images';
var stylesDir = baseDir + '/styles';
var imagesDir = baseDir + '/images';
var partialsDir = baseDir + '/html/partials';
var dataDir = baseDir + '/data';

// default task, run 'gulp'
gulp.task('default', ['build', 'server'], function() { });

/* BUILD ALL FILES */
gulp.task('build', ['clean', 'styles', 'html', 'images', 'cache-bust']);

gulp.task('clean', function() {
  gulp.src(buildDir + '/**/*.*', {read: false})
    .pipe(clean());
});

gulp.task('html', function() {
  return gulp.src(baseDir + '/html/*.html')
    .pipe(hb({
      partials: partialsDir + '/**/*.hbs',
      data: dataDir + '/**/*.json'
    }))
    .pipe(gulp.dest(buildDir));
});

gulp.task('styles', function() {
  return gulp.src(stylesDir + '/main.styl')
    .pipe(sourcemaps.init())
      .pipe(stylus())
      .pipe(concat('styles.css'))
      .pipe(rev())
      .pipe(cleanCss({compatibility: 'ie8'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(buildDir))
    .pipe(rev.manifest())
    .pipe(gulp.dest(buildDir));
});

gulp.task('images', function() {
  gulp.src(imagesDir + '/*.*')
    .pipe(gulp.dest(buildImagesDir));
});

gulp.task('cache-bust', ['html', 'styles'], function() {
  var manifest = gulp.src(buildDir + "/rev-manifest.json");

  return gulp.src(buildDir + "/index.html")
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest(buildDir));
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
