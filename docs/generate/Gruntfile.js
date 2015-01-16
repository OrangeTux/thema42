var path = require('path');

module.exports = function (grunt) {
    var file = grunt.option('file');

	grunt.initConfig({
        config: {
            file: file,
            path: path.dirname(file)
        },
		watch: {
            documentFiles: {
                files: ['**/*.md', '**/*.jade'],
                tasks: ['compile'],
                options: {
                    cwd: '<%= config.path %>'
                }
            },
            assets: {
                files: ['assets/**/*', 'includes/**/*'],
                tasks: ['compile']
            }
		},
		exec: {
			compile: {
				cmd: 'node compile.js <%= config.file %>'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-exec');

	grunt.registerTask('default', ['watch']);
	grunt.registerTask('compile', ['exec:compile']);
};
