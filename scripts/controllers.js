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
            $scope.showArticles = true;
            $scope.message = "Loading ..";
            $scope.articles = {};
            $scope.filteredArticles = {};


            $scope.totalItems = 0;
            $scope.pageCount = 0;
            $scope.itemsPerPage = 3;
            $scope.currentPage = 1;
            $scope.max_size = 5;


            articleFactory.getArticles()
                .then(
                    function (response) {
                        $scope.articles = response.data;
                        $scope.totalItems = $scope.articles.length;
                       // console.log("totalItems: " +$scope.totalItems);
                        $scope.$watch('currentPage + itemsPerPage',
                            function () {

                                var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
                                    end = begin + $scope.itemsPerPage;

                                $scope.filteredArticles = $scope.articles.slice(begin, end);
                            });
                        $scope.showArticles = true;
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
                console.log('Page changed to: ' + $scope.currentPage);
            };

        }])

    .controller('articleDetailController', ['commentFactory',
        'articleFactory', '$stateParams', '$log',
        function (commentFactory, articleFactory, $stateParams, $log) {
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
                            vm.commentForm.$setPristine();
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

    .controller('adminArticleController', ['$scope', 'articleFactory', 'loginFactory', '$timeout', '$state', '$stateParams',
        function ($scope, articleFactory, loginFactory, $timeout, $state,$stateParams ) {
            var vm = this;
            vm.articles = {};
            vm.article ={};
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
            vm.author = author();
            vm.checkUnicode = checkUnic();
            vm.getArticle = getArticle;
            vm.getArticles = getArticles;
            vm.editArticle = editArticle;
            vm.addArticle = addArticle;
            vm.deleteArticle = addArticle;
            
             function author() {
                return loginFactory.getEmail();
            }

            function checkUnic() {
                loginFactory.checkUnicode()
                    .then(
                        function (_) {
                            getArticles();
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
            
            function getArticle() {
                console.log("edit " + parseInt($stateParams.id, 10));
                articleFactory.getArticle(parseInt($stateParams.id, 10))
                    .then(
                        function (response) {
                            vm.article = response.data[0];
                            console.log("edit");
                            console.log(response.data);
                        },
                        function (response) {
                            $log.error(response.status + " " + response.statusText);
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
                            vm.successEdit = true;
                        },
                        function () {
                        }
                    );
            }

            function addArticle() {
                console.log("submit");
                vm.articleAdd.date = new Date();
                articleFactory.addArticle(angular.copy(vm.articleAdd))
                    .then(
                        function (_) {
                            vm.successAdd = true;
                        },
                        function () {
                        });
            }

            function deleteArticle(id) {
                articleFactory.deleteArticle(id.id)
                    .then(
                        function () {
                            getArticles();
                        },
                        function () {

                        });
            }
        }])

    .controller('loginController', ['$uibModal',
        'loginFactory', '$timeout', '$state',
        function ($uibModal, $timeout, $state, loginFactory) {

            var vm = this;
            vm.emailErrorMessage = false;
            vm.passwordErrorMessage = false;
            vm.errorMessage = "";
            vm.login = false;
            vm.user = {
                name: "",
                email: "",
                password: ""
            };
            vm.checkEmail = checkEmail;
            vm.logIn = logIn;
            vm.logOut = logOut;
            vm.signUp = signUp;
            function checkEmail() {
                // console.log("checkEmail");
                if (vm.user.email != "") {
                    loginFactory.checkEmail(angular.copy(vm.user))
                        .then(
                            function (_) {
                                vm.emailErrorMessage = false;
                                vm.errorMessage = "";
                            },
                            function (response) {
                                if (response.status == 409) {
                                    vm.emailErrorMessage = true;
                                    vm.errorMessage = "User with such email already exist!";
                                } else {
                                    vm.emailErrorMessage = false;
                                    vm.errorMessage = response.status + " "
                                        + response.statusText;
                                }
                            }
                        );
                }
            }

            function signUp() {
                vm.rs = {};
                loginFactory.signUp(angular.copy(vm.user))
                    .then(
                        function (_) {

                        },
                        function (response) {
                            if (response.status == 409) {
                                console.log("" + response.status);
                                vm.errorMessage = " User with this email already exist!";
                            }
                        }
                    );
            }

            function logIn() {
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
                        vm.login = item.login;

                    },
                    //dismiss callback
                    function () {
                        console.log('Modal dismissed at: ' + new Date());
                    });
            }

            function logOut() {
                loginFactory.setUnicode("", "");
                vm.login = false;
                $timeout(function () {
                    $state.go('app')
                }, 500);

                console.log("unicode: " + loginFactory.getUnicode());
            }
        }])

    .controller('stuffController', ['stuffFactory', '$uibModal',
        function (stuffFactory, $uibModal) {
            var vm = this;
            vm.tab = 1;
            vm.filtText = '';
            vm.image = '';
            vm.onhoover = true;
            vm.showTax = false;
            vm.stuff = {};
            vm.allByID = [];
            vm.filtered = [];
            vm.getStuff = getStuff();
            vm.isSelected = isSelected;
            vm.getTotal = getTotal;
            vm.checkTax = checkTax;
            vm.editStuff = editStuff;
            vm.addStuff = addStuff;
            vm.deleteStuff = deleteStuff;
            vm.select = select;
            vm.showImg = showImg;
            vm.hideImg = hideImg;
            vm.openInNewTab = openInNewTab;

            function getStuff() {
                stuffFactory.getStuff()
                    .then(
                        function (response) {
                            vm.stuff = response.data;
                            vm.stuff.forEach(function (element) {
                                vm.allByID[element.id] = element;
                            })
                        },
                        function () {
                        })
            }

            function deleteStuff(id) {
                console.log("delete");
                stuffFactory.deleteStuff(id.id)
                    .then(
                        function () {
                            getStuff();
                        },
                        function () {

                        });
            }

            function select(setTab) {
                vm.tab = setTab;
                if (setTab === 2) {
                    vm.filtText = "kitchen";
                }
                else if (setTab === 3) {
                    vm.filtText = "bedroom";
                }
                else if (setTab === 4) {
                    vm.filtText = "bathroom";
                }
                else if (setTab === 5) {
                    vm.filtText = "children";
                }
                else {
                    vm.filtText = "";
                }
            }

            function isSelected(checkTab) {
                return (vm.tab === checkTab);
            }

            function getTotal() {
                //console.log("filtered: "+ vm.filtered);
                var result = 0;
                vm.filtered.forEach(function (el) {
                    result += el.price * el.num;
                });
                // console.log(result);
                return result;
            }


            function editStuff(id) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'views/editStuffModal.html',
                    controller: 'ModalInstanceStuffCtrl',
                    resolve: {
                        item: function () {
                            return angular.copy(vm.allByID[id.id]);
                        }
                    }
                });

                modalInstance.result.then(
                    //close callback
                    function (item) {
                        console.log(item);
                        stuffFactory.updateStuff(item)
                            .then(
                                function () {
                                    getStuff();
                                    console.log("stuff updated");
                                },
                                function () {
                                }
                            );
                    },
                    //dismiss callback
                    function () {
                        console.log('Modal dismissed at: ' + new Date());
                    });
            }

            function addStuff() {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'views/addStuffModal.html',
                    controller: 'ModalInstanceStuffCtrl',
                    resolve: {
                        item: {}
                    }
                });

                modalInstance.result
                    .then(
                        function (item) {
                            stuffFactory.addStuff(item).then(
                                function (_) {
                                    getStuff();
                                },
                                function () {
                                }
                            )
                        },
                        //close callback

                        //dismiss callback
                        function () {
                            console.log('Modal dismissed at: ' + new Date());
                        });
            }

            function checkTax(price, weight, id) {
                //console.log(typeof price);
                var p = parseInt(price);
                var w = parseInt(weight);
                var limitPrice = 2250;
                var limitWeight = 50;
                if (p > limitPrice) {
                    vm.showTax = true;
                    vm.allByID.id;
                    return (p - limitPrice) * 0.1 + p * 0.2;
                } else if (w > limitWeight) {
                    vm.showTax = true;
                    return p / w * (w - limitWeight) * 0.1 + p * 0.2;
                } else {
                    vm.showTax = false;
                }
            }


            function showImg(id) {
                vm.image = '';
                vm.onhoover = true;
            }

            function hideImg() {
                vm.image = '';
                vm.onhoover = true;
            }

            function openInNewTab(url) {
                var win = window.open(url.url, '_blank');
                win.focus();
            }
        }])

    .controller('ideasController', ['ideasFactory','$stateParams',
        function (ideasFactory,$stateParams) {
            var vm = this;
            vm.myInterval = 4000;
            vm.noWrapSlides = false;
            vm.ideas = {};
            vm.getIdeas = getIdeas();
                    
            
            function getIdeas() {
                vm.ideas = ideasFactory.getIdeas();
                //console.log(vm.ideas);
            }
            
            
            
        }])

.controller('ideaController', ['ideasFactory','$stateParams',
        function (ideasFactory,$stateParams) {
            var vm = this;
            vm.idea={};
            vm.getIdea = getIdea();
            
            function getIdea(){
                vm.idea = ideasFactory.getIdea(parseInt($stateParams.id, 10));
         
                
            }
            
            
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

    .controller('ModalInstanceLoginCtrl', ['$scope', '$uibModalInstance', 'item', 'loginFactory',
        function ($scope, $uibModalInstance, item, loginFactory) {


            $scope.item = item;

            $scope.close = function () {
                $uibModalInstance.dismiss('cancel');
            };

            $scope.save = function () {
                $scope.emailErrorMessage = false;
                $scope.passwordErrorMessage = false;
                $scope.errorMessage = "";

                loginFactory.logIn(item)
                    .then(
                        function (response) {

                            $scope.item.login = true;
                            loginFactory.setUnicode(response.data, item.email);
                            //console.log(loginFactory.getUnicode());
                           // console.log(loginFactory.getEmail());
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
        }])
;


