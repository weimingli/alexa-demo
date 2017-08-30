'use strict';
var AWS = require('aws-sdk');
var Alexa = require("alexa-sdk");
AWS.config.update({region: 'us-east-1'});
var alexa;

var states = {
    MORNING: "_MORNING",
    NIGHT: "_NIGHT",
    BACKHOME: "_BACKHOME"
};

exports.handler = function(event, context, callback) {
    
    alexa = Alexa.handler(event, context);
    alexa.appId = 'amzn1.ask.skill.47e84e6c-e6a8-469b-ab82-186ab718ce39';
    alexa.registerHandlers(handlers, morningHandlers, backHomeHandlers, nightHandlers);
    alexa.execute();
};

var morningHandlers = Alexa.CreateStateHandler(states.MORNING,{
    'GoodMorning': function () {
        this.emit(':ask', 'Good morning. Did you sleep well?');
    },    
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', 'Hello there. What do you want to know?');
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Bye for now!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Bye for now!');
    },
    'Unhandled': function() {
        this.emit(':tell', 'ok. Hurry up and get dressed. It\'s time to go to school now!');
    }   
});

var backHomeHandlers = Alexa.CreateStateHandler(states.BACKHOME,{
    'WelcomeBackHome': function() {
        this.emit(':ask', 'How did it go today?');
    },
    'NotFinishedHomeWork': function() {
        this.emit(':ask', 'Oh, sorry you can not go out now. Mum will get angry.');
    },
    'FinishedHomeWork': function() {
        this.emit(':ask', 'Great! You did a good job!');
    },
    'ThankYou': function() {
        this.emit('AMAZON.StopIntent');
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', 'Hello there. What do you want to know?');
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Bye for now!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Bye for now!');
    },
    "Unhandled": function() {
        this.emitWithState("WelcomeBackHome");
    }
});

var nightHandlers = Alexa.CreateStateHandler(states.NIGHT,{
    'GoodNight': function() {
        this.emit(':tell', 'Good night. Have a nice dream');
    },
    'ThankYou': function() {
        this.emit('AMAZON.StopIntent');
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', 'Hello there. What do you want to know?');
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Bye for now!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Bye for now!');
    },
    "Unhandled": function() {
        this.emitWithState("GoodNight");
    }
});

var handlers = {
    'LaunchRequest': function () {
        this.handler.state = "";
        this.emit(':ask', 'Hello, Armstrong.');
    },
    'GoodMorning': function () {
        this.handler.state = states.MORNING;
        this.emitWithState('GoodMorning');
    },
    'GoodNight': function () {
        this.handler.state = states.NIGHT;
        this.emitWithState('GoodNight');
    },
    'WelcomeBackHome': function () {
        this.handler.state = states.BACKHOME;
        this.emitWithState('WelcomeBackHome');
    },
    'Hello': function() {
        this.emit('AMAZON.HelpIntent');
    },
    'Bye': function() {
        this.emit('AMAZON.StopIntent');
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', 'Hello there. What do you want to know?');
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Bye for now!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Bye for now!');
    },
    'Unhandled': function() {
        this.emit(':ask', 'Sorry, I didn\'t get that.', 'Try asking me something else.');
    }    
};
