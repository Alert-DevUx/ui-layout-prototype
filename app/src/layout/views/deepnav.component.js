(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.deepnav', {
      templateUrl: 'src/layout/views/deepnav.html',
      controller: DeepnavController
    });
    
    DeepnavController.$inject = ['$state', 'Path'];
    function DeepnavController($state, Path) {
      var $ctrl = this;

      var layout = $state.current.data.layout;
      // Get path from state (removing dynamicLayout.inpatient - TODO: REVIEW)
      var path = new Path($state.current.name).removeHead().removeHead();

      var area = layout.findArea(path);

      if(area.type === 'deepnav') {
        $ctrl.deepnavArea = area;
      }
      
    }    
    
})();
  

