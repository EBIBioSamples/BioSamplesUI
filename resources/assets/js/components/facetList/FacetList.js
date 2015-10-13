(function(){
	"use strict";

	module.exports = {
		template: require('./facetlist.template.html'),

		props: {
			title: {
				type: String,
				required: true
			},
			keys: {},
			values: {}
		},

		methods: {
			hasFacets: function(){
				return typeof this.keys !== 'undefined' && this.keys.length > 0;
			}
		}
	};
})();