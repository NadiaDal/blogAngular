module.exports = function(config){
    config.set({
        basePath: "../",
        frameworks : ['jasmine'],
        files : [
          'app/scripts/*.js',
            'test/unit/**/*.js'
        ],
        exclude :[
            ''
        ],
        preprocessors :{},
        reporters :['progress'],
        port : 9000,
        colors : true,
        logLevel: config.LOG_INFO,
        autoWatch : true,
        browsers: ['Chrome', 'PhantomJS', 'PhantomJS_custom'],
        customLaunchers:{},
        phantomjsLauncher:{
            exitOnResourceError : true
        },
        singleRun : false,
        concurrency : Infinity
    })
};