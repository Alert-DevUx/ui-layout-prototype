(function () {
    "use strict";
    
    /*
    Component
    Component to load. Can be of type Crate, SWF, or external application
    */

    angular.module('layout')
    .service('Component', Component);
    
    
    //ComponentService.$inject = ['Path'];
    //function ComponentService(Path) {
    function Component() {    
        var service = this;

        service.constructor = function(type, id) {

            if(!service.validateParams()) {
              throw 'Invalid parameters.';
            }
            service.type = type;
            service.id = id;
        }
      
        service.validateParams = function(type, id) {

            if( type != 'CRATE' || type != 'SWF' || type != 'EXTERNAL' || typeof(id) != 'string') {
                return false;
            }
    
            return  true;
        }
    
        return service.constructor;
    }
    
})();
