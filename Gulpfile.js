var gulp = require("gulp");
var plumber = require('gulp-plumber');
var babel = require("gulp-babel");
var uglify = require('gulp-uglify');

gulp.task("build", function () {
	var result = gulp.src("src/**/*.js")
		.pipe(plumber())
	    .pipe(babel({
            presets: ['es2015']
        }))
	    //.pipe(uglify())
	    .pipe(gulp.dest("dist")); 
});

gulp.task("default", ['build'], function () {
	// watch for JS changes
	gulp.watch('src/**/*.js', function() {
		gulp.run('build');
	});
});