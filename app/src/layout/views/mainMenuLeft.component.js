(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.mainMenuLeft', {
      templateUrl: 'src/layout/views/area.html',
      controller: MainMenuLeftController
    });
    
    MainMenuLeftController.$inject = ['$state', 'Path'];
    function MainMenuLeftController($state, Path) {
      var $ctrl = this;

      // Get path from state (removing dynamicLayout.inpatient - TODO: REVIEW)
      var path = new Path($state.current.name).removeHead().removeHead();
      var layout = $state.current.data.layout;
      var areaPath = $state.current.data.areaPath;
      var auxArea = layout.findArea(path);

      // Update if only the type is mainMenuLeft
      if(auxArea && auxArea.pos === 8) {
        $ctrl.area = auxArea;
      }
    }    
    
})();
    

