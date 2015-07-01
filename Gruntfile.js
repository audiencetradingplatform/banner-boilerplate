module.exports = function (grunt) {

    "use strict";

    // this saves us having to load each plugin individually
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),

        less: {
            development: {
                options: {
                    strictMath: true,
                    strictUnits: true,
                    cleancss: false,
                    sourceMap: false
                },
                files: {
                    "src/styles/style.css": "src/styles/style.less"
                }
            }
        },

        autoprefixer: {
            single_file: {
                options: {
                    browsers: ["last 2 version"]
                },
                src: "src/styles/style.css",
                dest: "src/styles/style.css"
            }
        },

        csslint: {
            options: {
                csslintrc: ".csslintrc"
            },
            strict: {
                src: ["src/styles/style.css"]
            }
        },

        inline: {
            dist: {
                options: {
                    tag: "",
                    uglify: true,
                    cssmin: true
                },
                src: "src/index.html",
                dest: "build/index.html"
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    "build/index.html": "build/index.html",
                }
            },
        },

        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            all: [
                ".jshintrc",
                "Gruntfile.js",
                "src/**/*.js"
            ]
        },

        imagemin: {
            images: {
                files: [{
                    expand: true,
                    cwd: "src/img/",
                    src: [
                        "*.{png,jpg,gif}",
                    ],
                    dest: "src/img/"
                }]
            }
        },

        watch: {
            options: {
                livereload: true
            },
            html: {
                files: "src/index.html",
                tasks: "buildhtml"
            },
            images: {
                files: ["src/**/*.{png,jpg,jpeg,gif}"],
                tasks: "buildimg"
            },
            css: {
                files: "src/**/*.less",
                tasks: "buildcss"
            },
            scripts: {
                files: [
                    "Gruntfile.js",
                    "src/**/*.js"
                ],
                tasks: "buildjs"
            }
        },

        notify: {
            notify_hooks: {
                options: {
                    enabled: true,
                    max_jshint_notifications: 5,
                }
            },
            js: {
                options: {
                    title: "Back of the net!",
                    message: "Javascript build successful!"
                }
            },
            html: {
                options: {
                    title: "BIG ROI!",
                    message: "HTML build successful!"
                }
            },
            less: {
                options: {
                    title: "Cashback!",
                    message: "LESS build successful!"
                }
            },
            img: {
                options: {
                    title: "Jurassic Park!",
                    message: "Image minify successful!"
                }
            },
            build: {
                options: {
                    title: "Buck Rogers Toilet!",
                    message: "Full build completed!"
                }
            }
        }

    });

    // List of available tasks
    grunt.registerTask("default", []);
    grunt.registerTask("buildcss", ["less", "autoprefixer", "csslint", "inline", "htmlmin", "notify:less"]);
    grunt.registerTask("buildjs", ["jshint", "inline", "htmlmin", "notify:js"]);
    grunt.registerTask("buildimg", ["imagemin", "inline", "htmlmin", "notify:img"]);
    grunt.registerTask("buildhtml", ["inline", "htmlmin", "notify:html"]);
    grunt.registerTask("build", ["buildcss", "buildjs", "buildimg", "htmlmin", "notify:build"]);
};
