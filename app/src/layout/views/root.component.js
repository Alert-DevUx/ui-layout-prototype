
(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.root', {
      templateUrl: 'src/layout/views/root.html',
      controller: RootController
    });       

    RootController.$inject = ['$state', 'Path'];
    function RootController($state, Path) {
      var $ctrl = this;

      $ctrl.layout = $state.current.data.layout;

    }    
})();
    
