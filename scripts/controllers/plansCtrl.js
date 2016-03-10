'use strict';
angular.module('blogApp')
    .controller('plansController', ['$scope', 'plansFactory', '$uibModal',
        function ($scope, plansFactory, $uibModal) {
            var vm = this;
            vm.plans = {};
            vm.parametrs = {};
            vm.item = {};
            vm.getPlans = getPlans();
            vm.getParametrs = getParameters();
            vm.myCheck = true;
            vm.addPlan = addPlan;
            vm.savePlan = savePlan;
            vm.closePlan = closePlan;

            function savePlan() {
                $scope.addPlanForm.$setPristine();
                vm.myCheck = true;
                vm.idea.id = vm.ideas.length;
                ideasFactory.saveIdea(angular.copy(vm.idea));
                getIdeas();
                vm.idea = {};
            }

            function addPlan() {
                $scope.addPlanForm.$setPristine();
                vm.myCheck = false;
            }

            function closePlan() {
                vm.myCheck = true;
                $scope.addPlanForm.$setPristine();
            }

            function getPlans() {
                vm.plans = plansFactory.getPlans();
            }

            function getParameters() {
                vm.parametrs = plansFactory.getParameters();
            }


            function openPlanModal(image, size) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'views/planModal.html',
                    controller: 'ModalInstancePlanCtrl',
                    size: "lg",
                    resolve: {
                        item: function () {
                            vm.item.image = image;
                            return vm.item;
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
;