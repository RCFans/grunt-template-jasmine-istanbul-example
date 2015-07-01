module.exports = function(grunt) {
	grunt.initConfig({
		meta: {
			package: grunt.file.readJSON('package.json'),
			src: {
				main: 'src/main',
				test: 'src/test'
			},
			bin: {
				coverage: 'test/coverage'
			}
		},
		jasmine: {
			coverage: {
				src: '<%= meta.src.main %>/js/*.js',
				options: {
					specs: '<%= meta.src.test %>/js/*.js',
					template: require('grunt-template-jasmine-istanbul'),
					templateOptions: {
						coverage: '<%= meta.bin.coverage %>/coverage.json',
						report: [
							{
								type: 'html',
								options: {
									dir: '<%= meta.bin.coverage %>/html'
								}
							},
							{
								type: 'cobertura',
								options: {
									dir: '<%= meta.bin.coverage %>/cobertura'
								}
							},
							{
								type: 'lcov',
								options: {
									dir: '<%= meta.bin.coverage %>/reports'
								}
							},
							{
								type: 'text-summary'
							}
						]
					}
				}
			}
		},
		sonarRunner: {
      analysis: {
        options: {
          debug: true,
          separator: '\n',
          sonar: {
            host: {
              url: 'http://localhost:9000/sonar'
            },
            jdbc: {
              url: 'jdbc:h2:tcp://localhost:9092/sonar'
            },

            projectKey: 'jasmime:testproject',
            projectName: 'Jasmine Project',
            projectVersion: '0.0.1',
            sources: ['src/main/js'].join(','),
            language: 'js',
            sourceEncoding: 'UTF-8'
          }
        }
      }
    }
	});

	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-sonar-runner');

	grunt.registerTask('test:coverage', ['jasmine:coverage']);
	grunt.registerTask('sonar', ['test:coverage', 'sonarRunner']);
};
