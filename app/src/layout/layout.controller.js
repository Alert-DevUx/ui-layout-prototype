(function () {
"use strict";

angular.module('layout')
.controller('LayoutController', LayoutController);


LayoutController.$inject = ['LayoutService', 'Path', 'Area', 'Button', 'Action'];

function LayoutController(LayoutService, Path, Area, Button, Action) {
    var service = this;

    var topArea = {};
    service.areas = [];

    LayoutService.getLayout().then(function(layout){


        topArea = new Area(layout.id, layout.description, layout.pos);
        
        topArea.setAreas(getAreas(layout.areas));

        console.log('topArea' , topArea.getArea());

        service.areas = topArea.getAreasAsArray();

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

        var area = new Area(areaJson.id, areaJson.description, areaJson.pos);
 
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
