(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.mainMenu', {
      template: '<buttons buttons="$ctrl.mainMenu.buttons" area-type="\'mainMenu\'"/>',
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

      $ctrl.mainMenu = auxArea;


    }    
    
})();
    

