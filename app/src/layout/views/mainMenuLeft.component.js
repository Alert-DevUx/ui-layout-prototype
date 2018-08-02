(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.mainMenuLeft', {
      templateUrl: 'src/layout/views/mainMenuLeft.html',
      controller: MainMenuLeftController
    });
    
    MainMenuLeftController.$inject = ['$state', 'Path'];
    function MainMenuLeftController($state, Path) {
      var $ctrl = this;

      var layout = $state.current.data.layout;
      // Get path from state (removing public.dynamicLayout - TODO: REVIEW)
      var path = new Path($state.current.name + '.mainMenuLeft').removeHead().removeHead();
      var auxArea = layout.findArea(path);

      $ctrl.mainMenuLeftArea = auxArea;
    }    
    
})();
    

