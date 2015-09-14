(function(){
	

	var that = new Vue({
		el:  '#samples',


		data: {
			database: [],
			sample:{},
			sortKey:'',
			searchTerm:'',
			reverse: false,
			columns: ['id','organism','name','description'],
			totalResults: 0,
			pagination: {
				pageSelection: [],
				row4Page: [25, 50, 100, 250, 500],
				nPages: 0,
				selectedRowNumber: 25,
				page: 1
			}

		},

		ready: function(){
			that = this;

			var pageItems  = this.pagination.selectedRowNumber,
				pageNumber = this.pagination.page;

			var data = {
				"rows": pageItems,
				"start": (pageNumber - 1) * pageItems
			};

			this.queryAll(data);
		},

		methods: {

			queryAll: function(pagination){
				this.$http.get("http://localhost:8080/home",pagination)
				.success(function(data){
					this.totalResults = data.response.numFound;
					pageNumber = data.response.start + 1;
					this.countPages(this.totalResults);
					this.$set("database",data.response.docs);
				})
				.error(function(data,status,response){
					console.log(status + " " + response);
				});

			},

			querySuccess: function(data) {

			},

			queryError: function(data,status,response) {

			},

			sortBy: function(name) {
				this.reverse = (name == this.sortKey) ? ! this.reverse : false;
				this.sortKey = name;
			},

			isSelected: function(value) {
				return this.pagination.selectedRowNumber == value;
			},

			getPagination: function(currVal) {
				var finalPaginationArray = [];
				var maxPages = this.pagination.nPages;
				if (maxPages < 5) {
					for(i=0; i<maxPages; i++) {
						finalPaginationArray.push(i);
					}
				} else {

					if (currVal < 5) {
						finalPaginationArray = [1,2,3,4,5,'...',maxPages];
					} else if (currVal >= 5 && currVal <= maxPages - 4) {
						finalPaginationArray = [1,'...',currVal-2,currVal-1,currVal,currVal+1,currVal+2,'...',maxPages];
					} else {
						finalPaginationArray = [1,'...',maxPages-4,maxPages-3,maxPages-2,maxPages-1,maxPages];
					}

				}

				return finalPaginationArray;
			},

			updateItemsPerPage: function(newValue) {
				if (this.pagination.selectedRowNumber != newValue ) {
					this.pagination.selectedRowNumber = newValue;
					this.movePaginationTo(1);
				}
			},

			decreasePage: function() {
				this.pagination.page <= 1 ? this.pagination.page = 1 : this.pagination.page--;
				this.movePaginationTo(this.pagination.page);
			},

			increasePage: function() {
				this.pagination.page >= this.nPages ? this.pagination.page = this.nPages : this.pagination.page++;
				this.movePaginationTo(this.pagination.page);
			},

			countPages: function (resultNum) {
				this.pagination.nPages = Math.floor(resultNum / this.pagination.selectedRowNumber);
			},

			movePaginationTo: function(newPage) {
				this.pagination.page = newPage;

				var pageItems  = this.pagination.selectedRowNumber,
					pageNumber = this.pagination.page;

				var data = {
					"rows": pageItems,
					"start": (pageNumber - 1) * pageItems
				};

				this.queryAll(data);

			}



		}
	});


})();
