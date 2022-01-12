const { parallel, src, dest } = require("gulp");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const htmlReplace = require("gulp-html-replace");
const copy = require("gulp-copy");
const cleanCss = require("gulp-clean-css");
const concatCss = require("gulp-concat-css");

function minifyJs() {
    let sources = src(
        'content/js/*.js',
        //'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
    );

    return sources
        .pipe(uglify())
        .pipe(concat('lib.min.js'))
        .pipe(dest('dist/js/'));
}

function minifyCss() {
    let sources = src(
        'node_modules/bootstrap/dist/css/bootstrap.css',
        'content/css/custom.css'
    );

    return sources
        .pipe(cleanCss())
        .pipe(concatCss('dist/lib.min.css'))
        .pipe(dest('dist/css/'));
}

function copyImages() {
    return src('content/images/*.*')
        .pipe(dest('dist/images/'));
}

function copyFonts() {
    return src('node_modules/bootstrap-icons/font/fonts/*')
        .pipe(dest('dist/css/fonts/'));
}

function copyIcons() {
    return src('node_modules/bootstrap-icons/icons/*')
        .pipe(dest('dist/css/icons/'));
}

function updateHtml() {
    return src('index.html')
        .pipe(htmlReplace({'js': '../js/lib.min.js', 'css': '../css/lib.min.css' }))
        .pipe(dest('dist/html'));
        
}

exports.default = this.minify;
exports.minify = parallel(minifyJs, minifyCss, copyImages, copyFonts,copyIcons, updateHtml);