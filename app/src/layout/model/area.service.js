(function () {
    "use strict";
    
    /** 
    Area
    Screen area. Includes an id, its position in the screen, a list of buttons, a list of child areas,
    and optionally a component to load
    */
    angular.module('layout')
    .factory('Area', Area);
    
    Area.$inject = ['Path'];
    function Area(Path) {

        function Area(id, description, pos, type) {

            if(!this.validateParams()) {
                throw 'Invalid parameters.';
            }
            this.id = id;
            this.description = description;
            this.pos = pos;
            this.type = type;
            // Buttons array
            this.buttons = [];
            // Child areas map
            this.areas = {};
            // Path
            this.path = "";
        }      

        Area.prototype.getAreasAsArray = function() {
            var areasArray = [];

            for (var key in this.areas) {
                if (this.areas.hasOwnProperty(key)) {
                    areasArray.push(this.areas[key]);
                }
            }

            return areasArray;
        }

        Area.prototype.setButtons = function(buttons) {

            // for each key in buttons
            for(let key in buttons) {
                // adds button
                this.addButton(buttons[key]);
            }
        }

        /** Add button at provided index. Append if index is not provided */
        Area.prototype.addButton = function(button, idx) {

            if(idx) { 
                this.buttons.splice(idx, 0, button); 
            } else {
                this.buttons.push(button);
            }
        }
        
        Area.prototype.delButton = function(button) {
            // TODO: IMPLEMENT
        } 

        Area.prototype.setAreas = function(areas) {

            this.areas = areas;
        }

        Area.prototype.getArea = function() {   
            return this;
        }

        /**
         * Add object area to the area specified by parentPath. 
         * If the parentPath is not provided then add it to this area.
         * Returns the path of the added area or null if the provided parentPath does not exist.
         * 
         * Note that the parentPath is relative to the current area (See findArea method description).
         */
        Area.prototype.addArea = function(area, parentPath) {

            if(!area) {
                return null;
            }

            if(!parentPath || !parentPath.getId()) {
                // If parent is not provided then add to current  
                this.areas[area.id] = area;
            } else {

                let parentArea = this.findArea(parentPath);
                if(parentArea) {
                    parentArea.addArea(area);
                    let path = new Path(parentPath.toString());
                    path.append(area.id)
                    return path;

                } else {
                    console.log('addArea: path does not exist, returning...');
                    return null;
                }
            }
        }

        Area.prototype.delArea = function(area) {
            // TODO: IMPLEMENT
        } 

   
        /**
         * The path to an area is a '.' separated string of the ids of the area ancestors in the areas'
         * tree.
         * 
         * This method expect a path relative to the position of this area in the tree. I.e., the first
         * id on the path must match this area's id.
         */    
        Area.prototype.findArea = function(path) {

            // Clone path object before calling _findAreaRec because it is changed inside
            return this._findAreaRec(path.clone());
    
        }

        Area.prototype._findAreaRec = function(path) {

            if(path.toString() === this.id) {
                // Id matches at last level: Found!
                return this;
            } else {
                // If top most element of path matches this id...
                if(path.getHead() === this.id) {
                    // remove top most element from path...
                    path.removeHead();
                    // and continue searching in the child which id is the head of the new path
                    var childId = path.getHead();
                    if(this.areas[childId]){
                        return this.areas[childId].findArea(path);
                    }
                }
            }

            // List of areas ended without a match: Not Found.
            return null;
        }


        Area.prototype.validateParams = function() {
            /*
            1. id is of type String and is mandatory
            2. description is of type String and is mandatory
            3. pos is of type int and correspond to a fixed position in the screen
            4. elements of 'buttons' array are of type 'Button'
            5. elements of 'areas' array are of type 'Area'
            6. component is of type string and identifies the element (swf or crate) to load 
            */
            return  true;
        }
        return Area;
    }
    
   
    
})();
    