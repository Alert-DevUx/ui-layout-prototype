(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.actionMenuRight', {
      template: '<buttons buttons="$ctrl.actionMenuRightArea.buttons" area-type=""actionMenuRight""/>',
      controller: ActionMenuRightController
    });
    
    ActionMenuRightController.$inject = ['$state', 'Path'];
    function ActionMenuRightController($state, Path) {
      var $ctrl = this;

      var layout = $state.current.data.layout;
      // Get path from state (removing public.dynamicLayout - TODO: REVIEW)
      var path = new Path($state.current.name + '.actionMenuRight').removeHead().removeHead();
      var auxArea = layout.findArea(path);

      $ctrl.actionMenuRightArea = auxArea;


    }    
    
})();
    

