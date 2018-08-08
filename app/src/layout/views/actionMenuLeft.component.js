(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.actionMenuLeft', {
      template: '<buttons buttons="$ctrl.actionMenuLeftArea.buttons" area-type=""actionMenuLeft""/>',
      controller: ActionMenuLeftController
    });
    
    ActionMenuLeftController.$inject = ['$state', 'Path'];
    function ActionMenuLeftController($state, Path) {
      var $ctrl = this;

      var layout = $state.current.data.layout;
      // Get path from state (removing public.dynamicLayout - TODO: REVIEW)
      var path = new Path($state.current.name + '.actionMenuLeft').removeHead().removeHead();
      var area = layout.findArea(path);

      if(area.type === 'actionMenuLeft') {
        $ctrl.actionMenuLeftArea = area;
      }


    }    
    
})();
    

