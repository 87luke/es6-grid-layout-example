var gulp = require('gulp');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var bs = require('browser-sync').create();

var path = {
	scripts: {
		dev: ['dev/module/**/*.js'],
		dist:'dist/js'
	},
	styles: {
		dev: ['dev/scss/*.scss','dev/module/**/*.scss', 'dev/scss/**/*.scss'],
		dist:'dist/css'
	},
	html: {
		dev:['dev/*.html'],
		dist:'dist'
	}
};


gulp.task('scripts', function () {
	return gulp.src(path.scripts.dev)
		.pipe(babel())
		.pipe(gulp.dest(path.scripts.dist))
});
gulp.task('scripts:watch', ['scripts'], function (done) {
	bs.reload();
	done();
});


gulp.task('styles', function () {
	return gulp.src(path.styles.dev)
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest(path.styles.dist))
});
gulp.task('styles:watch', ['styles'], function (done) {
	bs.reload();
	done();
});

gulp.task('html', function (){
	return gulp.src(path.html.dev)
		.pipe(gulp.dest(path.html.dist))
});
gulp.task('html:watch', ['html'], function (done) {
	bs.reload();
	done();
});

gulp.task('build', ['styles', 'scripts', 'html'], function (){});

gulp.task('serve', ['build'], function () {
	bs.init({
		server: {
			baseDir: "./dist"
		}
	});
	gulp.watch(path.styles.dev, ['styles:watch']);
	gulp.watch(path.scripts.dev, ['scripts:watch']);
	gulp.watch(path.html.dev, ['html:watch']);
});

gulp.task('default', ['build'], function () {});