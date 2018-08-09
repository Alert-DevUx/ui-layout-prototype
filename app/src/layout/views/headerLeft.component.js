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

      // Building path for this area (REVIEW - can be received as data?)
      var auxPath = new Path($state.current.name).removeHead().removeHead();
      var path = auxPath.getHead();
      auxPath.removeHead();
      path = path + '.' + auxPath.getHead() + '.headerLeft';

      var area = layout.findArea(new Path(path));

      $ctrl.headerLeftArea = area;
    }    
    
})();
    

