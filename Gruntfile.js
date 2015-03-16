module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {                         // Dictionary of files
          'dist/assets/style.css': 'src/assets/css/style.sass',       // 'destination': 'source'
        }
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, flatten:true, src: ['src/assets/**', '!**/*.sass'], dest: 'dist/assets/', filter:'isFile'},
          {expand: true, flatten:true, src: ['src/.htaccess'], dest: 'dist/', filter:'isFile'},
        ]
      }  
    },
    assemble: {
      options: {
        layout: 'default.handlebars',
        layoutdir: 'src/layouts', 
        assets: 'dist/assets/'
      },
      main: {
        files: [
          {expand: true, flatten:true, dest: 'dist/', src: 'src/pages/*.handlebars'}
        ]
      },
      splash: {
        options: {
          layout: 'empty.handlebars',
          layoutdir: 'src/layouts/',
        },
        files: [
          {expand: true, flatten:true, rename: function(dest,src){ return dest + 'index.html';}, dest: 'dist/', src: 'src/pages/splash.handlebars'}
        ]
      }
    },
    buildcontrol: {
      options: {
        dir: 'dist/',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      apotact: {
        options: {
          remote: 'apotact@apotact.com:git/apotact.git',
          branch: 'master'
        }
      }
    },
    clean: ['dist/'],
    watch: {
      files: ['**/*'],
      tasks: ['default']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-build-control');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('assemble');

  /* Main Site */
  grunt.registerTask('test', ['clean', 'sass', 'assemble', 'copy']);
  grunt.registerTask('default', ['newer:sass', 'newer:assemble', 'newer:copy']);
  grunt.registerTask('fresh', ['clean', 'sass', 'assemble', 'copy']);
  grunt.registerTask('deploy', ['clean', 'sass', 'assemble', 'copy', 'buildcontrol:apotact']);

  /* Temporary Splash Page */
  grunt.registerTask('splash', ['clean', 'sass', 'assemble:splash', 'copy']);
  grunt.registerTask('deploy-splash', ['clean', 'sass', 'assemble:splash', 'copy', 'buildcontrol:apotact']);

};
