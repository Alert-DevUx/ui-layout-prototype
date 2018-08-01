(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.headerRight', {
      template: '<p>{{$ctrl.targetPath}}</p><buttons buttons="$ctrl.area.buttons"/>',
      controller: HeaderRightController
    });
    
    HeaderRightController.$inject = ['$stateParams', 'Path'];
    function HeaderRightController($stateParams, Path) {
      var $ctrl = this;

      $ctrl.targetPath = $stateParams.targetPath;


    }    
    
})();
    

