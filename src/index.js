'use strict';
const Alexa = require('alexa-sdk');

const APP_ID = 'amzn1.ask.skill.38be72ca-9b48-44d3-9947-d6b6860b96a6';
const SKILL_NAME = 'Sam\'s Bed';
const HELP_MESSAGE = 'You can say tell me a space fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';
const GET_FACT_MESSAGE = 'Something ';
const END_OF_FACT_MESSAGE = 'You\'ve heard just about everything that gets Sam out of bed in the morning. Would you like to hear them again?';
var factIndex = 0;
var factEnd = false;

const data = [
    'different.',
    'creative.',
    'unique.',
    'challenging.',
    'that will have an impact.',
    'fun.'
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

function setFactIndex() {
    if(factIndex > data.length) {
        factIndex = 0;
    }

    factIndex++;
}

const handlers = {
    'LaunchRequest': function () {
        factIndex = 0;
        this.emit('WhatGetsMeOutOfBedIntent');
    },
    'WhatGetsMeOutOfBedIntent': function () {
        const factArr = data;
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + randomFact;

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput);
        setFactIndex();
        this.emit(':responseReady');
    },
    'RestIntent': function () {
        const factArr = data;
        var speechOutput = '';

        for(let i = factIndex; i <= factArr.length; i++) {
            speechOutput += GET_FACT_MESSAGE + factArr[i];
        }

        this.response.cardRenderer(SKILL_NAME, 'All facts');
        this.response.speak(speechOutput);
        factIndex = factArr.length + 1;
        setFactIndex();
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};