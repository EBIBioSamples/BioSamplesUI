var _ = require('underscore');

module.exports = {
	template: require('./dropdown.template.html'),

	props: ["choices","text-filler"],

	data: function() {
		return {
			itemsPerPage: "" 
		};
	},
	
	ready: function() {
		this.updateItemsPerPage(this.choices[0]);
	},

	methods: {
		updateItemsPerPage: function(newValue) {
			if (_.indexOf(this.choices, newValue) >= 0) {
				console.log(newValue);
				this.itemsPerPage = newValue;
				this.$dispatch('pageItems-chosen',this.itemsPerPage);
			}
		}
	}
	
};