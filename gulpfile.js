var _           = require('lodash');
var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var cp          = require('child_process');
var harp        = require('harp');
var harpConfig  = require('./harp.json');
var jimp        = require('gulp-jimp');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');

/**
 * Serve the Harp Site
 */
gulp.task('serve', function (done) {
  harp.server('.', {
    port: 3330
  }, function () {
    browserSync({
      proxy: "localhost:3330",
      open: false,
      port: 3333,
      ui: {
        port: 3335
      }
    });
    /**
     * Watch for scss changes, tell BrowserSync to refresh main.css
     */
    gulp.watch(["public/**/*.scss"], function () {
      reload("www/css/app.css", {stream: true});
      cp.exec('harp compile . www', {stdio: 'inherit'});
    });
    /**
     * Watch for JS changes
     */
    gulp.watch(["public/js/*.js", "!public/js/*.min.js"], ['uglify'], function () {
      reload();
      cp.exec('harp compile . www', {stdio: 'inherit'});
    });
    /**
     * Watch for image changes
     */
    gulp.watch(["_posts-images/*"], ['jimp']);
    gulp.watch(["public/images/**/*"], function () {
      reload();
    });
    /**
     * Watch for all other changes, reload the whole page
     */
    gulp.watch(["public/**/*.jade", "public/**/*.json", "public/**/*.md", "public/**/*.ejs"], function () {
      reload();
      cp.exec('harp compile . www', {stdio: 'inherit'});
    });
  });
});

/**
 * Copy assets from NODE Modules
 */
gulp.task('copy-assets', function(done) {
    var assets = {
        js: [
            './node_modules/flickity/dist/flickity.pkgd.min.js'
        ],
        'css/vendors': ['./node_modules/flickity/dist/flickity.min.css']
    };
    _(assets).forEach(function (assets, type) {
       gulp.src(assets).pipe(gulp.dest('./public/'+type))
       .on('close', done);
    });
});

/**
 * Build the Harp Site
 */
gulp.task('build', ['copy-assets', 'jimp', 'uglify'], function (done) {
  cp.exec('harp compile . www', {stdio: 'inherit'})
    .on('close', done);
});

/**
 * Create responsive images with JIMP
 *
 * We divide this into several tasks
 * so we don't get re-compression artifacts
 */
gulp.task('jimp', function (done) {
    var imgSrc       = '_posts-images/*',
        imgDest      = 'public/images/posts/',
        imgQuality   = 80,
        largeWidth   = harpConfig.globals.breakpoints.large,
        regularWidth = harpConfig.globals.breakpoints.regular,
        mediumWidth  = harpConfig.globals.breakpoints.medium,
        smallWidth   = harpConfig.globals.breakpoints.small;

    // Clean destination dir
    cp.exec('rm ' + imgDest + '*', {stdio: 'inherit'});

    // Original image
    gulp.src(imgSrc)
      .pipe(gulp.dest(imgDest));

    // Large image
    gulp.src(imgSrc).pipe(jimp({
        '-large': {
            resize: { width: largeWidth, height: jimp.AUTO },
            quality: imgQuality
        }
    })).pipe(gulp.dest(imgDest));

    // Regular image
    gulp.src(imgSrc).pipe(jimp({
        '-regular': {
            resize: { width: regularWidth, height: jimp.AUTO },
            quality: imgQuality
        }
    })).pipe(gulp.dest(imgDest));

    // Medium image
    gulp.src(imgSrc).pipe(jimp({
        '-medium': {
            resize: { width: mediumWidth, height: jimp.AUTO },
            quality: imgQuality
        }
    })).pipe(gulp.dest(imgDest));

    // Small image
    gulp.src(imgSrc).pipe(jimp({
        '-small': {
            resize: { width: smallWidth, height: jimp.AUTO },
            quality: imgQuality
        }
    })).pipe(gulp.dest(imgDest)).on('end', done);
});

gulp.task('uglify', function (done) {
  gulp.src(['public/jquery/jquery-1.10.2.min.js','public/js/flickity.pkgd.min.js', 'public/js/site.js']).pipe(concat('site.min.js')).pipe(uglify()).pipe(gulp.dest('public/js'));
  done();
});

/**
 * Default task, running `gulp` will fire up the Harp site,
 * launch BrowserSync & watch files.
 */
gulp.task('default', ['build', 'serve']);
