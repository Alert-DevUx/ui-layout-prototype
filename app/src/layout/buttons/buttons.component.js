(function () {
    "use strict";
    
    angular.module('layout')
    .component('buttons', {
      templateUrl: 'src/layout/buttons/buttons.html',
      bindings: {
        buttons: '<'
      },
      controller: ButtonsController
    });
    
    function ButtonsController() {
      var $ctrl = this;
    }    

})();