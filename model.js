const Path = require('./path.js');


/*
Line
Object to store the fields in a line of the input file
Excel formula to create fields attribution from column titles:
=CONCATENATE("this.";SUBSTITUTE(PROPER(A2);"_";""); " = lineArray[";COLUMN(A2)-1;"];")
*/
class Line{
    constructor(line) {
        var lineArray = line.split('\t');

        this.blevel = lineArray[0];
        this.idSysButton = lineArray[1];
        this.icon = lineArray[2];
        this.idSysScreenArea = lineArray[3];
        this.idSysApplicationArea = lineArray[4];
        this.internNameButton = lineArray[5];
        this.screenName = lineArray[6];
        this.existChild = lineArray[7];
        this.idSysButtonProp = lineArray[8];
        this.idSbpParent = lineArray[9];
        this.rank = lineArray[10];
        this.subRank = lineArray[11];
        this.idSoftwareContext = lineArray[12];
        this.flgCancel = lineArray[13];
        this.flgContent = lineArray[14];
        this.flgCreate = lineArray[15];
        this.flgDetail = lineArray[16];
        this.flgDigital = lineArray[17];
        this.flgFreq = lineArray[18];
        this.flgGraph = lineArray[19];
        this.flgHelp = lineArray[20];
        this.flgNo = lineArray[21];
        this.flgOk = lineArray[22];
        this.flgPrint = lineArray[23];
        this.flgSearch = lineArray[24];
        this.flgVision = lineArray[25];
        this.flgAction = lineArray[26];
        this.flgView = lineArray[27];
        this.flgResetContext = lineArray[28];
        this.tooltipTitle = lineArray[29];
        this.tooltipDesc = lineArray[30];
        this.rank2 = lineArray[31];
        this.action = lineArray[32];
        this.flgScreenMode = lineArray[33];
        this.flgGlobalShortcut = lineArray[34];
        this.flgInfoButton = lineArray[35];
    }
}

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
    constructor(id, description, pos, type) {

        if(!this._validateParams()) {
            throw 'Invalid parameters.';
        }
        this.id = id;
        this.description = description;
        this.pos = pos;
        this.type = type;
    }

    addButton(button) {

        if(!button || !button.id) {
            return null;
        }

        if(!this.buttons) {
            // Map to ignore duplicates buttons
            this.buttonsObj = {}
            // Buttons array 
            this.buttons = [];
        }

        // Add the button if it does not exist yet
        if(!this.buttonsObj[button.id]) {
        
            this.buttonsObj[button.id] = button.id;
            // Find index 
            var idx = 0;
            for(var i = 0; i< this.buttons.length; i ++) {
                if(button.rank < this.buttons[i].rank) {
                    break;
                }
                idx ++;
            }
            this.buttons.splice(idx, 0, button); 
        }
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

        if(!this.areas) {
            // Initialize areas object
            this.areas = {}
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
     * id on the path must match this area's id.
     */      
    findArea(path) {

        // Clone path object before calling _findAreaRec because it is changed inside
        return this._findAreaRec(path.clone());
  
    }

    _findAreaRec(path) {

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
                if(this.areas && this.areas[childId]){
                    return this.areas[childId].findArea(path);
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
        4. type is of type string and defines the type of area. the porssible values are: 
            headerLeft,       header,      headerRight',
            mainMenuLeft,     mainMenu,    mainMenuRight',
            deepnav,          screen,      screenRight'
            actionMenuLeft,   actionMenu,  actionMenuRight
        */
        return  true;
    }
}

/*
Button
Button attributes and the screen action it executes when called
*/
class Button {
    constructor(id, status, label, icon, action, rank) {

        if(!this.validateParams()) {
          throw 'Invalid parameters.';
        }
        this.id = id;
        this.status = status;
        this.label = label;
        this.icon = icon;
        this.action = action;
        this.rank = rank;        
    }
  


    validateParams() {
        /*
        1. id is of type String and is mandatory
        2. status is of 'A', 'I', or 'N')
        3. label is the code of the button description text
        4. icon is the code of the button's Icon
        5. action is of type 'Action'
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
    constructor(targetArea, buttonId, component) {

        if(!this.validateParams()) {
          throw 'Invalid parameters.';
        }
        this.targetArea = targetArea;
        if(buttonId) {
            this.buttonId = buttonId;
        }
        if(component) {
            this.component = component;
        }
        
    }
  
    setComponent(component) {
        if(component) {
            this.component = component;
        }
    }  


    validateParams() {
        /*
        1. targetArea is the string representation of the complete area's path
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

        if(!this.validateParams()) {
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

module.exports.Line = Line;
module.exports.Area = Area;
module.exports.Button = Button;
module.exports.Action = Action;
module.exports.Component = Component;
