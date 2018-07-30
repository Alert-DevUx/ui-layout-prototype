(function () {
    "use strict";
    
    angular.module('layout')
    .component('button', {
      templateUrl: 'src/layout/button/button.html',
      bindings: {
        button: '<'
      },
      controller: ButtonController
    });
    
    ButtonController.$inject = ['$state', 'LAYOUT_BASE_STATE'];
    function ButtonController($state, LAYOUT_BASE_STATE) {
      var $ctrl = this;

      $ctrl.go = function() {
        // Jump to selected state. Send selected area through state parameters
        if($ctrl.button.action && $ctrl.button.action.targetArea) {
          $state.go(LAYOUT_BASE_STATE + "." + $ctrl.button.action.targetArea);
        }
      }
    }    
    
})();