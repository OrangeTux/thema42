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
                tasks: ['assets', 'compile']
            }
        },
        exec: {
            compile: {
                cmd: 'node compile.js <%= config.file %>'
            }
        },
        stylus: {
            assets: {
                files: {
                    'assets/style.css': 'assets/style.styl'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-stylus');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('assets' , ['stylus']);
    grunt.registerTask('compile', ['exec:compile']);
};
