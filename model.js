const Path = require('./path.js');

/*
Layout
Includes the id, the description and the layout's top level area
*/

/*
class Layout {
    constructor(id, description, area) {

        if(!validateParams) {
            throw 'Invalid parameters.';
        }
        this.id = id;
        this.description = description;
        this.area = area;
    }

    validateParams() {
        return  true;
    }
}
*/

/** 
Area
Screen area. Includes an id, its position in the screen, a list of buttons, and a list of child areas
*/
class Area {
    constructor(id, description, pos, areaName) {

        if(!this._validateParams()) {
            throw 'Invalid parameters.';
        }
        this.id = id;
        this.description = description;
        this.pos = pos;
        this.areaName = areaName;
        // Buttons map
        this.buttons = {};
        // Array of button ids to keep track of the buttons' position in the area
        this.buttonsPos = [];
        // Child areas map
        this.areas = {};
    }

    addButton(button, pos) {
        if(pos) { 
            this.buttonsPos.splice(pos, 0, button.id); 
        } else {
            this.buttonsPos.push(button.id);
        }

        this.buttons[button.id] = button;
    }

    delButton(button) {
        // TODO: IMPLEMENT
    } 

   /**
     * Add object area to the area specified by parentPath. 
     * If the parentPath is not provided then add it to this area.
     * Returns the path of the added area or null if the provided parentPath does not exist.
     * 
     * Note that the parentPath is relative to the current area (See findArea method description).
     */
    addArea(area, parentPath) {

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

    delArea(area) {
        // TODO: IMPLEMENT
    } 


   
   /**
     * The path to an area is a '.' separated string of the ids of the area ancestors in the areas'
     * tree.
     * 
     * This method expect a path relative to the position of this area in the tree. I.e., the first
     * id on the path must match one of the child areas of this area.
     */    
    findArea(path) {

        // Clone path object before calling _findAreaRec because it is changed in 
        return this._findAreaRec(new Path(path.toString()));
  
    }

    _findAreaRec(path) {
        for (var key in this.areas) {
            if (this.areas.hasOwnProperty(key)) {

                let childArea = this.areas[key];
                if(path.getHead() === childArea.id) {
                    // Remove path head
                    path.removeHead();
                    if(path.toString() === '') {
                        // Id matches at last level: Found!
                        return childArea;
                    } else {
                        // Proceed with search at next level removing the first position of the array
                        return childArea.findArea(path);
                    }
                }
            }
        }

        // List of areas ended without a match: Not Found.
        return null;
    }


    _validateParams() {
        /*
        1. id is of type String and is mandatory
        2. description is of type String and is mandatory
        3. pos is of type int and correspond to a fixed position in the screen
        4. elements of 'buttons' array are of type 'Button'
        5. elements of 'areas' array are of type 'Area'
        */
        return  true;
    }
}

/*
Button
Button attributes and the screen action it executes when called
*/
class Button {
    constructor(id, label, icon, action, areaId) {

        if(!this.validateParams()) {
          throw 'Invalid parameters.';
        }
        this.id = id;
        this.label = label;
        this.icon = icon;
        this.action = action;
        this.areaId = areaId;
    }
  


    validateParams() {
        /*
        1. id is of type String and is mandatory
        2. label is the code of the button description text
        3. icon is the code of the button's Icon
        4. action is of type 'Action'
        */
        return  true;
    }
}

/*
Action
Screen actions, not to be confused with the application actions.
Allows to specify an area to go to, and optionally, a button to activated in that area and/or a component to load.
*/
class Action {
    constructor(areaFqn, button, component) {

        if(!validateParams()) {
          throw 'Invalid parameters.';
        }
        this.areaFqn = areaFqn;
        this.button = button;
        this.component = component;
        
    }
  
    setComponent(component) {
        this.component = component;
    }  


    validateParams() {
        /*
        1. areaFqn is the full qualified name of an area (area's ids from the top level area, joined by ".")
        2. button is of type string. It is optional. If provided should correspond to a valid button id in the provided area.
        */
        return  true;
    }
}

/*
Component
Component to load. Can be of type Crate, SWF, or external application
*/
class Component {
    constructor(type, id) {

        if(!validateParams()) {
          throw 'Invalid parameters.';
        }
        this.type = type;
        this.id = id;
    }
    
    validateParams() {
        /*
        1. type can be: CRATE, SWF, or EXTERNAL
        2. id must be of type string
        */
        return  true;
    }
}



/** */
processButton = function(lineArr) {

    areaPath = new Path(pathMap[lineArr[6]]);

    area = topArea.findArea(areaPath);

    button = getButton(lineArr, area.id);

    area.addButton(button);
}


module.exports.Area = Area;
module.exports.Button = Button;
module.exports.Action = Action;
module.exports.Component = Component;