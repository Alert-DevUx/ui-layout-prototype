(function () {
    "use strict";
    
    angular.module('layout')
    .component('area', {
      templateUrl: 'src/layout/area/area.html',
      bindings: {
        area: '<'
      },
      controller: AreaController
    });
    
    function AreaController() {
      var $ctrl = this;
    }    
    
})();
    

