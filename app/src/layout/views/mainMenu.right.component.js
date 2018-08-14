(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.mainMenu.right', {
      template: '<buttons buttons="$ctrl.mainMenu_rightArea.buttons" area-type="\'mainMenu\'"/>',
      controller: MainMenu_RightController
    });
    
    MainMenu_RightController.$inject = ['$state', 'Path'];
    function MainMenu_RightController($state, Path) {
      var $ctrl = this;

      var layout = $state.current.data.layout;
      // Get path from state (removing dynamicLayout.inpatient - TODO: REVIEW)
      var path = new Path($state.current.name).removeHead().removeHead();

      var area = layout.findArea(path);

      if(area.type === 'mainMenu.right') {
        $ctrl.mainMenu_rightArea = area;
      }

    }    
    
})();
    

