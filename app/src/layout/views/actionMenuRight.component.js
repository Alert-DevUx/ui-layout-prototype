(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.actionMenuRight', {
      template: '<p>{{$ctrl.targetPath}}</p><buttons buttons="$ctrl.area.buttons"/>',
      controller: ActionMenuRightController
    });
    
    ActionMenuRightController.$inject = ['$stateParams', 'Path'];
    function ActionMenuRightController($stateParams, Path) {
      var $ctrl = this;

      $ctrl.targetPath = $stateParams.targetPath;


    }    
    
})();
    

