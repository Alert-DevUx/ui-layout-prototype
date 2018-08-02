(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.actionMenuRight', {
      templateUrl: 'src/layout/views/area.html',
      controller: ActionMenuRightController
    });
    
    ActionMenuRightController.$inject = ['$stateParams', 'Path'];
    function ActionMenuRightController($stateParams, Path) {
      var $ctrl = this;

      $ctrl.targetPath = $stateParams.targetPath;


    }    
    
})();
    

