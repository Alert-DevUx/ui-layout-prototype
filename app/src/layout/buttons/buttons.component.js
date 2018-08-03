(function () {
    "use strict";
    
    angular.module('layout')
    .component('buttons', {
      templateUrl: 'src/layout/buttons/buttons.html',
      bindings: {
        buttons: '<',
        areaType: '<'
      },
      controller: ButtonsController
    });
    
    function ButtonsController() {
      var $ctrl = this;
     
      $ctrl.getButtonType = function(type) {
        
        var cls = 'roundButton';

        if( type === 'deepnav')  {
          cls = 'deepnavButton'
        } 

        return cls;
      }


      $ctrl.getButtonStyle = function(type) {

        var cls = 'regularBox';
        if( type === 'mainMenu' || type === 'actionMenu') {
              cls = 'menuBox'
        } else 
        if( type === 'deepnav') {
          cls = 'deepnavBox'
        }

        return cls;
      }
    }    

})();