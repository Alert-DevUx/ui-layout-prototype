(function () {
    "use strict";
    
    angular.module('layout')
    .service('Path', Path);
    
        
    //    PathService.$inject = ['Path'];
    //    function PathService(Path) {
    function Path() {    
        var service = this;

        service.constructor = function (path) {
        
            service.PATH_SEPARATOR = '.';
    
            if(!service.validateParams(path)) {
              throw 'Invalid parameters.';
            }
            service.path = path;
        }

        /**
         * Returns the string represnetation of this path object
         */
        service.toString = function () {
            return service.path;
        }

        /**
         * Returns the segments of the path as an array
         */
        service.toArray = function () {
            return(service.path.split(service.PATH_SEPARATOR));
        }

        /**
         * Return last segment 
         * For instance, if path is 'a.b.c.d', returns d. If path is 'a' returns 'a'
         * If path is not defined returns ''
         */
        service.getId = function () {

            if(!service.path)
                return '';

            let pathArr = service.toArray();    
            return pathArr.pop();
        }

        /**
         * Return all path except last dot and last segment
         * For instance, if path is 'a.b.c.d' returns 'a.b.c'. If path is 'a' returns ''
         */
        service.getParent = function () {
            let parentPathArr = service.toArray();
            parentPathArr.pop()
            return new Path(parentPathArr.join(service.PATH_SEPARATOR));
        }

        /**
         * Append the provided segment to this path
         * For instance, if this path is 'a.b' and the segment is 'c.d', this path becomes 'a.b.c.d'
         */
        service.append = function (segment) {

            if(!service.path) 
                service.path = segment;
            else 
                service.path = service.path + service.PATH_SEPARATOR + segment;

            return service;
        }

        /**
         * Get the head (top most segment) from this path
         * For instance, if this path is 'a.b.c' if returns 'a'
         * If it is 'a' it returns ''
         * If it is '' it returns ''
         */
        service.getHead = function () {

            let pathArr = service.toArray();
            return pathArr[0];
        }

        /**
         * Remove the head (top most segment) from this path
         * For instance, if this path is 'a.b.c' if becomes 'a.b'
         * If it is 'a' it becomes ''
         */
        service.removeHead = function () {

            let pathArr = service.toArray();
            pathArr.shift()
            service.setFromArray(pathArr);
            return service;
        }

        /**
         * Updates the value of path from the segments in the provided array
         */
        service.setFromArray = function (pathArray) {
            service.path = pathArray.join(service.PATH_SEPARATOR);
            return service;
        }

        service.validateParams = function (path) {
            if( typeof path === 'string') 
                return  true;
            
            return false;
        }  
    
        return service.constructor;
    }

})();      