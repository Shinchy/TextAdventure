// GameData
// Factory used with the resource service to load in data we have from the 
// game.json file
// ...
(function(angular){

	'use strict';


	var _dataStore;

	// Loads in the JSON data file with all the commands in it,
	// this technique of creating the game allows for it to be expanded
	// much further and created a good reusable application.
	function gameData($rootScope, $http) {

		return {
			getData: function(url) {
				$http.get(url).success(function(data){
					_dataStore = data;
					$rootScope.$broadcast('LOADED', { data: data });
				});
			}
		};

	}

	
	// Module uses $rootscope
	angular.module('textAdventureApp')
		// Uses the scope file to hold information
		.factory('GameData', ['$rootScope', '$http', gameData]);


})(angular);