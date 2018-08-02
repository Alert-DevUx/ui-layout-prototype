(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.mainMenuRight', {
      templateUrl: 'src/layout/views/mainMenuRight.html',
      controller: MainMenuRightController
    });
    
    MainMenuRightController.$inject = ['$state', 'Path'];
    function MainMenuRightController($state, Path) {
      var $ctrl = this;

      var layout = $state.current.data.layout;
      // Get path from state (removing public.dynamicLayout - TODO: REVIEW)
      var path = new Path($state.current.name + '.mainMenuRight').removeHead().removeHead();
      var auxArea = layout.findArea(path);

      $ctrl.mainMenuRightArea = auxArea;
    }    
    
})();
    

