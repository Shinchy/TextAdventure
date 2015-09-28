/**
 *
 * This is the source code for a simple Text Adventure Game.
 * It has been created with Angular JS
 *  
 * Since it's Angular JS I've used a concat system with dependancy injection instead
 * of modules. I've cut down on ES6 features to ensure it's easier to understand.
 *
 * The App JS file for the AngularJS application, run everything from this point onward.
 *
 * @author Shaun Hinchy
 *
 *
 * Load when the page is ready...
 * We wrap the Angular functions in an IIFE to ensure it doesn't follow the bad habbit of 
 * flooding the global scope with tons of variables, this is added throughout.
 * It also allows for composition when expanding out the project, as well as multiple 
 * module loading if you use similar functions in your app. However in this app we're not
 * using such techniques.
*/

(function(angular){
	
	// Private variables and settings
	var _dataFileURL = '/data/adventure.json';

	/**
	 *	The applications init function, this is the first thing called
	 *	it loads in the JSON data file of the application.
	 *	
	 *	@param {string} dataCtrl - the URL of the games data .JSON file
	 */
	function init(dataCtrl) {
		dataCtrl.getData( _dataFileURL );
	}


	/**
	 * Angular Default App
	 * Starts out by calling the init function when ready
	 *
	 * @requires GameData - The loader service for the game
	 */
	angular.module('textAdventureApp',[])
		// Upon load
		.run(['GameData', init]);



	// An area for any functions that act outside of angular
	// ...
	

})(angular);
