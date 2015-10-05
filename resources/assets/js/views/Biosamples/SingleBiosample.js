(function(){
	"use strict";

	function publicProperties(propertyList,unwantedProperties) {

		var allProperties = propertyList,
			filterArray = [];
		
		var getProperties = function() {
			if (filterArray.length === 0) {
				filterArray = allProperties;
				var what, L=unwantedProperties.length, ax;
				while(L && filterArray.length) {
					what = unwantedProperties[--L];
					while( (ax = allProperties.indexOf(what)) !== -1) {
						filterArray.splice(ax,1);
					}
				}
			}
			return filterArray;
		};

		return {
			get: getProperties
		};


	}

	module.exports = {
		template: require("./biosample.view.html"),
		// template: "<p>Hello sample</p>",

		data: function() {
			return {
				sample: '',
				sampleProperties: ''
			};
		},

		ready: function() {
			this.querySample(this.$route.params.id);
		},

		methods: {
			querySample: function(id) {
				var server = 'http://localhost:8080/api/query/'+id;

				this.$http.get(server)
					.success(function(results){
						var unwantedProperties = ['_version_','format_version'];
						var resultsInfo = results.response;
						var docs = resultsInfo.docs;
						if (docs.length > 0) {
							var sample = docs[0];
							var allProperties = [];
							for(var propertyName in sample) {
								if (sample.hasOwnProperty(propertyName)) {
									allProperties.push(propertyName);
								}
							}
							var pubProp = publicProperties(allProperties,unwantedProperties);
							this.sampleProperties = pubProp.get();
							this.sample = sample;
						}
					})
					.error(function(data,status,response){
						console.log(status);
					});
			},
			test: function() {
				console.log(this.querySample(0));
			}
		}
	};
})();