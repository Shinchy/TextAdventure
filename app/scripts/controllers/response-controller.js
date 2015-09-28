/** 
 * ResponseController
 * Controller for setting the response that we get back from the reader
 * ... 
 * 
 * Load when the page is ready
 */ 
(function(angular){

	// A reference to the response window used by the application
	var _responseWindow = document.getElementById('game-response');

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

		    // Scroll the container into view, just used basic JS for this
		    // as there was no real need to overcomplicate things
		    setTimeout(function(){
		    	_responseWindow.scrollTop = _responseWindow.scrollHeight;
		    },500);
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