const { parallel, src, dest } = require("gulp");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const htmlReplace = require("gulp-html-replace");
const copy = require("gulp-copy");
const cleanCss = require("gulp-clean-css");

function minifyJs() {
    return src('content/js/*.js', 'content/app-scripts/*.js')
        .pipe(uglify())
        .pipe(concat('lib.min.js'))
        .pipe(dest('dist/js/'));
}

function minifyCss() {
    return src('content/css/*.css')
        .pipe(cleanCss())
        .pipe(concat('lib.min.css'))
        .pipe(dest('dist/css/'));
}

function copyImages() {
    return src('content/images/*.*')
        .pipe(dest('dist/images/'));
}

function updateHtml() {
    return src('index.html')
        .pipe(htmlReplace({'js': '../js/lib.min.js', 'css': '../css/lib.min.css' }))
        .pipe(dest('dist/html'));
        
}

exports.default = this.minify;
exports.minify = parallel(minifyJs, minifyCss, copyImages, updateHtml);