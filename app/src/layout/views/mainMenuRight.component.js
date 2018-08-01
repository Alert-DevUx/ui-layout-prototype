(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.mainMenuRight', {
      template: '<p>{{$ctrl.targetPath}}</p><buttons buttons="$ctrl.area.buttons"/>',
      controller: MainMenuRightController
    });
    
    MainMenuRightController.$inject = ['$stateParams', 'Path'];
    function MainMenuRightController($stateParams, Path) {
      var $ctrl = this;

      $ctrl.targetPath = $stateParams.targetPath;


    }    
    
})();
    

