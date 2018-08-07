(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.mainMenu.left', {
      template: '<buttons buttons="$ctrl.mainMenu.buttons" area-type="\'mainMenu\'"/>',
      controller: MainMenu_LeftController
    });
    
    MainMenu_LeftController.$inject = ['$state', 'Path'];
    function MainMenu_LeftController($state, Path) {
      var $ctrl = this;

      var layout = $state.current.data.layout;
      // Get path from state (removing dynamicLayout.inpatient - TODO: REVIEW)
      var path = new Path($state.current.name).removeHead().removeHead();

      var auxArea = layout.findArea(path);

      $ctrl.mainMenu = auxArea;


    }    
    
})();
    

