(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.screen', {
      template: 'OLA',
      controller: ScreenController
    });
    
    ScreenController.$inject = ['$state', 'Path'];
    function ScreenController($state, Path) {
      var $ctrl = this;

      var layout = $state.current.data.layout;
      // Get path from state (removing public.dynamicLayout - TODO: REVIEW)
      
      var path = new Path($state.current.name + '.screen').removeHead().removeHead();
     
      var auxArea = layout.findArea(path);

      $ctrl.headerLeftArea = auxArea;


    }    
    
})();
    

