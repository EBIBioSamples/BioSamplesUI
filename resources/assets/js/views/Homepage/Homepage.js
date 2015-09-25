var _ = require("underscore");

module.exports = {

	template: require('./homepage.view.html'),
	
	data: function() {
		return {
			searchTerm: 'Liver',
			queryTerm:'',
			filterTerm: '',
			useFuzzy: false,
			pageNumber: 0,
			samplesToRetrieve: 10, //Need to be linked to the number of items
			resultsNumber: '',
			queryResults: {},
			biosamples: [],
			tableColumns: ['Accession','Description','Type'],
		};
	},

	components: {
		// 'biosamplesTable': require('../../components/productsTable/ProductsTable.js'),
		'biosamplesList': require('../../components/productsList/ProductsList.js'),
		'pagination': require('../../components/pagination/Pagination.js'),
		'itemsDropdown': require('../../components/itemsDropdown/ItemsDropdown.js')
	},

	ready: function() {
		// this.querySamples();
		this.registerEventHandlers();
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
					var hlDocs = this.associateHighlights(docs,highLights);

					this.queryTerm = this.searchTerm;
					this.resultsNumber = resultsInfo.numFound;
					this.queryResults = hlDocs;
					// this.biosamples = [];
					// for (var i = 0; i < hlDocs.length; i++) {
					// 	this.biosamples.push(new Biosample(hlDocs[i].accession,
					// 								   hlDocs[i].product_type,
					// 								   hlDocs[i].description,
					// 								   hlDocs[i].release_date));
					// }
					this.biosamples = hlDocs;



				})
				.error(function(data,status,response){
					console.log(status);
				});
		},

		associateHighlights: function(docs,highlights) {
			if (typeof highlights !== 'undefined' && Object.keys(highlights).length > 0) {
				for (var i = 0; i < docs.length; i++) {
					var currDoc = docs[i];
					var hlElem = highlights[currDoc.id];
					for (var el in hlElem) {
						if (hlElem.hasOwnProperty(el)) {
							currDoc[el] = hlElem[el].join("");
						}
					}
					docs[i] = currDoc;
				}
			}
			return docs;
		},

		getQueryParameters: function() {
			return {
				'term': this.searchTerm,
				'rows': this.samplesToRetrieve,
				'start': this.pageNumber,
				'fuzzy': this.useFuzzy
			};
		},

		registerEventHandlers: function() {
			this.$on('page-changed', function(newPage) {
				this.pageNumber = newPage;
				this.querySamples();
			});
			this.$on('dd-item-chosen', function(item) {
				var previousValue = this.samplesToRetrieve;
				this.samplesToRetrieve = item;
				this.pageNumber = 1;
				this.querySamples();
			});
		}
	}
};