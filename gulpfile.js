//モジュールの読込
var gulp = require('gulp');
var pug = require('gulp-pug');
var rename = require('gulp-rename');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var $ = require('gulp-load-plugins')();

// 各種設定
var DIR = {
  PATH: '',
  SRC: 'src',
  DEST: 'dst',
  BUILD: 'build'
};

var pugConf = {
  src: [
    DIR.SRC + '/html/*.pug',
    '!' + DIR.SRC + '/html/_**/*.pug',
    '!' + DIR.SRC + '/html/_*.pug'
  ],
  dest: DIR.DEST,
  opts: {
    pretty: true
  }
};

// pugコンパイルタスク
gulp.task('pug-compile', function() {
  return gulp.src(pugConf.src)
    .pipe(pug({
      pretty: true,
    }))
    .pipe(rename({
      extname: '.php'
    }))
    .pipe(gulp.dest(pugConf.dest));
});

gulp.task('browser-sync', function() {
  browserSync({
    notify: false,
    proxy:"192.168.33.10",
    // server: {
    //   baseDir: 'dst',
    // },
  });
});

gulp.task('watch', function() {
  gulp.watch('./src/**/*.pug', ['pug-compile', reload]);
});

gulp.task('default', ['browser-sync', 'watch', 'pug-compile'], function() {

});
