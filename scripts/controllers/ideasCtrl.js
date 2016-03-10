'use strict';
angular.module('blogApp')
    .controller('ideasController', ['$scope', 'ideasFactory','loginFactory',
        function ($scope, ideasFactory,loginFactory) {
            var vm = this;
            vm.myInterval = 4000;
            vm.active = 1;
            vm.noWrapSlides = false;
            vm.myCheck = true;
            vm.ideas = {};
            vm.idea = {};
            vm.loginMsg = true;
            vm.author = loginFactory.getEmail();
            vm.getIdeas = getIdeas();
            vm.setActive = setActive;
            vm.addIdea = addIdea;
            vm.saveIdea = saveIdea;
            vm.closeIdea = closeIdea;

            //$scope.$watch(loginFactory.getUser.logged, function(){
            //    if(loginFactory.getUser.logged){
            //        vm.loginMsg = true;
            //        console.log(vm.loginMsg);
            //        getIdeas();
            //    }
            //});

            function setActive(id) {
                vm.ideas[parseInt(id)].active = true;
            }

            function getIdeas() {
                ideasFactory.getIdeas()
                    .then(
                        function(resp){
                            vm.ideas = resp.data;
                            var id = 0;
                            vm.ideas.forEach(function(el){
                                el.idCarousel= id++;
                            });
                           // console.log(vm.ideas);
                        },
                        function(resp){}
                    );
            }

            function addIdea() {
                //console.log("add idea");
                vm.myCheck = false;

            }

            function saveIdea() {
                vm.idea.author= vm.author;
                //$scope.addIdeaForm.$setPristine();
                vm.myCheck = true;
                ideasFactory.saveIdea(angular.copy(vm.idea)).
                then(function(_){
                    getIdeas();
                    vm.idea = {};
                });
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
            ideasFactory.getIdea(parseInt($stateParams.id, 10)).
            then(function(resp){
                vm.idea = resp.data[0];
               // console.log(vm.idea);
            });
        }
    }])
;