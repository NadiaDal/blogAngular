'use strict';
angular.module('blogApp')
    .controller('adminArticleController', ['$scope', 'articleFactory', 'loginFactory', '$timeout', '$state', '$stateParams',
        function ($scope, articleFactory, loginFactory, $timeout, $state, $stateParams) {
            var vm = this;
            vm.articles = {};
            vm.article = {};
            vm.articlesByAuthor = {};

            vm.errorMessage = "";
            vm.showAdminArticles = false;
            vm.successAdd = false;
            vm.successEdit = false;
            vm.articleAdd = {
                title: "",
                author: "",
                date: "",
                content: ""
            };
            vm.author = {
                email: authorEmail()
            };
            vm.checkUnicode = checkUnic();
            vm.getArticle = getArticle;
            vm.getArticles = getArticles;
            vm.editArticle = editArticle;
            vm.addArticle = addArticle;
            vm.deleteArticle = deleteArticle;

            $scope.$watch($stateParams,
                function () {
                    //console.log($stateParams );
                    var params = $stateParams;
                    if (params.hasOwnProperty('id')) {
                        var id = parseInt(params.id, 10);
                        //console.log(id);
                        getArticle(id);
                    }
                });

            function authorEmail() {
                //console.log("get Author" + loginFactory.getEmail())
                return loginFactory.getEmail();
            }

            function checkUnic() {
                loginFactory.checkUnicode()
                    .then(
                        function (_) {
                            getArticlesByAuthor();
                        },
                        function (response) {
                            if (response.status == 401) {
                                vm.errorMessage = "User is not authorized to access data.";
                                $timeout(function () {
                                    $state.go('app');
                                }, 2000);
                                console.log("User is not authorized to access data.");
                            } else {
                                vm.errorMessage = response.status + " " + response.statusText;
                            }
                        }
                    );
            }

            function getArticle(id) {
                articleFactory.getArticle(id)
                    .then(
                        function (response) {
                            vm.article = response.data[0];
                            //console.log("edit");
                            //console.log(vm.article);
                        },
                        function (response) {
                            $log.error(response.status + " " + response.statusText);
                        }
                    );

            }

            function getArticlesByAuthor() {
                articleFactory.getArticlesByAuthor(vm.author)
                    .then(
                        function (response) {
                            vm.articlesByAuthor = response.data;
                            vm.showAdminArticles = true;
                            //console.log(vm.articlesByAuthor);
                        },
                        function (response) {
                            // $log.error(response.status + " " + response.statusText);
                        }
                    );
            }

            function getArticles() {
                articleFactory.getArticles()
                    .then(
                        function (response) {
                            vm.articles = response.data;
                            vm.showAdminArticles = true;

                        },
                        function (response) {
                            vm.message = "Error: " + response.status + " " + response.statusText;
                        }
                    );
            }

            function editArticle() {
                vm.article.date = new Date();
                articleFactory.updateArticle(angular.copy(vm.article))
                    .then(
                        function (_) {
                            getArticlesByAuthor();
                            vm.successEdit = true;
                        },
                        function () {
                        }
                    );
            }

            function addArticle() {
                //console.log("submit");
                vm.articleAdd.date = new Date();
                vm.articleAdd.author = vm.author.email;
                articleFactory.addArticle(angular.copy(vm.articleAdd))
                    .then(
                        function (_) {
                            vm.successAdd = true;
                            getArticlesByAuthor();
                        },
                        function () {
                        });
            }

            function deleteArticle(id) {
                //console.log("delete");
                articleFactory.deleteArticle(id.id)
                    .then(
                        function () {
                            getArticlesByAuthor();
                        },
                        function () {

                        });
            }
        }])
;