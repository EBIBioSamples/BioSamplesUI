var Vue         = require('vue');
var VueRouter   = require('vue-router');
var VueResource = require('vue-resource');

// Use plugin
Vue.use(VueResource);
Vue.use(VueRouter);


// Router options - Routes
var router = new VueRouter({
	hashbang: false
});
require('./routes.js')(router);

var App = Vue.extend({});
router.start(App,"#app");

