(function() {
	"use strict";

	var _ = require("underscore");
	var Biosample = require('../../components/Biosample.js');

	function readFacets(facets) {
		var obj = _.create({});
		obj.keys = [];
		obj.vals = [];
		for (var i=0;i<facets.length; i = i+2) {
			if (+facets[i+1] > 0) {
				obj[facets[i]] = +facets[i+1];
				obj.keys.push(facets[i]);
				obj.vals.push(+facets[i+1]);
			}
		}
		return obj;
	}

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
				facets: {
					types: {},
					organisms: {},
					organs: {},
					test: {}
				},
				// tableColumns: ['Accession','Description','Type'],
				queryParams: {
					queryTerm: '',
					filterFields: [],
					useFuzzy: false,
					pageNumber: 0,
					samplesToRetrieve: 10,
				}
			};
		},

		components: {
			// 'biosamplesTable': require('../../components/productsTable/ProductsTable.js'),
			'biosamplesList': require('../../components/productsList/ProductsList.js'),
			'pagination': require('../../components/pagination/Pagination.js'),
			'itemsDropdown': require('../../components/itemsDropdown/ItemsDropdown.js'),
			'facet': require('../../components/facetList/FacetList.js')
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
				// var server = 'http://localhost:8080/api/query';
				var server = apiUrl + "query";

				this.$http.get(server,queryParams)
					.success(function(results){
						var resultsInfo = results.response;
						var highLights  = results.highlighting;
						var types       = results.facet_counts.facet_fields.content_type;
						var organisms   = results.facet_counts.facet_fields.organism_crt;
						var organs      = results.facet_counts.facet_fields.organ_crt;
						var docs        = resultsInfo.docs;
						var hlDocs      = this.associateHighlights(docs,highLights);

						this.queryTerm        = this.searchTerm;
						this.resultsNumber    = resultsInfo.numFound;
						this.facets.types     = readFacets(types);
						this.facets.organisms = readFacets(organisms);
						this.facets.organs    = readFacets(organs);

						var validDocs = [];

						for (var i=0, n=hlDocs.length; i<n; i++) {
							validDocs.push(new Biosample(hlDocs[i]));
						}

						this.queryResults = validDocs;
						this.biosamples = validDocs;
						console.log(this.facets.types);


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
})();