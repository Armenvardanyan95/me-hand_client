var gulp = require('gulp');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var useref = require('gulp-useref');
var wiredep = require('wiredep').stream;
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var notify = require('gulp-notify');
var newer = require('gulp-newer');
var ngAnnotate = require('gulp-ng-annotate');
var sftp = require('gulp-sftp');
var del = require('del');
var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass');
var jscs = require('gulp-jscs');
var connect = require('gulp-connect');


gulp.task('clean', function () {
    var stream = gulp.src('./dist/*', {read: false})
        .pipe(clean());
    return stream;
});


gulp.task('bower-files', function () {
    var stream = gulp.src('./app/index.html')
        .pipe(wiredep({
            directory: 'bower_components'
        }))
        .pipe(useref())
        .pipe(gulpif('*.js', ngAnnotate()))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.js', gulp.dest('./dist')));
    return stream;
});

gulp.task('bower-files-dev', function () {
    var stream = gulp.src('./app/index.html')
        .pipe(wiredep({
            directory: 'bower_components'
        }))
        .pipe(useref())
        .pipe(gulpif('*.js', gulp.dest('./dist')));
    return stream;
});

gulp.task('languages', function () {
    var stream = gulp.src('./app/languages/*.json')
        .pipe(gulp.dest('./dist/languages'));
    return stream;
});

gulp.task('css-files', function () {
    var stream = gulp.src('./app/index.html')
        .pipe(useref())
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulpif('*.css', gulp.dest('./dist')));
    return stream;
});
    
gulp.task('jscs', function () {
    var stream = gulp.src('./**/*.js')
        .pipe(jscs())
        .pipe(jscs.reporter());
});

gulp.task('copy-html-files', function () {
    var stream =  gulp.src('./app/components/**/*.html')
        .pipe(gulp.dest('./dist/components'));
    return stream;
});


gulp.task('image', function () {
    var stream =  gulp.src('./app/img/*.*')
    .pipe(gulp.dest('./dist/img'));
    return stream;

});

gulp.task('font', function () {
    var stream =  gulp.src('./app/fonts/**/*.*')
    .pipe(gulp.dest('./dist/fonts/'));
    return stream;
});


gulp.task('initialize', function () {
    var stream =  gulp.src('./app/index.html')
        .pipe(wiredep({
            directory: 'bower_components'
        }))
        .pipe(useref())
        .pipe(gulp.dest('./dist'));
    return stream;
});



gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        livereload: true,
        port:8888
    });
});


gulp.task('dev', function (callback) {
    runSequence(
        'css-files',
        // 'jscs',
        'bower-files-dev',
        'copy-html-files',
        'image',
        'font',
        'languages',
        'initialize',
        'connect',
        'watch',
        callback);
});
gulp.task('prod', function(callback){
    runSequence(
        'initialize',
        'bower-files',
        'css-files',
        'copy-html-files',
        'image',
        'languages',
        'font',
        callback
    );
});

gulp.task('rebuild', function (callback) {
    runSequence(
        'css-files',
        // 'jscs',
        'bower-files-dev',
        'copy-html-files',
        'image',
        'font',
        'languages',
        'initialize',
        'reload',
        callback);
});

gulp.task('watch', function() {
    gulp.watch('./app/**/**/*.*', function (){
        runSequence('rebuild');
    });
});

gulp.task('reload', function () {
    connect.reload();
});

gulp.task('default', function () {
    runSequence('clean', 'dev');
});