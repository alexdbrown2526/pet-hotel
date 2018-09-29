console.log('client working');

const petApp = angular.module('PetApp',['ngRoute']);

petApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/home', {
        templateUrl:'../views/home.html',
        controller: 'HomeController as vm'
    }).when('/pets',{
        templateUrl:'../views/pets.html',
        controller: 'PetController as vm'
    }).when("/owners", {
        templateUrl: '../views/owners.html',
        controller: 'OwnerController as vm'
    })
}]);

petApp.controller('OwnerController' , ['$http', function($http){
    let vm = this;

    vm.ownerArray = [];

    vm.getOwners= function () {
        $http({
          method: 'GET',
          url: '/owners'
        }).then(function (response) {
          console.log(response.data);
          vm.ownerArray = response.data;
        }).catch(function (error) {
          console.log('error getting owners from server', error);
        });
      }

      vm.addOwner = function (){
          $http({
              method: 'POST',
              url: '/owners',
              data: vm.ownerToAdd
          }).then(function(response){
              console.log(response.data);
              vm.getOwners();
              vm.ownerToAdd = {};
              
          })
      }

      vm.removeOwner = function(thing){
        console.log('button working');

          $http({
              method: 'DELETE',
              url: '/owners',
              params: {
                  id: thing.id
              }
          }).then(function(){
            vm.getOwners();
          }).catch(function(error) {
              console.log('error deleting owner', error);
              
          })
      }
      vm.getOwners();
    }]);

    petApp.controller('PetController' , ['$http', function($http){
        let vm = this;
        vm.petsArray = [];
        
    
        vm.getPets = function () {
            $http({
              method: 'GET',
              url: '/pets',
            }).then(function (response) {
              console.log(response.data);
              vm.petsArray = response.data;
            }).catch(function (error) {
              console.log('error getting pets from server', error);
            });
          }

          vm.addPet = function () {
              console.log(vm.petToAdd);
            $http({
              method: 'POST',
              url: '/pets',
              data: vm.petToAdd
            }).then(function (response) {
              console.log(response);
              vm.getPets();
              vm.petToAdd = {};
              }).catch(function (error) {
              console.log('error posting pet to server', error);
              
            });
          }

          vm.removePet = function (thing) {
              console.log('button workin');
              
              
              $http({
                  method: 'DELETE',
                  url: '/pets',
                  params: {
                      id: thing.id,
                      owner_id: thing.owner_id
                  }
              }).then(function(){
                  vm.getPets();
              })
          }
          vm.ownerArray = [];

          vm.getOwners= function () {
            $http({
              method: 'GET',
              url: '/owners'
            }).then(function (response) {
              console.log(response.data);
              vm.ownerArray = response.data;
            }).catch(function (error) {
              console.log('error getting owners from server', error);
            });
          }

        vm.updatePet= function (petToUpdate) {
            if(petToUpdate) {
                petToUpdate.checked_in = true;
            }

            $http({
              method: 'PUT',
              url: '/pets',
              data: petToUpdate
            }).then(function (response) {
              vm.getPets();
            }).catch(function (error) {
              console.log('error updating pet to server', error);
            });
        }
        // vm.updatePet();
        vm.getOwners();
        vm .getPets();
        }]);

         
          
        

 petApp.controller('HomeController' , ['$http', function($http){
     let vm = this;
 }]);
