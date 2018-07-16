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

      $ctrl.getButtonsStyle = function(path) {

        var re = new RegExp('([0-9]\.){2,}');

        if (re.test(path)) {
          return 'buttons1';
        } else {
           return 'buttons';
        }
      }
    }    

})();