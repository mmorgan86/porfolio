const gulp = require('gulp'),
      autoprefixer = require('gulp-autoprefixer'),
      browserSync = require('browser-sync'),
      reload = browserSync.reload,
      sass = require('gulp-sass'),
      cleanCSS = require('gulp-clean-css'),
      sourcemaps = require('gulp-sourcemaps'),
      concat = require('gulp-concat'),
      imagemin = require('gulp-imagemin'),
      changed = require('gulp-changed'),
      uglify = require('gulp-uglify'),
      terser = require('gulp-terser');

const root = './',
      css = root + 'src/css/',
      js = root + 'src/js/',
      jsdist = root + 'dist/js/';
      cssdist = root + 'dist/css';

const jsWatchFiles = root + '**/*.js',
      styleWatchFiles = 'src/sass/style.scss';

let jsURL = [
  js + 'init.js',
  js + 'ie8.js',
  js + 'jquery.js',
  js + 'modernizr.custom.js',
  js + 'plugins.js',
  js + 'scripts.js'
];

let cssURL = [
  root + css + 'plugins.css',
  root + css + 'style.css',
  root + css + 'font/*'
];

let imgURL = root + 'src/img/**/*',
    imgDEST = root + 'dist/img';

function sassWrite() {
  return gulp.src(['src/sass/style.scss'])
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(sass({
    outputStyle: 'expanded'
  }).on('error', sass.logError))
  .pipe(autoprefixer('last 2 versions'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('src/css/style.css'));
}

function concatCSS() {
  return gulp.src(cssURL)
  .pipe(sourcemaps.init({loadMaps: true, largeFile: true}))
  .pipe(concat('style.min.css'))
  .pipe(cleanCSS())
  .pipe(sourcemaps.write('./maps/'))
  .pipe(gulp.dest(cssdist));
}

function javascript() {
  return gulp.src(jsURL)
  .pipe(concat('main.js'))
  .pipe(terser())
  .pipe(gulp.dest(jsdist));
}

function imgmin() {
  return gulp.src(imgURL)
  .pipe(changed(imgDEST))
  .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.jpegtran({progressive: true}),
    imagemin.optipng({optimizationLevel: 5})
  ]))
  .pipe(gulp.dest(imgDEST));
};

function resume() {
  return gulp.src('src/resume/resume.pdf')
    .pipe(gulp.dest('dist/resume'));
};

function watch() {
  browserSync.init({
    server: {
      injectChanges: true,
      baseDir: "./"
    },
    port: 3000
  });
  gulp.watch(styleWatchFiles, gulp.series(sassWrite, concatCSS));
  gulp.watch(jsURL, javascript);
  gulp.watch(imgURL, imgmin);
  gulp.watch('src/resume/resume.pdf', resume);
  gulp.watch([jsdist + 'main.js', cssdist + 'style.min.css']).on('change', reload);
}

exports.sassWrite = sassWrite;
exports.concatCSS = concatCSS;
exports.javascript = javascript;
exports.watch = watch;
exports.imgmin = imgmin;
exports.resume = resume;

const build = gulp.parallel(watch);
gulp.task('default', build);





