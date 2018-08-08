(function () {
    "use strict";
    
    angular.module('layout')
    .component('layout.screen', {
      template: '<p>SCREEN: {{$ctrl.screenName}} </p>',
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

