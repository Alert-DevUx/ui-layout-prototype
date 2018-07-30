(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.area', {
      templateUrl: 'src/layout/area/area.html',
      // bindings: {
      //   area: '<'
      // },
      controller: AreaController
    });
    
    AreaController.$inject = ['$state', 'LAYOUT_BASE_STATE'];
    function AreaController($state, LAYOUT_BASE_STATE) {
      var $ctrl = this;

      $ctrl.area = $state.current.data.area;

      // Jump to default sub-area
      // TODO: For the time being is jumping to the targetArea of the first button, if defined.
      // Default button should be set by configuration.
      if($ctrl.area && $ctrl.area.buttonsPos &&  $ctrl.area.buttonsPos.length > 0 ) {
        var action = $state.current.data.area.buttons[$ctrl.area.buttonsPos[0]].action;
        if(action && action.targetArea){
          $state.go(action.targetArea.path);
        } 
      }
    }    
    
})();
    

