var gulp = require('gulp')
var stylus = require('gulp-stylus')
var sourcemaps = require('gulp-sourcemaps')

gulp.task('stylus', function () {
    gulp.src('./app/main.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function() {
    gulp.watch('./app/**/*.styl', ['stylus'])
})

gulp.task('default', ['stylus', 'watch'])