(function () {
    "use strict";
    
    /**
    Button
    Button attributes and the screen action it executes when called
    */

    angular.module('layout')
    .factory('Button', Button);
    
    function Button() {    

        function Button(id, status, label, icon, action, areaId) {

            if(!this.validateParams()) {
              throw 'Invalid parameters.';
            }
            this.id = id;
            this.status = status;
            this.label = label;
            this.icon = icon;
            this.action = action;
            this.areaId = areaId;

            this.path = "";
        }
      
        Button.prototype.setAction = function(action) {

            //TODO: Implement
            return '';
        }


        Button.prototype.validateParams = function() {
            /*
            1. id is of type String and is mandatory
            2. status is of 'A', 'I', or 'N')
            3. label is the code of the button description text
            4. icon is the code of the button's Icon
            5. action is of type 'Action'
            */
            return true;
        }
    
        return Button;
    }
    
})();
    