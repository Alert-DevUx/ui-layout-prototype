(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.mainMenuRight', {
      templateUrl: 'src/layout/views/area.html',
      controller: MainMenuRightController
    });
    
    MainMenuRightController.$inject = ['$state', 'Path'];
    function MainMenuRightController($state, Path) {
      var $ctrl = this;

      // Get path from state (removing dynamicLayout.inpatient - TODO: REVIEW)
      var path = new Path($state.current.name).removeHead().removeHead();
      var layout = $state.current.data.layout;
      var areaPath = $state.current.data.areaPath;
      var auxArea = layout.findArea(path);

      // Update if only the type is mainMenuRight
      if(auxArea && auxArea.pos === 9) {
        $ctrl.area = auxArea;
      }

    }    
    
})();
    

