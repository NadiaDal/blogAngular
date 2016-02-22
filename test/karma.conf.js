module.exports = function(config){
    config.set({
        basePath: "../",
        frameworks : ['jasmine'],
        files: [
            'scripts/jquery.min.js',
            'scripts/angular.min.js',
            'scripts/angular-resource.min.js',
            'scripts/angular-ui-router.min.js',
            'scripts/angular-mocks.js',
            'scripts/*.js',
            'test/unit/**/*.js'
        ],
        exclude: [
            ''
        ],
        preprocessors :{},
        reporters :['progress'],
        port : 9000,
        colors : true,
        logLevel: config.LOG_INFO,
        autoWatch : true,
        browsers: ['PhantomJS'],
        customLaunchers:{},
        phantomjsLauncher:{
            exitOnResourceError : true
        },
        singleRun : false,
        concurrency : Infinity
    })
};