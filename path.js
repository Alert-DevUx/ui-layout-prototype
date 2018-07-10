class Path {
    
    constructor(path) {
        
        this.PATH_SEPARATOR = '.';

        if(!this.validateParams(path)) {
          throw 'Invalid parameters.';
        }
        this.path = path;
    }

    /**
     * Returns the string represnetation of this path object
     */
    toString() {
        return this.path;
    }

    /**
     * Returns the segments of the path as an array
     */
    toArray() {
        return(this.path.split(this.PATH_SEPARATOR));
    }

    /**
     * Return last segment 
     * For instance, if path is 'a.b.c.d', returns d. If path is 'a' returns 'a'
     * If path is not defined returns ''
     */
    getId() {

        if(!this.path)
            return '';

        let pathArr = this.toArray();    
        return pathArr.pop();
    }

    /**
     * Return all path except last dot and last segment
     * For instance, if path is 'a.b.c.d' returns 'a.b.c'. If path is 'a' returns ''
     */
    getParent() {
        let parentPathArr = this.toArray();
        parentPathArr.pop()
        return new Path(parentPathArr.join(this.PATH_SEPARATOR));
    }

    /**
     * Append the provided segment to this path
     * For instance, if this path is 'a.b' and the segment is 'c.d', this path becomes 'a.b.c.d'
     */
    append(segment) {

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
    getHead() {

        let pathArr = this.toArray();
        return pathArr[0];
    }

    /**
     * Remove the head (top most segment) from this path
     * For instance, if this path is 'a.b.c' if becomes 'a.b'
     * If it is 'a' it becomes ''
     */
    removeHead() {

        let pathArr = this.toArray();
        pathArr.shift()
        this.setFromArray(pathArr);
        return this;
    }

    /**
     * Updates the value of path from the segments in the provided array
     */
    setFromArray(pathArray) {
        this.path = pathArray.join(this.PATH_SEPARATOR);
        return this;
    }

    validateParams(path) {
        if( typeof path === 'string') 
            return  true;
        
        return false;
    }    
}

module.exports = Path;
