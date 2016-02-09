'use strict';
angular.module('blogApp')

    .filter('custom', function() {
        return function(input, search) {
            if (!input) return input;
            if (!search) return input;
            var expected = ('' + search).toLowerCase();
            var result = {};
            angular.forEach(input, function(value, key) {
                var actual = ('' + value).toLowerCase();
                if (actual.indexOf(expected) !== -1) {
                    result[key] = value;
                }
            });
            return result;
        }
    })
    .controller('articlesController', ['$scope', 'articleFactory',
        function ($scope, articleFactory) {
            $scope.showArticles = true;
            $scope.message = "Loading ..";

            $scope.articles = {};
            articleFactory.getArticles()
                .then(
                    function (response) {
                        $scope.articles = response.data;
                        $scope.showArticles = true;

                    },
                    function (response) {
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    }
                );

        }])

    .controller('articleDetailController', ['$scope', 'articleFactory', '$stateParams',
        function ($scope, articleFactory, $stateParams) {
            //console.log("id" +$stateParams.id, 10);
            $scope.article = {};
            articleFactory.getArticle(parseInt($stateParams.id, 10))
                .then(
                    function (response) {
                        $scope.article = response.data[0];

                    },
                    function (response) {
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    }
                );
            $scope.comments = {};

            articleFactory.getComments(parseInt($stateParams.id, 10))
                .then(function (response) {
                    $scope.comments = response.data;
                });

            $scope.userComment = {
                comment: "",
                author: "",
                date: ""
            };
            $scope.submit = function () {
                console.log("add comment");
                $scope.userComment.date = new Date();
                $scope.userComment.article_id = parseInt($stateParams.id, 10);
                articleFactory.addComment(angular.copy($scope.userComment));
                $scope.reset = function () {
                    $scope.userComment = {
                        comment: "",
                        author: "",
                        date: "",
                        article_id: ""
                    }
                };
                $scope.reset();
                $scope.commentForm.$setPristine();
                articleFactory.getComments(parseInt($stateParams.id, 10))
                    .then(function (response) {
                        $scope.comments = response.data;
                    });
            };

            $scope.successEdit = false;

            $scope.editArticle = function () {
                $scope.article.date = new Date();
                articleFactory.updateArticle(angular.copy($scope.article))
                    .then(function (_) {
                        $scope.successEdit = true;
                    });
            }
        }])

    .controller('adminArticleCtrl', ["$scope", 'articleFactory',
        '$timeout', '$state',
        function ($scope, articleFactory,  $timeout, $state) {
            $scope.articles = {};
            $scope.errorMessage ="";
            $scope.showAdminArticles = false;
            $scope.successAdd = false;

            console.log(articleFactory.getlogEmail());
            $scope.author = articleFactory.getlogEmail();

            $scope.articleAdd = {
                title: "",
                author: "",
                date: "",
                content: ""
            };

            $scope.add = function () {
                console.log("submit");
                //console.log($scope.articleEdit);
                $scope.articleAdd.date = new Date();
                $scope.articleAdd.author =articleFactory.getlogEmail();
                articleFactory.addArticle(angular.copy($scope.articleAdd))
                    .then(function (_) {
                        $scope.successAdd = true;
                    });

                console.log($scope.successAdd);
            };

            $scope.delete = function (id) {
                console.log("delete");
                console.log(id.id);
                articleFactory.deleteArticle(id.id);

            };


            articleFactory.checkUnicode().
                then(
                function(_){
                    articleFactory.getArticles()
                        .then(
                            function (response) {
                                $scope.articles = response.data;
                                $scope.showAdminArticles = true;

                            },
                            function (response) {
                                $scope.message = "Error: " + response.status + " " + response.statusText;
                            }
                        );
                },
                function(response){
                    if(response.status == 401){
                        $scope.errorMessage = "User is not authorized to access data.";
                        $timeout(function(){
                            $state.go('app');
                        },2000);


                        console.log("User is not authorized to access data.");
                    } else {
                        $scope.errorMessage = response.status + " " + response.statusText;
                    }
                }
            );
        }])

    .controller('loginCtrl', ["$scope", 'articleFactory','$uibModal', '$timeout', '$state',
        function ($scope, articleFactory, $uibModal,$timeout, $state) {
            $scope.emailErrorMessage = false;
            $scope.passwordErrorMessage = false;
            $scope.errorMessage = "";
            $scope.login = false;

            $scope.user = {
                name: "",
                email: "",
                password: ""
            };

            $scope.checkEmail = function () {
                // console.log("checkEmail");
                if ($scope.user.email != "") {
                    articleFactory.checkEmail(angular.copy($scope.user))
                        .then(
                            function (_) {
                                $scope.emailErrorMessage = false;
                                $scope.errorMessage = "";
                            },
                            function (response) {
                                if (response.status == 409) {
                                    $scope.emailErrorMessage = true;
                                    $scope.errorMessage = "User with such email already exist!";
                                } else {
                                    $scope.emailErrorMessage = false;
                                    $scope.errorMessage = response.status + " "
                                        + response.statusText;
                                }
                            }
                        );
                }
            };

            $scope.signUp = function () {
                $scope.rs = {};
                articleFactory.signUp(angular.copy($scope.user))
                    .then(
                        function (_) {

                        },
                        function (response) {
                            if (response.status == 409) {
                                console.log("" + response.status);
                                $scope.errorMessage = " User with this email already exist!";
                            }
                        }
                    );
            };

            $scope.logIn = function () {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'views/loginModal.html',
                    controller: 'ModalInstanceLoginCtrl',
                    resolve: {
                        item: {}
                    }
                });

                modalInstance.result.then(
                    function (item) {
                        $scope.login = item.login;
                    },
                    //dismiss callback
                    function () {
                        console.log('Modal dismissed at: ' + new Date());
                    });
            };
            $scope.logOut = function () {
                articleFactory.setUnicode("", "");
                $scope.login = false;
                $timeout(function(){
                    $state.go('app')
                }, 500);

                console.log("unicode: " + articleFactory.getUnicode());
            };


        }])

    .controller('stuffCtrl', ['$scope', 'articleFactory', '$uibModal',
        function ($scope, articleFactory, $uibModal) {
            $scope.tab = 1;
            $scope.filtText = '';

            $scope.stuff = {};
            $scope.allByID = [];

            $scope.filtered = [];

            var getItem = function (response) {
                $scope.stuff = response.data;
                $scope.stuff.forEach(function (element) {
                    $scope.allByID[element.id] = element;
                });
            };
            var logError = function(response){
                console.log(response.status + " - "+ response.statusText);
            };

            articleFactory.getStuff().then(getItem, logError);

            $scope.delete = function (id) {
                console.log("delete");
                articleFactory.deleteStuff(id.id).then(getItem, logError);

            };

            $scope.select = function (setTab) {
                $scope.tab = setTab;
                if (setTab === 2) {
                    $scope.filtText = "kitchen";
                }
                else if (setTab === 3) {
                    $scope.filtText = "bedroom";
                }
                else if (setTab === 4) {
                    $scope.filtText = "bathroom";
                }
                else if (setTab === 5) {
                    $scope.filtText = "children";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };

            $scope.getTotal = function () {
                //console.log("filtered: "+ $scope.filtered);
                var result = 0;
                $scope.filtered.forEach(function (el) {
                    result += el.price * el.num;
                });
                // console.log(result);
                return result;
            };

            $scope.openEdit = function (id) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'views/editStuffModal.html',
                    controller: 'ModalInstanceStuffCtrl',
                    resolve: {
                        item: function () {
                            return angular.copy($scope.allByID[id.id]);
                        }
                    }
                });

                modalInstance.result.then(
                        //close callback
                        function (item) {
                            console.log(item);
                            articleFactory.updateStuff(item)
                                .then(
                                    function(){
                                        articleFactory.getStuff().then(getItem);
                                        console.log("stuff updated");
                                    },
                                    function(){}
                                );
                        },
                        //dismiss callback
                        function () {
                            console.log('Modal dismissed at: ' + new Date());
                        });
            };

            $scope.openAdd = function () {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'views/addStuffModal.html',
                    controller: 'ModalInstanceStuffCtrl',
                    resolve: {
                        item: {}
                    }
                });

                modalInstance.result.then(
                    //close callback
                    function (item) {
                        console.log("new item: ");
                        console.log(item);
                        articleFactory.addStuff(item)
                            .then(
                                function(){
                                    articleFactory.getStuff()
                                        .then(getItem,logError);
                                    console.log("stuff added");
                                },
                                logError
                            );
                    },
                    //dismiss callback
                    function () {
                        console.log('Modal dismissed at: ' + new Date());
                    });
            };

            //$scope.onhoover = false;
            //$scope.showImg = function(){
            //    $scope.onhoover = true;
            //};
            //$scope.hideImg = function(){
            //    $scope.onhoover = false;
            //};
        }])

    .controller('ModalInstanceStuffCtrl', ['$scope', '$uibModalInstance', 'item',
        function ($scope, $uibModalInstance, item) {
            $scope.item = item;
            $scope.close = function () {
                $uibModalInstance.dismiss('cancel');
            };
            $scope.save = function () {
                $uibModalInstance.close($scope.item);
            };
        }])

    .controller('ModalInstanceLoginCtrl', ['$scope', '$uibModalInstance', 'item', 'articleFactory',
    function ($scope, $uibModalInstance, item, articleFactory) {


        $scope.item = item;

        $scope.close = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.save = function () {
            $scope.emailErrorMessage = false;
            $scope.passwordErrorMessage = false;
            $scope.errorMessage = "";

            articleFactory.logIn(item)
                .then(
                    function (response) {

                        $scope.item.login = true;
                        articleFactory.setUnicode(response.data, item.email);
                        $uibModalInstance.close($scope.item);
                    },
                    function (response) {
                        if (response.status == 400) {
                            $scope.passwordErrorMessage = true;
                            $scope.errorMessage = "Password does not correct!";


                        } else if (response.status == 404) {
                            $scope.emailErrorMessage = true;
                            $scope.errorMessage = "User does not exist!";
                        } else {
                            $scope.errorMessage = response.status + " " + response.statusText;
                        }
                    }
                );
        };
    }]);



