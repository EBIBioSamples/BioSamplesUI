var Vue = require('vue');
var Biosample = require('./Biosample.js');
var _ = require('underscore');
Vue.use(require('vue-resource'));

new Vue ({
	el: "#samples",

	data: {
		searchTerm: 'Liver',
		queryTerm:'',
		filterTerm: '',
		pageNumber: 0,
		samplesToRetrieve: 10, //Need to be linked to the number of items
		resultsNumber: '',
		queryResults: {},
		biosamples: [],
		tableColumns: ['Accession','Description','Type'],
		// listOptions: {
		// 	filterTerm: '',
		// 	elements: []
		// }
	},

	components: {
		'results': require('./views/table.js'),
		'biosamplesTable': require('./components/productsTable/ProductsTable.js'),
		'biosamplesList': require('./components/productsList/ProductsList.js')		
		// 'pagination': require('./components/pagination/Pagination.js'),
	},

	ready: function() {
		this.querySamples();
	},

	methods: {
		querySamples: function(e) {
			if (e !== undefined) {
				e.preventDefault();
			}

			var queryParams = this.getQueryParameters();
			var server = 'http://localhost:8080/home/query';

			this.$http.get(server,queryParams)
				.success(function(results){
					var resultsInfo = results.response;
					var highLights = results.highlighting;
					var docs = resultsInfo.docs;

					this.queryTerm = this.searchTerm;
					this.resultsNumber = resultsInfo.numFound;
					this.queryResults = docs;
					this.biosamples = [];
					for (var i= 0; i<docs.length;i++) {
						this.biosamples.push(new Biosample(docs[i].accession,
													   docs[i].product_type,
													   docs[i].description,
													   docs[i].release_date));
					}

					// this.listOptions.elements = this.biosamples;


				})
				.error(function(data,status,response){
					console.log(status);
				});
		},

		getQueryParameters: function() {
			return {
				'term': this.searchTerm,
				'rows': this.samplesToRetrieve,
				'start': this.pageNumber
			};
		}
	}
});
