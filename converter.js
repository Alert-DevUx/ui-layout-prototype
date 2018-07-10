fs = require('fs');
readline = require('readline');

const Path = require('./path.js');
const Model = require('./model.js');
const Area = Model.Area;
const Button = Model.Button;
const Action = Model.Action;

/**
 * Map screen areas with new model area ids
 */
const pathMap = { '1': '3', '2': '10', '3': '5.1', '4': '5.2', '6': '1', '7': '12', '8': '4', '10': '11.1', '11': '11.2' }

/**
 * Properties by area
 */
const areaMap = { 
    '1': {'msg': 'Personal settings area', 'pos': 6 },
    '3': {'msg': 'Logout button area', 'pos': 1 },
    '4': {'msg': 'Alerts area', 'pos': 8 },     
    '5': {'msg': 'Top menu', 'pos': 3 }, 
  '5.1': {'msg': 'Top menu left', 'pos': 3 },
  '5.2': {'msg': 'Top menu right', 'pos': 4 },
    '10': {'msg': 'Back button area', 'pos': 2 },            
    '11': {'msg': 'Bottom menu', 'pos': 10 },
  '11.1': {'msg': 'Bottom menu left', 'pos': 10 },
  '11.2': {'msg': 'Bottom menu left', 'pos': 11 },
    '12': {'msg': 'Ok area', 'pos': 7 }            
}

/** */
processLine = function(line) {

    lineArr = line.split('\t');

    processArea(lineArr);
    processButton(lineArr);
}

/** */
processArea = function(lineArr) {

    let path = new Path(pathMap[lineArr[6]]);

    var auxPath = new Path('')
    
    path.toArray().forEach(function(e){
        
        auxPath.append(e);
        parentPath = auxPath.getParent();

        if(!topArea.findArea(auxPath)) {
            let area = getArea(auxPath);
            topArea.addArea(area, parentPath);
        } 

    });
}

/**
 * Get area
 */
getArea = function(path) {

    // The area id is the last segment of the path
    let areaId = path.getId();
    return new Area(areaId, areaMap[path.toString()].msg, areaMap[path.toString()].pos);
}

/** */
processButton = function(lineArr) {

    button = getButton(lineArr);

    areaPath = new Path(pathMap[lineArr[6]]);

    area = topArea.findArea(areaPath);

    area.addButton(button);
}

camelize = function(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
      return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
}

getButton = function(lineArr) {

    // TODO: Based on the existence of icon: Review!
    let icon = lineArr[4];
    if(icon) {
        button = new Button(camelize(icon), lineArr[11], icon);
    }
    return button;
}


// Input file 
// let file = process.argv[2];
let file = 'tmp002.txt';
let topAreaId = '0';
let topAreaDesc = 'Default layout for EDIS';

// Create top level area 
let topArea = new Area(topAreaId, topAreaDesc, '0');

// Read file lines
var lineReader = readline.createInterface({
    input: fs.createReadStream(file)
  });

lineReader.on('line', function (line) {
    processLine(line);
});  

lineReader.on('close', function(){
    console.log(JSON.stringify(topArea));
});

