const { parallel, src, dest, series } = require("gulp");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const htmlReplace = require("gulp-html-replace");
const copy = require("gulp-copy");
const cleanCss = require("gulp-clean-css");
const concatCss = require("gulp-concat-css");
const merge = require("merge-stream");
const del = require("del");

function clean() {
    return del([
        "dist/js/**",
        "dist/css/*.*",
        "dist/css/fonts/**",
        "dist/css/icons/**",
        "dist/images/**",
        "dist/html/**"
    ]);
}

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
            //.pipe(concatCss(`${key}.min.css`))
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
    return src('node_modules/bootstrap-icons/bootstrap-icons.svg')
        .pipe(dest('dist/css/icons/'));
}

function updateHtml() {
    return src('index.html')
        .pipe(htmlReplace({
            'js': ['../js/jquery.min.js', '../js/bootstrap.min.js'], 
            'css': ['../css/bootstrap.min.css', '../css/custom.css']
        }))
        .pipe(dest('dist/html'));
        
}

exports.clean = clean;
exports.copy = parallel(copyImages, copyFonts, copyIcons);
exports.minify = parallel(minifyJs, minifyCssFiles, updateHtml);
exports.build = series(this.clean, this.minify, this.copy);

exports.default = this.build;