'use strict';

module.change_code = 1;

var _ = require('lodash');

var Alexa = require('alexa-app');

var app = new Alexa.app('LogReader');

var FAADataHelper = require('./faa_data_helper');

app.launch(function(req, res) {

  var prompt = 'For exception Log information, please tell the minutes you want me to look back into. For example, say, 5, to look for exceptions in the last 5 minutes. ';

  res.say(prompt).reprompt(prompt).shouldEndSession(false);

});

app.intent('LogReader', {

	  'slots': {

	    'DURATION': 'AMAZON.NUMBER'

	  },

	  'utterances': ['{|exception} {|Log|info} {|for} {-|DURATION} {minutes}']

	},

	  function(req, res) {

	    //get the slot

	    var duration = req.slot('DURATION');

	    var reprompt = 'Tell me the duration.';

	if (_.isEmpty(duration)) {

	      var prompt = 'I didn\'t hear the duration. Tell me a duration.';

	      res.say(prompt).reprompt(reprompt).shouldEndSession(false);

	      return true;

	    } else {

	      var faaHelper = new FAADataHelper();

	   faaHelper.getLogInfo(duration).then(function(LogInfo) {

	        console.log('Ganesh: LogInfo is : '+LogInfo.count);

	        res.say(faaHelper.formatLogInfo(LogInfo)).send();

	      }).catch(function(err) {

	        console.log('Ganesh: Err Code in get log info is : '+err.statusCode);

	        var prompt = 'I do not have any data for the last '+duration+' minutes.';

	        res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();

	      });

	      return false;

	    }

	  }

	);

module.exports = app;
