(function (){
	var gulp = require('gulp'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	imagemin = require('gulp-imagemin').
	notify = require('gulp-notify'),
	minifycss = require('gulp-minify-css'),
	cache = require('gulp-cache'),
	livereload = require('gulp-livereload'),
	uglify = require('gulp-uglify'),
	autoprefixer = require('gulp-autoprefixer'),
	del = require('del'),
	gulpSourceMaps = require('gulp-sourcemaps'),
	chmod = require('gulp-chmod'),
	sass = require('gulp-sass');

	//Sass Task

	gulp.task('styles', function () {
		return gulp
		.src('./styles/**/*.scss')
			.pipe(gulpSourceMaps.init())
			.pipe(sass({
				outputStyle: 'compressed',
				errLogToConsole: true
			}))
		.pipe(gulpSourceMaps.write())
		.pipe(gulp.dest('public/assets'))
	});

	// Css Dependencies

	gulp.task('css_dependencies', ['styles'], function () {
		return gulp.src(['bower_components/bootstrap/dist/css/bootstrap.css','public/assets/sass/main.css'])
		.pipe(concat('build.min.css'))
		.pipe(minifycss())
		.pipe(gulp.dest('public/assets/sass'))
		
	})
	
	// Creates Minfified Css Dependencies 
	// Will recreate this late
//	gulp.task('css_dependencies', ['styles'], function(){
//		return gulp.src(['bower_components/bootsstrap/dist/css/bootstrap.min.css','build/assets/css'] 


//	});
	
	// Concats app Js

	gulp.task('appjs', function (){
		return gulp.src(['app/main/js/config.js','app/**/js/*.js', 'app/**/js/controllers/*.js'])
		.pipe(concat('main.js'))
		.pipe(gulp.dest('public/assets/js'))
	});

	// Minify Concatination of app js

	gulp.task('appjs_min', function () {
		return gulp.src(['app/main/js/config.js','app/**/js/*.js', 'app/**/js/controllers/*.js'])
		.pipe(concat('main.js'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify().on('error', function (e) {
	        	// ouput errors in js code to the console
			console.log('\x07', e.message);
			return this.end();
		}))
		.pipe(gulp.dest('public/assets/js'))
	});

	// Creates Minified JS  Dependencies

	gulp.task('dependencies_min', function () {
		return gulp.src(['bower_components/angular/angular.min.js', 'bower_components/angular-ui-router/release/angular-ui-router.min.js','bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'])
		.pipe(concat('dependencies.min.js'))
		.pipe(gulp.dest('public/assets/js'))
	});
	
	
	// Creates JS Dependencies unminified 
	
	gulp.task('dependencies', function () {
		return gulp.src(['bower_components/angular/angular.js', 'bower_components/angular-ui-router/release/angular-ui-router.js','bower_components/angular-bootstrap/ui-bootstrap-tpls.js'])
		.pipe(concat('dependencies.js'))
		.pipe(gulp.dest('public/assets/js'))
	});
	
	// Combines Minified js files together

	gulp.task('minifiedjs', ['dependencies_min','appjs_min'], function (){
		return gulp.src(['public/assets/js/dependencies.min.js','public/assets/js/main.min.js'])
		.pipe(concat('build.min.js'))
		.pipe(gulp.dest('public/assets/js'))
	});
	
	gulp.task('unminifiedjs',['dependencies','appjs'], function (){
		return gulp.src(['public/assets/js/dependencies.js','public/assets/js/main.js'])
		.pipe(concat('build.js'))
		.pipe(gulp.dest('public/assets/js'))
	});

	// Gulp image compression task

	gulp.task('images', function (){
		return gulp.src('img/**/*')
			.pipe(chmod(755))
			.pipe(imagemin({
				optimizationLevel:5,
				progressive: true,
				interlaced: true
			}))
			.pipe(gulp.dest('public/assets/img'))
	});

	// Destroys all changes and makes new ones

	gulp.task('clean', function(callback) {
		del(['public/*'], callback)
	});

	// Gulp watch files 

	gulp.task('watch', function(){
		
		// Watch .scss files
		gulp.watch('styles/**/*.scss', ['styles']);

		// Watch image files
		gulp.watch('img/**/*', ['images']);
		
		// watches App js files
		gulp.watch('app/**/js/*.js', ['minifiedjs','unminifiedjs']);

		// Create Live Reload Server
		livereload.listen();

		// Watch any files in their folder and reload on change

		gulp.watch(['styles/**', 'img/**/*', 'app/**/js/*.js']).on('change', livereload.changed);
	
	});

	// Default Gulp run 

	gulp.task('default', ['clean'], function (){
		gulp.start('css_dependencies', 'images', 'minifiedjs','unminifiedjs', 'watch')
	});
}());
