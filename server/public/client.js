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

