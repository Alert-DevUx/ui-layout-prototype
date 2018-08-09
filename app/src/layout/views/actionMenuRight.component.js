(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.actionMenuRight', {
      template: '<buttons buttons="$ctrl.actionMenuRightArea.buttons" area-type=""actionMenuRight""/>',
      controller: ActionMenuRightController
    });
    
    ActionMenuRightController.$inject = ['$state', 'Path'];
    function ActionMenuRightController($state, Path) {
      var $ctrl = this;

      var layout = $state.current.data.layout;

      // Building path for this area (REVIEW - can be received as data?)
      var auxPath = new Path($state.current.name).removeHead().removeHead();
      var path = auxPath.getHead();
      auxPath.removeHead();
      path = path + '.' + auxPath.getHead() + '.actionMenuRight';

      var area = layout.findArea(new Path(path));

      $ctrl.actionMenuRightArea = area;  
    }    
    
})();
    

