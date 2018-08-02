(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.headerLeft', {
      templateUrl: 'src/layout/views/area.html',
      controller: HeaderLeftController
    });
    
    HeaderLeftController.$inject = ['$stateParams', 'Path'];
    function HeaderLeftController($stateParams, Path) {
      var $ctrl = this;

      $ctrl.targetPath = $stateParams.targetPath;


    }    
    
})();
    

