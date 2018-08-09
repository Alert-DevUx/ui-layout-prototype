(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.actionMenuLeft', {
      template: '<buttons buttons="$ctrl.actionMenuLeftArea.buttons" area-type=""actionMenuLeft""/>',
      controller: ActionMenuLeftController
    });
    
    ActionMenuLeftController.$inject = ['$state', 'Path'];
    function ActionMenuLeftController($state, Path) {
      var $ctrl = this;

      var layout = $state.current.data.layout;

      // Building path for this area (REVIEW - can be received as data?)
      var auxPath = new Path($state.current.name).removeHead().removeHead();
      var path = auxPath.getHead();
      auxPath.removeHead();
      path = path + '.' + auxPath.getHead() + '.actionMenuLeft';

      var area = layout.findArea(new Path(path));

      $ctrl.actionMenuLeftArea = area;      

    }    
    
})();
    

