/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import stylelint from '@ronilaukkarinen/gulp-stylelint';
import pug from 'gulp-pug';
import pugLinter from 'gulp-pug-linter';
import htmlMin from 'gulp-html-minifier-terser';
import svgSprite from 'gulp-svg-sprite';
import { deleteAsync } from 'del';
import browserSync from 'browser-sync';
import postcss from 'gulp-postcss';
import csso from 'postcss-csso';
import autoprefixer from 'autoprefixer';
import eslint from 'gulp-eslint-new';
import terser from 'gulp-terser';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';

const browser = browserSync.create();
const sass = gulpSass(dartSass);

// CSS
function lintSass() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(stylelint({
      configFile: './.stylelintrc.cjs',
      failAfterError: true,
      reporters: [
        { formatter: 'string', console: true },
      ],
      fix: true,
    }));
}

function compileScss() {
  return gulp.src('src/scss/**/*.scss', { sourcemaps: true })
    .pipe(sass({
      outputStyle: 'compressed', // compressed | expanded
    }))
    .pipe(rename((path) => {
      // eslint-disable-next-line no-param-reassign
      path.extname = '.min.css';
    }))
    .pipe(gulp.dest('build/css/', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

function postCSS() {
  return gulp.src('build/css/*.css')
    .pipe(postcss([
      autoprefixer(),
      csso(),
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(browser.stream());
}

// HTML
function lintPug() {
  return gulp.src('src/pug/**/*.pug')
    .pipe(pugLinter({
      reporter: 'puglint-stylish',
      failAfterError: true,
    }));
}

function compilePug() {
  return gulp.src('src/pug/pages/*.pug')
    .pipe(pug({
      pretty: false, // true | false
      doctype: 'html',
    }))
    .pipe(gulp.dest('build/'))
    .pipe(browser.stream());
}

function optimizeHTML() {
  return gulp.src('build/*.html')
    .pipe(htmlMin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

// Javascript
function lintJS() {
  return gulp.src('src/js/**/*.js')
    .pipe(eslint({
      fix: true,
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function optimizeJS() {
  return gulp.src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('build/js'))
    .pipe(browser.stream());
}

// SVG
function makeSprite() {
  return gulp.src([
    'src/img/icons/*.svg',
  ])
    .pipe(svgSprite({
      mode: {
        symbol: {
          dest: '',
          sprite: 'sprite.svg',
          inline: true,
        },
      },
    }))
    .pipe(gulp.dest('build/img/icons'));
}

// Copy resources
function copyImages() {
  return gulp.src([
    'src/img/**/*.{png,jpg,svg}',
    '!src/img/icons/*.svg',
  ])
    .pipe(gulp.dest('build/img'));
}

function copyMisc(cb) {
  gulp.src(['src/favicon.ico', 'src/site.webmanifest'])
    .pipe(gulp.dest('build/'))
    .pipe(browser.stream());

  gulp.src(['src/vendor/**'])
    .pipe(gulp.dest('build/vendor'))
    .pipe(browser.stream());

  gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('build/fonts/'))
    .pipe(browser.stream());

  cb();
}

// Clean
function clean() {
  return deleteAsync(['build']);
}

// Server
function browsersync() {
  browser.init({
    server: {
      baseDir: 'build',
    },
    cors: true,
    notify: false,
    open: false,
  });
}

function watcher(cb) {
  gulp.watch('src/pug/**/*.pug', gulp.series(lintPug, compilePug));
  gulp.watch('src/scss/**/*.scss', gulp.series(lintSass, compileScss));
  gulp.watch(
    [
      'src/favicon.ico',
      'src/manifest.webmanifest',
      'src/fonts/**/*.{woff,woff2}',
      'src/vendor',
    ],
    copyMisc,
  );
  gulp.watch('src/js/**/*.js', gulp.series(lintJS, optimizeJS));

  cb();
}

// ---------------------------------------------------------------------
// | Tasks                                                             |
// ---------------------------------------------------------------------

// Server
export const server = gulp.series(browsersync);

// Build
export const build = gulp.series(
  clean,
  gulp.parallel(
    gulp.series(lintPug, compilePug, optimizeHTML),
    gulp.series(lintSass, compileScss, postCSS),
    gulp.series(lintJS, optimizeJS),
    copyImages,
    copyMisc,
    makeSprite,
  ),
);

// Default
export default gulp.series(
  clean,
  gulp.parallel(
    gulp.series(lintPug, compilePug),
    gulp.series(lintSass, compileScss),
    gulp.series(lintJS, optimizeJS),
    copyImages,
    copyMisc,
    makeSprite,
  ),
  gulp.series(
    watcher,
    browsersync,
  ),
);
