(function () {
    "use strict";
    
    /*
    Component
    Component to load. Can be of type Crate, SWF, or external application
    */

    angular.module('layout')
    .service('Component', Component);
    
    function Component() {    

        function Component(type, id) {

            if(!this.validateParams(type, id)) {
              throw 'Component - Invalid parameters.';
            }
            this.type = type;
            this.id = id;
        }
      
        Component.prototype.validateParams = function(type, id) {

            if( type != 'CRATE' && 
                type != 'SWF' &&
                type != 'EXTERNAL' &&
                typeof(id) != 'string') {
                
                return false;
            }
            return  true;
        }
    
        return Component;
    }
    
})();
