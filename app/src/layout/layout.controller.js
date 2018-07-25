(function () {
"use strict";

angular.module('layout')
.controller('LayoutController', LayoutController);

LayoutController.$inject = ['LayoutService'];

function LayoutController(LayoutService) {
    var ctrl = this;

    ctrl.topArea = {};

    LayoutService.getLayout().then(function(layout){

        ctrl.topArea = layout;
    });
}

})();
