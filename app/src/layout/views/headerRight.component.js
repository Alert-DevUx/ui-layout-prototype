(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.headerRight', {
      templateUrl: 'src/layout/views/area.html',
      controller: HeaderRightController
    });
    
    HeaderRightController.$inject = ['$stateParams', 'Path'];
    function HeaderRightController($stateParams, Path) {
      var $ctrl = this;

      $ctrl.targetPath = $stateParams.targetPath;


    }    
    
})();
    

