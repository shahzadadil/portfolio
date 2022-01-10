const { parallel, src, dest } = require("gulp");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const htmlReplace = require("gulp-html-replace");
const copy = require("gulp-copy");

function minifyJs() {
    return src('content/js/*.js', 'content/app-scripts/*.js')
        .pipe(uglify())
        .pipe(concat('lib.min.js'))
        .pipe(dest('dist/js/'));
}

function updateHtml() {
    return src('index.html')
        .pipe(htmlReplace({js: 'test', css: 'test'}))
        .pipe(dest('dist/html'));
        
}

function minifyCss() {
    
}

exports.default = parallel(minifyJs, minifyCss);
exports.minify = parallel(minifyJs, minifyCss, updateHtml);