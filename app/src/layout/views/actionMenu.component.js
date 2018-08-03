(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.actionMenu', {
      template: '<buttons buttons="$ctrl.actionMenuArea.buttons" area-type="\'actionMenu\'"/>',
      controller: ActionMenuController
    });
    
    ActionMenuController.$inject = ['$state', 'Path'];
    function ActionMenuController($state, Path) {
      var $ctrl = this;

      // Get path from state (removing dynamicLayout.inpatient - TODO: REVIEW)
      var path = new Path($state.current.name).removeHead().removeHead();
      var layout = $state.current.data.layout;
      var areaPath = $state.current.data.areaPath;
      var area = layout.findArea(path);
      $ctrl.actionMenuArea = area;
    }    
    
})();
    

