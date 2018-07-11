(function () {
    "use strict";
    
    angular.module('layout')
    .component('areas', {
      templateUrl: 'src/layout/areas/areas.html',
      bindings: {
        areas: '<'
      },
      controller: AreasController
    });
    
    function AreasController() {
      var $ctrl = this;
    }    

})();
    

