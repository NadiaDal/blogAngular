'use strict';
angular.module('blogApp')
    .controller('stuffController', ['stuffFactory', 'loginFactory','$uibModal', '$scope',
        '$timeout', '$state',
        function (stuffFactory, loginFactory, $uibModal, $scope,$timeout, $state) {
            var vm = this;
            var limitPrice = 2250;
            var limitWeight = 50;
            vm.item = {};
            vm.tab = 1;
            vm.filtText = '';
            vm.image = '';
            vm.toUSD = {
                UAH: 28,
                PLN: 4
            };
            vm.showTaxes = false;
            vm.myCheck = true;
            vm.stuff = {};
            vm.allByID = [];
            vm.filtered = [];
            vm.taxes = false;
            vm.update = false;
            vm.loginMsg = true;
            vm.checkUnicode = checkUnic;
            vm.getStuffByType = getStuffByType();
            vm.openAddStuff = openAddStuff;
            vm.closeAddStuff = closeAddStuff;
            vm.openEditStuff =openEditStuff;
            vm.addUpdateStuff = addUpdateStuff;
            vm.deleteStuff = deleteStuff;
            vm.select = select;
            vm.isSelected = isSelected;
            vm.getTotal = getTotal;
            vm.openInNewTab = openInNewTab;
            vm.setBorderTax = setBorderTax;
            vm.getBorderTax = getBorderTax;
            vm.toggleTaxes = toggleTaxes;



            function checkUnic() {
                loginFactory.checkUnicode()
                    .then(
                        function (_) {
                            vm.loginMsg = true;
                            getStuff();
                        },
                        function (response) {
                            if (response.status == 401) {
                                vm.errorMessage = "User is not authorized to access data.";
                                vm.loginMsg = false;
                                $timeout(function () {
                                    $state.go('app');
                                }, 3000);
                                console.log("User is not authorized to access data.");
                            } else {
                                vm.errorMessage = response.status + " " + response.statusText;
                            }
                        }
                    );
            }


            function getStuffByType() {
                stuffFactory.getStuffByType('fur')
                    .then(
                        function (response) {
                            vm.stuff = response.data.map(setBorderTax);
                            vm.stuff.forEach(function (element) {
                                element.num = parseInt(element.num);
                                element.price = parseInt(element.price);
                                element.weight = parseInt(element.weight);
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
                    if (el.currency == 'USD') {
                        result += el.price * el.num;
                    } else if (el.currency == 'PLN') {
                        result += el.price / vm.toUSD.PLN * el.num;
                    } else if (el.currency == 'UAH') {
                        result += el.price / vm.toUSD.UAH * el.num;
                    }
                });
                return result;
            }

            function addUpdateStuff() {
                console.log(vm.item);
                if (vm.update) {
                    stuffFactory.updateStuff(vm.item)
                        .then(
                            function () {
                                getStuff();
                                vm.myCheck = true;
                                vm.update = false;
                                $scope.addStuffForm.$setPristine();
                                vm.item = {};
                                console.log("stuff updated");
                            },
                            function () {
                            });
                } else {
                    stuffFactory.addStuff(vm.item)
                        .then(
                            function (_) {
                                getStuff();
                                vm.myCheck = true;
                                $scope.addStuffForm.$setPristine();
                                vm.item = {};
                                console.log("stuff added");
                            },
                            function () {

                            })
                }
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

                    if (el.currency == 'USD') {
                        result += el.borderTax;
                    } else if (el.currency == 'PLN') {
                        result += el.borderTax / vm.toUSD.PLN;
                    } else if (el.currency == 'UAH') {
                        result += el.borderTax / vm.toUSD.UAH;
                    }
                });
                // console.log("getBorderTax :" + result);
                return result;
            }

            function openInNewTab(url) {
                var win = window.open(url.url, '_blank');
                win.focus();
            }

            function toggleTaxes() {
                vm.showTaxes = !vm.showTaxes;
            }

            function openAddStuff() {
                loginFactory.checkUnicode()
                    .then(
                        function (_) {
                            vm.myCheck = false;
                        },
                        function (response) {
                            if (response.status == 401) {
                                vm.errorMessage = "User is not authorized to access data.";
                                //vm.loginMsg = false;
                                //$timeout(function () {
                                //    $state.go('app');
                                //}, 2000);
                                console.log("User is not authorized to access data.");
                            } else {
                                vm.errorMessage = response.status + " " + response.statusText;
                            }
                        }
                    );

            }

            function openEditStuff(id){
                vm.update = true;
                vm.item = vm.allByID[id.id];
                vm.myCheck = false;
                console.log(vm.item);
            }

            function closeAddStuff() {
                vm.myCheck = true;
                $scope.addStuffForm.$setPristine();
                vm.item = {};
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