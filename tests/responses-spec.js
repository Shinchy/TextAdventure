// Check the loader is loading in the correct files
describe('Check the responses we get from the Response Controller', function(){

	// Set up the App
	beforeEach( module('textAdventureApp') );

	// Create a controller
	var MessageData;
	var mockData = 	[
		{
			"input": "look at room",
			"responses": "look",
			"current": 0
		}, 
		{
			"input": "look at me",
			"responses": "self",
			"current": 0
		},
		{
			"input": "say",
			"responses": "echo",
			"current": 0
		}
	];
	var mockResponses = [
		{
			"name": "look",
			"outputs": [
				{
					"id": 0,
					"text": "You are standing in a tall dark room..."
				}
			]
		},
		{
			"name": "self",
			"outputs": [
				{
					"id": 0,
					"text": "That's you, you are not really doing anything."
				}
			]
		},
		{
			"name": "echo",
			"outputs": [
				{
					"id": 0,
					"text": "Hello you said to yourself."
				}
			]
		}
	];

	beforeEach(inject(function(_MessageData_){
		MessageData = _MessageData_;
		MessageData.setCommands(mockData);
		MessageData.setResponses(mockResponses);
	}));





	//******** TESTS


	// Tests for the Response Controller
	it("Should echo out a message to yourself when using 'Say'", function() {
		var sentMessage = MessageData.prepMessage('Say Hello');
		expect(sentMessage.response).toEqual("Hello you said to yourself.");
	});

	it("Should describe the room when using 'Look At Room'", function() {
		var sentMessage = MessageData.prepMessage('Look at room');
		expect(sentMessage.response).toEqual("You are standing in a tall dark room...");
	});

	it("Should describe the character when using 'Look At Me'", function() {		
		var sentMessage = MessageData.prepMessage('Look at me');
		expect(sentMessage.response).toEqual("That's you, you are not really doing anything.");
	});

	
});