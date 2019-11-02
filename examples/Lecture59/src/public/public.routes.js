
public Routes.js
(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      abstract: true,
      templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })

    .state('public.menu', {
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          return MenuService.getCategories();
        }]
      }
    })

    .state('public.menuitems', {
      url: '/menu/{category}',
      templateUrl: 'src/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    })

    .state('public.info', {
      url: '/my_info',
      templateUrl: 'src/public/info/my_info.html',
      controller: 'myInfoController',
      controllerAs: 'miCrtl',


    })

    .state('public.register', {
      url: '/resgister',
      templateUrl: 'src/public/info/register.html',
      controller: 'myRegisterController',
      controllerAs: 'mrCtrl',
      resolve: {
        //data : ['aboutMeService', function (aboutMeService){return aboutMeService.getMenuItems() }]
        data : ['$http', function($http){
          var response =
              $http({
              method: "GET",
              url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
            })

            return response;
        }]
      }

    })

    ;
}
})();
