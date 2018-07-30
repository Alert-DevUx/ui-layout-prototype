
(function () {
    "use strict";
    
    angular.module('layout')
    .component('top', {
      templateUrl: 'src/layout/views/top.html',
      bindings: {
        area: '<'
      },
      controller: TopController
    });   
    
    function TopController() {
      var $ctrl = this;
    }  
})();
    
