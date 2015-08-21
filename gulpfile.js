var path = require('path');
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('webpack');
var del = require('del');
var series = require('stream-series');
var plugins = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'gutil', 'autoprefixer-*', 'cssnano'],
    rename: {
        'autoprefixer-core': 'autoprefixer'
    }
});

var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var devFolder = path.resolve(__dirname, 'public');
var buildFolder = path.resolve(__dirname, 'dist');
var webpackProductionConfig = require('./webpack.production.config');

gulp.task('stylus', function () {
    gulp.src('./app/main.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('stylus:prod', function () {
    gulp.src('./app/main.styl')
        .pipe(stylus())
        .pipe(plugins.postcss([ plugins.cssnano(), plugins.autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(plugins.rename('app.min.css'))
        .pipe(gulp.dest(path.resolve(buildFolder, 'css')));
});

gulp.task('watch', function() {
    gulp.watch('./app/**/*.styl', ['stylus'])
});

gulp.task('webpack:prod', function(nextTask) {

    // https://github.com/webpack/webpack-with-common-libs/blob/master/gulpfile.js
    var myConfig = Object.create(webpackProductionConfig);
    myConfig.output.path = path.resolve(buildFolder, 'js');
    myConfig.plugins = myConfig.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.min.js'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({comments: false})
    );

    webpack(myConfig, function(err, stats) {

        if (err) {
            throw new plugins.gutil.PluginError("webpack:build", err);
        }

        plugins.gutil.log("[webpack:build]", stats.toString({colors: true}));

        nextTask();
    });
});

gulp.task('inject:prod', function() {

    var target = gulp.src( path.resolve(buildFolder, 'index.html') );

    // https://www.npmjs.com/package/gulp-inject#multiple-sources-when-order-is-important
    var cssFiles = gulp.src( path.resolve(buildFolder, 'css/**/*.css'), {cwd: buildFolder, read: false});
    var jsVendors = gulp.src( path.resolve(buildFolder, 'js/vendors.min.js'), {cwd: buildFolder, read: false});
    var jsApp = gulp.src( path.resolve(buildFolder, 'js/app.min.js'), {cwd: buildFolder, read: false});

    target
        .pipe(plugins.inject(cssFiles))
        .pipe(plugins.inject(series(jsVendors, jsApp))) // This will always inject vendor files before app files
        .pipe(gulp.dest(buildFolder));
});

gulp.task('htmlmeta:prod', function() {

    return gulp.src( path.resolve(buildFolder, 'index.html') )
        .pipe(plugins.dom(function() {
            return this.querySelectorAll("meta[property='article:modified_time']")[0].setAttribute('content', new Date().toGMTString() );
        }))
        .pipe(gulp.dest(buildFolder));
});

gulp.task('clean:dist', function(nextTask) {

    return del([
        path.resolve(buildFolder, '*'),
        '!' + path.resolve(buildFolder, '.gitkeep')
    ], nextTask);
});

gulp.task('copy:prod', function() {

    return gulp.src([
        path.resolve(devFolder, 'index.html'),
        path.resolve(devFolder, 'fonts/**/*'),
        path.resolve(devFolder, 'images/**/*')
    ], { base: devFolder }).pipe(gulp.dest(buildFolder));

});

gulp.task('default', ['stylus', 'watch']);
gulp.task('build', plugins.sequence('clean:dist', 'webpack:prod', 'stylus:prod', 'copy:prod', 'inject:prod'/*, 'htmlmeta:prod'*/));
gulp.task('deploy', plugins.sequence('build', 'deploy'));

