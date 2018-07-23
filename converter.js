fs = require('fs');
readline = require('readline');

const Path = require('./path.js');
const Model = require('./model.js');
const Line = Model.Line;
const Area = Model.Area;
const Button = Model.Button;
const Action = Model.Action;

/**
 * Map application areas with new model area ids
 */
const appAreaIdsMap = { '600': 'inpatientEntry', '601': 'inpatientPatient', '602': 'inpatientTools'}

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
    'inpatientEntry'  : {'description': 'Inpatient main grid',      'pos': 0,   'areaName': '' },
    'inpatientPatient': {'description': 'Inpatient patient area',   'pos': 0,   'areaName': '' },
    'inpatientTools'  : {'description': 'Inpatient tools area',     'pos': 0,   'areaName': '' },

    'inpatientEntry.topLeft'         : {'description': 'Personal settings area',   'pos': 6,   'areaName': 'leftTopHeader' },
    'inpatientEntry.topRight'        : {'description': 'Logout button area',       'pos': 1,   'areaName': 'rightTopHeader' },
    'inpatientEntry.alerts'          : {'description': 'Alerts area',              'pos': 8,   'areaName': 'leftBottomHeader' },     
    'inpatientEntry.topMenu'         : {'description': 'Top menu',                 'pos': 3,   'areaName': 'middleBottomHeader' }, 
    'inpatientEntry.topMenu.left'    : {'description': 'Top menu left',            'pos': 3,   'areaName': 'middleBottomHeader' },
    'inpatientEntry.topMenu.left.deepnav'         : {'description': 'Deepnav',                  'pos': 5,   'areaName': 'middleLeft' },             
    'inpatientEntry.topMenu.right'   : {'description': 'Top menu right',           'pos': 4,   'areaName': 'middleBottomHeader' },
    'inpatientEntry.topMenu.right.deepnav'         : {'description': 'Deepnav',                  'pos': 5,   'areaName': 'middleLeft' },             
    'inpatientEntry.bottomLeft'      : {'description': 'Back button area',         'pos': 2,   'areaName': 'leftFooter' },            
    'inpatientEntry.bottomMenu'      : {'description': 'Bottom menu',              'pos': 10,  'areaName': 'middleFooter' },
    'inpatientEntry.bottomMenu.left' : {'description': 'Bottom menu left',         'pos': 10,  'areaName': 'middleFooter' },
    'inpatientEntry.bottomMenu.right': {'description': 'Bottom menu right',        'pos': 11,  'areaName': 'middleFooter' },
    'inpatientEntry.bottomRight'     : {'description': 'Ok area',                  'pos': 7,   'areaName': 'rightFooter' },
    'inpatientEntry.deepnav'         : {'description': 'Deepnav',                  'pos': 5,   'areaName': 'middleLeft' },             
    'inpatientEntry.search'          : {'description': 'Search area',              'pos': 9,   'areaName': 'middleLeft' },
    'inpatientEntry.search.deepnav'  : {'description': 'Search area',              'pos': 5,   'areaName': 'middleLeft' },


    'inpatientPatient.topLeft'         : {'description': 'Personal settings area',   'pos': 6,   'areaName': 'leftTopHeader' },
    'inpatientPatient.topRight'        : {'description': 'Logout button area',       'pos': 1,   'areaName': 'rightTopHeader' },
    'inpatientPatient.alerts'          : {'description': 'Alerts area',              'pos': 8,   'areaName': 'leftBottomHeader' },     
    'inpatientPatient.topMenu'         : {'description': 'Top menu',                 'pos': 3,   'areaName': 'middleBottomHeader' }, 
    'inpatientPatient.topMenu.left'    : {'description': 'Top menu left',            'pos': 3,   'areaName': 'middleBottomHeader' },
    'inpatientPatient.topMenu.left.deepnav'         : {'description': 'Deepnav',                  'pos': 5,   'areaName': 'middleLeft' },             
    'inpatientPatient.topMenu.right'   : {'description': 'Top menu right',           'pos': 4,   'areaName': 'middleBottomHeader' },
    'inpatientPatient.topMenu.right.deepnav'         : {'description': 'Deepnav',                  'pos': 5,   'areaName': 'middleLeft' },             
    'inpatientPatient.bottomLeft'      : {'description': 'Back button area',         'pos': 2,   'areaName': 'leftFooter' },            
    'inpatientPatient.bottomMenu'      : {'description': 'Bottom menu',              'pos': 10,  'areaName': 'middleFooter' },
    'inpatientPatient.bottomMenu.left' : {'description': 'Bottom menu left',         'pos': 10,  'areaName': 'middleFooter' },
    'inpatientPatient.bottomMenu.right': {'description': 'Bottom menu right',        'pos': 11,  'areaName': 'middleFooter' },
    'inpatientPatient.bottomRight'     : {'description': 'Ok area',                  'pos': 7,   'areaName': 'rightFooter' },
    'inpatientPatient.search'          : {'description': 'Search area',              'pos': 9,   'areaName': 'middleLeft' },
    'inpatientPatient.search.deepnav'  : {'description': 'Search area',              'pos': 5,   'areaName': 'middleLeft' },


    'inpatientTools.topLeft'         : {'description': 'Personal settings area',   'pos': 6,   'areaName': 'leftTopHeader' },
    'inpatientTools.topRight'        : {'description': 'Logout button area',       'pos': 1,   'areaName': 'rightTopHeader' },
    'inpatientTools.alerts'          : {'description': 'Alerts area',              'pos': 8,   'areaName': 'leftBottomHeader' },     
    'inpatientTools.topMenu'         : {'description': 'Top menu',                 'pos': 3,   'areaName': 'middleBottomHeader' }, 
    'inpatientTools.topMenu.left'    : {'description': 'Top menu left',            'pos': 3,   'areaName': 'middleBottomHeader' },
    'inpatientTools.topMenu.left.deepnav'         : {'description': 'Deepnav',                  'pos': 5,   'areaName': 'middleLeft' },             
    'inpatientTools.topMenu.right'   : {'description': 'Top menu right',           'pos': 4,   'areaName': 'middleBottomHeader' },
    'inpatientTools.topMenu.right.deepnav'         : {'description': 'Deepnav',                  'pos': 5,   'areaName': 'middleLeft' },             
    'inpatientTools.bottomLeft'      : {'description': 'Back button area',         'pos': 2,   'areaName': 'leftFooter' },            
    'inpatientTools.bottomMenu'      : {'description': 'Bottom menu',              'pos': 10,  'areaName': 'middleFooter' },
    'inpatientTools.bottomMenu.left' : {'description': 'Bottom menu left',         'pos': 10,  'areaName': 'middleFooter' },
    'inpatientTools.bottomMenu.right': {'description': 'Bottom menu right',        'pos': 11,  'areaName': 'middleFooter' },
    'inpatientTools.bottomRight'     : {'description': 'Ok area',                  'pos': 7,   'areaName': 'rightFooter' },
    'inpatientTools.deepnav'         : {'description': 'Deepnav',                  'pos': 5,   'areaName': 'middleLeft' },             
    'inpatientTools.search'          : {'description': 'Search area',              'pos': 9,   'areaName': 'middleLeft' },    
    'inpatientTools.search.deepnav'  : {'description': 'Search area',              'pos': 5,   'areaName': 'middleLeft' }    
}

/*

const areaMap = { 
    'inpatientEntry'  : {'description': 'Inpatient main grid',      'pos': 0,   'areaName': '' },
    'inpatientPatient': {'description': 'Inpatient patient area',   'pos': 0,   'areaName': '' },
    'inpatientTools'  : {'description': 'Inpatient tools area',     'pos': 0,   'areaName': '' },

    'topLeft'         : {'description': 'Personal settings area',   'pos': 6,   'areaName': 'leftTopHeader' },
    'topRight'        : {'description': 'Logout button area',       'pos': 1,   'areaName': 'rightTopHeader' },
    'alerts'          : {'description': 'Alerts area',              'pos': 8,   'areaName': 'leftBottomHeader' },     
    'topMenu'         : {'description': 'Top menu',                 'pos': 3,   'areaName': 'middleBottomHeader' }, 
    'topMenu.left'    : {'description': 'Top menu left',            'pos': 3,   'areaName': 'middleBottomHeader' },
    'topMenu.right'   : {'description': 'Top menu right',           'pos': 4,   'areaName': 'middleBottomHeader' },
    'bottomLeft'      : {'description': 'Back button area',         'pos': 2,   'areaName': 'leftFooter' },            
    'bottomMenu'      : {'description': 'Bottom menu',              'pos': 10,  'areaName': 'middleFooter' },
    'bottomMenu.left' : {'description': 'Bottom menu left',         'pos': 10,  'areaName': 'middleFooter' },
    'bottomMenu.right': {'description': 'Bottom menu right',        'pos': 11,  'areaName': 'middleFooter' },
    'bottomRight'     : {'description': 'Ok area',                  'pos': 7,   'areaName': 'rightFooter' },
    'deepnav'         : {'description': 'Deepnav',                  'pos': 5,   'areaName': 'middleLeft' },             
    'search'          : {'description': 'Search area',              'pos': 9,   'areaName': 'middleLeft' },

    'topLeft'         : {'description': 'Personal settings area',   'pos': 6,   'areaName': 'leftTopHeader' },
    'topRight'        : {'description': 'Logout button area',       'pos': 1,   'areaName': 'rightTopHeader' },
    'alerts'          : {'description': 'Alerts area',              'pos': 8,   'areaName': 'leftBottomHeader' },     
    'topMenu'         : {'description': 'Top menu',                 'pos': 3,   'areaName': 'middleBottomHeader' }, 
    'topMenu.left'    : {'description': 'Top menu left',            'pos': 3,   'areaName': 'middleBottomHeader' },
    'topMenu.right'   : {'description': 'Top menu right',           'pos': 4,   'areaName': 'middleBottomHeader' },
    'bottomLeft'      : {'description': 'Back button area',         'pos': 2,   'areaName': 'leftFooter' },            
    'bottomMenu'      : {'description': 'Bottom menu',              'pos': 10,  'areaName': 'middleFooter' },
    'bottomMenu.left' : {'description': 'Bottom menu left',         'pos': 10,  'areaName': 'middleFooter' },
    'bottomMenu.right': {'description': 'Bottom menu right',        'pos': 11,  'areaName': 'middleFooter' },
    'bottomRight'     : {'description': 'Ok area',                  'pos': 7,   'areaName': 'rightFooter' },
    'deepnav'         : {'description': 'Deepnav',                  'pos': 5,   'areaName': 'middleLeft' },             
    'search'          : {'description': 'Search area',              'pos': 9,   'areaName': 'middleLeft' },

    'topLeft'         : {'description': 'Personal settings area',   'pos': 6,   'areaName': 'leftTopHeader' },
    'topRight'        : {'description': 'Logout button area',       'pos': 1,   'areaName': 'rightTopHeader' },
    'alerts'          : {'description': 'Alerts area',              'pos': 8,   'areaName': 'leftBottomHeader' },     
    'topMenu'         : {'description': 'Top menu',                 'pos': 3,   'areaName': 'middleBottomHeader' }, 
    'topMenu.left'    : {'description': 'Top menu left',            'pos': 3,   'areaName': 'middleBottomHeader' },
    'topMenu.right'   : {'description': 'Top menu right',           'pos': 4,   'areaName': 'middleBottomHeader' },
    'bottomLeft'      : {'description': 'Back button area',         'pos': 2,   'areaName': 'leftFooter' },            
    'bottomMenu'      : {'description': 'Bottom menu',              'pos': 10,  'areaName': 'middleFooter' },
    'bottomMenu.left' : {'description': 'Bottom menu left',         'pos': 10,  'areaName': 'middleFooter' },
    'bottomMenu.right': {'description': 'Bottom menu right',        'pos': 11,  'areaName': 'middleFooter' },
    'bottomRight'     : {'description': 'Ok area',                  'pos': 7,   'areaName': 'rightFooter' },
    'deepnav'         : {'description': 'Deepnav',                  'pos': 5,   'areaName': 'middleLeft' },             
    'search'          : {'description': 'Search area',              'pos': 9,   'areaName': 'middleLeft' }    

}
*/

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
    
    getPaths(lines);

//    console.log(areaMap);

    processAreas(lines);

    processButtons(lines);
    
    console.log(JSON.stringify(topArea));

});

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

getPath = function(line){

    // If the line's path was already computed, just return it
    if(line.path) {
        return line.path;
    }

    // The line's path is the path of the parent concatenated with the line's id
    var parentAreaPath = getParentPath(line);
    
    var areaPath = parentAreaPath.clone();
    if(line.idSysScreenArea != '5') {
        // Non deepnavs
        areaPath.append(screenAreaIdsMap[line.idSysScreenArea]);
    } else {
        // Deepnavs
        let parentLine = getParentLine(line);
        if(parentLine.idSysScreenArea != '5' ) {
            // If the parent is not a deepnav just use the name defined in the map
            areaPath.append(screenAreaIdsMap[line.idSysScreenArea]);
        } else {
            // If the parent is also a deepnav, the area is named after the parent's internal name
            areaPath.append(getButtonIdFromInternalName(parentLine.internNameButton));
        }
 
        // Deepnavs that have child deepnavs define new areas that have to be added to the area map,
        // for the areas processing logic to work.
        if(line.action === 'NXTLEVEL'){
            let id = getButtonIdFromInternalName(line.internNameButton);
            let auxPath = areaPath.clone().append(id);
            setdMapEntry(auxPath);


        }
    }
    return areaPath;
}

/**
 * Build map entry for a dynamically creared path.
 * The position and areaName are copied from the parent.
 */
setdMapEntry = function(areaPath) {
    let mapEntry = {};

    let parentMapEntry = areaMap[areaPath.getParent().toString()];
    mapEntry.description = areaPath.getId();
    mapEntry.pos = parentMapEntry.pos;
    mapEntry.areaName = parentMapEntry.areaName;
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
    return new Button(id, line.tooltipTitle, line.icon, "", areaId);
}