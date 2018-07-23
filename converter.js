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
const appAreaIdsMap = { '600': 'inpEntry', '601': 'inpPatient', '602': 'inpTools'}

/**
 * Map screen areas with new model area ids
 */
const screenAreaIdsMap = {  '1': 'topRight', 
                            '2': 'bottomLeft', 
                            '3': 'topMenu.left', 
                            '4': 'topMenu.right', 
                            '5': 'deepnav',
                            '6': 'topLeft', 
                            '7': 'bottomRight', 
                            '8': 'alerts',
                            '9': 'search',
                           '10': 'bottomMenu.left', 
                           '11': 'bottomMenu.right' 
                        }
/**
 * Properties by area
 */


const areaMap = { 
    'inpEntry'  : {'description': 'Inpatient main grid',      'pos': 0,   'areaName': '' },
    'inpPatient': {'description': 'Inpatient patient area',   'pos': 0,   'areaName': '' },
    'inpTools'  : {'description': 'Inpatient tools area',     'pos': 0,   'areaName': '' },

    'inpEntry.topLeft'         : {'description': 'Personal settings area',   'pos': 6,   'areaName': 'leftTopHeader' },
    'inpEntry.topRight'        : {'description': 'Logout button area',       'pos': 1,   'areaName': 'rightTopHeader' },
    'inpEntry.alerts'          : {'description': 'Alerts area',              'pos': 8,   'areaName': 'leftBottomHeader' },     
    'inpEntry.topMenu'         : {'description': 'Top menu',                 'pos': 3,   'areaName': 'middleBottomHeader' }, 
    'inpEntry.topMenu.left'    : {'description': 'Top menu left',            'pos': 3,   'areaName': 'middleBottomHeader' },
    'inpEntry.topMenu.right'   : {'description': 'Top menu right',           'pos': 4,   'areaName': 'middleBottomHeader' },
    'inpEntry.bottomLeft'      : {'description': 'Back button area',         'pos': 2,   'areaName': 'leftFooter' },            
    'inpEntry.bottomMenu'      : {'description': 'Bottom menu',              'pos': 10,  'areaName': 'middleFooter' },
    'inpEntry.bottomMenu.left' : {'description': 'Bottom menu left',         'pos': 10,  'areaName': 'middleFooter' },
    'inpEntry.bottomMenu.right': {'description': 'Bottom menu right',        'pos': 11,  'areaName': 'middleFooter' },
    'inpEntry.bottomRight'     : {'description': 'Ok area',                  'pos': 7,   'areaName': 'rightFooter' },
    'inpEntry.search'          : {'description': 'Search area',              'pos': 9,   'areaName': 'middleLeft' },

    'inpPatient.topLeft'         : {'description': 'Personal settings area',   'pos': 6,   'areaName': 'leftTopHeader' },
    'inpPatient.topRight'        : {'description': 'Logout button area',       'pos': 1,   'areaName': 'rightTopHeader' },
    'inpPatient.alerts'          : {'description': 'Alerts area',              'pos': 8,   'areaName': 'leftBottomHeader' },     
    'inpPatient.topMenu'         : {'description': 'Top menu',                 'pos': 3,   'areaName': 'middleBottomHeader' }, 
    'inpPatient.topMenu.left'    : {'description': 'Top menu left',            'pos': 3,   'areaName': 'middleBottomHeader' },
    'inpPatient.topMenu.right'   : {'description': 'Top menu right',           'pos': 4,   'areaName': 'middleBottomHeader' },
    'inpPatient.bottomLeft'      : {'description': 'Back button area',         'pos': 2,   'areaName': 'leftFooter' },            
    'inpPatient.bottomMenu'      : {'description': 'Bottom menu',              'pos': 10,  'areaName': 'middleFooter' },
    'inpPatient.bottomMenu.left' : {'description': 'Bottom menu left',         'pos': 10,  'areaName': 'middleFooter' },
    'inpPatient.bottomMenu.right': {'description': 'Bottom menu right',        'pos': 11,  'areaName': 'middleFooter' },
    'inpPatient.bottomRight'     : {'description': 'Ok area',                  'pos': 7,   'areaName': 'rightFooter' },
    'inpPatient.search'          : {'description': 'Search area',              'pos': 9,   'areaName': 'middleLeft' },

    'inpTools.topLeft'         : {'description': 'Personal settings area',   'pos': 6,   'areaName': 'leftTopHeader' },
    'inpTools.topRight'        : {'description': 'Logout button area',       'pos': 1,   'areaName': 'rightTopHeader' },
    'inpTools.alerts'          : {'description': 'Alerts area',              'pos': 8,   'areaName': 'leftBottomHeader' },     
    'inpTools.topMenu'         : {'description': 'Top menu',                 'pos': 3,   'areaName': 'middleBottomHeader' }, 
    'inpTools.topMenu.left'    : {'description': 'Top menu left',            'pos': 3,   'areaName': 'middleBottomHeader' },
    'inpTools.topMenu.right'   : {'description': 'Top menu right',           'pos': 4,   'areaName': 'middleBottomHeader' },
    'inpTools.bottomLeft'      : {'description': 'Back button area',         'pos': 2,   'areaName': 'leftFooter' },            
    'inpTools.bottomMenu'      : {'description': 'Bottom menu',              'pos': 10,  'areaName': 'middleFooter' },
    'inpTools.bottomMenu.left' : {'description': 'Bottom menu left',         'pos': 10,  'areaName': 'middleFooter' },
    'inpTools.bottomMenu.right': {'description': 'Bottom menu right',        'pos': 11,  'areaName': 'middleFooter' },
    'inpTools.bottomRight'     : {'description': 'Ok area',                  'pos': 7,   'areaName': 'rightFooter' },
    'inpTools.search'          : {'description': 'Search area',              'pos': 9,   'areaName': 'middleLeft' },    
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
        // If the line not a deepnav just use the name defined in the map
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

    return areaPath;
}

/**
 * Build map entry for a dynamically created path (for deepnav areas).
 */
setdMapEntry = function(areaPath) {
    let mapEntry = {};

    let parentMapEntry = areaMap[areaPath.getParent().toString()];
    mapEntry.description = areaPath.getId() + " deepnavs";
    mapEntry.pos = '5';
    mapEntry.areaName = '__areaName__';
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
}

/**
 * Get area
 */
getArea = function(path) {
    // The area id is the last segment of the path
    console.log('getArea - path.toString(): ' + path.toString());
    return new Area(path.getId(), areaMap[path.toString()].description, areaMap[path.toString()].pos, areaMap[path.toString()].areaName);
}

/** */
processButtons = function(lines) {

    lines.forEach(function(line){
        processButton(line);
    });

}

/** */
processButton = function(line) {

    area = topArea.findArea(line.path);

    button = getButton(line, line.path.getHead());

    area.addButton(button);
}

/**
 * Creates a button object from the information in the line
 */
getButton = function(line, areaId) {

    let id = getButtonIdFromInternalName(line.internNameButton);

    let component = null;
    if(line.screenName) {
        component = new Component('SWF', line.screenName);
    }

    return new Button(id, line.tooltipTitle, line.icon, 
        new Action (line.targetArea, null, component), areaId);
}


// Input file 
// let file = process.argv[2];
let file = 'inp_melrose_usph01.txt';
let topAreaId = '0';
let topAreaDesc = 'Default layout for INPATIENT';



// Create top level area 
let topArea = new Area(topAreaId, topAreaDesc, '0', '');

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