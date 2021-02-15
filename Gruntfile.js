module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	uglify: {
		my_target: {
		  files: [{
			expand: true,
			cwd: 'src/js',
			src: '**/*.js',
			dest: 'js',
			ext: '.min.js'
		  }]
		}
	  },
	cssmin: {
	  target: {
		files: [{
		  expand: true,
		  cwd: 'src/css',
		  src: ['*.css', '!*.min.css'],
		  dest: 'css',
		  ext: '.min.css'
		}]
	  }
	}

    });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', ['uglify','cssmin']);

};