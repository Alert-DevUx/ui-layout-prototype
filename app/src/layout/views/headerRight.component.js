(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.headerRight', {
      template: '<buttons buttons="$ctrl.area.buttons"/>',
      controller: HeaderRightController
    });
    
    HeaderRightController.$inject = ['$state'];
    function HeaderRightController($state) {
      var $ctrl = this;

      $ctrl.area = $state.current.data.area;
    }    
    
})();
    

