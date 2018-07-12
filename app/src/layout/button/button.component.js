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
    
    function ButtonController() {
      var $ctrl = this;
    }    
    
})();