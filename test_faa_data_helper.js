'use strict';

	var chai = require('chai');

	var chaiAsPromised = require('chai-as-promised');

	chai.use(chaiAsPromised);

	var expect = chai.expect;

	var FAADataHelper = require('../faa_data_helper');

	chai.config.includeStack = true;



	describe('FAADataHelper', function() {

	  var subject = new FAADataHelper();

	  var duration =100;


		describe('#formatLogInfo', function() {

	    var LogInfo = {
				'count':'3',
				'VCException':{
				  'Text':'Error trying to load module \"RuntimeModules\\ProviderReplicator.dll\", UCN.ProviderReplicator.Replicator',
				  'Message':'Could not load file or assembly \'Alachisoft.NCache.Web, Version=4.6.0.0, Culture=neutral, PublicKeyToken=cff5926ed6a53769\' or one of its dependencies. The system cannot find the file specified.'
				  }

	      };

	    context('with a status containing no exceptions', function() {

	      it('formats the LogInfo as expected', function() {

	        LogInfo.count = 0;

	        expect(subject.formatLogInfo(LogInfo)).to.eq('Today is your Lucky Day! There are no exceptions in VC.');

	      });

	    });

	    context('with a status containing exceptions', function() {

	      it('formats the LogInfo as expected', function() {

	        LogInfo.count = 3;

	        expect(subject.formatLogInfo(LogInfo)).to.eq(

	          'There are 3 exceptions in the VC logs. The messages are : Error trying to load module \"RuntimeModules\\ProviderReplicator.dll\", UCN.ProviderReplicator.Replicator'

	        );

	      });

	    });

	  });

	});
