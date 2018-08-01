(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.actionMenuLeft', {
      template: '<p>{{$ctrl.targetPath}}</p><buttons buttons="$ctrl.area.buttons"/>',
      controller: ActionMenuLeftController
    });
    
    ActionMenuLeftController.$inject = ['$stateParams', 'Path'];
    function ActionMenuLeftController($stateParams, Path) {
      var $ctrl = this;

      $ctrl.targetPath = $stateParams.targetPath;


    }    
    
})();
    

