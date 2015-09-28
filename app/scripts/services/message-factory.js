// MessageData
// Service used for passing around the data within the application
// ...
(function(angular){

	'use strict';

	var _dataStored, // All the data that is recieved
		_commands, // These are the commands a user can use
		_responses; // Here are the reponses the application gives

	/**
	 * A factory service to create a communication between the response
	 * and the users input. This is where all the data checking happens, 
	 * we ensure the user input is correct and that it's alligned with what 
	 * we have stored. If we find a user has put in place a correct statement 
	 * we can then emit that to the listeners to add this in.
	 *
	 * @params {object} $rootScope - the Angular root scope object
	 */
	function messageData($rootScope) {

		var messenger = {
			prepMessage: function(msg) {
				
				// Set the default values
				var response = 'Nothing happens...';
				var state = false;

				// Check if the message is good to go or not
				for(var i = 0; i < _commands.length; i++) {
					if(msg.toLowerCase().substring(0, _commands[i].input.length) === _commands[i].input) {
						// it's a command alright ...
						state = true;
						console.log(_responses);
						// A great good case for the ES6 array.find function, but I'll stick with the old way for this
						for(var j = 0; j < _responses.length; j++) {
							if( _responses[j].name === _commands[i].responses ) {
								// Set the response to what matches up with the data
								response = _responses[j].outputs[parseInt(_commands[i].current)].text;
								// Replace variables we add to the Data Strings
								response = response.replace('{{message}}', msg.replace('Say ','') );
							}
						}
					}
				}


				// Create an answer object to hold the response
				var answerObj = {
					command: true,
					userMessage: msg,
					response: response,
					state: state
				};
				
				// Call this object event out
				this.sendMessage( answerObj );

				// Always return this object, this helps various parts of the application,
				// mainly the test suites 
				return answerObj;
			},
			sendMessage: function( callObj ) {
				$rootScope.$broadcast('MESSAGE', callObj);

				// Clear out the old message, it's no longer needed
				this.message = false;
			},
			// Set the command array we can search through
			setCommands: function(data) {
				_commands = data;
			},
			// Set the reponses array we can search though
			setResponses: function(data) {
				_responses = data;
			}
		};


		/**
		 * This listens for the Loaded event, if the page calls this (after an Ajax call)
		 * then the app will hide the loading message and show the responses instead
		 */
		$rootScope.$on('LOADED', function(e, data) {
			data = data.data || data;

			// Assign the data variable used in here
			_dataStored = data;
			// Just a quick reference
			messenger.setCommands( data.commands );
			messenger.setResponses( data.responses );

			// Set this to the checker for the messages

			// prepate the intro
			messenger.prepMessage( data.intro || 'Hello...' );
		});

		// Returns the messanger object from this factory
		return messenger;
	}
	
	/**
	 * Module uses $rootscope
	 *
	 * @requires MessageData - Angular Service to pass and check messages sent to the application
	 */
	angular.module('textAdventureApp')
		.factory('MessageData', ['$rootScope', messageData]);


})(angular);