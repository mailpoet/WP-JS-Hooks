/* jshint node:true */

module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            src: 'src/event-manager.js',
            gruntfile: 'Gruntfile.js'
        },
        uglify: {
            options: {
                banner: '/**\n * <%= pkg.name %>\n * @version <%= pkg.version %>\n * @author <%= pkg.author %>\n */'
            },
            build: {
                src: 'src/event-manager.js',
                dest: 'dist/event-manager.min.js'
            }
        },
        qunit: {
            all_tests: 'test/qunit-test.html'
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.registerTask('default', ['jshint', 'uglify', 'qunit']);
};