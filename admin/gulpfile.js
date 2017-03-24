var gulp = require('gulp');
var webpack = require('webpack');
var gutil = require("gulp-util");
var webpackConfig = require('./webpack.config.js');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');

var js_path = './js/**/*';
var css_path = './css/**/*';
var css_compile_source = './css/*.less';
var css_compile_destination = './public/css'

gulp.task("build-dev", ["webpack:build-dev","compileLess"], function() {
    gulp.watch([js_path], ["webpack:build-dev"]);
    gulp.watch([css_path], ["compileLess"]);

});

gulp.task("build", ["webpack:build","compileLess"]);

gulp.task("webpack:build", function(callback) {
    var myConfig = Object.create(webpackConfig);

    webpack(myConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
        callback();


    });
});

var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = "sourcemap";
myDevConfig.debug = true;
var devCompiler = webpack(myDevConfig);

gulp.task("webpack:build-dev", function(callback) {
    devCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build-dev", err);
        callback();
    });
});


gulp.task('compileLess', function () {
    gulp.src(css_compile_source)
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(gulp.dest(css_compile_destination));
});
