(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.area', {
      templateUrl: 'src/layout/area/area.html',
      bindings: {
         area: '<'
      },
      controller: AreaController
    });
    
    AreaController.$inject = ['$state'];
    function AreaController($state) {
      var $ctrl = this;
    }    
    
})();
    

