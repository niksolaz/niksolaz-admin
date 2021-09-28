require('es6-promise').polyfill();

/*Version App*/
var appName = "admin";
var appVersion = "1.0.0";

/*Gulp Main Library*/
var gulp = require('gulp');

/*Init gulp package*/
var cleancss = require('gulp-clean-css');
var runSequence = require('gulp4-run-sequence');
var rev = require('gulp-rev');
var cssimport = require("gulp-cssimport");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var copy = require('gulp-copy');
//var manifest = require('gulp-manifest');
var injectIndexCode = require('gulp-inject-string');
var removeIndexCode = require('gulp-remove-html');
var jshint = require('gulp-jshint');
var webserver = require('gulp-webserver');
var javascriptObfuscator = require('gulp-javascript-obfuscator');
var rename = require('gulp-rename');
var del = require('del');

/*Init structure directory variables*/

var srcJS = 'src/js/**/*';
var srcCSS = 'src/css/all.css';
var dist = 'dist';
var distJS = 'dist/js';
var distCSS = 'dist/css';
var distAll = 'dist/**/**/*';
var public = "public";

/*Set config date/time*/
var now = new Date();
var dateY = now.getFullYear();
var dateM = now.getMonth() + 1;
var dateD = now.getDate();
var dateH = now.getHours();
var dateMi = now.getMinutes();
if (dateM < 10) dateM = "0" + dateM;
if (dateD < 10) dateD = "0" + dateD;
if (dateH < 10) dateH = "0" + dateH;
if (dateMi < 10) dateMi = "0" + dateMi;
var build = dateY + dateM + dateD + dateH + dateMi;

var errorsOnly;
var options;

//#############################//
/**
 * CHECK JS LINE
 */
//#############################//
gulp.task('checkjs', function() {
    gulp.src('./src/js/**/*.js')
        .pipe(jshint({
            "sub": true,
            "laxbreak": true,
            "excludes": ["Bad line breaking before '||'"],
        }))
        .pipe(jshint.reporter('default', errorsOnly))

});


//#############################//
/**
 * CLEAN FOLDERS PUBLIC & DIST
 */
//#############################//
gulp.task('cleanPublic', function() {
    return del(['./' + public]);
});

gulp.task('cleanDist', function() {
    return del(['./' + dist]);
});

//#############################//
/**
 * DIST
 */
//#############################//
gulp.task('minify-js', function() {

    return gulp.src(srcJS)
        .pipe(concat(appName + '.' + build + '.min.js'))
        .pipe(uglify())
        .pipe(javascriptObfuscator({
            compact: true,
            selfDefending: true,
            /*identifierNamesGenerator: "mangled",*/
            disableConsoleOutput: true,
            debugProtection: true,
            debugProtectionInterval: true,
            escapeUnicodeSequence: true,
            disableConsoleOutput: true,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 10,
            controlFlowFlattening: false,
            stringArray: true,
            stringArrayEncoding: ["rc4"]
        }))
        .pipe(injectIndexCode.prepend("/*! Platform Admin v" + appVersion + " b" + build + " | (c) " + dateY + " Starteed S.r.l. | www.starteed.com */\n"))
        .pipe(gulp.dest(distJS));

});

gulp.task('minify-css', function() {
    return gulp.src(srcCSS)
        .pipe(cssimport({
            extensions: ["css"]
        }))
        .pipe(cleancss())
        .pipe(gulp.dest(distCSS))
        .pipe(rename(appName + '.' + build + '.min.css'))
        .pipe(injectIndexCode.prepend("/*! Platform Admin v" + appVersion + " b" + build + " | (c) " + dateY + " Starteed S.r.l. | www.starteed.com */\n"))
        .pipe(gulp.dest(distCSS))
});

//#############################//
/**
 * PUBLIC / DIST
 */
//#############################//
gulp.task('minify', function() {
    return gulp.src(distAll)
        .pipe(gulp.dest(public + '/' + dist))
});

gulp.task('image', function() {
    return gulp.src(['src/img/*'])
        .pipe(gulp.dest(public + '/' + dist + '/img'));
});

//#############################//
/**
 * PUBLIC
 */
//#############################//
gulp.task('pages', function() {
    return gulp.src(['pages/**/*'])
        .pipe(gulp.dest(public + '/pages'));
});

gulp.task('libs', function() {
    return gulp.src(['libs/**/*'])
        .pipe(gulp.dest(public + '/libs'));
});


gulp.task('index', function() {
    return gulp.src('index.html').pipe(copy(public)).on('finish', function() {
        gulp.src(public + '/index.html')
            .pipe(removeIndexCode())
            .pipe(injectIndexCode.before('</head>', '\t<!--CSS Admin-->\n\t<link rel="stylesheet" href="dist/css/admin.' + build + '.min.css" />\n\n\t<!--JS Library Admin-->\n\t<script type="text/javascript" src="dist/js/admin.' + build + '.min.js"></script>\n\n'))
            .pipe(gulp.dest(public));
    });
});


//#############################//
/**
 * MANIFEST
 */
//#############################//
// gulp.task('manifest', function(done) {
//     gulp.src(['dist/**/*', 'libs/**/*'], { base: './' })
//         .pipe(gulp.dest('public/')) // copy original dist & libs to public dir
//         .pipe(rev())
//         .pipe(gulp.dest('public/')) // write rev'd dist & libs to public dir
//         .pipe(rev.manifest({
//             hash: true,
//             preferOnline: false,
//             network: ['*'],
//             filename: 'rev-manifest',
//             exclude: ['rev-manifest']
//         }))
//         .pipe(gulp.dest('public/')) // write manifest to public dir
//     done();
// });

//#############################//
/**
 * SERVE
 */
//#############################//

gulp.task('start', function() {
    return gulp.src("./")
        .pipe(webserver({
            fallback: 'index.html',
            path: '/',
            port: '4040',
            livereload: false,
            directoryListing: false,
            open: true
        }));
});

gulp.task('live', function() {
    return gulp.src("./")
        .pipe(webserver({
            fallback: 'index.html',
            path: '/',
            port: '8000',
            livereload: true,
            directoryListing: false,
            open: true
        }));
});



gulp.task('build', function(done) {
    runSequence('cleanDist', 'cleanPublic', 'minify-js', 'minify-css', 'minify', 'image', 'pages', 'libs', 'index');
    done();
});

gulp.task('serve',
    gulp.series('live', function(done) {
        done();
    })
);

gulp.task('default',
    gulp.series('start', function(done) {
        done();
    })
);