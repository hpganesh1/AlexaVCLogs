'use strict';

	var _ = require('lodash');

	var rp = require('request-promise');

	var ENDPOINT = 'http://';

	var kcl = require('aws-kcl');


	function FAADataHelper() { }



	FAADataHelper.prototype.getLogInfo = function(duration) {

	  return this.getLogDetails(duration).then(

	    function(response) {

	      console.log('success - received log info ');

	      return response.body;

	    }

	  );

	};



	FAADataHelper.prototype.getLogDetails = function(duration) {

	  var options = {

	    method: 'GET',

	    uri: ENDPOINT + duration,

	    resolveWithFullResponse: true,

	    json: true

	  };

	  return rp(options);

	};

	FAADataHelper.prototype.formatLogInfo = function(LogInfo) {


		  if (LogInfo.count == 0) {

		    // return "Today is your Lucky Day! There are no exceptions in VC.";
				return _.template('Today is your Lucky Day! There are no exceptions in VC.')({
		    });

		  } else {

				// console.log("Ganesh *****************************************************************inside else");
					var Message ='';

					for(var i =0; i<LogInfo.Exceptions.length; i++)
					{
							// Message+=(i.toString()+'.'+ jsonMessage.Exceptions[i].Text);
							Message+=LogInfo.Exceptions[i].Text;
							if(i==LogInfo.Exceptions.length-1)
								Message+='. End of Message.';
							else
								Message+='. Next Message: '	;
					}
					console.log('Ganesh the message inside format is: '+Message);
				var elseTemplate =_.template('There are ${exCount} exceptions in the VC logs. The messages are : ${exMessage}')({

		      exCount: LogInfo.count,

		      exMessage: Message

		    });
				console.log("Ganesh Else template is:"+elseTemplate);
				return elseTemplate;

		  }

		};

	module.exports = FAADataHelper;
