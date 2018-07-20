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
    'inpatientEntry.topMenu.right'   : {'description': 'Top menu right',           'pos': 4,   'areaName': 'middleBottomHeader' },
    'inpatientEntry.bottomLeft'      : {'description': 'Back button area',         'pos': 2,   'areaName': 'leftFooter' },            
    'inpatientEntry.bottomMenu'      : {'description': 'Bottom menu',              'pos': 10,  'areaName': 'middleFooter' },
    'inpatientEntry.bottomMenu.left' : {'description': 'Bottom menu left',         'pos': 10,  'areaName': 'middleFooter' },
    'inpatientEntry.bottomMenu.right': {'description': 'Bottom menu right',        'pos': 11,  'areaName': 'middleFooter' },
    'inpatientEntry.bottomRight'     : {'description': 'Ok area',                  'pos': 7,   'areaName': 'rightFooter' },
    'inpatientEntry.deepnav'         : {'description': 'Deepnav',                  'pos': 5,   'areaName': 'middleLeft' },             
    'inpatientEntry.search'          : {'description': 'Search area',              'pos': 9,   'areaName': 'middleLeft' },

    'inpatientPatient.topLeft'         : {'description': 'Personal settings area',   'pos': 6,   'areaName': 'leftTopHeader' },
    'inpatientPatient.topRight'        : {'description': 'Logout button area',       'pos': 1,   'areaName': 'rightTopHeader' },
    'inpatientPatient.alerts'          : {'description': 'Alerts area',              'pos': 8,   'areaName': 'leftBottomHeader' },     
    'inpatientPatient.topMenu'         : {'description': 'Top menu',                 'pos': 3,   'areaName': 'middleBottomHeader' }, 
    'inpatientPatient.topMenu.left'    : {'description': 'Top menu left',            'pos': 3,   'areaName': 'middleBottomHeader' },
    'inpatientPatient.topMenu.right'   : {'description': 'Top menu right',           'pos': 4,   'areaName': 'middleBottomHeader' },
    'inpatientPatient.bottomLeft'      : {'description': 'Back button area',         'pos': 2,   'areaName': 'leftFooter' },            
    'inpatientPatient.bottomMenu'      : {'description': 'Bottom menu',              'pos': 10,  'areaName': 'middleFooter' },
    'inpatientPatient.bottomMenu.left' : {'description': 'Bottom menu left',         'pos': 10,  'areaName': 'middleFooter' },
    'inpatientPatient.bottomMenu.right': {'description': 'Bottom menu right',        'pos': 11,  'areaName': 'middleFooter' },
    'inpatientPatient.bottomRight'     : {'description': 'Ok area',                  'pos': 7,   'areaName': 'rightFooter' },
    'inpatientPatient.deepnav'         : {'description': 'Deepnav',                  'pos': 5,   'areaName': 'middleLeft' },             
    'inpatientPatient.search'          : {'description': 'Search area',              'pos': 9,   'areaName': 'middleLeft' },

    'inpatientTools.topLeft'         : {'description': 'Personal settings area',   'pos': 6,   'areaName': 'leftTopHeader' },
    'inpatientTools.topRight'        : {'description': 'Logout button area',       'pos': 1,   'areaName': 'rightTopHeader' },
    'inpatientTools.alerts'          : {'description': 'Alerts area',              'pos': 8,   'areaName': 'leftBottomHeader' },     
    'inpatientTools.topMenu'         : {'description': 'Top menu',                 'pos': 3,   'areaName': 'middleBottomHeader' }, 
    'inpatientTools.topMenu.left'    : {'description': 'Top menu left',            'pos': 3,   'areaName': 'middleBottomHeader' },
    'inpatientTools.topMenu.right'   : {'description': 'Top menu right',           'pos': 4,   'areaName': 'middleBottomHeader' },
    'inpatientTools.bottomLeft'      : {'description': 'Back button area',         'pos': 2,   'areaName': 'leftFooter' },            
    'inpatientTools.bottomMenu'      : {'description': 'Bottom menu',              'pos': 10,  'areaName': 'middleFooter' },
    'inpatientTools.bottomMenu.left' : {'description': 'Bottom menu left',         'pos': 10,  'areaName': 'middleFooter' },
    'inpatientTools.bottomMenu.right': {'description': 'Bottom menu right',        'pos': 11,  'areaName': 'middleFooter' },
    'inpatientTools.bottomRight'     : {'description': 'Ok area',                  'pos': 7,   'areaName': 'rightFooter' },
    'inpatientTools.deepnav'         : {'description': 'Deepnav',                  'pos': 5,   'areaName': 'middleLeft' },             
    'inpatientTools.search'          : {'description': 'Search area',              'pos': 9,   'areaName': 'middleLeft' }    

}

/**
 * Return the provided string in camel case
 */
camelize = function (str) {
    str = str.toLowerCase();
    return str.replace(/\W+(.)/g, function(match, chr)
     {
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
 * Get area
 */
getArea = function(path) {

    // The area id is the last segment of the path
    return new Area(path.getId(), areaMap[path.toString()].description, areaMap[path.toString()].pos, areaMap[path.toString()].areaName);
}

/**
 * Create the second level areas (entrance, tools, patient,...)
 */
processAppAreas = function(lines) {

    lines.forEach(function(l) {

        let areaId = appAreaIdsMap[l.idSysApplicationArea];

        let path = new Path(areaId)

        if(!topArea.findArea(path)) {
            let area = getArea(path);
            console.log('Adding area ' + areaId + '...');
            topArea.addArea(area);
        } 
    }) 
}

/** 
 * Process the remaining areas
*/
processArea = function(line) {

    let path = new Path(appAreaIdsMap[line.idSysApplicationArea]).append(screenAreaIdsMap[line.idSysScreenArea]);

    var auxPath = new Path('');

    let area = {};

    // Iterate down the path and, if necessary, create the areas for each level.
    path.toArray().forEach(function(e){
        
        auxPath.append(e);
        parentPath = auxPath.getParent();

        if(!topArea.findArea(auxPath)) {
            area = getArea(auxPath);

            var p = parentPath.toString() ? parentPath.toString() + '.' : '';
            console.log('Adding area ' + p + area.id + '...');

            topArea.addArea(area, parentPath);
        } 
    });

    // Special case: create sub areas for each deepnav that has child deepnavs
    if(path.toString().endsWith('.deepnav') && line.action === 'NXTLEVEL') {

        let deepNavArea = getArea(path);
        let id = getButtonIdFromInternalName(line.internNameButton);
        let desc = deepNavArea.description + ' - ' + id;
        console.log('Adding area ' + path.toString() + '.' + id);
        topArea.addArea(new Area(id, desc, deepNavArea.pos, deepNavArea.areaName), path);
    }
}

/** 
 * 
*/
processButton = function(line) {

    let areaPath = new Path(appAreaIdsMap[line.idSysApplicationArea]).append(screenAreaIdsMap[line.idSysScreenArea]);

    area = topArea.findArea(areaPath);

    button = getButton(line, areaPath.getHead());

    area.addButton(button);
}

/**
 * Cretes a button object from the information in the line
 */
getButton = function(line, areaId) {

    let id = getButtonIdFromInternalName(line.internNameButton);
    return new Button(id, line.tooltipTitle, line.icon, "", areaId);
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
    
    processAppAreas(lines);

    processAreas(lines);

    processButtons(lines);

    console.log(JSON.stringify(topArea));
});


/** */
processAreas = function(lines) {

    lines.forEach(function(line){
        processArea(line);
    });

}


/** */
processButtons = function(lines) {

    lines.forEach(function(line){
        processButton(line);
    });

}




