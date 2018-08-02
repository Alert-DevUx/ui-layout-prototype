(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.mainMenu', {
      templateUrl: 'src/layout/views/area.html',
      controller: MainMenuController
    });
    
    MainMenuController.$inject = ['$state', 'Path'];
    function MainMenuController($state, Path) {
      var $ctrl = this;

      // Get path from state (removing dynamicLayout.inpatient - TODO: REVIEW)
      var path = new Path($state.current.name).removeHead().removeHead();
      var layout = $state.current.data.layout;
      var areaPath = $state.current.data.areaPath;
      var auxArea = layout.findArea(path);

      // Update if only the type is mainMenu.left
      if(auxArea && auxArea.pos === 3) {
        $ctrl.area = auxArea;
      }


    }    
    
})();
    

