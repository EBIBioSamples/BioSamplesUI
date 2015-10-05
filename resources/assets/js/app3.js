(function(global){
	"use strict";

	// Global variables
	global.apiUrl = "http://localhost:8080/api/";

	// Required
	var Vue         = require('vue');
	var VueRouter   = require('vue-router');
	var VueResource = require('vue-resource');

	// Vue Configuration
	Vue.config.debug = true;

	// Plugins
	Vue.use(VueResource);
	Vue.use(VueRouter);

	// Filters
	Vue.filter('excerpt',require('./filters/excerptFilter.js'));
	Vue.component('badge', require('./components/badge/Badge.js'));

	// Router options - Routes
	var router = new VueRouter({
		hashbang: false
	});
	require('./routes.js')(router);

	var App = Vue.extend({});
	router.start(App,"#app");


})(window);