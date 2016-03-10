'use strict';
angular.module('blogApp')
    .controller('ModalInstanceLoginCtrl', ['$scope', '$uibModalInstance', 'item', 'loginFactory',
        function ($scope, $uibModalInstance, item, loginFactory) {
            $scope.emailErrorMessage = false;
            $scope.passwordErrorMessage = false;
            $scope.errorMessage = "";
            $scope.item = item;
            $scope.close = close;
            $scope.login = login;
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

            function login() {
                loginFactory.login(item)
                    .then(
                        function (response) {
                            $scope.item.login = true;
                            loginFactory.setUnicode(response.data, item.email, true);
                            console.log(loginFactory.getUser());
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
        }]);