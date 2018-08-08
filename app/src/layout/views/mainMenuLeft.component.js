(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.mainMenuLeft', {
      template: '<buttons buttons="$ctrl.mainMenuLeftArea.buttons" area-type="\'mainMenuLeft\'"/>',
      controller: MainMenuLeftController
    });
    
    MainMenuLeftController.$inject = ['$state', 'Path'];
    function MainMenuLeftController($state, Path) {
      var $ctrl = this;

      var layout = $state.current.data.layout;
      // Get path from state (removing public.dynamicLayout - TODO: REVIEW)
      var path = new Path($state.current.name + '.mainMenuLeft').removeHead().removeHead();
      var area = layout.findArea(path);

      if(area.type === 'mainMenuLeft') {
        $ctrl.mainMenuLeftArea = area;
      }
    }    
    
})();
    

