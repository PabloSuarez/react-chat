var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var sass = require('gulp-sass');

gulp.task('browserify', function () {

    var bundler = browserify({
        entries: ['./app/main.js'],
        transform: [reactify],
        debug: true,
        cache: {}, packageCache: {}, fullPaths: true
    });

    return bundler.bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./build/'));
});

gulp.task('scss', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css/'));
});

gulp.task('watch:browserify', function () {
    gulp.watch('./app/main.js', ['browserify'])
});

gulp.task('watch:scss', function () {
    gulp.watch('./scss/**/*.scss', ['scss'])
});

gulp.task('default', ['browserify', 'scss', 'watch:browserify', 'watch:scss']);
