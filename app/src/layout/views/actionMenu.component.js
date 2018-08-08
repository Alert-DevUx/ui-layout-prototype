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

      var layout = $state.current.data.layout;
      // Get path from state (removing dynamicLayout.inpatient - TODO: REVIEW)
      var path = new Path($state.current.name).removeHead().removeHead();

      var area = layout.findArea(path);

      if(area.type === 'actionMenu') {
        $ctrl.actionMenuArea = area;
      }
    }    
    
})();
    

