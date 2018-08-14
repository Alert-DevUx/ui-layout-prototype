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
    'entry.mainMenu.left'   : {'description': 'Main menu left',           'pos': 3,   'type': 'mainMenu.left' },
    'entry.mainMenu.right'  : {'description': 'Main menu right',          'pos': 4,   'type': 'mainMenu.right' },
    'entry.actionMenuLeft'  : {'description': 'Back button area',         'pos': 2,   'type': 'actionMenuLeft' },            
    'entry.actionMenu'      : {'description': 'Bottom menu',              'pos': 10,  'type': 'actionMenu' },
    'entry.actionMenu.left' : {'description': 'Bottom menu left',         'pos': 10,  'type': 'actionMenu.left' },
    'entry.actionMenu.right': {'description': 'Bottom menu right',        'pos': 11,  'type': 'actionMenu.right' },
    'entry.actionMenuRight' : {'description': 'Ok area',                  'pos': 7,   'type': 'actionMenuRight' },
    'entry.mainMenuRight'   : {'description': 'Search area',              'pos': 9,   'type': 'mainMenuRight' },

    'patient.headerLeft'      : {'description': 'Personal settings area',   'pos': 6,   'type': 'headerLeft' },
    'patient.headerRight'     : {'description': 'Logout button area',       'pos': 1,   'type': 'headerRight' },
    'patient.mainMenuLeft'    : {'description': 'Alerts area',              'pos': 8,   'type': 'mainMenuLeft' },     
    'patient.mainMenu'        : {'description': 'Main menu',                'pos': 3,   'type': 'mainMenu' }, 
    'patient.mainMenu.left'   : {'description': 'Main menu left',           'pos': 3,   'type': 'mainMenu.left' },
    'patient.mainMenu.right'  : {'description': 'Main menu right',          'pos': 4,   'type': 'mainMenu.right' },
    'patient.actionMenuLeft'  : {'description': 'Back button area',         'pos': 2,   'type': 'actionMenuLeft' },            
    'patient.actionMenu'      : {'description': 'Bottom menu',              'pos': 10,  'type': 'actionMenu' },
    'patient.actionMenu.left' : {'description': 'Bottom menu left',         'pos': 10,  'type': 'actionMenu.left' },
    'patient.actionMenu.right': {'description': 'Bottom menu right',        'pos': 11,  'type': 'actionMenu.right' },
    'patient.actionMenuRight' : {'description': 'Ok area',                  'pos': 7,   'type': 'actionMenuRight' },
    'patient.mainMenuRight'   : {'description': 'Search area',              'pos': 9,   'type': 'mainMenuRight' },

    'tools.headerLeft'      : {'description': 'Personal settings area',   'pos': 6,   'type': 'headerLeft' },
    'tools.headerRight'     : {'description': 'Logout button area',       'pos': 1,   'type': 'headerRight' },
    'tools.mainMenuLeft'    : {'description': 'Alerts area',              'pos': 8,   'type': 'mainMenuLeft' },     
    'tools.mainMenu'        : {'description': 'Main menu',                'pos': 3,   'type': 'mainMenu' }, 
    'tools.mainMenu.left'   : {'description': 'Main menu left',           'pos': 3,   'type': 'mainMenu.left' },
    'tools.mainMenu.right'  : {'description': 'Main menu right',          'pos': 4,   'type': 'mainMenu.right' },
    'tools.actionMenuLeft'  : {'description': 'Back button area',         'pos': 2,   'type': 'actionMenuLeft' },            
    'tools.actionMenu'      : {'description': 'Bottom menu',              'pos': 10,  'type': 'actionMenu' },
    'tools.actionMenu.left' : {'description': 'Bottom menu left',         'pos': 10,  'type': 'actionMenu.left' },
    'tools.actionMenu.right': {'description': 'Bottom menu right',        'pos': 11,  'type': 'actionMenu.right' },
    'tools.actionMenuRight' : {'description': 'Ok area',                  'pos': 7,   'type': 'actionMenuRight' },
    'tools.mainMenuRight'   : {'description': 'Search area',              'pos': 9,   'type': 'mainMenuRight' }
}


// Note that the pos fiels is used to choose the left or right side of the actions menu
const actionButtonMap = { 
    'FLG_ACTION':           { id: 'actionButton', title: 'Actions', icon: '', status: 'N', rank:  6, pos: 'left' },
    'FLG_SEARCH':           { id: 'advanceSearch', title: 'Advanced search',	icon: 'AdvancedSearchIcon', status: 'N', rank: 5, pos: 'left' },
    'FLG_HELP':             { id: 'applicationHelp', title: 'Help', icon: 'HelpIcon', status: 'N', rank: 30, pos: 'right' },
//    '':                     { id: 'back', title: 'Back', icon: 'BackIcon', status: 'N', rank: 0, pos: 'left'},
//    '':                     { id: 'barChartEdis', title: 'Graph view', icon: 'chartsIcon', status: 'N', rank: 0, pos: 'left'},
//    '':                     { id: 'barListEdis', title: 'Grid view', icon: 'ListIcon', status: 'N', rank: 0, pos: 'left'},
    'FLG_CANCEL':           { id: 'cancel', title: 'Cancel records', icon: 'CancelIcon', status: 'N', rank: 3, pos: 'left' },
//    '':                     { id: 'chartLinesEdis', title: 'Graph view', icon: 'ChartsLinesIcon', status: 'N', rank: 0, pos: 'left'},
//    '':                     { id: 'commonText', title: 'Predefined texts', icon: 'CommonTextIcon', status: 'N', rank: 50, pos: 'left'},
//    '':                     { id: 'contextHelp', title: 'Technical content', icon: 'ContentIcon', status: 'N', rank: 0, pos: 'right'},
    'FLG_CREATE':           { id: 'create', title: 'Add or edit records', icon: 'AddIcon', status: 'N', rank: 2, pos: 'left' },
//    '':                     { id: 'docImport', title: 'Attach digital documents', icon: 'ImportDocIcon', status: 'N', rank: 0, pos: 'left'},
    'FLG_DETAIL':           { id: 'eye', title: 'Record details', icon: 'DetailsIcon', status: 'N', rank: 0, pos: 'right' },
    'FLG_VIEW':             { id: 'firstView', title: 'First view ', icon: 'FirstVisionIcon', status: 'N', rank: 4, pos: 'left' },
//    '':                     { id: 'firstView', title: '', icon: 'PrenatalvisitsIcon', status: 'N', rank: 0, pos: 'left' },
    'FLG_GLOBAL_SHORTCUT':  { id: 'globalShortcut', title: 'Shortcuts', icon: 'GlobalShortcutIcon', status: 'N', rank: 9999, pos: 'right' },
    'FLG_INFO_BUTTON':      { id: 'infoButton', title: 'Infobutton', icon: 'InfoButtonIcon', status: 'N', rank: 10, pos: 'left' },
    'FLG_NO':               { id: 'noEdis', title: 'Negative for all discriminators on this page', icon: 'NoIcon', status: 'N', rank: 0, pos: 'left' },
//    'FLG_OK':               { id: 'ok', title: 'Confirm and continue', icon: 'OKIcon', status: 'N', rank: 0, pos: 'left' },
    'FLG_PRINT':            { id: 'print', title: 'Print tool', icon: 'PrintIcon', status: 'N', rank: 1, pos: 'left' },
//    '':                     { id: 'secondView', title: 'Second view', icon: 'SecondVisionIcon', status: 'N', rank: 4, pos: 'left' },
    'FLG_FREQ':             { id: 'toolsCommonText', title: 'Predefined texts', icon: 'CommonTextIcon', status: 'N', rank: 50, pos: 'left'},
    'FLG_VIEW':             { id: 'viewsButton', title: 'View modes', icon: '', status: 'N', rank: 4, pos: 'left' }
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
 * Return the provided dot separated string in camel case
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
        getParentLine(line).targetArea = areaPath.toString();
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
    mapEntry.description = areaPath.getId() + ' deepnavs';
    mapEntry.pos = 5;
    mapEntry.type = 'deepnav';
    areaMap[areaPath.clone().removeHead().toString()] = mapEntry;
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
        parentPath = new Path(topAreaId + '.' + appAreaIdsMap[line.idSysApplicationArea]);
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

    console.log('line.path: ' + line.path.toString());

    // Iterate down the path and, if necessary, create the areas for each level.
    line.path.toArray().forEach(function(e){
        
        auxPath.append(e);
        parentPath = auxPath.getParent();

        if(!topArea.findArea(auxPath)) {
            area = getArea(auxPath.clone().removeHead());

            var p = parentPath.toString() ? parentPath.toString() + '.' : '';
            console.log('Adding area ' + p + area.id + '...');

            topArea.addArea(area, parentPath);
        } 
    });

    // If the line includes a screen then add an child area for holding that screen and the areas for the
    // action buttons
    if(line.screenName) {
        var screenParentPath = line.path.clone();
        var screenArea = new Area('screen', 'Screen', 12, 'screen');
        var actionMenu = new Area('actionMenu', 'Action', 13, 'actionMenu');
        actionMenu.addArea(new Area('left', 'Action', 14, 'actionMenu.left'));
        actionMenu.addArea(new Area('right', 'Action', 15, 'actionMenu.right'));
        screenArea.addArea(actionMenu);
        topArea.addArea(screenArea, screenParentPath);
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

    setActionButtons(line);
}

/**
 * Add action buttons (for areas that include a screen)
 */
setActionButtons = function (line) {
    // Add action button for the screen
    if(line.screenName) {

        // For screen areas the target area was previously set with the location of the 'screen' area
        var screenArea = topArea.findArea(new Path(line.targetArea));
        var actionAreas = screenArea.areas.actionMenu.areas;

        for (var flag in actionButtonMap) {
            if (actionButtonMap.hasOwnProperty(flag)) {
                var flagKey = camelize(flag.replace(new RegExp('_', 'g'),'.'));
                // Ignore actions with value 'N'
                if(line[flagKey] != 'N') {
                    // Add buttons to the left or side action area accordgin to the value of actionButtonMap.pos
                    // Empty action for now
                    actionAreas[actionButtonMap[flag].pos].addButton(
                        new Button(actionButtonMap[flag].id, line[flagKey], actionButtonMap[flag].title, 
                                   actionButtonMap[flag].icon, new Action(), actionButtonMap[flag].rank));
                }
            }
        }
    }
}

/**
 * Creates a button object from the information in the line
 */
getButton = function(line) {

    let id = getButtonIdFromInternalName(line.internNameButton);

    let component = null;
    if(line.screenName) {
        // If is a screen the target area will be a child of the line's area
        line.targetArea = line.path + '.screen';
        component = new Component('SWF', line.screenName);
    }

    return new Button(id, 'A', line.tooltipTitle, line.icon, 
        new Action (line.targetArea, null, component), line.rank);
}

/**
 * Creates a button object from the information in the line
 */
cleanUp = function() {
    cleanUpArea(topArea);
}

cleanUpArea = function(area) {
    // Remove uneeded objects
    // buttonsObj is an auxiliary map to remove duplicates
    area.buttonsObj = undefined;
    if(area.buttons) {
        area.buttons.forEach(function(button) {
            // rank is not needed, buttons order is defined by the buttons array index
            button.rank = undefined;
        });
    }

    // Clean subareas
    for(var areaId in area.areas) {
        if (area.areas.hasOwnProperty(areaId)) {
            cleanUpArea(area.areas[areaId]);
        }
    }
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

    cleanUpArea(topArea);

    console.log(JSON.stringify(topArea));

});