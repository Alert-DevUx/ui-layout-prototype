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
    .state('public.layout', {
      url: '/layout',
      templateUrl: 'src/layout/layout.html',
      controller: 'LayoutController',
      controllerAs: 'layoutCtrl'
    })
    .state('public.layout-grid', {
      url: '/layout-grid',
      templateUrl: 'src/layout/layout-grid.html',
      controller: 'LayoutController',
      controllerAs: 'layoutCtrl'
    })
    .state('public.dynamicLayout', {
      url: '/dynamicLayout',
      templateUrl: 'src/layout/dynamic-layout.html',
      controller: 'DynamicLayoutController',
      resolve: {
        layout: ['LayoutService', function (LayoutService) {
          return LayoutService.getLayout();
        }]
      }      
    });
}
})();
