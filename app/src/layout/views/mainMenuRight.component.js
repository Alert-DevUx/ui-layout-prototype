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

      // Building path for this area (REVIEW - can be received as data?)
      var auxPath = new Path($state.current.name).removeHead().removeHead();
      var path = auxPath.getHead();
      auxPath.removeHead();
      path = path + '.' + auxPath.getHead() + '.mainMenuRight';

      var area = layout.findArea(new Path(path));

      $ctrl.mainMenuRightArea = area;            
    }    
    
})();
    

