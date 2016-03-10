'use strict';
angular.module('blogApp')

    .filter('custom', function () {
        return function (input, search) {
            if (!input) return input;
            if (!search) return input;
            var expected = ('' + search).toLowerCase();
            var result = {};
            angular.forEach(input, function (value, key) {
                var actual = ('' + value).toLowerCase();
                if (actual.indexOf(expected) !== -1) {
                    result[key] = value;
                }
            });
            return result;
        }
    })
    .controller('articlesController', ['articleFactory', '$scope',
        function (articleFactory, $scope) {
            //var vm = this;
            $scope.showArticles = false;
            $scope.message = "Loading ..";
            $scope.articles = {};
            $scope.filteredArticles = {};


            $scope.totalItems = 0;
            $scope.pageCount = 0;
            $scope.itemsPerPage = 4;
            $scope.currentPage = 1;
            $scope.max_size = 5;


            articleFactory.getArticles()
                .then(
                    function (response) {
                        $scope.showArticles = true;
                        $scope.articles = response.data;

                        $scope.totalItems = $scope.articles.length;
                        // console.log("totalItems: " +$scope.totalItems);
                        $scope.$watch('currentPage + itemsPerPage',
                            function () {

                                var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
                                    end = begin + $scope.itemsPerPage;

                                $scope.filteredArticles = $scope.articles.slice(begin, end);
                            });

                        $scope.pageCount = Math.ceil($scope.articles.length / $scope.itemsPerPage);

                    },
                    function (response) {
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    }
                );


            $scope.setPage = function (pageNo) {
                $scope.currentPage = pageNo;
            };

            $scope.pageChanged = function () {
                // console.log('Page changed to: ' + $scope.currentPage);
            };

        }])

    .controller('articleDetailController', ['$scope', 'commentFactory',
        'articleFactory', '$stateParams', '$log',
        function ($scope, commentFactory, articleFactory, $stateParams, $log) {
            var vm = this;
            vm.article = {};
            vm.comments = {};
            vm.userComment = {
                comment: "",
                author: "",
                date: ""
            };
            vm.getArticle = getArticle();
            vm.getComments = getComments();
            vm.submit = submit;
            vm.commentForm = commentForm;

            function getArticle() {
                articleFactory.getArticle(parseInt($stateParams.id, 10))
                    .then(
                        function (response) {
                            vm.article = response.data[0];
                        },
                        function (response) {
                            $log.error(response.status + " " + response.statusText);
                        }
                    );
            }

            function getComments() {
                commentFactory.getComments(parseInt($stateParams.id, 10))
                    .then(
                        function (response) {
                            vm.comments = response.data;
                        },
                        function () {

                        });
            }


            function submit() {
                vm.userComment.date = new Date();
                vm.userComment.article_id = parseInt($stateParams.id, 10);
                commentFactory.addComment(angular.copy(vm.userComment))
                    .then(
                        function () {
                            reset();
                            $scope.commentForm.$setPristine();
                            getComments();
                        },
                        function () {
                        }
                    );
            }

            function reset() {
                vm.userComment = {
                    comment: "",
                    author: "",
                    date: "",
                    article_id: ""
                }
            }
        }])
;
