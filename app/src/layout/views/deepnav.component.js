(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.deepnav', {
      template: '<p>{{$ctrl.targetPath}}</p><buttons buttons="$ctrl.area.buttons"/>',
      controller: DeepnavController
    });
    
    DeepnavController.$inject = ['$stateParams', 'Path'];
    function DeepnavController($stateParams, Path) {
      var $ctrl = this;

      $ctrl.targetPath = $stateParams.targetPath;


    }    
    
})();
    

