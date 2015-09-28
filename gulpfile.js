// Gulp file for campaigns
'use strict';

// The gulp task runner
var gulp 			= require('gulp');

// CSS
var sass 			= require('gulp-sass');
var prefix 			= require('gulp-autoprefixer');
// Images
var imagemin 		= require('gulp-imagemin');
// HTML Templating, I use Jade as Jade is great
var jade 			= require('gulp-jade');
var data 			= require('gulp-data');
// Javasript
var babel 			= require('gulp-babel');
var uglify			= require('gulp-uglify');
var source 			= require('vinyl-source-stream');
var buffer 			= require('vinyl-buffer');
// Browser Sync to auto refresh and keep things quick
var browserSync 	= require('browser-sync');
// Testing Items, we'll use Karma, Karma-browserify and PhantomJS
// It runs on Jasmine
var karma 			= require('karma').Server;
// General Use Packages
var path 			= require('path');
var concatinate 	= require('gulp-concat');


// Global
// Can be set either Dynamically using a date stamp or set manually by overriding the below with a string.
var _imageFolderName = 'img';
var _nodeInit = false;


// Error handling
// Add the Error to the Browser Sync message so you can see it easily
function errorLog( $err )
{
	console.log( $err );
	browserSync.notify( '<span style="file-size: 22px;">Error : ' + $err + '</span>', 10000 );
	this.emit('end');
}

// De-caching for Data files
function requireUncached( $module ) {
	delete require.cache[require.resolve( $module )];
	return require( $module );
}

// Browser Sync Server runing on default 3030 //

/*=====================================
=            Watched Tasks            =
=====================================*/

// Sass Task Runner
gulp.task('sass', function() {
	gulp.src('./app/sass/**/*.scss')
		.pipe( sass({ outputStyle: 'compressed', includePaths: ['./app/sass'] }) )
		.on('error', errorLog )
		.pipe( prefix({
			browser: ['last 2 versions']
		}))
		.pipe( gulp.dest('./client/css') )
		.pipe( browserSync.stream() );
});


// Scripts runner, converts from ES6 then compresses file
gulp.task('scripts', function() {    
    // Redesigned for Angular Modules
    gulp.src(['./app/scripts/app.js', './app/scripts/**/*.js'])
		.pipe( concatinate('app.min.js') )
		.pipe( babel() )
		.on('error', errorLog )
		.pipe( uglify() )
		.pipe( gulp.dest('./client/js') )
		.on('error', errorLog )
		.pipe( browserSync.stream() );
});


// Template language compiler for taking Jade templates and moving them over to HTML files, 
// this is an alternative to using the Jade Renderer on the Server
gulp.task('templates',function() {
	// Data for the site can be loaded via a JSON file
	gulp.src('./app/views/*.jade')
		.pipe( data(function(file){
			return requireUncached('./app/views/data/main.json');
		}))
		.on('error', errorLog )
		.pipe( jade({
			pretty: true,
		}))
		.on('error', errorLog )
		.pipe( gulp.dest('./client/') )
		.pipe( browserSync.stream() );
});


/*=========================================
=            Non Watched Tasks            =
=       all need to be self executed      =
=========================================*/
 
// Scripts runner, converts all the third party JS and CSS etc. to a single vendor based file
// then compresses file and puts it in the correct folder.
gulp.task('vendor', function() {
	
	// All the vendor JS
	gulp.src('./bower_components/**/*.min.js')
		.pipe( concatinate( 'vendor.min.js' ) )
		.pipe( uglify() )		
		.pipe( gulp.dest('./client/js') );

	// All the vendor CSS
	gulp.src('./bower_components/**/*.min.css')
		.pipe( concatinate( 'vendor.css' ) )
		.pipe( gulp.dest('./client/css') );

	gulp.src('./app/third_party/web_components/**/*')
		.pipe( gulp.dest('./client/web_components') );

});

// Clear out metadata from Photohshop Images and Shrink em' Down, has to be self exectued 
// as there are a few bugs with del and watching etc.
gulp.task('images', function() {
	// Create the new images
	gulp.src('./app/images/**/*')
		.pipe( imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}]
		}))
		.on('error', errorLog )
		.pipe(gulp.dest('./client/' + _imageFolderName + '/' ));
});




// Main task Runner for watching all the scripts, start by running through the tasks
// to ensure everything is up to date
gulp.task('watch', ['scripts','sass','templates'], function() {
	// Run the browser sync on port 3030 (no conflicts)
	browserSync.init({
		server: './client',
		port: 3030
	});
	gulp.watch( './app/**/*.scss', ['sass'] );
	gulp.watch( './app/scripts/**/*.js', ['scripts'] );
	gulp.watch( './app/**/*.jade', ['templates'] );
	gulp.watch( ['./app/**/*.json','./app/**/*.html'], ['templates'] );

});

// Setup the JS test environment with Karma, just for some Unit Tests
gulp.task('test', function(complete) {
	var karmaServer = new karma({
		configFile: __dirname + '/karma.conf.js',
		singleRun: false
	}, complete);
	karmaServer.start();
});


// Default task runner for Gulp
gulp.task('default', ['watch'], function() {
	// Start up the watch task by default
});