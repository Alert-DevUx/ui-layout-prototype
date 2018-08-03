(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.deepnav', {
      template: '<buttons buttons="$ctrl.deepnavArea.buttons" area-type="\'deepnav\'"/>',
      controller: DeepnavController
    });
    
    DeepnavController.$inject = ['$state', 'Path'];
    function DeepnavController($state, Path) {
      var $ctrl = this;

      // Get path from state (removing dynamicLayout.inpatient - TODO: REVIEW)
      var path = new Path($state.current.name).removeHead().removeHead();
      var layout = $state.current.data.layout;
      var areaPath = $state.current.data.areaPath;
      var area = layout.findArea(path);
      $ctrl.deepnavArea = area;
      
    }    
    
})();
  

