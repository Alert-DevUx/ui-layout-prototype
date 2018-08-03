(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.headerLeft', {
      template: '<buttons buttons="$ctrl.headerLeftArea.buttons" area-type="\'headerLeft\'"/>',
      controller: HeaderLeftController
    });
    
    HeaderLeftController.$inject = ['$state', 'Path'];
    function HeaderLeftController($state, Path) {
      var $ctrl = this;

      var layout = $state.current.data.layout;
      // Get path from state (removing public.dynamicLayout - TODO: REVIEW)
      var path = new Path($state.current.name + '.headerLeft').removeHead().removeHead();
      var auxArea = layout.findArea(path);

      $ctrl.headerLeftArea = auxArea;


    }    
    
})();
    

