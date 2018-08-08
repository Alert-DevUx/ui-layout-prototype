(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.mainMenuRight', {
      template: '<buttons buttons="$ctrl.mainMenuRightArea.buttons" area-type="\'mainMenuRight\'"/>',
      controller: MainMenuRightController
    });
    
    MainMenuRightController.$inject = ['$state', 'Path'];
    function MainMenuRightController($state, Path) {
      var $ctrl = this;

      var layout = $state.current.data.layout;
      // Get path from state (removing public.dynamicLayout - TODO: REVIEW)
      var path = new Path($state.current.name + '.mainMenuRight').removeHead().removeHead();
      var area = layout.findArea(path);

      if(area.type === 'mainMenuRight') {
        $ctrl.mainMenuRightArea = area;
      }
    }    
    
})();
    

