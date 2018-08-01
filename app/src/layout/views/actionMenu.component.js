(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.actionMenu', {
      template: '<p>{{$ctrl.targetPath}}<buttons buttons="$ctrl.area.buttons"/>',
      controller: ActionMenuController
    });
    
    ActionMenuController.$inject = ['$stateParams', 'Path'];
    function ActionMenuController($stateParams, Path) {
      var $ctrl = this;

      $ctrl.targetPath = $stateParams.targetPath;


    }    
    
})();
    

