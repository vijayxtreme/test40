var gulp = require('gulp'),
	sass = require('gulp-sass'),
	livereload = require('gulp-livereload');

gulp.task('styles', function(){
	gulp.src('sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./css/'));
});

gulp.task('html', function() {
    return gulp.src([
        './index.html'
    ])
    .pipe(livereload());
});

//Watch task
gulp.task('default',function() {
    livereload.listen();
    gulp.watch('sass/**/*.scss',['styles']);
    gulp.watch('./index.html', ['html']);
});