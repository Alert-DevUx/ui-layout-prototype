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
    
    ButtonController.$inject = ['$state'];
    function ButtonController($state) {
      var $ctrl = this;

      $ctrl.go = function() {
        console.log('GOOOOOOOO')
        // Jump to selected state. Send selected area through state parameters
        $state.go("public.dynamicLayout." + $ctrl.button.action.targetArea, 
            {targetPath: $ctrl.button.action.targetArea});
      }
    }    
    
})();