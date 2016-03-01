(function(){
	"use strict";

	module.exports = {
		template: require('./samplespage.view.html'),
		
		data: function() {
			return {
				sortKey: '',
				reverseSort: false,
				elements: []
			};
		},

		
	
		methods: {
			sortBy: function(name) {
				this.reverseSort = (name == this.sortKey) ? ! this.reverseSort : false;
				this.sortKey = name;
			},
		}
	};
})();