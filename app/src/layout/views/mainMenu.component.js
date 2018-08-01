(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.mainMenu', {
      template: '<p>{{$ctrl.targetPath}}</p><buttons buttons="$ctrl.area.buttons"/>',
      controller: MainMenuController
    });
    
    MainMenuController.$inject = ['$stateParams', 'Path'];
    function MainMenuController($stateParams, Path) {
      var $ctrl = this;

      $ctrl.targetPath = $stateParams.targetPath;


    }    
    
})();
    

