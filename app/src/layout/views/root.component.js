
(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.root', {
      templateUrl: 'src/layout/views/root.html',
      bindings: {
        area: '<'
      },
      controller: RootController
    });     

    function RootController() {
      var $ctrl = this;

    }   
})();
    
