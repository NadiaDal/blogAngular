'use strict';
angular.module('blogApp')
    .controller('ideasController', ['$scope', 'ideasFactory','loginFactory',
        function ($scope, ideasFactory,loginFactory) {
            var vm = this;
            vm.myInterval = 4000;
            vm.noWrapSlides = false;
            vm.myCheck = true;
            vm.ideas = {};
            vm.idea = {};
            vm.loginMsg = false;
            vm.author = loginFactory.getEmail();
            vm.getIdeas = getIdeas;
            vm.setActive = setActive;
            vm.addIdea = addIdea;
            vm.saveIdea = saveIdea;
            vm.closeIdea = closeIdea;

            $scope.$watch(loginFactory.getUser.logged, function(){
                if(loginFactory.getUser.logged){
                    vm.loginMsg = true;
                    console.log(vm.loginMsg);
                    getIdeas();
                }
            });

            function setActive(id) {
                vm.ideas[parseInt(id)].active = true;
            }

            function getIdeas() {
                ideasFactory.getIdeas()
                    .then(
                        function(resp){
                            vm.ideas = resp.data;
                        },
                        function(resp){}
                    );
                //console.log(vm.ideas);
            }

            function addIdea() {
                console.log("add idea");
                vm.myCheck = false;

            }

            function saveIdea() {
                vm.idea.author= vm.author;
                console.log(vm.idea);
                //$scope.addIdeaForm.$setPristine();
                vm.myCheck = true;
                vm.idea.id = vm.ideas.length;
                ideasFactory.saveIdea(angular.copy(vm.idea));
                getIdeas();
                vm.idea = {};
            }

            function closeIdea() {
                console.log("close idea");
                //$scope.addIdeaForm.$setPristine();
                vm.myCheck = true;
            }

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
;