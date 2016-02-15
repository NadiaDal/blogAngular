'use strict';
angular.module('blogApp', ['ui.router', 'ngResource', 'ui.bootstrap', 'angular-toArrayFilter'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: '/',
                views: {
                    'header': {templateUrl: 'views/header.html',
                        controller: 'loginController'},
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
                        controller : 'adminArticleController'
                    }
                }
            })

            .state('app.edit', {
                url : 'edit/:id',
                views: {
                    'content@' : {
                        templateUrl : 'views/admin_article_edit.html',
                        controller : 'adminArticleController'
                    }
                }
            })

            .state('app.add', {
                url : 'add',
                views: {
                    'content@' : {
                        templateUrl : 'views/admin_article_add.html',
                        controller : 'adminArticleController'
                    }
                }
            })
            .state('app.calculation', {
            url : 'calculation',
            views: {
                'content@' : {
                    templateUrl : 'views/calculation.html',
                    controller : 'stuffController'
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
            .state('app.ideas', {
                url : 'ideas',
                views: {
                    'content@' : {
                        templateUrl : 'views/ideas.html',
                        controller : 'ideasController'
                    }
                }
            })


            .state('app.signup', {
                url : 'signup',
                views: {
                    'content@' : {
                        templateUrl : 'views/signup.html',
                        controller : 'loginController'
                    }
                }
            })
        ;
        $urlRouterProvider.otherwise('/');
    })
;
