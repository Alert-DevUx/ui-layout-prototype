fs = require('fs');
readline = require('readline');

const Path = require('./path.js');
const Model = require('./model.js');
const Line = Model.Line;
const Area = Model.Area;
const Button = Model.Button;
const Action = Model.Action;
const Component = Model.Component;

/**
 * Map application areas with new model area ids
 */
const appAreaIdsMap = { '600': 'entry', '601': 'patient', '602': 'tools'}

/**
 * Map screen areas with new model area ids
 */
const screenAreaIdsMap = {  '1': 'headerRight', 
                            '2': 'actionMenuLeft', 
                            '3': 'mainMenu.left', 
                            '4': 'mainMenu.right', 
                            '5': 'deepnav',
                            '6': 'headerLeft', 
                            '7': 'actionMenuRight', 
                            '8': 'mainMenuLeft',
                            '9': 'mainMenuRight',
                           '10': 'actionMenu.left', 
                           '11': 'actionMenu.right' 
                        }
/**
 * Properties by area
 */


const areaMap = { 
    'entry'  : {'description': 'Inpatient main grid',      'pos': 0,   'type': '' },
    'patient': {'description': 'Inpatient patient area',   'pos': 0,   'type': '' },
    'tools'  : {'description': 'Inpatient tools area',     'pos': 0,   'type': '' },

    'entry.headerLeft'      : {'description': 'Personal settings area',   'pos': 6,   'type': 'headerLeft' },
    'entry.headerRight'     : {'description': 'Logout button area',       'pos': 1,   'type': 'headerRight' },
    'entry.mainMenuLeft'    : {'description': 'Alerts area',              'pos': 8,   'type': 'mainMenuLeft' },     
    'entry.mainMenu'        : {'description': 'Main menu',                'pos': 3,   'type': 'mainMenu' }, 
    'entry.mainMenu.left'   : {'description': 'Main menu left',           'pos': 3,   'type': 'mainMenu' },
    'entry.mainMenu.right'  : {'description': 'Main menu right',          'pos': 4,   'type': 'mainMenu' },
    'entry.actionMenuLeft'  : {'description': 'Back button area',         'pos': 2,   'type': 'actionMenuLeft' },            
    'entry.actionMenu'      : {'description': 'Bottom menu',              'pos': 10,  'type': 'actionMenu' },
    'entry.actionMenu.left' : {'description': 'Bottom menu left',         'pos': 10,  'type': 'actionMenu' },
    'entry.actionMenu.right': {'description': 'Bottom menu right',        'pos': 11,  'type': 'actionMenu' },
    'entry.actionMenuRight' : {'description': 'Ok area',                  'pos': 7,   'type': 'actionMenuRight' },
    'entry.mainMenuRight'   : {'description': 'Search area',              'pos': 9,   'type': 'mainMenuRight' },

    'patient.headerLeft'      : {'description': 'Personal settings area',   'pos': 6,   'type': 'headerLeft' },
    'patient.headerRight'     : {'description': 'Logout button area',       'pos': 1,   'type': 'headerRight' },
    'patient.mainMenuLeft'    : {'description': 'Alerts area',              'pos': 8,   'type': 'mainMenuLeft' },     
    'patient.mainMenu'        : {'description': 'Main menu',                'pos': 3,   'type': 'mainMenu' }, 
    'patient.mainMenu.left'   : {'description': 'Main menu left',           'pos': 3,   'type': 'mainMenu' },
    'patient.mainMenu.right'  : {'description': 'Main menu right',          'pos': 4,   'type': 'mainMenu' },
    'patient.actionMenuLeft'  : {'description': 'Back button area',         'pos': 2,   'type': 'actionMenuLeft' },            
    'patient.actionMenu'      : {'description': 'Bottom menu',              'pos': 10,  'type': 'actionMenu' },
    'patient.actionMenu.left' : {'description': 'Bottom menu left',         'pos': 10,  'type': 'actionMenu' },
    'patient.actionMenu.right': {'description': 'Bottom menu right',        'pos': 11,  'type': 'actionMenu' },
    'patient.actionMenuRight' : {'description': 'Ok area',                  'pos': 7,   'type': 'actionMenuRight' },
    'patient.mainMenuRight'   : {'description': 'Search area',              'pos': 9,   'type': 'mainMenuRight' },

    'tools.headerLeft'      : {'description': 'Personal settings area',   'pos': 6,   'type': 'headerLeft' },
    'tools.headerRight'     : {'description': 'Logout button area',       'pos': 1,   'type': 'headerRight' },
    'tools.mainMenuLeft'    : {'description': 'Alerts area',              'pos': 8,   'type': 'mainMenuLeft' },     
    'tools.mainMenu'        : {'description': 'Main menu',                'pos': 3,   'type': 'mainMenu' }, 
    'tools.mainMenu.left'   : {'description': 'Main menu left',           'pos': 3,   'type': 'mainMenu' },
    'tools.mainMenu.right'  : {'description': 'Main menu right',          'pos': 4,   'type': 'mainMenu' },
    'tools.actionMenuLeft'  : {'description': 'Back button area',         'pos': 2,   'type': 'actionMenuLeft' },            
    'tools.actionMenu'      : {'description': 'Bottom menu',              'pos': 10,  'type': 'actionMenu' },
    'tools.actionMenu.left' : {'description': 'Bottom menu left',         'pos': 10,  'type': 'actionMenu' },
    'tools.actionMenu.right': {'description': 'Bottom menu right',        'pos': 11,  'type': 'actionMenu' },
    'tools.actionMenuRight' : {'description': 'Ok area',                  'pos': 7,   'type': 'actionMenuRight' },
    'tools.mainMenuRight'   : {'description': 'Search area',              'pos': 9,   'type': 'mainMenuRight' },    
}

/** */
getPaths = function(lines) {
    // For each line, compute the path of the corresponding area
    lines.forEach(function(line){
        line.path = getPath(line);    
        console.log(line.path.toString());    
    });
}

/**
 * Return the provided string in camel case
 */
camelize = function (str) {
    str = str.toLowerCase();
    return str.replace(/\W+(.)/g, function(match, chr){
          return chr.toUpperCase();
    });
}

/**
 * Get the id for the deepnav from the values in the INTER_NAME_BUTTON column
 */
getButtonIdFromInternalName = function (id) {

    id = id.toLowerCase();
    // Remove sub string 'deep_nav_' from the beggining
    id = id.replace(new RegExp('^deep_nav_', 'i'),'');
    // Remove sub string 'deepnav_' from the beggining
    id = id.replace(new RegExp('^deepnav_', 'i'),'');
    // Remove sub string 'subdeepnav_' from the beggining
    id = id.replace(new RegExp('^subdeepnav_', 'i'),'');
    // Remove underscores
    id = id.replace(new RegExp('_', 'g'),'.');

    return camelize(id);    
}

/** 
 * Compute the path for the provided line 
 */
getPath = function(line){

    // If the line's path was already computed, just return it
    if(line.path) {
        return line.path;
    }

    // The line's path is the path of the parent concatenated with the line's id
    var areaPath = getParentPath(line).clone();
    
    if(line.idSysScreenArea != '5' ) {
        // If the line is not a deepnav just use the name defined in the map
        areaPath.append(screenAreaIdsMap[line.idSysScreenArea]);
    } else {
        // If the line is a deepnav, the area is named after the parent's internal name
        areaPath.append(getButtonIdFromInternalName(getParentLine(line).internNameButton));

        // Deepnavs that have child deepnavs define new areas that have to be added to the area map,
        // for the areas processing logic to work.
        setdMapEntry(areaPath);
    }
 
    // Add this line as the target to the parent (if there is one). This info will be used to create
    // the navigation action in the button of the parent line
    if(line.idSbpParent) {
        getParentLine(line).targetArea = topAreaId + '.' + areaPath.toString();
    }
    // If line includes a screen names then define 'screen' (grandchild of the top area) as 
    // its target area (where the screen are loaded).
    /*
    if(line.screenName) {

        var screenAreaPath = areaPath.clone();
        line.targetArea = topAreaId + '.' + screenAreaPath.getHead() + '.screen';
    }
    */

    // Note that, the two previous blocks assume that an area which is a parent of another area can
    // not have a screen name (either loads a screen or loads another area).

    return areaPath;
}

/**
 * Build map entry for a dynamically created path (for deepnav areas).
 */
setdMapEntry = function(areaPath) {
    let mapEntry = {};

    let parentMapEntry = areaMap[areaPath.getParent().toString()];
    mapEntry.description = areaPath.getId() + " deepnavs";
    mapEntry.pos = 5;
    mapEntry.type = 'deepnav';
    areaMap[areaPath.toString()] = mapEntry;
}

/** get the parent line for the provided line (parent sys_button_prop) */
getParentLine = function(line) {

    var parentLine;
    // get parent line
    lines.some(function(l){
        if(l.idSysButtonProp == line.idSbpParent) {
            parentLine = l;
            return true;
        }
    });

    return parentLine;
}

/** get the path for the parent of line (parent sys_button_prop) */
getParentPath = function(line){

    var parentPath;
    var parentLine = getParentLine(line);

    if(parentLine) {
        // if there is a parent line then get its path
        parentPath = getPath(parentLine);
    } else {
        // return top level path (using id_sys_application_area)
        parentPath = new Path(appAreaIdsMap[line.idSysApplicationArea]);
    }

    return parentPath;
}

/** */
getAreaIdForLine = function(line) {

    if(line.idSysScreenArea === '5' && line.action === 'NXTLEVEL') {
        getButtonIdFromInternalName(line.internNameButton);
    }
    return screenAreaIdsMap[line.idSysScreenArea];
}

/** */
processAreas = function(lines) {

    lines.forEach(function(line){
        processArea(line);
    });

    //Add areas for main screens
    /*
    for (var areaId in topArea.areas) {
        if (topArea.areas.hasOwnProperty(areaId)) {
            topArea.areas[areaId].addArea(new Area('screen', 'Main screen area for ' + areaId, 12, 'screen'));
        }
    }
    */
}

/** 
 * Process the remaining areas
*/
processArea = function(line) {

    var auxPath = new Path('');
    let area = {};

    // Iterate down the path and, if necessary, create the areas for each level.
    line.path.toArray().forEach(function(e){
        
        auxPath.append(e);
        parentPath = auxPath.getParent();

        if(!topArea.findArea(auxPath)) {
            area = getArea(auxPath);

            var p = parentPath.toString() ? parentPath.toString() + '.' : '';
            console.log('Adding area ' + p + area.id + '...');

            topArea.addArea(area, parentPath);
        } 
    });

    // If the line includes a screen then add an child area for holding that screen
    if(line.screenName) {
        var screenParentPath = line.path.clone();
        topArea.addArea(new Area('screen', 'Screen', 12, 'screen'), screenParentPath);
    }
}

/**
 * Get area
 */
getArea = function(path) {

    console.log('getArea - path.toString(): ' + path.toString());
    /*
    if(path.toString().endsWith('.screen')) {
        // Screen areas special case 
        return new Area('screen', 'Screen', 12, 'screen');
    } else {
        */
        return new Area(path.getId(), areaMap[path.toString()].description, areaMap[path.toString()].pos, areaMap[path.toString()].type);
        /*
    }
    */
}

/** */
processButtons = function(lines) {

    lines.forEach(function(line){
        if(line.idSysScreenArea != 12 ) { // Ignore areas for screens
            processButton(line);
        }
    });

}

/** */
processButton = function(line) {

    area = topArea.findArea(line.path);

    button = getButton(line);

    area.addButton(button);
}

/**
 * Creates a button object from the information in the line
 */
getButton = function(line) {

    let id = getButtonIdFromInternalName(line.internNameButton);

    let component = null;
    if(line.screenName) {
        line.targetArea = topAreaId + '.' + line.path + '.screen';
        component = new Component('SWF', line.screenName);
    }

    return new Button(id, line.tooltipTitle, line.icon, 
        new Action (line.targetArea, null, component));
}


// Input file 
// let file = process.argv[2];
let file = 'inp_melrose_usph01.txt';
let topAreaId = 'inpatient';
let topAreaDesc = 'Default layout for INPATIENT';



// Create top level area 
let topArea = new Area(topAreaId, topAreaDesc, -1, '');

// Read file lines
var lineReader = readline.createInterface({
    input: fs.createReadStream(file)
  });

var lines = [];
lineReader.on('line', function (line) {
    lines.push(new Line(line));
});  


lineReader.on('close', function(){

    // Remove header line
    if(isNaN(lines[0].blevel)){
        lines.splice(0,1);
    }
    
    getPaths(lines);

    processAreas(lines);

    processButtons(lines);

    console.log(JSON.stringify(topArea));

});