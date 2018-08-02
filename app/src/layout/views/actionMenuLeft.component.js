(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.actionMenuLeft', {
      templateUrl: 'src/layout/views/area.html',
      controller: ActionMenuLeftController
    });
    
    ActionMenuLeftController.$inject = ['$stateParams', 'Path'];
    function ActionMenuLeftController($stateParams, Path) {
      var $ctrl = this;

      $ctrl.targetPath = $stateParams.targetPath;


    }    
    
})();
    

