const { parallel, src, dest } = require("gulp");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const htmlReplace = require("gulp-html-replace");
const copy = require("gulp-copy");
const cleanCss = require("gulp-clean-css");
const concatCss = require("gulp-concat-css");
const merge = require("merge-stream");

function minifyJs() {
    const sourcePaths = {
        bootstrap: "node_modules/bootstrap/dist/js/*.min.js",
        lib: "content/js/*.js",
        //jquery: 'node_modules/jquery/dist/jquery.min.js'
    };

    const minifyTasks = Object.keys(sourcePaths).map((key) => {
        return src(sourcePaths[key])
            .pipe(uglify())
            .pipe(concat(`${key}.min.js`))
            .pipe(dest('dist/js/'));
    });
    
    return merge(minifyTasks);
}

function minifyCssFiles() {

    const sourcePaths = {
        bootstrap: "node_modules/bootstrap/dist/css/*.min.css",
        lib: "content/css/*.css"
    };

    const minifyTasks = Object.keys(sourcePaths).map((key) => {
        return src(sourcePaths[key])
            .pipe(concatCss(`${key}.min.css`))
            .pipe(cleanCss())
            .pipe(dest('dist/css/'));
    });

    return merge(minifyTasks);    
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
        .pipe(htmlReplace({
            'js': ['../js/jquery.min.js', '../js/bootstrap.min.js'], 
            'css': ['../css/bootstrap.min.css', '../css/lib.min.css']
        }))
        .pipe(dest('dist/html'));
        
}

exports.default = this.minify;
exports.minify = parallel(minifyJs, minifyCssFiles, copyImages, copyFonts,copyIcons, updateHtml);