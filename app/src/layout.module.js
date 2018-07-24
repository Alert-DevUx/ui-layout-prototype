(function() {
"use strict";

/**
 * Layout module that includes the public module as a dependency
 */
//angular.module('layout', ['public', 'admin']);
angular.module('layout', ['public', 'ui.router'])
.config(config);

config.$inject = ['$urlRouterProvider'];
function config($urlRouterProvider) {

  // If user goes to a path that doesn't exist, redirect to public root
  $urlRouterProvider.otherwise('/');
}

})();

  