(function () {
"use strict";

angular.module('layout')
.controller('LayoutController', LayoutController);


LayoutController.$inject = ['LayoutService', 'Path', 'Area', 'Button', 'Action'];

function LayoutController(LayoutService, Path, Area, Button, Action) {
    var ctrl = this;

    ctrl.topArea = {};

    LayoutService.getLayout().then(function(layout){


        ctrl.topArea = new Area(layout.id, layout.description, layout.pos, layout.areaName);
        
        ctrl.topArea.setAreas(getAreas(layout.areas));
    });
        


    function getAreas(areasJson) {

        if(!areasJson) 
            return;

        var areas = {}
        for (var key in areasJson) {
            if (areasJson.hasOwnProperty(key)) {
                
                areas[key] = getArea(areasJson[key]);
        
            }
        }
        return areas;
    }

    function getArea(areaJson) {

        var area = new Area(areaJson.id, areaJson.description, areaJson.pos, areaJson.areaName);
 
        area.areas = getAreas(areaJson.areas);

        area.setButtons(getButtons(areaJson.buttons), areaJson.buttonsPos);

        return area;
    }



    function getButtons(buttonsJson) {

        if(!buttonsJson) 
            return;

        var buttons = {}
        for (var key in buttonsJson) {
            if (buttonsJson.hasOwnProperty(key)) {
                
                buttons[key] = getButton(buttonsJson[key]);
            }
        }
        return buttons;
    }


    function getButton(buttonJson) {

        var button = new Button(buttonJson.id, buttonJson.label, buttonJson.icon);

        button.setAction(getAction(buttonJson.action));

        return button;
    }    

    function getAction(actionJson) {

        var action = new Action();

        return action;
    }


}



})();
