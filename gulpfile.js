var elixir = require('laravel-elixir');

require('laravel-elixir-browser-sync-simple');

elixir(function(mix) {
	mix.browserSync({
	      port: 9000,
	      server: {
	      	baseDir: "public",
	      	directory: true,
	      },
	      open: false
	    })
	 	.sass('main.scss')
	 	.browserify('app2.js')
	 	.scripts('vue.js','public/js/all_vue.js');
});

