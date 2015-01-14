module.exports = function (grunt) {
	grunt.initConfig({
		watch: {
			files: ['*.html', 'assets/**/*.css', 'chapters/**/*.md', 'chapters/**/*.jade'],
			tasks: ['compile']
		},
		exec: {
			wkhtmltopdf: {
				cmd: './bin/compile.sh'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-exec');

	grunt.registerTask('default', ['watch']);
	grunt.registerTask('compile', ['exec:wkhtmltopdf']);
};
