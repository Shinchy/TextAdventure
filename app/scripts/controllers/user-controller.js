// UserController
// Controller for the user input that gets added
// ... 
// Load when the page is ready
(function(angular){

	'use strict';

	/** 
	 * The User Controller method is used for the user input and other actions
	 * It makes use of the custom service - MessageData to send the input the
	 * user has created. It is called using a simple form with an ng-submit
	 * call.
	 *
	 * @params {object} messageData - a response object from the MessageData service 
	 */ 
	function userController(messageData) {

		var _this = this;

		// Check if the user input has a match to one in the gameData storage
		// Keep a track of the current input request
		this.currentRequest = "";
		this.userCommands = [];

		/**
		 * Firstly check if this command has anything from the Game Data included within it
		 * Submit this request to the Response Controller and add it to the list of commands
		 */
		this.submitRequest = function() {
			// Check we have something in there, empty strings are falsey values :)
			if(_this.currentRequest) {
				// Send this information to the messagedata file
				messageData.prepMessage( _this.currentRequest );
				_this.userCommands.push( _this.currentRequest );
				
				// Clear out the current command
				_this.currentRequest = '';
			}
		};
	}


	/** 
	 * Assigned the scope
	 *
	 * @requires MessageData - Angular Service to pass and check messages sent to the application
	 */
	angular.module('textAdventureApp')
		.controller('UserController',['MessageData', userController]);

})(angular);