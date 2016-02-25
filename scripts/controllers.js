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
            $scope.itemsPerPage = 3;
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

    .controller('adminArticleController',
        ['$scope', 'articleFactory', 'loginFactory', '$timeout', '$state', '$stateParams',
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
            function(){
                //console.log($stateParams );
                var params = $stateParams;
                if(params.hasOwnProperty('id')){
                    var id = parseInt(params.id,10);
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

            function getArticlesByAuthor(){
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
    .controller('ModalInstanceLoginCtrl', ['$scope', '$uibModalInstance', 'item', 'loginFactory',
        function ($scope, $uibModalInstance, item, loginFactory) {
            $scope.emailErrorMessage = false;
            $scope.passwordErrorMessage = false;
            $scope.errorMessage = "";
            $scope.item = item;
            $scope.close = close;
            $scope.save = save;
            $scope.signUp = signUp;

            $scope.alert = {
                type: '',
                msg: '',
                show: false
            };


            $scope.closeAlert = function () {
                $scope.alert = {
                    type: '',
                    msg: '',
                    show: false
                };
            };


            function close() {
                $uibModalInstance.dismiss('cancel')
            }

            function save() {

                loginFactory.logIn(item)
                    .then(
                        function (response) {

                            $scope.item.login = true;
                            loginFactory.setUnicode(response.data, item.email);
                            //console.log(loginFactory.getUnicode());
                            //console.log(loginFactory.getEmail());
                            $uibModalInstance.close($scope.item);
                        },
                        function (response) {
                            if (response.status == 400) {
                                $scope.passwordErrorMessage = true;
                                $scope.errorMessage = "Password does not correct!";


                            } else if (response.status == 404) {

                                $scope.errorMessage = "User does not exist!";
                            } else {
                                $scope.errorMessage = response.status + " " + response.statusText;
                            }
                        }
                    );
            }

            function signUp() {
                loginFactory.signUp(item)
                    .then(
                        function (response) {
                            $scope.item.login = true;
                            loginFactory.setUnicode(response.data, item.email);
                            $uibModalInstance.close($scope.item);
                        },
                        function (response) {
                            if (response.status == 409) {
                                console.log("" + response.status);
                                $scope.alert.show = true;
                                $scope.alert.type = "danger";
                                $scope.alert.msg =
                                    "User with such email already exist";
                            }
                        }
                    );
            }


        }])

    .controller('loginController', ['$uibModal',
        '$timeout', '$state', 'loginFactory',
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
            vm.showTax = false;
            vm.stuff = {};
            vm.allByID = [];
            vm.filtered = [];
            vm.getStuff = getStuff();
            vm.isSelected = isSelected;
            vm.getTotal = getTotal;
            vm.editStuff = editStuff;
            vm.addStuff = addStuff;
            vm.deleteStuff = deleteStuff;
            vm.select = select;
            vm.showImg = showImg;
            vm.hideImg = hideImg;
            vm.openInNewTab = openInNewTab;
            vm.setBorderTax = setBorderTax;
            vm.getBorderTax = getBorderTax;
            var limitPrice = 2250;
            var limitWeight = 50;

            function getStuff() {
                stuffFactory.getStuff()
                    .then(
                        function (response) {
                            vm.stuff = response.data.map(setBorderTax);
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
                var result = 0;
                vm.filtered.forEach(function (el) {
                    result += el.price * el.num;
                });
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
                                    //console.log("stuff updated");
                                },
                                function () {
                                }
                            );
                    },
                    //dismiss callback
                    function () {
                        // console.log('Modal dismissed at: ' + new Date());
                    });
            }

            function addStuff() {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'views/addStuffModal.html',
                    controller: 'ModalInstanceStuffCtrl',
                    resolve: {
                        item: {
                            name: "",
                            num: 0,
                            price: 0,
                            room: "",
                            link: "",
                            image: "",
                            currency: "",
                            weight: 0
                        }
                    }
                });

                modalInstance.result
                    .then(
                        function (item) {
                            console.log(item);
                            stuffFactory.addStuff(item).then(
                                function (_) {
                                    getStuff();
                                },
                                function () {
                                }
                            )
                        },
                        function () {
                            //  console.log('Modal dismissed at: ' + new Date());
                        });
            }

            /*assume that 20% have to pay from all price*/
            function setBorderTax(item) {
                var p = parseInt(item.price);
                var w = parseInt(item.weight);
                var borderTax = 0;
                if (p > limitPrice) {
                    borderTax = Math.ceil((p - limitPrice) * 0.1 + p * 0.2);
                    item.showTax = true;
                    item.borderTax = borderTax;
                    return item;
                } else if (w > limitWeight) {
                    borderTax = Math.ceil(p / w * (w - limitWeight) * 0.1 + p * 0.2);
                    item.showTax = true;
                    item.borderTax = borderTax;
                    return item;
                } else {
                    item.showTax = false;
                    item.borderTax = borderTax;
                    return item;
                }
            }

            function getBorderTax() {
                var result = 0;
                vm.filtered.forEach(function (el) {
                    result += el.borderTax;
                });
                // console.log("getBorderTax :" + result);
                return result;
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

    .controller('ideasController', ['$scope', 'ideasFactory',
        function ($scope, ideasFactory) {
            var vm = this;
            vm.myInterval = 4000;
            vm.noWrapSlides = false;
            vm.myCheck = true;

            vm.ideas = {};
            vm.idea ={};
            vm.getIdeas = getIdeas();
            vm.setActive = setActive;
            vm.addIdea = addIdea;
            vm.saveIdea = saveIdea;
            vm.closeIdea = closeIdea;


            function setActive(id) {
                vm.ideas[parseInt(id)].active = true;
            }

            function getIdeas() {
                vm.ideas = ideasFactory.getIdeas();
                //console.log(vm.ideas);
            }

            function addIdea() {
                console.log("add idea");
                vm.myCheck = false;

            }

            function saveIdea(){
                console.log(vm.idea);
                $scope.addIdeaForm.$setPristine();
                vm.myCheck = true;
                vm.idea.id= vm.ideas.length;
                ideasFactory.saveIdea(angular.copy(vm.idea));
                getIdeas();
                vm.idea ={};
            }

            function closeIdea(){
                console.log("close idea");
                $scope.addIdeaForm.$setPristine();
                vm.myCheck = true;
            }


        }])
    .controller('plansController', ['$scope','plansFactory','$uibModal',
        function ($scope, plansFactory,$uibModal) {
            var vm = this;
            vm.plans = {};
            vm.parametrs ={};
            vm.item = {};
            vm.getPlans = getPlans();
            vm.getParametrs= getParameters();
            vm.myCheck = true;
            vm.addPlan =addPlan;
            vm.savePlan=savePlan;
            vm.closePlan =closePlan;

            function savePlan(){
                $scope.addPlanForm.$setPristine();
                vm.myCheck = true;
                vm.idea.id= vm.ideas.length;
                ideasFactory.saveIdea(angular.copy(vm.idea));
                getIdeas();
                vm.idea ={};
            }
            function addPlan(){
                $scope.addPlanForm.$setPristine();
                vm.myCheck = false;
            }

            function closePlan(){
                vm.myCheck = true;
                $scope.addPlanForm.$setPristine();
            }

            function getPlans() {
                vm.plans = plansFactory.getPlans();
            }

            function getParameters(){
                vm.parametrs = plansFactory.getParameters();
            }


            function openPlanModal(image, size) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'views/planModal.html',
                    controller: 'ModalInstancePlanCtrl',
                    size: "lg",
                    resolve: {
                        item: function(){
                            vm.item.image = image;
                           return  vm.item;
                        }
                    }
                });

                modalInstance.result
                    .then(
                        function () {
                           },
                        function () {
                            //  console.log('Modal dismissed at: ' + new Date());
                        });
            }

        }])

    .controller('ModalInstancePlanCtrl', ['$scope', '$uibModalInstance', 'item',
        function ($scope, $uibModalInstance, item) {
            $scope.item = item;
            $scope.close = function () {
                $uibModalInstance.dismiss('cancel');
            };
            //$scope.save = function () {
            //    $uibModalInstance.close($scope.item);
            //};
        }])


    .controller('ideaController', ['ideasFactory', '$stateParams',
        function (ideasFactory, $stateParams) {
            var vm = this;
            vm.idea = {};
            vm.getIdea = getIdea();

            function getIdea() {
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

;


