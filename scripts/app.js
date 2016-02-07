'use strict';
angular.module('blogApp', ['ui.router', 'ngResource', 'ui.bootstrap'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: '/',
                views: {
                    'header': {templateUrl: 'views/header.html',
                        controller: 'loginCtrl'},
                    'content': {templateUrl: 'views/home.html',
                        controller: 'articlesController'},
                    'footer': {templateUrl: 'views/footer.html'}
                }
            })

            .state('app.article', {
            url : 'articles/:id',
            views: {

                'content@': {templateUrl: 'views/article.html',
                    controller: 'articleDetailController'}

            }
            })
            .state('app.admin', {
                url : 'admin',
                views: {
                    'content@' : {
                        templateUrl : 'views/admin.html',
                        controller : 'adminArticleCtrl'
                    }
                }
            })

            .state('app.edit', {
                url : 'edit/:id',
                views: {
                    'content@' : {
                        templateUrl : 'views/admin_article_edit.html',
                        controller : 'articleDetailController'
                    }
                }
            })

            .state('app.add', {
                url : 'add',
                views: {
                    'content@' : {
                        templateUrl : 'views/admin_article_add.html',
                        controller : 'addArticleCtrl'
                    }
                }
            })
            .state('app.calculation', {
            url : 'calculation',
            views: {
                'content@' : {
                    templateUrl : 'views/calculation.html',
                    controller : 'stuffCtrl'
                }
            }
             })

            .state('app.plan', {
                url : 'plan',
                views: {
                    'content@' : {
                        templateUrl : 'views/plan.html',
                        controller : ''
                    }
                }
            })


            .state('app.signup', {
                url : 'signup',
                views: {
                    'content@' : {
                        templateUrl : 'views/signup.html',
                        controller : 'loginCtrl'
                    }
                }
            })
        ;
        $urlRouterProvider.otherwise('/');
    })
;
