## ANGULAR - TEXT ADVENTURE

A simple text adventure built with AngularJS and Javascript. I banged this up in a night, so don't expect beautifully crafted adventure.

It makes use of Controllers over directives as the App didn't feel large enough to warrent them.
Just in case you were wondering where they may be.

# Rules

There are 3 basic commands laid out

- say (followed by what you want to say)
- look at room
- look at me

These will all give you a basic response, if you want to add more functionality just add it to the data file (/data/adventure.json). In there you can update all the information the game will give out and update the content to increase.


# Tests

Tests are written in [Jasmine](http://jasmine.github.io/) and ran through [Karma](http://http://karma-runner.github.io/)

I use a global Karma installation which runs the tests 'Karma Start', there are only some very very basic tests in there. These are simply designed to check that the Data Service is working as expected.


# How to get it up and Runing
- `npm install`
- `gulp watch`

This will open up browser sync and set up a localhost server to ensure any domain issues work.

# Notes

If you want to use this code, go wild it's all yours. (╯°□°）╯︵ ┻━┻