(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.headerLeft', {
      template: '<p>{{$ctrl.targetPath}}</p><buttons buttons="$ctrl.area.buttons"/>',
      controller: HeaderLeftController
    });
    
    HeaderLeftController.$inject = ['$stateParams', 'Path'];
    function HeaderLeftController($stateParams, Path) {
      var $ctrl = this;

      $ctrl.targetPath = $stateParams.targetPath;


    }    
    
})();
    

