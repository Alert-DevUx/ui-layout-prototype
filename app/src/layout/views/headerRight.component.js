(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.headerRight', {
      template: '<buttons buttons="$ctrl.headerRightArea.buttons" area-type="\'headerRight\'"/>',
      controller: HeaderRightController
    });
    
    HeaderRightController.$inject = ['$state', 'Path'];
    function HeaderRightController($state, Path) {
      var $ctrl = this;

      var layout = $state.current.data.layout;

      // Building path for this area (REVIEW - can be received as data?)
      var auxPath = new Path($state.current.name).removeHead().removeHead();
      var path = auxPath.getHead();
      auxPath.removeHead();
      path = path + '.' + auxPath.getHead() + '.headerRight';

      var area = layout.findArea(new Path(path));

      $ctrl.headerRightArea = area;

  }    
    
})();
    

