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


var config = {
    accessKeyId: "AKIAJRH62PTRSX7EDKEQ",
    secretAccessKey: "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"
};

var s3 = require('gulp-s3-upload')(config);

gulp.task('clean', function () {
    var stream = gulp.src('dist/*', {read: false})
        .pipe(clean());
    return stream;
});


gulp.task('sass', function () {
    var stream =  gulp.src('./app/styles/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./app/styles/'));
    return stream;
});

gulp.task("upload", function() {
    gulp.src("./dist/**")
        .pipe(s3({
            Bucket: 'c2s-angular-app', //  Required
            ACL:    'public-read'       //  Needs to be user-defined
        }, {
            // S3 Constructor Options, ie:
            maxRetries: 5
        }))
    ;
});

gulp.task('sass:watch', function () {
    gulp.watch('./app/styles/**/*.scss', ['sass']);
});

gulp.task('UIImages', function () {
    var stream = gulp.src('./app/styles/images/*')
        .pipe(gulp.dest('./dist/styles/images'));

    return stream;
});


gulp.task('bower-files', function () {
    var stream = gulp.src('./app/index.html')
        .pipe(wiredep({
            directoBry: 'bower_components'
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
    var stream = gulp.src('./languages/*.json')
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
    var stream = gulp.src('./app/**/*.js')
        .pipe(jscs())
        .pipe(jscs.reporter());
});

gulp.task('copy-html-files', function () {
    var stream =  gulp.src('./**/*.html')
        .pipe(gulp.dest('./dist/'));
    return stream;
});

gulp.task('less', function () {
    var stream = gulp.src('./styles/**/*.less')
        .pipe(gulp.dest('./dist'));
    return stream;
});

gulp.task('image', function () {
    var stream =  gulp.src('./img/*.*')
    .pipe(gulp.dest('./dist/img'));
    return stream;

});

gulp.task('font', function () {
    var stream =  gulp.src('./app/font/**/*.*')
    .pipe(gulp.dest('./dist/font/'));
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

gulp.task('dev', function (callback) {
    runSequence(
        'sass:watch',
        'sass',
        'css-files',
        // 'jscs',
        'bower-files-dev',
        'copy-html-files',
        'image',
        'less',
        'font',
        'languages',
        'UIImages',
        'initialize',
        'watch',
    callback);
});

gulp.task('prod', function(callback){
    runSequence(
        'initialize',
        'bower-files',
        'sass',
        'css-files',
        'copy-html-files',
        'image',
        'less',
        'languages',
        'font',
        'UIImages',
        'upload',
        callback
    );
});

gulp.task('watch', function() {
    gulp.watch('./**/**/*.*', function (){
        runSequence('default');
    });
});


gulp.task('default', function () {
    runSequence('clean', 'dev');
});