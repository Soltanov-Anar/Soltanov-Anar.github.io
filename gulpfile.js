const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

//Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });
    gulp.watch('index.html').on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src('src/scss/**/*.+(scss|sass)')
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename({
                prefix: '',
                suffix: '.min',
            }))
            .pipe(autoprefixer({
                overrideBrowserslist: ['last 2 versions'],
                cascade: false
            }))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest('dist/css'))
            .pipe(browserSync.stream());
        })

gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.+(scss|sass|css)', gulp.parallel('styles'));
    gulp.watch('*.html').on('change', gulp.parallel('html'));
    gulp.watch('src/js/*.js', gulp.parallel('scripts'));
});

gulp.task('html', function() {
    return gulp.src('*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('scripts', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('dist/js'));
});

gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('icons', function() {
    return gulp.src('src/icons/**/*')
        .pipe(gulp.dest('dist/icons/'));
});

gulp.task('maller', function() {
    return gulp.src('src/maller/**/*')
        .pipe(gulp.dest('dist/maller'));
});

gulp.task('img', function() {
    return gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'fonts', 'icons', 'maller', 'html', 'img'));