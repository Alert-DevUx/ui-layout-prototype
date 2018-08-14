(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.screen', {
      template: '<span class="screen_text">{{$ctrl.screenName}} </span>',
      bindings: {
        screenName: '<'
      },      
      controller: ScreenController
    });
    
    ScreenController.$inject = ['$state'];
    function ScreenController($state) {
      var $ctrl = this;
    } 
    
})();

