var gulp = require("gulp"),
    sass = require("gulp-sass"),
    browserSync = require("browser-sync"),
    config = require("./gulpconfig")();

gulp.task("default", ["browserSync"], function(){
  gulp.watch(config.sass, ["sass"]);
});

gulp.task("browserSync", function() {
  browserSync({
    files: config.browserSyncFiles,
    server: {
      baseDir: config.root
    },
    port: config.browserSyncPort,
    browser: config.browsers
  });
});

gulp.task("sass", function(){
  gulp.src(config.sass)
      .pipe(sass().on("error", sass.logError))
      .pipe(gulp.dest(config.css));
});