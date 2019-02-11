const gulp = require('gulp');
var sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();

const distDirectory = 'dist';
const htmlBlob = 'src/*.html';
const imagesBlob = 'src/images/**';
const imagesBlob2 = 'src/img/**';
const fontsBlob = 'src/fonts/**';
const stylesBlob = 'src/css/**';
const sassBlob = 'src/scss/**';
const jsBlob = 'src/js/**';

gulp.task('default', function () {
  return runSequence('build', 'serve', 'watch');
});

gulp.task('build', function () {
  return runSequence(
    'cleanDist',
    ['processStyles', 'processHtml', 'processImages', 'processImages2', 'processFonts', 'sass', "processScripts"]
  );
});

gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: distDirectory
    }
  });

  gulp.watch(htmlBlob, function () {
    return runSequence('processHtml', 'reloadBrowser');
  });

  gulp.watch(imagesBlob, function () {
    return runSequence('processImages', 'reloadBrowser');
  });

   gulp.watch(imagesBlob, function () {
    return runSequence('processImages2', 'reloadBrowser');
  });

  gulp.watch(fontsBlob, function () {
    return runSequence('processFonts', 'reloadBrowser');
  });

  gulp.watch(stylesBlob, function () {
    return runSequence('processStyles', 'reloadBrowser');
  });
	gulp.watch(sassBlob, function () {
	   return runSequence('sass', 'reloadBrowser');
   }); 
   
   gulp.watch(jsBlob, function () {
    return runSequence('processScripts', 'reloadBrowser');
  }); 

});

gulp.task('cleanDist', function () {
  return gulp.src(distDirectory, {read: false, allowEmpty: true}).pipe(clean());
});

gulp.task('processHtml', function () {
  return gulp.src(htmlBlob)
    .pipe(gulp.dest(distDirectory));
});

gulp.task('processImages', function () {
  return gulp.src(imagesBlob)
    .pipe(gulp.dest(`${distDirectory}/images/`));
});

gulp.task('processImages2', function () {
  return gulp.src(imagesBlob2)
    .pipe(gulp.dest(`${distDirectory}/img/`));
});

gulp.task('processFonts', function () {
  return gulp.src(fontsBlob)
    .pipe(gulp.dest(`${distDirectory}/fonts/`));
});

gulp.task('processStyles', function () {
  return gulp.src(stylesBlob)
    .pipe(gulp.dest(`${distDirectory}/css`));
});

gulp.task('processScripts', function () {
  return gulp.src(jsBlob)
    .pipe(gulp.dest(`${distDirectory}/js`));
});

gulp.task('reloadBrowser', function (done) {
  browserSync.reload();
  done();
});

gulp.task('sass', function () {
  gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(`${distDirectory}/css`));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('src/scss/**/*.scss', ['sass']);
}); 