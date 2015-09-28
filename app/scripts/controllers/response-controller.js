/** 
 * ResponseController
 * Controller for setting the response that we get back from the reader
 * ... 
 * 
 * Load when the page is ready
 */ 
(function(angular){

	/**
	 * Default Method to handle the response that gets given to the controller
	 * 
	 * @param  {object} $scope - Angulars Scope object
	 * @param  {object} messageData - Angular Service messageData
	 * @return {undefined}
	 */
	function responseController($scope, messageData) {
		var _this = this;

		// This should change once our data storage has been called
		this.loaded = false;

		// Set the first item in our list to be the text for the introduction
		this.results = [];

		/**
		 * This listens to the global object and checks if our messageData service triggers
		 * a new event. If it does we take the new item and add it to our list of calls
		 */
		$scope.$on('MESSAGE', function(e, messageObj) {		    
		    var newCommand = {
		    	command: messageObj.command,
		    	userMessage: messageObj.userMessage,
		    	response: messageObj.response,
		    	state: messageObj.state
		    };
		    _this.results.push(newCommand);
		});

		/**
		 * This listens for the Loaded event, if the page calls this (after an Ajax call)
		 * then the app will hide the loading message and show the responses instead
		 */
		$scope.$on('LOADED', function(e) {
			_this.loaded = true;
		});
	}


	/**
	 * Assign this to the module
	 *
	 * @requires $scope - The angular scope
	 * @requires MessageData - Angular Service to pass and check messages sent to the application
	 */ 
	angular.module('textAdventureApp')
		.controller('ResponseController', ['$scope', 'MessageData', responseController]);

})(angular);