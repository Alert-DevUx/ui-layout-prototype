(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.actionMenu', {
      templateUrl: 'src/layout/views/area.html',
      controller: ActionMenuController
    });
    
    ActionMenuController.$inject = ['$stateParams', 'Path'];
    function ActionMenuController($stateParams, Path) {
      var $ctrl = this;

      $ctrl.targetPath = $stateParams.targetPath;


    }    
    
})();
    

