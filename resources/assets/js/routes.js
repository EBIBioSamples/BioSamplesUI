(function(){
	"use strict";

	module.exports = function(router) {
		router.map({
			'/': {
		        component: require('./views/Homepage/Homepage.js')
		        // component: require('./views/NotFound/NotFound.js')
		    },
		    // '/group/:id': {
		    //     component: require('./views/Biosamples/SampleGroup.js')
		    // },
		    '/sample/:id': {
		    	component: require('./views/Biosamples/SingleBiosample.js')
		    },
		    '*': {
		    	component: require('./views/NotFound/NotFound.js')
		    }
		});
		
		router.alias({
				'/home': '/'
		});

		return router;
	};
})();
