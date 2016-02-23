exports.config = {
    allScriptsTimeout: 11000,
    specs: ['e2e/*.js'],
    capabilities: {'browserName': 'chrome'},
    baseUrl: "http://localhost/blogAngular/",
    frameworks: "jasmine",
    directConnect: true,
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};