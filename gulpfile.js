var elixir = require('laravel-elixir');

// require('laravel-elixir-browser-sync-simple');
require('laravel-elixir-vueify');


elixir(function(mix) {
	mix.browserSync({
	      port: 9000,
	      proxy: '',
	      server: {
	      	baseDir: "public",
	      	directory: true,
	      },
	      open: false,
	      files: "public/**/*"
	    })
	 	.sass('main_samelf.scss')
	 	.browserify('searchComponents.js')
});

