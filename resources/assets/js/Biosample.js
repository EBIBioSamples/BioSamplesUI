(function(){
	var Biosample = function(id,type,description,release){
		var biosample = {};

		biosample.accession = id || '';
		biosample.type = type || 'biosample';
		biosample.description = description || '';
		biosample.release = release || '';

		biosample.getTitle = function() {
			return this.accession;
		};

		biosample.getType = function() {
			return this.type;
		};

		biosample.getDescription = function() {
			return this.description;
		};

		biosample.getReleaseDate = function() {
			return this.release;
		};

		biosample.getPropertiesName = function() {
			return ['Accession','Type','Description','Release Date'];
		};

		biosample.getStructuredProperties = function() {
			return {
				'Accession': this.accession,
				'Type': this.type,
				'Description': this.description,
				'Release Date': this.release
			};
		};

		return biosample;
	};

	module.exports = Biosample;
})();