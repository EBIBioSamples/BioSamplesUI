(function(){
	"use strict";

	module.exports = {
		template: require('./home.view.html') ,
		
		data: function() {
			return {
				queryTerm: ''	
			};
		}	
	};
})();