const { src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

// Sass Task
function scssTask(){
     return src('app/scss/style.scss', { sourcemaps: true})
     .pipe(sass())
     .pipe(postcss([cssnano()]))
     .pipe(dest('dist', { sourcemaps: '.'}));
}

// JavaScript Task
function jsTask(){
    return src('app/js/script.js', {sourcemaps: true})
     .pipe(terser())
     .pipe(dest('dist', { sourcemaps: '.'}));
}
// Browsersync Tasks
function BrowsersyncServe(cb){
    browsersync.init({
        server: {
            baseDir: '.'
        }
    });
    cb();
}

function BrowsersyncReload(cb){
    browsersync.reload();
    cb();   
}

// Watch Task
function watchTask(){
    watch('*.html', BrowsersyncReload);
    watch(['app/scss/**/*.scss', 'app/js/**/*.js'], series(scssTask, jsTask, BrowsersyncReload));
}

// Default Gulp Task
exports.default = series(
    scssTask,
    jsTask,
    BrowsersyncServe,
    watchTask
);
