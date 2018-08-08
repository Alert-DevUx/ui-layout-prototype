(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.headerRight', {
      template: '<buttons buttons="$ctrl.headerRightArea.buttons" area-type="\'headerRight\'"/>',
      controller: HeaderRightController
    });
    
    HeaderRightController.$inject = ['$state', 'Path'];
    function HeaderRightController($state, Path) {
      var $ctrl = this;

      var layout = $state.current.data.layout;
      // Get path from state (removing public.dynamicLayout - TODO: REVIEW)
      var path = new Path($state.current.name + '.headerRight').removeHead().removeHead();
      var area = layout.findArea(path);

      if(area.type === 'headerRight') {
        $ctrl.headerRightArea = area;
      }



    }    
    
})();
    

