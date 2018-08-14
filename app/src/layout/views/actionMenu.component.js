(function () {
  "use strict";
  
  angular.module('layout')
  .component('layout.actionMenu', {
    templateUrl: 'src/layout/views/actionMenu.html',
    controller: ActionMenuController
  });
  
  ActionMenuController.$inject = ['$state', 'Path'];
  function ActionMenuController($state, Path) {
    var $ctrl = this;

    var layout = $state.current.data.layout;
    // Get path from state (removing dynamicLayout.inpatient - TODO: REVIEW)
    var path = new Path($state.current.name).removeHead().removeHead();

    var area = layout.findArea(path);

    // Action buttons inside 'screen' area
    if(area.type === 'screen') {
      $ctrl.actionMenu_leftArea = area.areas.actionMenu.areas.left;
      $ctrl.actionMenu_rightArea = area.areas.actionMenu.areas.right;
    }
  }    
  
})();
  