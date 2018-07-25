(function () {
    "use strict";
    

    /** 
     * Action
     * Screen actions, not to be confused with the application actions.
     * Always corresponds to load an area and, optionally, specify which button to activated in that area.
     */
    angular.module('layout')
    .factory('Action', Action);

    function Action() {    

        function Action(targetArea, buttonId, component) {

            if(!this.validateParams()) {
              throw 'Invalid parameters.';
            }
            this.targetArea = targetArea;
            this.buttonId = buttonId;
            this.component = component;
        }
      
        Action.prototype.validateParams = function() {
            /*
            1. targetArea is the full qualified name of an area (area's ids from the top level area, joined by ".")
            2. buttonId is of type string. It is optional. If provided should correspond to a valid button id in the provided area.
            3. component is of type component
            */
            return  true;
        }

        return Action;
    }
    
})();
    