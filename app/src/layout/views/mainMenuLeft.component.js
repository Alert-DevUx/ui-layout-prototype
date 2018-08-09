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

      // Building path for this area (REVIEW - can be received as data?)
      var auxPath = new Path($state.current.name).removeHead().removeHead();
      var path = auxPath.getHead();
      auxPath.removeHead();
      path = path + '.' + auxPath.getHead() + '.mainMenuLeft';

      var area = layout.findArea(new Path(path));

      $ctrl.mainMenuLeftArea = area;      
    }    
    
})();
    

