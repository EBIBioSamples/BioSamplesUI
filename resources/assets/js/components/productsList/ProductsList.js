(function(){

	"use strict";

	var _ = require('underscore');

	module.exports = {

		template: require('./products.list.template.html'),

		props: ['filterTerm','elements']
	};
})();

