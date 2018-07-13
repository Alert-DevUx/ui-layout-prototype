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
        
        var path = layout.id;
        ctrl.topArea.path = path;

        ctrl.topArea.setAreas(getAreas(layout.areas, path));
    });
        
    function getAreas(areasJson, path) {

        if(!areasJson) 
            return;

        var areas = {}
        for (var key in areasJson) {
            if (areasJson.hasOwnProperty(key)) {
                
                areas[key] = getArea(areasJson[key], path);
        
            }
        }
        return areas;
    }

    function getArea(areaJson, parentPath) {

        var area = new Area(areaJson.id, areaJson.description, areaJson.pos, areaJson.areaName);
        
        var path = parentPath + "." + areaJson.id;

        area.path = path;
        area.areas = getAreas(areaJson.areas, path);

        area.setButtons(getButtons(areaJson.buttons, path));

        return area;
    }

    function getButtons(buttonsJson, parentPath) {

        if(!buttonsJson) 
            return;

        var buttons = {}
        for (var key in buttonsJson) {
            if (buttonsJson.hasOwnProperty(key)) {
                
                buttons[key] = getButton(buttonsJson[key], parentPath);
            }
        }
        return buttons;
    }


    function getButton(buttonJson, parentPath) {

        var button = new Button(buttonJson.id, buttonJson.label, buttonJson.icon, buttonJson.action, buttonJson.areaId);

        var path = parentPath + "." + buttonJson.id;

        button.path = parentPath;
        button.setAction(getAction(buttonJson.action));

        return button;
    }    

    function getAction(actionJson) {

        var action = new Action();

        return action;
    }


}



})();
