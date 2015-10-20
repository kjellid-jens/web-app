// Include gulp
var gulp = require('gulp');

// Include plugins
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var util = require('gulp-util');
var log = util.log


// Concatenate and minify JS Files
gulp.task('scripts', function() {
    log("Concatenate and minify JS files " + (new Date()).toString());
    return gulp.src('assets/src/js/*.js')
    .pipe(concat('all.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('assets/dist/js'));
});

// Process SCSS to CSS
gulp.task("sass", function(){
    log("Generate CSS files " + (new Date()).toString());
    gulp.src('assets/src/scss/*.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer("last 3 version","safari 5", "ie 8", "ie 9"))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('assets/dist/css'));
});

// Automatically run tasks upon change
gulp.task('watch', function() {
   // Watch .js files
  gulp.watch('assets/src/js/*.js', ['scripts']);
   // Watch .scss files
  gulp.watch('assets/src/scss/*.scss', ['sass']);
 });

// Default Task
gulp.task('default', ['scripts', 'sass', 'watch']);

