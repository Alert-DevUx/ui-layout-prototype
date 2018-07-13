(function () {
    "use strict";
    
    angular.module('layout')
    .factory('Path', Path);
    
    
    function Path() {

        function Path(path) {
        
            this.PATH_SEPARATOR = '.';
    
            if(!this.validateParams(path)) {
              throw 'Invalid parameters.';
            }
            this.path = path;
        }

        /**
         * Returns the string represnetation of this path object
         */
        Path.prototype.toString = function () {
            return this.path;
        }

        /**
         * Returns the segments of the path as an array
         */
        Path.prototype.toArray = function () {
            return(this.path.split(this.PATH_SEPARATOR));
        }

        /**
         * Return last segment 
         * For instance, if path is 'a.b.c.d', returns d. If path is 'a' returns 'a'
         * If path is not defined returns ''
         */
        Path.prototype.getId = function () {

            if(!this.path)
                return '';

            let pathArr = this.toArray();    
            return pathArr.pop();
        }

        /**
         * Return all path except last dot and last segment
         * For instance, if path is 'a.b.c.d' returns 'a.b.c'. If path is 'a' returns ''
         */
        Path.prototype.getParent = function () {
            let parentPathArr = this.toArray();
            parentPathArr.pop()
            return new Path(parentPathArr.join(this.PATH_SEPARATOR));
        }

        /**
         * Append the provided segment to this path
         * For instance, if this path is 'a.b' and the segment is 'c.d', this path becomes 'a.b.c.d'
         */
        Path.prototype.append = function (segment) {

            if(!this.path) 
                this.path = segment;
            else 
                this.path = this.path + this.PATH_SEPARATOR + segment;

            return this;
        }

        /**
         * Get the head (top most segment) from this path
         * For instance, if this path is 'a.b.c' if returns 'a'
         * If it is 'a' it returns ''
         * If it is '' it returns ''
         */
        Path.prototype.getHead = function () {

            let pathArr = this.toArray();
            return pathArr[0];
        }

        /**
         * Remove the head (top most segment) from this path
         * For instance, if this path is 'a.b.c' if becomes 'a.b'
         * If it is 'a' it becomes ''
         */
        Path.prototype.removeHead = function () {

            let pathArr = this.toArray();
            pathArr.shift()
            this.setFromArray(pathArr);
            return this;
        }

        /**
         * Updates the value of path from the segments in the provided array
         */
        Path.prototype.setFromArray = function (pathArray) {
            this.path = pathArray.join(this.PATH_SEPARATOR);
            return this;
        }

        Path.prototype.validateParams = function (path) {
            if( typeof path === 'string') 
                return  true;
            
            return false;
        }  
    
        return Path;
    }

})();      