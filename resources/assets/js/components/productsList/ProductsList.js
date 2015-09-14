(function(){

	"use strict";

	var _ = require('underscore');

	var defaultOpts = 
	{
		elements: '',
		filterTerm: 'Hello'
	};

	module.exports = {

		template: require('./products.list.template.html'),

		props: ['options'],

		data: function() {
			return {
				tempOpts: {
					elements: [],
					filterTerm: ''
				}
			};
		},

		computed: {
			_options: function(){
				return _.extend(this.tempOpts,this.options);
			}
		},

		ready: function() {
			console.log(this._options);
		}
	};
})();

