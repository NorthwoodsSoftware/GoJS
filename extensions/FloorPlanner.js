/*
* Copyright (C) 1998-2017 by Northwoods Software Corporation
* All Rights Reserved.
*
* FLOOR PLANNER CODE
* Provides core functionality for FloorPlanner.html
*/

function checkLocalStorage() {
    try {
        window.localStorage.setItem('item', 'item');
        window.localStorage.removeItem('item');
        return true;
    } catch (e) {
        return false;
    }
}

function updateFileList(id) {
    // displays cached floor plan files in the listboxes
    var listbox = document.getElementById(id);
    // remove any old listing of files
    var last;
    while (last = listbox.lastChild) listbox.removeChild(last);
    // now add all saved files to the listbox
    for (key in window.localStorage) {
        var storedFile = window.localStorage.getItem(key);
        if (!storedFile) continue;
        var option = document.createElement("option");
        option.value = key;
        option.text = key;
        listbox.add(option, null)
    }
}

// deletes selected file from local storage
function removeFile() {
    var listbox = document.getElementById("mySavedFiles2");
    // get selected filename
    var fileName = undefined;
    for (var i = 0; i < listbox.options.length; i++) {
        if (listbox.options[i].selected) fileName = listbox.options[i].text; // selected file
    }
    if (fileName !== undefined) {
        // removes file from local storage
        window.localStorage.removeItem(fileName);
        // the current document remains open, even if its storage was deleted
    }
    closeElement("removeDocument");
}

function loadFileToModel(str) {
    myDiagram.model = go.Model.fromJson(str);
    myDiagram.skipsUndoManager = true;
    myDiagram.startTransaction("generate walls");
    var wallParts = [];
    myDiagram.nodes.each(function (node) {
        if (node.category === "WallGroup") updateWall(node);
        if ((node.category === "WindowNode" || node.category === "DoorNode") && node.containingGroup !== null) wallParts.push(node);
    });
    updateUI();

    myDiagram.commitTransaction("generate walls");
    myDiagram.undoManager.isEnabled = true;
    myDiagram.addModelChangedListener(function (e) {
        if (e.isTransactionFinished) enableAll();
    });
    myDiagram.isModified = false;
}

function loadFile() {
    var listbox = document.getElementById("mySavedFiles");
    // get selected filename
    var fileName = undefined;
    for (var i = 0; i < listbox.options.length; i++) {
        if (listbox.options[i].selected) fileName = listbox.options[i].text; // selected file
    }
    if (fileName !== undefined) {
        var savedFile = window.localStorage.getItem(fileName);
        loadFileToModel(savedFile);
    }
    closeElement("openDocument");
}

// Store shared model state in the Model.modelData property
// (will be loaded by loadDiagramProperties)
function saveDiagramProperties() {
    myDiagram.model.modelData.position = go.Point.stringify(myDiagram.position);
}

// Called by myDiagram.addDiagramListener("InitialLayoutCompleted" ...,
// NOT directly by loadFile.
function loadDiagramProperties(e) {
    var pos = myDiagram.model.modelData.position;
    if (pos) myDiagram.position = go.Point.parse(pos);
}

function openElement(id, listid) {
    var panel = document.getElementById(id);
    if (panel.style.visibility === "hidden") {
        updateFileList(listid);
        panel.style.visibility = "visible";
    }
}

// hides the open/remove elements when the "X" button is pressed
function closeElement(id) {
    var panel = document.getElementById(id);
    if (id === "nodeInfoWindow") document.getElementById("nodeInfoWindowButton").innerHTML = "Show Node Info Help <p class='shortcut'> (Ctrl + I)</p>";
    if (id === "myPaletteWindow") document.getElementById("myPaletteWindowButton").innerHTML = "Show Palettes <p class='shortcut'> (Ctrl + P)</p>";
    if (id === "myOverviewWindow") document.getElementById("myOverviewWindowButton").innerHTML = "Show Overview <p class='shortcut'> (Ctrl + E)</p>";
    if (id === "optionsWindow") document.getElementById("optionsWindowButton").innerHTML = "Show Options <p class='shortcut'> (Ctrl + B)</p>";
    if (id === "statisticsWindow") document.getElementById("statisticsWindowButton").innerHTML = "Show Statistics <p class='shortcut'> (Ctrl + G)</p>";
    panel.style.visibility = "hidden";
}

var UnsavedFileName = "(Unsaved File)";
var DEFAULT_MODELDATA = {
    "units": "centimeters",
    "unitsAbbreviation": "cm",
    "gridSize": 10,
    "wallWidth": 5,
    "preferences": {
        showWallGuidelines: true,
        showWallLengths: true,
        showWallAngles: true,
        showOnlySmallWallAngles: true,
        showGrid: true,
        gridSnap: true
    }
};

function setCurrentFileName(name) {
    var currentFile = document.getElementById("currentFile");
    if (myDiagram.isModified) {
        name += "*";
    }
    currentFile.textContent = name;
}

function getCurrentFileName() {
    var currentFile = document.getElementById("currentFile");
    var name = currentFile.textContent;
    if (name[name.length - 1] === "*") return name.substr(0, name.length - 1);
    return name;
}

// enable or disable a particular button
function enable(name, ok) {
    var button = document.getElementById(name);
    if (button) button.disabled = !ok;
}

// enable or disable all context-sensitive command buttons
function enableAll() {
    var cmdhnd = myDiagram.commandHandler;
    enable("Undo", cmdhnd.canUndo());
    enable("Redo", cmdhnd.canRedo());
    enable("Cut", cmdhnd.canCutSelection());
    enable("Copy", cmdhnd.canCopySelection());
    enable("Paste", cmdhnd.canPasteSelection());
    enable("Delete", cmdhnd.canDeleteSelection());
    enable("SelectAll", cmdhnd.canSelectAll());
}

function newDocument() {
    // checks to see if all changes have been saved
    if (myDiagram.isModified) {
        var save = confirm("Would you like to save changes to " + getCurrentFileName() + "?");
        if (save) {
            saveDocument();
        }
    }
    setCurrentFileName(UnsavedFileName);
    // loads an empty diagram
    var model = new go.GraphLinksModel;
    // initialize all modelData
    model.modelData = DEFAULT_MODELDATA;
    myDiagram.model = model;
    myDiagram.undoManager.isEnabled = true;
    myDiagram.addModelChangedListener(function (e) {
        if (e.isTransactionFinished) enableAll();
    });
    myDiagram.isModified = false;
    updateUI();
}

// update the UI properly in accordance with model.modelData
function updateUI() {
    var modelData = myDiagram.model.modelData;
    changeUnits(modelData.units);
    // update options GUI based on model.modelData.preferences
    var preferences = modelData.preferences;
    document.getElementById("showGridCheckbox").checked = preferences.showGrid;
    document.getElementById("gridSnapCheckbox").checked = preferences.gridSnap;
    document.getElementById("wallGuidelinesCheckbox").checked = preferences.showWallGuidelines;
    document.getElementById("wallLengthsCheckbox").checked = preferences.showWallLengths;
    document.getElementById("wallAnglesCheckbox").checked = preferences.showWallAngles;
    document.getElementById("smallWallAnglesCheckbox").checked = preferences.showOnlySmallWallAngles;
}

// checks to see if all changes have been saved -> shows the open HTML element
function openDocument() {
    if (checkLocalStorage()) {
        if (myDiagram.isModified) {
            var save = confirm("Would you like to save changes to " + getCurrentFileName() + "?");
            if (save) {
                saveDocument();
            }
        }
        openElement("openDocument", "mySavedFiles");
    }
}

// saves the current floor plan to local storage
function saveDocument() {
    if (checkLocalStorage()) {
        var saveName = getCurrentFileName();
        if (saveName === UnsavedFileName) {
            saveDocumentAs();
        } else {
            saveDiagramProperties()
            window.localStorage.setItem(saveName, myDiagram.model.toJson());
            myDiagram.isModified = false;
        }
    }
}

// saves floor plan to local storage with a new name
function saveDocumentAs() {
    if (checkLocalStorage()) {
        var saveName = prompt("Save file as...", getCurrentFileName());
        // if saveName is already in list of files, ask if overwrite is ok
        if (saveName && saveName !== UnsavedFileName) {
            var override = true;
            if (window.localStorage.getItem(saveName) !== null) {
                override = confirm("Do you want to overwrite " + saveName + "?");
            }
            if (override) {
                setCurrentFileName(saveName);
                saveDiagramProperties()
                window.localStorage.setItem(saveName, myDiagram.model.toJson());
                myDiagram.isModified = false;
            }
        }
    }
}

// shows the remove file HTML element
function removeDocument() {
    if (checkLocalStorage()) {
        openElement("removeDocument", "mySavedFiles2");
    }
}

// if user closes browser with unsaved changes, let them know they may lose unsaved data
window.onbeforeunload = function (e) {
    if (myDiagram.isModified) {
        var e = e || window.event;
        //IE, Chrome, Firefox, Opera
        if (e) {
            e.returnValue = 'You have unsaved changes!';
        }
        // For Safari
        return 'You have unsaved changes!';
    }
};

/***************************************************NON-INIT() functionality **************************************************/

var furnitureNodeDataArray = [

              {
                  category: "MultiPurposeNode",
                  key: "MultiPurposeNode",
                  color: "#ffffff",
                  stroke: '#000000',
                  name: "Writable Node",
                  type: "Writable Node",
                  shape: "Rectangle",
                  text: "Write here",
                  width: 60,
                  height: 60,
                  notes: ""
              },
              {
                  key: "roundTable",
                  color: "#ffffff",
                  stroke: '#000000',
                  caption: "Round Table",
                  type: "Round Table",
                  shape: "Ellipse",
                  width: 61,
                  height: 61,
                  notes: ""
              },
              {
                  key: "armChair",
                  color: "#ffffff",
                  stroke: '#000000',
                  caption: "Arm Chair",
                  type: "Arm Chair",
                  geo: "F1 M0 0 L40 0 40 40 0 40 0 0 M10 30 L10 10 M0 0 Q8 0 10 10 M0 40 Q20 15 40 40 M30 10 Q32 0 40 0 M30 10 L30 30",
                  width: 45,
                  height: 45,
                  notes: ""
              },
              {
                  key: "sofaMedium",
                  color: "#ffffff",
                  stroke: "#000000",
                  caption: "Sofa",
                  type: "Sofa",
                  geo: "F1 M0 0 L80 0 80 40 0 40 0 0 M10 35 L10 10 M0 0 Q8 0 10 10 M0 40 Q40 15 80 40 M70 10 Q72 0 80 0 M70 10 L70 35",
                  height: 45,
                  width: 90,
                  notes: ""
              },
              {
                  key: "sink",
                  color: "#ffffff",
                  stroke: '#000000',
                  caption: "Sink",
                  type: "Sink",
                  geo: "F1 M0 0 L40 0 40 40 0 40 0 0z M5 7.5 L18.5 7.5 M 21.5 7.5 L35 7.5 35 35 5 35 5 7.5 M 15 21.25 A 5 5 180 1 0 15 21.24 M23 3.75 A 3 3 180 1 1 23 3.74 M21.5 6.25 L 21.5 12.5 18.5 12.5 18.5 6.25 M15 3.75 A 1 1 180 1 1 15 3.74 M 10 4.25 L 10 3.25 13 3.25 M 13 4.25 L 10 4.25 M27 3.75 A 1 1 180 1 1 27 3.74 M 26.85 3.25 L 30 3.25 30 4.25 M 26.85 4.25 L 30 4.25",
                  width: 27,
                  height: 27,
                  notes: ""
              },
              {
                  key: "doubleSink",
                  color: "#ffffff",
                  stroke: '#000000',
                  caption: "Double Sink",
                  type: "Double Sink",
                  geo: "F1 M0 0 L75 0 75 40 0 40 0 0 M5 7.5 L35 7.5 35 35 5 35 5 7.5 M44 7.5 L70 7.5 70 35 40 35 40 9 M15 21.25 A5 5 180 1 0 15 21.24 M50 21.25 A 5 5 180 1 0 50 21.24 M40.5 3.75 A3 3 180 1 1 40.5 3.74 M40.5 3.75 L50.5 13.75 47.5 16.5 37.5 6.75 M32.5 3.75 A 1 1 180 1 1 32.5 3.74 M 27.5 4.25 L 27.5 3.25 30.5 3.25 M 30.5 4.25 L 27.5 4.25 M44.5 3.75 A 1 1 180 1 1 44.5 3.74 M 44.35 3.25 L 47.5 3.25 47.5 4.25 M 44.35 4.25 L 47.5 4.25",
                  height: 27,
                  width: 52,
                  notes: ""
              },
              {
                  key: "toilet",
                  color: "#ffffff",
                  stroke: '#000000',
                  caption: "Toilet",
                  type: "Toilet",
                  geo: "F1 M0 0 L25 0 25 10 0 10 0 0 M20 10 L20 15 5 15 5 10 20 10 M5 15 Q0 15 0 25 Q0 40 12.5 40 Q25 40 25 25 Q25 15 20 15",
                  width: 25,
                  height: 35,
                  notes: ""
              },
              {
                  key: "shower",
                  color: "#ffffff",
                  stroke: '#000000',
                  caption: "Shower/Tub",
                  type: "Shower/Tub",
                  geo: "F1 M0 0 L40 0 40 60 0 60 0 0 M35 15 L35 55 5 55 5 15 Q5 5 20 5 Q35 5 35 15 M22.5 20 A2.5 2.5 180 1 1 22.5 19.99",
                  width: 45,
                  height: 75,
                  notes: ""
              },
              {
                  key: "bed",
                  color: "#ffffff",
                  stroke: '#000000',
                  caption: "Bed",
                  type: "Bed",
                  geo: "F1 M0 0 L40 0 40 60 0 60 0 0 M 7.5 2.5 L32.5 2.5 32.5 17.5 7.5 17.5 7.5 2.5 M0 20 L40 20 M0 25 L40 25",
                  width: 76.2,
                  height: 101.6,
                  notes: ""
              },
              {
                  key: "staircase",
                  color: "#ffffff",
                  stroke: '#000000',
                  caption: "Staircase",
                  type: "Staircase",
                  geo: "F1 M0 0 L 0 100 250 100 250 0 0 0 M25 100 L 25 0 M 50 100 L 50 0 M 75 100 L 75 0 M 100 100 L 100 0 M 125 100 L 125 0 M 150 100 L 150 0 M 175 100 L 175 0 M 200 100 L 200 0 M 225 100 L 225 0",
                  width: 125,
                  height: 50,
                  notes: ""
              },
              {
                  key: "stove",
                  color: "#ffffff",
                  stroke: '#000000',
                  caption: "Stove",
                  type: "Stove",
                  geo: "F1 M 0 0 L 0 100 100 100 100 0 0 0 M 30 15 A 15 15 180 1 0 30.01 15 M 70 15 A 15 15 180 1 0 70.01 15"
                  + "M 30 55 A 15 15 180 1 0 30.01 55 M 70 55 A 15 15 180 1 0 70.01 55",
                  width: 75,
                  height: 75,
                  notes: ""
              },
              {
                  key: "diningTable",
                  color: "#ffffff",
                  stroke: '#000000',
                  caption: "Dining Table",
                  type: "Dining Table",
                  geo: "F1 M 0 0 L 0 100 200 100 200 0 0 0 M 25 0 L 25 -10 75 -10 75 0 M 125 0 L 125 -10 175 -10 175 0 M 200 25 L 210 25 210 75 200 75 M 125 100 L 125 110 L 175 110 L 175 100 M 25 100 L 25 110 75 110 75 100 M 0 75 -10 75 -10 25 0 25",
                  width: 125,
                  height: 62.5,
                  notes: ""
              }
];

var searchFurniture = function () {
    var str = document.getElementById("furnitureSearchBar").value;
    var items = furnitureNodeDataArray.slice();
    if (str !== null && str !== undefined && str !== "") {
        for (var i = 0; i < items.length; i += 0) {
            var item = items[i];
            if (!item.type.toLowerCase().includes(str.toLowerCase())) {
                items.splice(i, 1);
            }
            else i++;
        }
        myPalette.model.nodeDataArray = items;
    }
    else myPalette.model.nodeDataArray = furnitureNodeDataArray;
    myPalette.updateAllRelationshipsFromData()
}

// checks what units are being used, converts to cm then divides by 2, (1px = 2cm, change this if you want to use a different paradigm)
function convertPixelsToUnits(num) {
    var units = myDiagram.model.modelData.units;
    if (units === 'meters') return (num / 100) * 2;
    if (units === 'feet') return (num / 30.48) * 2;
    if (units === 'inches') return (num / 2.54) * 2;
    return num * 2;
}

// takes a number of units, converts to cm, then divides by 2, since 1px = 2cm (change this if you want to use a different paradigm)
function convertUnitsToPixels(num) {
    var units = myDiagram.model.modelData.units;
    if (units === 'meters') return (num * 100) / 2;
    if (units === 'feet') return (num * 30.48) / 2;
    if (units === 'inches') return (num * 2.54) / 2;
    return num / 2;
}

// adjust units based on the selected radio button in the Options Menu
function changeUnits() {
    myDiagram.startTransaction("set units");
    var prevUnits = myDiagram.model.modelData.units;
    var radios = document.forms["unitsForm"].elements["units"];
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            myDiagram.model.setDataProperty(myDiagram.model.modelData, "units", radios[i].id);
        }
    }
    var units = myDiagram.model.modelData.units;
    switch (units) {
        case 'centimeters': myDiagram.model.setDataProperty(myDiagram.model.modelData, "unitsAbbreviation", 'cm'); break;
        case 'meters': myDiagram.model.setDataProperty(myDiagram.model.modelData, "unitsAbbreviation", 'm'); break;
        case 'feet': myDiagram.model.setDataProperty(myDiagram.model.modelData, "unitsAbbreviation", 'ft'); break;
        case 'inches': myDiagram.model.setDataProperty(myDiagram.model.modelData, "unitsAbbreviation", 'in'); break;
    }
    var unitsAbbreviation = myDiagram.model.modelData.unitsAbbreviation;
    // update all units boxes with new units
    var unitAbbrevInputs = document.getElementsByClassName('unitsBox');
    for (var i = 0; i < unitAbbrevInputs.length; i++) {
        unitAbbrevInputs[i].value = unitsAbbreviation;
    }
    var unitInputs = document.getElementsByClassName('unitsInput');
    for (var i = 0; i < unitInputs.length; i++) {
        var input = unitInputs[i];
        myDiagram.model.setDataProperty(myDiagram.model.modelData, "units", prevUnits);
        var value = convertUnitsToPixels(input.value);
        myDiagram.model.setDataProperty(myDiagram.model.modelData, "units", units)
        value = convertPixelsToUnits(value);
        input.value = value;
    }
    if (myDiagram.selection.count === 1) setSelectionInfo(myDiagram.selection.first()); // reload node info measurements according to new units
    myDiagram.commitTransaction("set units");
}

// set current tool (selecting/dragging or wallbuilding/reshaping)
function setBehavior(string) {
    var wallBuildingTool = myDiagram.toolManager.mouseDownTools.elt(0);
    var wallReshapingTool = myDiagram.toolManager.mouseDownTools.elt(3);
    // style the current tool HTML button accordingly
    var elements = document.getElementsByClassName('setBehavior');
    for (var i = 0; i < elements.length; i++) {
        var el = elements[i];
        if (el.id === string + "Button") el.style.backgroundColor = '#4b545f';
        else el.style.backgroundColor = '#bbbbbb';
    }
    if (string === 'wallBuilding') {
        wallBuildingTool.isEnabled = true;
        wallReshapingTool.isEnabled = false;

        myDiagram.skipsUndoManager = true;
        myDiagram.startTransaction("change wallWidth");
        // create walls with wallWidth in input box
        myDiagram.model.setDataProperty(myDiagram.model.modelData, 'wallWidth', parseFloat(document.getElementById('wallWidthInput').value));
        var wallWidth = myDiagram.model.modelData.wallWidth;
        if (isNaN(wallWidth)) myDiagram.model.setDataProperty(myDiagram.model.modelData, 'wallWidth', 5);
        else {
            var width = convertUnitsToPixels(wallWidth);
            myDiagram.model.setDataProperty(myDiagram.model.modelData, 'wallWidth', width);
        }
        myDiagram.commitTransaction("change wallWidth");
        myDiagram.skipsUndoManager = false;
        document.getElementById('wallWidthBox').style.visibility = 'visible';
        document.getElementById('wallWidthBox').style.display = 'inline-block';
        setDiagramHelper("Click and drag on the diagram to draw a wall (hold SHIFT for 45 degree angles)");
    }
    if (string === 'dragging') {
        wallBuildingTool.isEnabled = false;
        wallReshapingTool.isEnabled = true;
        document.getElementById('wallWidthBox').style.visibility = 'hidden';
        document.getElementById('wallWidthBox').style.display = 'none';
    }
    // clear resize adornments on walls/windows, if there are any
    myDiagram.nodes.iterator.each(function (n) { n.clearAdornments(); })
    myDiagram.clearSelection();
}

// returns inverted color (in hex) of a given hex code color; used to determine furniture node stroke color
function invertColor(hexnum) {
    if (hexnum.includes('#')) hexnum = hexnum.substring(1);
    if (hexnum.length != 6) {
        console.error("Hex color must be six hex numbers in length.");
        return false;
    }

    hexnum = hexnum.toUpperCase();
    var splitnum = hexnum.split("");
    var resultnum = "";
    var simplenum = "FEDCBA9876".split("");
    var complexnum = new Array();
    complexnum.A = "5";
    complexnum.B = "4";
    complexnum.C = "3";
    complexnum.D = "2";
    complexnum.E = "1";
    complexnum.F = "0";

    for (i = 0; i < 6; i++) {
        if (!isNaN(splitnum[i])) {
            resultnum += simplenum[splitnum[i]];
        } else if (complexnum[splitnum[i]]) {
            resultnum += complexnum[splitnum[i]];
        } else {
            console.error("Hex colors must only include hex numbers 0-9, and A-F");
            return false;
        }
    }
    return '#' + resultnum;
}

// returns a given color (in hex) lightened by a given percentage
var lightenColor = function (color, percent) {
    var num = parseInt(color, 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        B = (num >> 8 & 0x00FF) + amt,
        G = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
};

// find and return an array of the endpoints of a given wallpart (window or door)
function getWallPartEndpoints(wallPart) {
    var loc = wallPart.location;
    var partLength = wallPart.data.width;
    if (wallPart.containingGroup !== null) var angle = wallPart.containingGroup.rotateObject.angle;
    else var angle = 180;
    var point1 = new go.Point((loc.x + (partLength / 2)), loc.y);
    var point2 = new go.Point((loc.x - (partLength / 2)), loc.y);
    point1.offset(-loc.x, -loc.y).rotate(angle).offset(loc.x, loc.y);
    point2.offset(-loc.x, -loc.y).rotate(angle).offset(loc.x, loc.y);
    var arr = []; arr.push(point1); arr.push(point2);
    return arr;
}

// returns a "stretch" (2 Points) that constrains a wallPart (door or window)
// this stretch is comprised of either "part"'s containing wall endpoints or other wallPart endpoints
function getWallPartStretch(part) {
    var wall = part.containingGroup;
    var startpoint = wall.data.startpoint.copy();
    var endpoint = wall.data.endpoint.copy();

    // sort all possible endpoints into either left/above or right/below
    var leftOrAbove = new go.Set(go.Point); var rightOrBelow = new go.Set(go.Point);
    wall.memberParts.iterator.each(function (wallPart) {
        if (wallPart.data.key !== part.data.key) {
            var endpoints = getWallPartEndpoints(wallPart);
            for (var i = 0; i < endpoints.length; i++) {
                if (endpoints[i].x < part.location.x || (endpoints[i].y > part.location.y && endpoints[i].x === part.location.x)) leftOrAbove.add(endpoints[i]);
                else rightOrBelow.add(endpoints[i]);
            }
        }
    });

    // do the same with the startpoint and endpoint of the dragging part's wall
    if (parseFloat(startpoint.x.toFixed(2)) < parseFloat(part.location.x.toFixed(2)) || (startpoint.y > part.location.y && parseFloat(startpoint.x.toFixed(2)) === parseFloat(part.location.x.toFixed(2)))) leftOrAbove.add(startpoint);
    else rightOrBelow.add(startpoint);
    if (parseFloat(endpoint.x.toFixed(2)) < parseFloat(part.location.x.toFixed(2)) || (endpoint.y > part.location.y && parseFloat(endpoint.x.toFixed(2)) === parseFloat(part.location.x.toFixed(2)))) leftOrAbove.add(endpoint);
    else rightOrBelow.add(endpoint);

    // of each set, find the closest point to the dragging part
    var leftOrAbovePt; var closestDistLeftOrAbove = Number.MAX_VALUE;
    leftOrAbove.iterator.each(function (point) {
        var distance = Math.sqrt(point.distanceSquaredPoint(part.location));
        if (distance < closestDistLeftOrAbove) {
            closestDistLeftOrAbove = distance;
            leftOrAbovePt = point;
        }
    });
    var rightOrBelowPt; var closestDistRightOrBelow = Number.MAX_VALUE;
    rightOrBelow.iterator.each(function (point) {
        var distance = Math.sqrt(point.distanceSquaredPoint(part.location));
        if (distance < closestDistRightOrBelow) {
            closestDistRightOrBelow = distance;
            rightOrBelowPt = point;
        }
    });

    var stretch = { point1: leftOrAbovePt, point2: rightOrBelowPt };
    return stretch;
}

// update the geometry, angle, and location of a given wall
var updateWall = function (wall) {
    var shape = wall.findObject("SHAPE");
    var geo = new go.Geometry(go.Geometry.Line);
    var sPt = wall.data.startpoint;
    var ePt = wall.data.endpoint;
    var mPt = new go.Point((sPt.x + ePt.x) / 2, (sPt.y + ePt.y) / 2);
    // define a wall's geometry as a simple horizontal line, then rotate it
    geo.startX = 0;
    geo.startY = 0;
    geo.endX = Math.sqrt(sPt.distanceSquaredPoint(ePt));
    geo.endY = 0;
    shape.geometry = geo;
    wall.location = mPt; // a wall's location is the midpoint between it's startpoint and endpoint
    var angle = sPt.directionPoint(ePt);
    wall.rotateObject.angle = angle;
    updateWallDimensions();
}

function makePointNode() {
    var $ = go.GraphObject.make;
    return $(go.Node, "Position", new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify));
}

function makeDimensionLink() {
    var $ = go.GraphObject.make;
    return $(go.Link, { locationSpot: go.Spot.TopLeft },
        $(go.Shape, { stroke: "gray", strokeWidth: 2, name: 'SHAPE' }),
        $(go.Shape, { toArrow: "OpenTriangle", stroke: "gray", strokeWidth: 2 }),
        $(go.Shape, { fromArrow: "BackwardOpenTriangle", stroke: "gray", strokeWidth: 2 }),
        $(go.TextBlock, { text: 'sometext', segmentOffset: new go.Point(0, -10), font: "13px sans-serif" },
            new go.Binding("text", "", function (link) {
                var fromPtNode = null; var toPtNode = null;
                allPointNodes.iterator.each(function (node) {
                    if (node.data.key === link.data.from) fromPtNode = node;
                    if (node.data.key === link.data.to) toPtNode = node;
                });
                if (fromPtNode !== null) {
                    var fromPt = fromPtNode.location;
                    var toPt = toPtNode.location;
                    return convertPixelsToUnits(Math.sqrt(fromPt.distanceSquaredPoint(toPt))).toFixed(2) + myDiagram.model.modelData.unitsAbbreviation;
                } return null;
            }).ofObject(),
            new go.Binding("angle", "angle", function (angle, link) {
                if (angle > 90 && angle < 270) return (angle + 180) % 360;
                return angle;
            }),
            new go.Binding("segmentOffset", "angle", function (angle, textblock) {
                var wall = myDiagram.findPartForKey(textblock.part.data.wall);
                if (wall.rotateObject.angle > 135 && wall.rotateObject.angle < 315) return new go.Point(0, 10);
                return new go.Point(0, -10);
            }).ofObject(),
            // scale font size according to the length of the link
            new go.Binding("font", "", function (link) {
                var fromPtNode = null; var toPtNode = null;
                allPointNodes.iterator.each(function (node) {
                    if (node.data.key === link.data.from) fromPtNode = node;
                    if (node.data.key === link.data.to) toPtNode = node;
                });
                if (fromPtNode !== null) {
                    var fromPt = fromPtNode.location;
                    var toPt = toPtNode.location;
                    var distance = Math.sqrt(fromPt.distanceSquaredPoint(toPt));
                    if (distance > 40) return "13px sans-serif";
                    if (distance <= 40 && distance >= 20) return "11px sans-serif";
                    else return "9px sans-serif";
                } return "13px sans-serif";
            }).ofObject()
        )
    )
}

var allPointNodes = new go.Set(go.Node);
var allDimensionLinks = new go.Set(go.Link);

// update the Dimension Links shown along a wall, based on which wallParts are selected
var updateWallDimensions = function () {
    /* helper function to build dimension links
        Parameters:
        "wall": {WallGroup} the wall the Link runs along (either describing the wall itself or some wallPart on "wall")
        "index": {Number} number appended to PointNode keys; used for finding PointNodes of Dimension Links later on
        "point1": {Point} the first point of the wallPart being described by the Link
        "point2": {Point} the second point of the wallPart being described by the Link
        "angle": {Number} the angle of the wallPart
        "wallOffset": {Number} how far from the wall (in px) the Link should be
        "soloWallFlag": {Boolean} if this Link is the only Dimension Link for "wall" (no other wallParts on "wall" selected) this is true; else, false
    */
    function buildDimensionLink(wall, index, point1, point2, angle, wallOffset, soloWallFlag) {
        point1 = getAdjustedPoint(point1, wall, angle, wallOffset);
        point2 = getAdjustedPoint(point2, wall, angle, wallOffset);
        var data1 = { key: wall.data.key + "PointNode" + index, category: "PointNode", loc: go.Point.stringify(point1) };
        var data2 = { key: wall.data.key + "PointNode" + (index + 1), category: "PointNode", loc: go.Point.stringify(point2) };
        var data3 = { key: wall.data.key + "DimensionLink", category: 'DimensionLink', from: data1.key, to: data2.key, stroke: 'gray', angle: angle, wall: wall.data.key, soloWallFlag: soloWallFlag };
        var pointNode1 = makePointNode();
        var pointNode2 = makePointNode();
        var link = makeDimensionLink();

        allPointNodes.add(pointNode1);
        allPointNodes.add(pointNode2);
        allDimensionLinks.add(link);
        myDiagram.add(pointNode1);
        myDiagram.add(pointNode2);
        myDiagram.add(link);

        pointNode1.data = data1;
        pointNode2.data = data2;
        link.data = data3;
        link.fromNode = pointNode1;
        link.toNode = pointNode2;
    }

    // helper function: get a to/from point for a Dimension Link, based on wall/wallpart's endpoint angle, and a given wallOffset (dist from wall)
    function getAdjustedPoint(point, wall, angle, wallOffset) {
        var oldPoint = point.copy();
        point.offset(0, -(wall.data.strokeWidth * .5) - wallOffset);
        point.offset(-oldPoint.x, -oldPoint.y).rotate(angle).offset(oldPoint.x, oldPoint.y);
        return point;
    }
    myDiagram.skipsUndoManager = true;
    myDiagram.startTransaction("update wall dimensions");
    // if showWallLengths === false, remove all pointNodes (used to build wall dimensions)
    if (!myDiagram.model.modelData.preferences.showWallLengths) {
        allPointNodes.iterator.each(function (node) { myDiagram.remove(node); });
        allDimensionLinks.iterator.each(function (link) { myDiagram.remove(link); });
        allPointNodes.clear();
        allDimensionLinks.clear();
        myDiagram.commitTransaction("update wall dimensions");
        myDiagram.skipsUndoManager = false;
        return;
    }
    // make visible all dimension links (zero-length dimension links are set to invisible at the end of the function) 
    allDimensionLinks.iterator.each(function (link) { link.visible = true; });

    var selection = myDiagram.selection;
    // gather all selected walls, including walls of selected DoorNodes and WindowNodes
    var walls = new go.Set(go.Group);
    selection.iterator.each(function (part) {
        if ((part.category === 'WindowNode' || part.category === 'DoorNode') && part.containingGroup !== null) walls.add(part.containingGroup);
        if (part.category === 'WallGroup' && part.data !== null) {
            var soloWallLink = null;
            allDimensionLinks.iterator.each(function (link) { if (link.data.soloWallFlag && link.data.wall === part.data.key) soloWallLink = link; });
            // if there's 1 Dimension Link for this wall (link has soloWallFlag), adjust to/from pointNodes of link, rather than deleting / redrawing
            if (soloWallLink !== null) {
                // since this is the only Dimension Link for this wall, keys of its pointNodes will be (wall.data.key) + 1 / (wall.data.key) + 2
                var linkPoint1 = null; var linkPoint2 = null;
                allPointNodes.iterator.each(function (node) {
                    if (node.data.key === part.data.key + "PointNode1") linkPoint1 = node;
                    if (node.data.key === part.data.key + "PointNode2") linkPoint2 = node;
                });

                var startpoint = part.data.startpoint; var endpoint = part.data.endpoint;
                // adjust  left/top-most / right/bottom-most wall endpoints so link angle is correct (else text appears on wrong side of Link)
                var firstWallPt = ((startpoint.x + startpoint.y) <= (endpoint.x + endpoint.y)) ? startpoint : endpoint;
                var lastWallPt = ((startpoint.x + startpoint.y) > (endpoint.x + endpoint.y)) ? startpoint : endpoint;
                var newLoc1 = getAdjustedPoint(firstWallPt.copy(), part, part.rotateObject.angle, 10);
                var newLoc2 = getAdjustedPoint(lastWallPt.copy(), part, part.rotateObject.angle, 10);
                linkPoint1.data.loc = go.Point.stringify(newLoc1);
                linkPoint2.data.loc = go.Point.stringify(newLoc2);
                soloWallLink.data.angle = part.rotateObject.angle;
                linkPoint1.updateTargetBindings();
                linkPoint2.updateTargetBindings();
                soloWallLink.updateTargetBindings();
            }
            // else build a Dimension Link for this wall; this is removed / replaced if Dimension Links for wallParts this wall are built
            else {
                var startpoint = part.data.startpoint;
                var endpoint = part.data.endpoint;
                var firstWallPt = ((startpoint.x + startpoint.y) <= (endpoint.x + endpoint.y)) ? startpoint : endpoint;
                var lastWallPt = ((startpoint.x + startpoint.y) > (endpoint.x + endpoint.y)) ? startpoint : endpoint;
                buildDimensionLink(part, 1, firstWallPt.copy(), lastWallPt.copy(), part.rotateObject.angle, 10, true);
            }
        }
    });
    // create array of selected wall endpoints and selected wallPart endpoints along the wall that represent measured stretches
    walls.iterator.each(function (wall) {
        var startpoint = wall.data.startpoint;
        var endpoint = wall.data.endpoint;
        var firstWallPt = ((startpoint.x + startpoint.y) <= (endpoint.x + endpoint.y)) ? startpoint : endpoint;
        var lastWallPt = ((startpoint.x + startpoint.y) > (endpoint.x + endpoint.y)) ? startpoint : endpoint;

        // store all endpoints along with the part they correspond to (used later to either create DimensionLinks or simply adjust them)
        var wallPartEndpoints = [];
        wall.memberParts.iterator.each(function (wallPart) {
            if (wallPart.isSelected) {
                var endpoints = getWallPartEndpoints(wallPart);
                wallPartEndpoints.push(endpoints[0]);
                wallPartEndpoints.push(endpoints[1]);
            }
        });
        // sort all wallPartEndpoints by x coordinate left to right/ up to down
        wallPartEndpoints.sort(function (a, b) {
            if ((a.x + a.y) > (b.x + b.y)) return 1;
            if ((a.x + a.y) < (b.x + b.y)) return -1;
            else return 0;
        });
        wallPartEndpoints.unshift(firstWallPt);
        wallPartEndpoints.push(lastWallPt);

        var angle = wall.rotateObject.angle;
        var k = 1; // k is a counter for the indices of PointNodes
        // build / edit dimension links for each stretch, defined by pairs of points in wallPartEndpoints
        for (var j = 0; j < wallPartEndpoints.length - 1; j++) {
            var linkPoint1 = null; linkPoint2 = null;
            allPointNodes.iterator.each(function (node) {
                if (node.data.key === wall.data.key + "PointNode" + k) linkPoint1 = node;
                if (node.data.key === wall.data.key + "PointNode" + (k + 1)) linkPoint2 = node;
            });
            if (linkPoint1 !== null) {
                var newLoc1 = getAdjustedPoint(wallPartEndpoints[j].copy(), wall, angle, 5);
                var newLoc2 = getAdjustedPoint(wallPartEndpoints[j + 1].copy(), wall, angle, 5);
                linkPoint1.data.loc = go.Point.stringify(newLoc1);
                linkPoint2.data.loc = go.Point.stringify(newLoc2);
                linkPoint1.updateTargetBindings();
                linkPoint2.updateTargetBindings();
            }
                // only build new links if needed -- normally simply change pointNode locations
            else buildDimensionLink(wall, k, wallPartEndpoints[j].copy(), wallPartEndpoints[j + 1].copy(), angle, 5, false);
            k += 2;
        }
        // total wall Dimension Link would be constructed of a kth and k+1st pointNode
        var totalWallDimensionLink = null;
        allDimensionLinks.iterator.each(function (link) {
            if ((link.fromNode.data.key === wall.data.key + "PointNode" + k) &&
                (link.toNode.data.key === wall.data.key + "PointNode" + (k + 1))) totalWallDimensionLink = link;
        });
        // if a total wall Dimension Link already exists, adjust its constituent point nodes
        if (totalWallDimensionLink !== null) {
            var linkPoint1 = null; var linkPoint2 = null;
            allPointNodes.iterator.each(function (node) {
                if (node.data.key === wall.data.key + "PointNode" + k) linkPoint1 = node;
                if (node.data.key === wall.data.key + "PointNode" + (k + 1)) linkPoint2 = node;
            });
            var newLoc1 = getAdjustedPoint(wallPartEndpoints[0].copy(), wall, angle, 25);
            var newLoc2 = getAdjustedPoint(wallPartEndpoints[wallPartEndpoints.length - 1].copy(), wall, angle, 25);
            linkPoint1.data.loc = go.Point.stringify(newLoc1);
            linkPoint2.data.loc = go.Point.stringify(newLoc2);
            linkPoint1.updateTargetBindings();
            linkPoint2.updateTargetBindings();
        }
            // only build total wall Dimension Link (far out from wall to accomodate wallPart Dimension Links) if one does not already exist
        else buildDimensionLink(wall, k, wallPartEndpoints[0].copy(), wallPartEndpoints[wallPartEndpoints.length - 1].copy(), angle, 25, false);
    });

    // Cleanup: hide zero-length Dimension Links
    allDimensionLinks.iterator.each(function (link) {
        var length = Math.sqrt(link.toNode.location.distanceSquaredPoint(link.fromNode.location));
        if (length < 1 && !link.data.soloWallFlag) link.visible = false;
    });

    myDiagram.commitTransaction("update wall dimensions");
    myDiagram.skipsUndoManager = false;
}

// helper function for updateWallAngles(); returns the Point where two walls intersect; if they do not intersect, return null
var getWallsIntersection = function (wall1, wall2) {
    if (wall1 === null || wall2 === null) return null;
    // treat walls as lines; get lines in formula of ax + by = c
    var a1 = wall1.data.endpoint.y - wall1.data.startpoint.y;
    var b1 = wall1.data.startpoint.x - wall1.data.endpoint.x;
    var c1 = (a1 * wall1.data.startpoint.x) + (b1 * wall1.data.startpoint.y);
    var a2 = wall2.data.endpoint.y - wall2.data.startpoint.y;
    var b2 = wall2.data.startpoint.x - wall2.data.endpoint.x;
    var c2 = (a2 * wall2.data.startpoint.x) + (b2 * wall2.data.startpoint.y);
    // now solve the system of equations, finding where the lines (not segments) would intersect
    /** Algebra Explanation:
        Line 1: a1x + b1y = c1
        Line 2: a2x + b2y = c2

        Multiply Line1 equation by b2, Line2 equation by b1, get:
        a1b1x + b1b2y = b2c1
        a2b1x + b1b2y = b1c2

        Subtract bottom from top:
        a1b2x - a2b1x = b2c1 - b1c2

        Divide both sides by a1b2 - a2b1, get equation for x. Equation for y is analogous
    **/
    var det = a1 * b2 - a2 * b1;
    var x = null; var y = null;
    // Edge Case: Lines are paralell
    if (det === 0) {
        // Edge Case: wall1 and wall2 have an endpoint to endpoint intersection (the only instance in which paralell walls could intersect at a specific point)
        if (wall1.data.startpoint.equals(wall2.data.startpoint) || wall1.data.startpoint.equals(wall2.data.endpoint)) return wall1.data.startpoint;
        if (wall1.data.endpoint.equals(wall2.data.startpoint) || wall1.data.endpoint.equals(wall2.data.endpoint)) return wall1.data.endpoint;
        return null;
    }
    else {
        x = (b2 * c1 - b1 * c2) / det;
        y = (a1 * c2 - a2 * c1) / det;
    }
    // test that the proposed intersection is contained in both line segments (walls)
    var inWall1 = ((Math.min(wall1.data.startpoint.x, wall1.data.endpoint.x) <= x) && (Math.max(wall1.data.startpoint.x, wall1.data.endpoint.x) >= x)
        && (Math.min(wall1.data.startpoint.y, wall1.data.endpoint.y) <= y) && (Math.max(wall1.data.startpoint.y, wall1.data.endpoint.y) >= y));
    var inWall2 = ((Math.min(wall2.data.startpoint.x, wall2.data.endpoint.x) <= x) && (Math.max(wall2.data.startpoint.x, wall2.data.endpoint.x) >= x)
        && (Math.min(wall2.data.startpoint.y, wall2.data.endpoint.y) <= y) && (Math.max(wall2.data.startpoint.y, wall2.data.endpoint.y) >= y));
    if (inWall1 && inWall2) return new go.Point(x, y);
    else return null;
}

// determines arc geometry for angleNodes
function makeArc(node) {
    var ang = node.data.angle;
    var sweep = node.data.sweep;
    var rad = Math.min(30, node.data.maxRadius);
    if (typeof sweep === "number" && sweep > 0) {
        var start = new go.Point(rad, 0).rotate(ang);
        // this is much more efficient than calling go.GraphObject.make:
        return new go.Geometry()
              .add(new go.PathFigure(start.x + rad, start.y + rad)  // start point
                   .add(new go.PathSegment(go.PathSegment.Arc,
                                           ang, sweep,  // angles
                                           rad, rad,  // center
                                           rad, rad)  // radius
                        ))
              .add(new go.PathFigure(0, 0))
              .add(new go.PathFigure(2 * rad, 2 * rad));
    } else {  // make sure this arc always occupies the same circular area of RAD radius
        return new go.Geometry()
              .add(new go.PathFigure(0, 0))
              .add(new go.PathFigure(2 * rad, 2 * rad));
    }
}

function makeAngleNode() {
    var $ = go.GraphObject.make;
    return $(go.Node, "Spot", { locationSpot: go.Spot.Center, locationObjectName: "SHAPE", selectionAdorned: false },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, "Circle", // placed where walls intersect, is invisible
        { name: "SHAPE", fill: "red", height: 0, width: 0 }),
        $(go.Shape, { stroke: "green", strokeWidth: 1.5, fill: null }, // arc
        new go.Binding("geometry", "", makeArc).ofObject(),
        new go.Binding("stroke", "sweep", function (sweep) { return (sweep % 45 < 1 || sweep % 45 > 44) ? "dodgerblue" : "lightblue"; })),
        $(go.Panel, "Auto", { name: "ARCLABEL" },
        // position the label in the center of the arcv 
        new go.Binding("alignment", "sweep", function (sweep, panel) {
            var rad = Math.min(30, panel.part.data.maxRadius);
            var angle = panel.part.data.angle;
            var cntr = new go.Point(rad, 0).rotate(angle + sweep / 2);
            return new go.Spot(0.5, 0.5, cntr.x, cntr.y);
        }),
        $(go.Shape, { stroke: "black", fill: "white" },
        new go.Binding("stroke", "sweep", function (sweep) { return (sweep % 45 < 1 || sweep % 45 > 44) ? "dodgerblue" : "lightblue"; })),
        $(go.TextBlock, { font: "7pt sans-serif", margin: new go.Margin(2, 2, 2, 2) },
        new go.Binding("text", "sweep", function (sweep) { return sweep.toFixed(2) + String.fromCharCode(176); }),
        new go.Binding("stroke", "color"))
  ));
}

var allAngleNodes = new go.Set(go.Node);

// update the angle links shown along a wall, based on which wall(s) is/are selected
var updateWallAngles = function () {
    myDiagram.skipsUndoManager = true; // do not store displaying angles as a transaction
    myDiagram.startTransaction("display angles");
    if (myDiagram.model.modelData.preferences.showWallAngles) {
        allAngleNodes.iterator.each(function(node){node.visible = true;});
        var selectedWalls = [];
        myDiagram.selection.iterator.each(function (part) { if (part.category === "WallGroup") selectedWalls.push(part); });
        for (var i = 0; i < selectedWalls.length; i++) {
            var seen = new go.Set("string"); // Set of all walls "seen" thus far for "wall"
            var wall = selectedWalls[i];
            var possibleWalls = myDiagram.findNodesByExample({ category: "WallGroup" });

            // go through all other walls; if the other wall intersects this wall, make angles
            possibleWalls.iterator.each(function (otherWall) {
                if (otherWall.data === null || wall.data === null || seen.contains(otherWall.data.key)) return;
                if ((otherWall.data.key !== wall.data.key) && (getWallsIntersection(wall, otherWall) !== null) && (!seen.contains(otherWall.data.key))) {

                    seen.add(otherWall.data.key);
                    // "otherWall" intersects "wall"; make or update angle nodes
                    var intersectionPoint = getWallsIntersection(wall, otherWall);
                    var wallsInvolved = myDiagram.findObjectsNear(intersectionPoint,
                        1,
                        function (x) { if (x.part !== null) return x.part; },
                        function (p) { return p.category === "WallGroup"; },
                        false);

                    var endpoints = []; // store endpoints and their corresponding walls here
                    // gather endpoints of each wall in wallsInvolved; discard endpoints within a tolerance distance of intersectionPoint
                    wallsInvolved.iterator.each(function (w) {
                        var tolerance = (myDiagram.model.modelData.gridSize >= 10) ? myDiagram.model.modelData.gridSize : 10;
                        if (Math.sqrt(w.data.startpoint.distanceSquaredPoint(intersectionPoint)) > tolerance) endpoints.push({ point: w.data.startpoint, wall: w.data.key });
                        if (Math.sqrt(w.data.endpoint.distanceSquaredPoint(intersectionPoint)) > tolerance) endpoints.push({ point: w.data.endpoint, wall: w.data.key });
                    });

                    // find maxRadius (shortest distance from an involved wall's endpoint to intersectionPoint or 30, whichever is smaller)
                    var maxRadius = 30;
                    for (var i = 0; i < endpoints.length; i++) {
                        var distance = Math.sqrt(endpoints[i].point.distanceSquaredPoint(intersectionPoint));
                        if (distance < maxRadius) maxRadius = distance;
                    }

                    // sort endpoints in a clockwise fashion around the intersectionPoint
                    endpoints.sort(function (a, b) {
                        a = a.point; b = b.point;
                        if (a.x - intersectionPoint.x >= 0 && b.x - intersectionPoint.x < 0) return true;
                        if (a.x - intersectionPoint.x < 0 && b.x - intersectionPoint.x >= 0) return false;
                        if (a.x - intersectionPoint.x == 0 && b.x - intersectionPoint.x == 0) {
                            if (a.y - intersectionPoint.y >= 0 || b.y - intersectionPoint.y >= 0) return a.y > b.y;
                            return b.y > a.y;
                        }

                        // compute the cross product of vectors (center -> a) x (center -> b)
                        var det = (a.x - intersectionPoint.x) * (b.y - intersectionPoint.y) - (b.x - intersectionPoint.x) * (a.y - intersectionPoint.y);
                        if (det < 0) return true;
                        if (det > 0) return false;

                        // points a and b are on the same line from the center; check which point is closer to the center
                        var d1 = (a.x - intersectionPoint.x) * (a.x - intersectionPoint.x) + (a.y - intersectionPoint.y) * (a.y - intersectionPoint.y);
                        var d2 = (b.x - intersectionPoint.x) * (b.x - intersectionPoint.x) + (b.y - intersectionPoint.y) * (b.y - intersectionPoint.y);
                        return d1 > d2;
                    }); // end endpoints sort

                    // for each pair of endpoints, construct or modify an angleNode 
                    for (var i = 0; i < endpoints.length; i++) {
                        var p1 = endpoints[i];
                        if (endpoints[i + 1] != null) var p2 = endpoints[i + 1];
                        else var p2 = endpoints[0];
                        var a1 = intersectionPoint.directionPoint(p1.point);
                        var a2 = intersectionPoint.directionPoint(p2.point);
                        var sweep = Math.abs(a2 - a1 + 360) % 360;
                        var angle = a1;

                        /*
                            construct proper key for angleNode
                            proper angleNode key syntax is "wallWwallX...wallYangleNodeZ" such that W < Y < Y; angleNodes are sorted clockwise around the intersectionPoint by Z
                        */
                        var keyArray = []; // used to construct proper key
                        wallsInvolved.iterator.each(function (wall) { keyArray.push(wall); });
                        keyArray.sort(function (a, b) {
                            var aIndex = a.data.key.match(/\d+/g);
                            var bIndex = b.data.key.match(/\d+/g);
                            if (isNaN(aIndex)) return true;
                            if (isNaN(bIndex)) return false;
                            else return aIndex > bIndex;
                        });

                        var key = "";
                        for (var j = 0; j < keyArray.length; j++) key += keyArray[j].data.key;
                        key += "angle" + i;

                        // check if this angleNode already exists -- if it does, adjust data (instead of deleting/redrawing)
                        var angleNode = null;
                        allAngleNodes.iterator.each(function (aNode) { if (aNode.data.key === key) angleNode = aNode; });
                        if (angleNode !== null) {
                            angleNode.data.angle = angle;
                            angleNode.data.sweep = sweep;
                            angleNode.data.loc = go.Point.stringify(intersectionPoint);
                            angleNode.data.maxRadius = maxRadius;
                            angleNode.updateTargetBindings();
                        }
                        // if this angleNode does not already exist, create it and add it to the diagram 
                        else {
                            var data = { key: key, category: "AngleNode", loc: go.Point.stringify(intersectionPoint), stroke: "dodgerblue", angle: angle, sweep: sweep, maxRadius: maxRadius };
                            var newAngleNode = makeAngleNode();
                            newAngleNode.data = data;
                            myDiagram.add(newAngleNode);
                            newAngleNode.updateTargetBindings();
                            allAngleNodes.add(newAngleNode);
                        }
                    }
                }
            });
        }
        // garbage collection (angleNodes that should not exist any more)
        var garbage = [];
        allAngleNodes.iterator.each(function (node) {
            var keyNums = node.data.key.match(/\d+/g); // values X for all wall keys involved, given key "wallX"
            var numWalls = (node.data.key.match(/wall/g) || []).length; // # of walls involved in in "node"'s construction
            var wallsInvolved = [];
            // add all walls involved in angleNode's construction to wallsInvolved
            for (var i = 0; i < keyNums.length - 1; i++) wallsInvolved.push("wall" + keyNums[i]);
            // edge case: if the numWalls != keyNums.length, that means the wall with key "wall" (no number in key) is involved
            if (numWalls !== keyNums.length - 1) wallsInvolved.push("wall");

            // Case 1: if any wall pairs involved in this angleNode are no longer intersecting, add this angleNode to "garbage"
            for (var i = 0; i < wallsInvolved.length - 1; i++) {
                var wall1 = myDiagram.findPartForKey(wallsInvolved[i]);
                var wall2 = myDiagram.findPartForKey(wallsInvolved[i + 1]);
                var intersectionPoint = getWallsIntersection(wall1, wall2);
                if (intersectionPoint === null) garbage.push(node);
            }
            // Case 2: if there are angleNode clusters with the same walls in their keys as "node" but different locations, destroy and rebuild
            // collect all angleNodes with same walls in their construction as "node"
            var possibleAngleNodes = new go.Set(go.Node);
            var allWalls = node.data.key.slice(0, node.data.key.indexOf("angle"));
            allAngleNodes.iterator.each(function (other) { if (other.data.key.includes(allWalls)) possibleAngleNodes.add(other); });
            possibleAngleNodes.iterator.each(function (pNode) {
                if (pNode.data.loc !== node.data.loc) {
                    garbage.push(pNode);
                }
            });

            // Case 3: put any angleNodes with sweep === 0 in garbage
            if (node.data.sweep === 0) garbage.push(node);
        });

        for (var i = 0; i < garbage.length; i++) {
            myDiagram.remove(garbage[i]); // remove garbage
            allAngleNodes.remove(garbage[i]);
        }       
    }
    // hide all angles > 180 if show only acute angles is one
    if (myDiagram.model.modelData.preferences.showOnlySmallWallAngles) {
        allAngleNodes.iterator.each(function (node) { if (node.data.sweep >= 180) node.visible = false; });
    }
    myDiagram.commitTransaction("display angles");
    myDiagram.skipsUndoManager = false;
}

// update all statistics in Statistics Window - called when the model is changed
var updateStatistics = function () {
    var element = document.getElementById('statisticsWindowTextDiv');
    element.innerHTML = "<div class='row'><div class='col-2' style='height: 165px; overflow: auto;'> Item Types <table id='numsTable'></table></div><div class='col-2'> Totals <table id='totalsTable'></table></div></div>";
    // fill Item Types table with node type/count of all nodes in diagram
    numsTable = document.getElementById('numsTable');
    var allPaletteNodes = myPalette.model.nodeDataArray.concat(myPalette2.model.nodeDataArray);
    for (var i = 0; i < allPaletteNodes.length; i++) {
        var type = allPaletteNodes[i].type;
        var num = myDiagram.findNodesByExample({ type: type }).count;
        if (num > 0) // only display data for nodes that exist on the diagram
            numsTable.innerHTML += "<tr class='data'> <td style='float: left;'>" + type + "</td> <td style='float: right;'> " + num + "</td></tr>";
    }
    // fill Totals table with lengths of all walls
    totalsTable = document.getElementById('totalsTable');
    var walls = myDiagram.findNodesByExample({ category: "WallGroup" });
    var totalLength = 0;
    walls.iterator.each(function (wall) {
        var wallLength = Math.sqrt(wall.data.startpoint.distanceSquaredPoint(wall.data.endpoint));
        totalLength += wallLength;
    });
    totalLength = convertPixelsToUnits(totalLength).toFixed(2);
    var unitsAbbreviation = myDiagram.model.modelData.unitsAbbreviation;
    totalsTable.innerHTML += "<tr class='data'><td style='float: left;'>Wall Lengths</td><td style='float: right;'>" + totalLength + unitsAbbreviation + "</td></tr>";
}

//******************************* HTML Interaction code *******************************************************
// change the "checked" value of checkboxes in the Options Menu, and to have those changes reflected in app behavior
function checkboxChanged(id) {
    myDiagram.skipsUndoManager = true;
    myDiagram.startTransaction("change preference");
    var element = document.getElementById(id);
    switch (id) {
        case "showGridCheckbox": {
            myDiagram.grid.visible = element.checked;
            myDiagram.model.modelData.preferences.showGrid = element.checked;
            break;
        }
        case "gridSnapCheckbox": {
            myDiagram.toolManager.draggingTool.isGridSnapEnabled = element.checked;
            myDiagram.model.modelData.preferences.gridSnap = element.checked;
            break;
        }
        case "wallGuidelinesCheckbox": myDiagram.model.modelData.preferences.showWallGuidelines = element.checked; break;
        case "wallLengthsCheckbox": myDiagram.model.modelData.preferences.showWallLengths = element.checked; updateWallDimensions(); break;
        case "wallAnglesCheckbox": myDiagram.model.modelData.preferences.showWallAngles = element.checked; updateWallAngles(); break;
        case "smallWallAnglesCheckbox": myDiagram.model.modelData.preferences.showOnlySmallWallAngles = element.checked; updateWallAngles(); break;
    }
    myDiagram.commitTransaction("change preference");
    myDiagram.skipsUndoManager = false;
}

// changes the edge length of the grid
function changeGridSize() {
    myDiagram.skipsUndoManager = true;
    myDiagram.startTransaction("change grid size");
    var el = document.getElementById('gridSizeInput'); var input;
    if (!isNaN(el.value) && el.value != null && el.value != '' && el.value != undefined) input = parseFloat(el.value);
    else {
        el.value = convertPixelsToUnits(10); // if bad input given, revert to 20cm (10px) or unit equivalent
        input = parseFloat(el.value);
    }
    input = convertUnitsToPixels(input);
    myDiagram.grid.gridCellSize = new go.Size(input, input);
    myDiagram.toolManager.draggingTool.gridCellSize = new go.Size(input, input);
    myDiagram.model.setDataProperty(myDiagram.model.modelData, "gridSize", input);
    myDiagram.commitTransaction("change grid size");
    myDiagram.skipsUndoManager = false;
}

//sets text under Diagram to suggest the most likely function the user wants
function setDiagramHelper(str) { document.getElementById("diagramHelpTextDiv").innerHTML = '<p>' + str + '</p>'; }

// helper function for setSelectionInfo(); displays all nodes in a given set in a given 1 or 2 rows in a given HTML element
// parameter "iterator" may be an iterable collection or array
function fillRowsWithNodes(iterator, element, numRows, selectedKey) {
    var arr = [];
    if (iterator.constructor !== Array) iterator.each(function (p) { arr.push(p); });
    else arr = iterator;
    for (var i = 0; i < arr.length; i += numRows) {
        if (arr[i].data === null) { setSelectionInfo('Nothing selected'); return; }
        var key1 = arr[i].data.key; // keys used to locate the node if clicked on...
        var name1 = (arr[i].data.caption !== "MultiPurposeNode") ? arr[i].data.caption : arr[i].data.text; // ... names are editable, so users can distinguish between nodes
        // if there's two nodes for this row...
        if (arr[i + 1] != undefined && arr[i + 1] != null) {
            var key2 = arr[i + 1].data.key;
            var name2 = (arr[i + 1].data.caption !== null) ? arr[i + 1].data.caption : arr[i + 1].data.text;
            // if there's a non-null selectedKey, highlight the selected node in the list
            if (key1 === selectedKey) element.innerHTML += '<div class="row"><div class="col-' + numRows + '"><p class="data clickable selectedKey" onclick="setSelectionInfo(myDiagram.findPartForKey(' + "'" + key1 + "'" + '))">' + name1 + '</p></div><div class="col-' + numRows + '"><p class="data clickable" onclick="setSelectionInfo(myDiagram.findPartForKey(' + "'" + key2 + "'" + '))">' + name2 + '</p></div></div>';
            else if (key2 === selectedKey) element.innerHTML += '<div class="row"><div class="col-' + numRows + '"><p class="data clickable" onclick="setSelectionInfo(myDiagram.findPartForKey(' + "'" + key1 + "'" + '))">' + name1 + '</p></div><div class="col-' + numRows + '"><p class="data clickable selectedKey" onclick="setSelectionInfo(myDiagram.findPartForKey(' + "'" + key2 + "'" + '))">' + name2 + '</p></div></div>';
            else element.innerHTML += '<div class="row"><div class="col-' + numRows + '"><p class="data clickable" onclick="setSelectionInfo(myDiagram.findPartForKey(' + "'" + key1 + "'" + '))">' + name1 + '</p></div><div class="col-' + numRows + '"><p class="data clickable" onclick="setSelectionInfo(myDiagram.findPartForKey(' + "'" + key2 + "'" + '))">' + name2 + '</p></div></div>';
        } // if there's only one node for this row...
        else {
            if (key1 === selectedKey) element.innerHTML += '<div class="row"><div class="col-' + numRows + '"><p class="data clickable selectedKey" onclick="setSelectionInfo(myDiagram.findPartForKey(' + "'" + key1 + "'" + '))">' + name1 + '</p></div><div class="col-2"><p class="data clickable"></p></div></div>';
            else element.innerHTML += '<div class="row"><div class="col-' + numRows + '"><p class="data clickable" onclick="setSelectionInfo(myDiagram.findPartForKey(' + "'" + key1 + "'" + '))">' + name1 + '</p></div><div class="col-2"><p class="data clickable"></p></div></div>';
        }
    }
}

// displays editable info regarding a selection in the Selection Help window (height/length, width, name, group info)
function setSelectionInfo(node) {
    if (node instanceof go.GraphObject) node = node.part;
    var element = document.getElementById("selectionInfoTextDiv");
    var infoWindow = document.getElementById('selectionInfoWindow');
    if (element === null || infoWindow === null) return;
    if (node === 'Nothing selected' || node.layer === null || node === null) { element.innerHTML = '<p>' + node + '</p>'; return; }

    // if there are multiple nodes selected, show all their names, allowing user to click on the node they want
    if (node === 'Selection: ') {
        var selectionIterator = myDiagram.selection.iterator; var arr = [];
        element.innerHTML = '<p id="name"> Selection (' + selectionIterator.count + ' items selected): </p>';
        fillRowsWithNodes(selectionIterator, element, 2, null);
        infoWindow.style.height = document.getElementById('selectionInfoTextDiv').offsetHeight + document.getElementById('selectionInfoWindowHandle').offsetHeight + 5 + 'px';
        return;
    }

    // if we have one node selected, gather pertinent information for that node....
    myDiagram.select(node);
    var name = ''; var length; var width; var nodeGroupCount = 0; var notes = node.data.notes;
    // get node name
    if (node.category === 'MultiPurposeNode') name = node.data.text;
    else name = node.data.caption;
    // get node height / width (dependent on node category)
    if (node.category === 'WallGroup') {
        height = convertPixelsToUnits(Math.sqrt(node.data.startpoint.distanceSquared(node.data.endpoint.x, node.data.endpoint.y))).toFixed(2); // wall length
        width = convertPixelsToUnits(node.data.strokeWidth).toFixed(2);
    } else if (node.category === 'DoorNode') {
        height = convertPixelsToUnits(node.data.width).toFixed(2);
        width = convertPixelsToUnits(node.data.width).toFixed(2);
    } else if (node.data.isGroup && node.category !== "WallGroup") {
        height = convertPixelsToUnits(node.actualBounds.height).toFixed(2);
        width = convertPixelsToUnits(node.actualBounds.width).toFixed(2); 
    } else {
        height = convertPixelsToUnits(node.data.height).toFixed(2);
        width = convertPixelsToUnits(node.data.width).toFixed(2);
    }
    // get node group info
    if (node.containingGroup != null && node.containingGroup != undefined) {
        var nodeGroupParts = node.containingGroup.memberParts;
        nodeGroupCount = nodeGroupParts.count;
    }
    if (node.data.isGroup) {
        var nodeGroupParts = node.memberParts;
        nodeGroupCount = nodeGroupParts.count;
    }
    var unitsAbbreviation = myDiagram.model.modelData.unitsAbbreviation;

    //... then display that information in the selection info window
    element.innerHTML = '<p id="name" >Name: ' + '<input id="nameInput" class="nameNotesInput" value="' + name + '"/>' + '</p>';
    // display node notes in a textarea
    element.innerHTML += "<p>Notes: <textarea id='notesTextarea' class='nameNotesInput' >" + notes + "</textarea></p>";
    // display color as a color picker element (individual nodes only)
    if (!node.data.isGroup && node.data.category !== "DoorNode" && node.data.category !== "WindowNode") {
        element.innerHTML += '<p>Color: <input type="color" id="colorPicker" value="' + node.data.color + '" name="selectionColor"></input></p>';
        var colorPicker = document.getElementById('colorPicker');
    }

    // display "Door Length" input (Door Nodes only)
    if (node.category === "DoorNode") element.innerHTML += '<div class="row"><p id="heightLabel" class="data">Door Length: <br/><input id = "heightInput" class = "dimensionsInput" name = "height" value = "' + height + '"/>'
        + '<input id="heightUnits" class="unitsBox" value=' + unitsAbbreviation + ' disabled/></p>';
    // display the editable properties height and width (non-Door nodes)
    else element.innerHTML += '<div class="row"><div class="col-2"><p id="heightLabel" class="data">Height: <br/><input id = "heightInput" class = "dimensionsInput" name = "height" value = "' + height
        + '"/><input id="heightUnits" class="unitsBox" value=' + unitsAbbreviation + ' disabled/></p> ' + '</div><div class="col-2"><p class="data">Width: <br/><input id = "widthInput" class = "dimensionsInput" value = "'
        + width + '"/><input id="widthUnits" class="unitsBox" value="' + unitsAbbreviation + '" disabled/></p>' + '</p></div></div>';

    // for walls "height" is displayed as "length"
    if (node.category === 'WallGroup') document.getElementById("heightLabel").innerHTML = 'Length: <br/><input id = "heightInput" class = "dimensionsInput" name = "height" value = "' + height + '"/><input id="heightUnits" class="unitsBox" value=' + unitsAbbreviation + ' disabled/> ';

    // do not allow height or width adjustment for group info
    if (node.data.isGroup && node.category !== "WallGroup") {
        document.getElementById("heightInput").disabled = true;
        document.getElementById("widthInput").disabled = true;
    }

    // "Apply Changes" button
    element.innerHTML += '<div class="row"> <button id="applySelectionChanges" onClick="applySelectionChanges()">Apply Changes</button></div>';

    // display group info for standard groups, wallParts for walls
    var groupName = null; var groupKey = null; var selectedKey = "";
    if (node.data.isGroup === true) {
        groupName = node.data.caption;
        groupKey = node.data.key;
        selectedKey = "selectedKey"; // the 'group' node is selected; make it blue to show this
    }
    if (node.containingGroup !== null) {
        groupName = node.containingGroup.data.caption;
        groupKey = node.containingGroup.data.key;
    }
    if (groupName !== null) {
        groupKey = "'" + groupKey + "'";
        element.innerHTML += '<div class="row data" id="nodeGroupInfo"> <span class="clickable ' + selectedKey + '" onclick="setSelectionInfo(myDiagram.findPartForKey(' + groupKey + '))">' + groupName + '</span> Info (' + nodeGroupCount + ' member(s) in <span class="clickable ' + selectedKey + '" onclick="setSelectionInfo(myDiagram.findPartForKey(' + groupKey + '))">' + groupName + '</span>) </div>';
        if (nodeGroupCount != 0) fillRowsWithNodes(nodeGroupParts, document.getElementById('nodeGroupInfo'), 2, node.data.key);
    }

    // dynamically adjust the name of node based on user input
    var nameInput = document.getElementById('nameInput');
    if (!myDiagram.isReadOnly) {
        nameInput.addEventListener('input', function (e) {
            var value = nameInput.value;
            myDiagram.skipsUndoManager = true;
            myDiagram.startTransaction("rename node");
            if (value === null || value === "" || value === undefined) { myDiagram.commitTransaction("rename node"); return; }
            myDiagram.model.setDataProperty(node.data, "caption", value);
            myDiagram.model.setDataProperty(node.data, "text", value); // if node is a multi purpose node, update the text on it
            myDiagram.commitTransaction("rename node");
            myDiagram.skipsUndoManager = false;
        });

        // dynamically adjust the notes of the node based on user input
        var notesTextarea = document.getElementById('notesTextarea');
        notesTextarea.addEventListener('input', function (e) {
            var value = notesTextarea.value;
            myDiagram.skipsUndoManager = true;
            myDiagram.startTransaction("edit node notes");
            if (value === null || value === undefined) return;
            myDiagram.model.setDataProperty(node.data, "notes", value);
            myDiagram.commitTransaction("edit node notes");
            myDiagram.skipsUndoManager = false;
        });
        infoWindow.style.height = document.getElementById('selectionInfoTextDiv').offsetHeight + document.getElementById('selectionInfoWindowHandle').offsetHeight + 5 + 'px';
    }
}

// event for color input in Selection Info Window; set model data for fill color of the current selection
function setColor() {
    var node = myDiagram.selection.first();
    var colorPicker = document.getElementById("colorPicker");
    if (colorPicker !== null) {
        myDiagram.startTransaction("recolor node");
        myDiagram.model.setDataProperty(node.data, "color", colorPicker.value);
        myDiagram.model.setDataProperty(node.data, "stroke", invertColor(colorPicker.value))
        myDiagram.commitTransaction("recolor node");
    }
}

// event for height input in Selection Info Window; set model data for height of the currently selected node (also handles door length for doors, wall length for walls)
function setHeight() {
    var node = myDiagram.selection.first();
    var value = parseFloat(convertUnitsToPixels(heightInput.value));
    if (isNaN(value)) {
        alert("Please enter a number in the height input");
        setSelectionInfo(node);
        return;
    }
    myDiagram.skipsUndoManager = true;
    myDiagram.startTransaction("resize node");
    if (!myDiagram.isReadOnly) {
        // Case: Standard / Multi-Purpose Nodes; basic height adjustment
        if (node.category !== 'WallGroup' && node.category !== "WindowNode" && node.category !== 'DoorNode') {
            myDiagram.model.setDataProperty(node.data, "height", value);
        }
        // Case: Door Nodes / Window Nodes; "Door Length" is node height and width
        else if (node.category === 'DoorNode' || node.category === "WindowNode") {
            var wall = myDiagram.findPartForKey(node.data.group);
            var loc = node.location.copy();
            if (wall !== null) {
                var wallLength = Math.sqrt(wall.data.startpoint.distanceSquaredPoint(wall.data.endpoint));
                if (wallLength < value) {
                    value = wallLength;
                    loc = new go.Point((wall.data.startpoint.x + wall.data.endpoint.x) / 2, (wall.data.startpoint.y + wall.data.endpoint.y) / 2);
                }
            }
            if (node.category === "DoorNode") myDiagram.model.setDataProperty(node.data, "width", value); // for door nodes, width dictates height as well
            node.location = loc;
            updateWallDimensions();
        }
        // Case: Wall Groups; wall length adjustment; do not allow walls to be shorter than the distance between their fathest apart wallParts
        else {
            var sPt = node.data.startpoint.copy();
            var ePt = node.data.endpoint.copy();
            var angle = sPt.directionPoint(ePt);

            var midPoint = new go.Point(((sPt.x + ePt.x) / 2), ((sPt.y + ePt.y) / 2));
            var newEpt = new go.Point((midPoint.x + (value / 2)), midPoint.y);
            var newSpt = new go.Point((midPoint.x - (value / 2)), midPoint.y);
            newEpt.offset(-midPoint.x, -midPoint.y).rotate(angle).offset(midPoint.x, midPoint.y);
            newSpt.offset(-midPoint.x, -midPoint.y).rotate(angle).offset(midPoint.x, midPoint.y);

            // Edge Case 1: The user has input a length shorter than the edge wallPart's endpoints allow
            // find the endpoints of the wallparts closest to the endpoints of the wall
            var closestPtToSpt = null; var farthestPtFromSpt;
            var closestDistToSpt = Number.MAX_VALUE; var farthestDistFromSpt = 0;
            node.memberParts.iterator.each(function (wallPart) {
                var endpoints = getWallPartEndpoints(wallPart);
                var endpoint1 = endpoints[0];
                var endpoint2 = endpoints[1];
                var distance1 = Math.sqrt(endpoint1.distanceSquaredPoint(sPt));
                var distance2 = Math.sqrt(endpoint2.distanceSquaredPoint(sPt));

                if (distance1 < closestDistToSpt) {
                    closestDistToSpt = distance1;
                    closestPtToSpt = endpoint1;
                } if (distance1 > farthestDistFromSpt) {
                    farthestDistFromSpt = distance1;
                    farthestPtFromSpt = endpoint1;
                } if (distance2 < closestDistToSpt) {
                    closestDistToSpt = distance2;
                    closestPtToSpt = endpoint2;
                } if (distance2 > farthestDistFromSpt) {
                    farthestDistFromSpt = distance2;
                    farthestPtFromSpt = endpoint2;
                }
            });

            if (closestPtToSpt !== null) {
                // if the proposed length is smaller than the minDistance, set wall length to minDistance
                var proposedDistance = Math.sqrt(newSpt.distanceSquaredPoint(newEpt));
                var minDistance = Math.sqrt(closestPtToSpt.distanceSquaredPoint(farthestPtFromSpt));
                if (proposedDistance < minDistance) {
                    newSpt = closestPtToSpt;
                    newEpt = farthestPtFromSpt;
                }
            }

            // Edge Case 2: The new wall endpoints constructed based on user input do not generate a wall too short for the wall's edge wallPart's endpoints;
            // however, there is/are a/some wallPart(s) that do not fit along the new wall endpoints (due to midpoint construction)
            // if a wallPart endpoint is outside the line created by newSpt and newEpt, adjust the endpoints accordingly
            var farthestPtFromWallPt = null; var farthestFromWallPtDist = 0;
            node.memberParts.iterator.each(function (part) {
                var endpoints = getWallPartEndpoints(part);
                // check for endpoints of wallParts not along the line segment made by newSpt and newEpt
                for (var i = 0; i < endpoints.length; i++) {
                    var point = endpoints[i];
                    var distanceToStartPoint = parseFloat(Math.sqrt(point.distanceSquaredPoint(newSpt)).toFixed(2));
                    var distanceToEndPoint = parseFloat(Math.sqrt(point.distanceSquaredPoint(newEpt)).toFixed(2));
                    var wallLength = parseFloat(Math.sqrt(newSpt.distanceSquaredPoint(newEpt)).toFixed(2));
                    if ((distanceToStartPoint + distanceToEndPoint).toFixed(2) !== wallLength.toFixed(2)) {
                        var testDistance = Math.sqrt(point.distanceSquaredPoint(newSpt));
                        if (testDistance > farthestFromWallPtDist) {
                            farthestFromWallPtDist = testDistance;
                            farthestPtFromWallPt = point;
                        }
                    }
                }
            });

            // if a wallPart endpoint is outside the wall, adjust the endpoints of the wall to accomodate it
            if (farthestPtFromWallPt !== null) {
                var distance = Math.sqrt(newSpt.distanceSquaredPoint(newEpt));
                if (farthestPtFromWallPt.distanceSquaredPoint(newSpt) < farthestPtFromWallPt.distanceSquaredPoint(newEpt)) {
                    newSpt = farthestPtFromWallPt;
                    var totalLength = Math.sqrt(newSpt.distanceSquaredPoint(newEpt));
                    newEpt = new go.Point(newSpt.x + ((distance / totalLength) * (newEpt.x - newSpt.x)),
                newSpt.y + ((distance / totalLength) * (newEpt.y - newSpt.y)));
                } else {
                    newEpt = farthestPtFromWallPt;
                    var totalLength = Math.sqrt(newSpt.distanceSquaredPoint(newEpt));
                    newSpt = new go.Point(newEpt.x + ((distance / totalLength) * (newSpt.x - newEpt.x)),
                newEpt.y + ((distance / totalLength) * (newSpt.y - newEpt.y)));
                }
            }

            myDiagram.model.setDataProperty(node.data, "startpoint", newSpt);
            myDiagram.model.setDataProperty(node.data, "endpoint", newEpt);
            updateWall(node);
        }
    }
    myDiagram.commitTransaction("resize node");
    updateWallDimensions();
    myDiagram.skipsUndoManager = false;
}

// event for width input in Node Info Window; set model data for width of the currently selected node
function setWidth() {
    var node = myDiagram.selection.first();
    if (document.getElementById("widthInput") === null) return;
    var value = parseFloat(convertUnitsToPixels(widthInput.value));
    if (isNaN(value)) {
        alert("Please enter a number in the width input");
        setSelectionInfo(node);
        return;
    }
    myDiagram.skipsUndoManager = true;
    myDiagram.startTransaction("resize node");
    if (!myDiagram.isReadOnly) {
        // Case: Window nodes, keeps windows within wall boundaries
        if (node.category === 'WindowNode') {
            var wall = myDiagram.findPartForKey(node.data.group);
            var loc = node.location.copy();
            // constrain max width "value" by the free stretch on the wall "node" is in
            if (wall !== null) {
                var containingStretch = getWallPartStretch(node);
                var stretchLength = Math.sqrt(containingStretch.point1.distanceSquaredPoint(containingStretch.point2));
                if (stretchLength < value) {
                    value = stretchLength;
                    loc = new go.Point((containingStretch.point1.x + containingStretch.point2.x) / 2,
                        (containingStretch.point1.y + containingStretch.point2.y) / 2);
                }
            }
            myDiagram.model.setDataProperty(node.data, "width", value); 
            node.location = loc;
            updateWallDimensions();
        }
            // Case: Wall Groups; set wall's data.strokeWidth
        else if (node.category === 'WallGroup') {
            myDiagram.model.setDataProperty(node.data, "strokeWidth", value);
            node.memberParts.iterator.each(function (part) {
                if (part.category === 'DoorNode') myDiagram.model.setDataProperty(part.data, "doorOpeningHeight", value);
                if (part.category === 'WindowNode') myDiagram.model.setDataProperty(part.data, "height", value);
            });
        }
            // Case: Standard / Multi-Purpose Nodes; basic width ajustment
        else myDiagram.model.setDataProperty(node.data, "width", value);
    }
    myDiagram.commitTransaction("resize node");
    myDiagram.skipsUndoManager = false;
}

// set the height, width, and color of the selection based on user input in the Selection Info Window
function applySelectionChanges() {
    setHeight();
    setWidth();
    setColor();
    setSelectionInfo(myDiagram.selection.first());
}

// hide or show specific help/windows
function hideShow(div) {
    var diagramHelpDiv = document.getElementById(div); var str;
    switch (div) {
        case 'diagramHelpDiv': str = 'Diagram Help'; char = 'H'; break;
        case 'selectionInfoWindow': str = 'Selection Help'; char = 'I'; break;
        case 'myOverviewWindow': str = 'Overview'; char = 'E'; break;
        case 'optionsWindow': str = 'Options'; char = 'B'; break;
        case 'statisticsWindow': str = 'Statistics'; char = 'G'; break;
        case 'myPaletteWindow': str = 'Palettes'; char = 'P'; myPalette.layoutDiagram(true); break;
    }
    if (diagramHelpDiv.style.visibility === "visible") {
        diagramHelpDiv.style.visibility = "hidden";
        document.getElementById(div + 'Button').innerHTML = "Show " + str + "<p class='shortcut'> (Ctrl + " + char + " )</p>";
    } else {
        diagramHelpDiv.style.visibility = "visible";
        document.getElementById(div + 'Button').innerHTML = "Hide " + str + "<p class='shortcut'> (Ctrl + " + char + " )</p>";
    }
}

// increase or decrease the diagram scale to the nearest 10%
function adjustScale(sign) {
    var el = document.getElementById('scaleDisplay');
    myDiagram.startTransaction('Change Scale');
    switch (sign) {
        case '-': myDiagram.scale -= .1; break;
        case '+': myDiagram.scale += .1; break;
    }
    myDiagram.scale = parseFloat((Math.round(myDiagram.scale / .1) * .1).toFixed(2));
    var scale = (myDiagram.scale * 100).toFixed(2);
    el.innerHTML = 'Scale: ' + scale + '%';
    myDiagram.commitTransaction('Change Scale');
}

// called on document.onload()
function init() {
    if (!checkLocalStorage()) {
        var currentFile = document.getElementById("currentFile");
        currentFile.textContent = "Sorry! No web storage support. If you're using Internet Explorer / Microsoft Edge, you must load the page from a server for local storage to work.";
    }

    // add event listener to HTML body for hotkey use
    var body = document.getElementById('body');
    body.addEventListener("keydown", function (e) {
        var keynum = e.which;
        if (e.ctrlKey) {
            e.preventDefault();
            switch (keynum) {
                case 83: saveDocument(); break; // ctrl + s
                case 79: openDocument(); break; // ctrl + o
                case 68: e.preventDefault(); newDocument(); break; // ctrl + d
                case 82: removeDocument(); break; // ctrl + r
                case 49: setBehavior('wallBuilding'); break; // ctrl + 1
                case 50: setBehavior('dragging'); break; // ctrl + 2
                case 72: hideShow('diagramHelpDiv'); break; // ctrl + h
                case 73: hideShow('selectionInfoWindow'); break; // ctrl + i
                case 80: hideShow('myPaletteWindow'); break; // ctrl + p
                case 69: hideShow('myOverviewWindow'); break; // ctrl + e
                case 66: hideShow('optionsWindow'); break; // ctrl + b
                case 71: hideShow('statisticsWindow'); break; // ctrl + g
            }
        }
    });

    // ********************************************************* DIAGRAM CODE **************************************************************************************
    var $ = go.GraphObject.make;

    // menu if you right click a node
    var contextMenu =
        $(go.Adornment, "Vertical",
            $("ContextMenuButton",
                $(go.TextBlock, "Make Group"),
                { click: function (e, obj) { makeSelectionGroup(); } },
                // only allow grouping on non-wall / wallPart nodes
                new go.Binding("visible", "visible", function (v) {
                    if (myDiagram.selection.count <= 1) return false;
                    var flag = true;
                    myDiagram.selection.iterator.each(function (node) {
                        if (node.category === "WallGroup" || node.category === "WindowNode" || node.category === "DoorNode") flag = false;
                    });
                    return flag;
                }).ofObject()
            ),
            $("ContextMenuButton",
                $(go.TextBlock, "Ungroup"),
                { click: function (e, obj) { ungroupSelection(); } },
                new go.Binding("visible", "", function (v) {
                    var node = myDiagram.selection.first();
                    return ((node instanceof go.Node && node.containingGroup != null && node.containingGroup.category != 'WallGroup') ||
                        (node instanceof go.Group && node.category === ''));
                }).ofObject()
            ),
            $("ContextMenuButton",
                $(go.TextBlock, "Copy"),
                { click: function (e, obj) { myDiagram.commandHandler.copySelection() } },
                new go.Binding("visible", "", function (v) { return myDiagram.selection.count > 0; })
            ),
            $("ContextMenuButton",
                $(go.TextBlock, "Cut"),
                { click: function (e, obj) { myDiagram.commandHandler.cutSelection() } },
                new go.Binding("visible", "", function (v) { return myDiagram.selection.count > 0; })
            ),
            $("ContextMenuButton",
                $(go.TextBlock, "Delete"),
                { click: function (e, obj) { myDiagram.commandHandler.deleteSelection() } },
                new go.Binding("visible", "", function (v) { return myDiagram.selection.count > 0; })
            ),
            $("ContextMenuButton",
                $(go.TextBlock, "Paste"),
                { click: function (e, obj) { myDiagram.commandHandler.pasteSelection(myDiagram.lastInput.documentPoint) } }
            ),
            $("ContextMenuButton",
                $(go.TextBlock, "Show Selection Info"),
                {
                    click: function (e, obj) {
                        var selectionInfoWindow = document.getElementById('selectionInfoWindow');
                        if (selectionInfoWindow.style.visibility !== 'visible') hideShow('selectionInfoWindow');
                    }
                },
                new go.Binding("visible", "", function (v) { return myDiagram.selection.count > 0; })
            ),
            $("ContextMenuButton",
                $(go.TextBlock, "Flip Dimension Side"),
                {
                    click: function (e, obj) {
                        myDiagram.startTransaction("flip dimension link side");
                        var walls = [];
                        myDiagram.selection.iterator.each(function (part) {
                            if (part.category === "WallGroup") walls.push(part);
                        });
                        for (var i = 0; i < walls.length; i++) {
                            var wall = walls[i];
                            var sPt = wall.data.startpoint.copy();
                            var ePt = wall.data.endpoint.copy();
                            myDiagram.model.setDataProperty(wall.data, "startpoint", ePt);
                            myDiagram.model.setDataProperty(wall.data, "endpoint", sPt);
                            updateWall(wall);
                        }
                        myDiagram.commitTransaction("flip dimension link side");
                    }
                },
                new go.Binding("visible", "", function (v) {
                    var sel = myDiagram.selection;
                    if (sel.count === 0) return false;
                    var flag = false;
                    sel.iterator.each(function (part) {
                        if (part.category === "WallGroup") flag = true;
                    });
                    return flag;
                })
            )
       );

    // initialize diagram
    myDiagram = $(go.Diagram, "myDiagramDiv",
        {
            scale: 1,
            initialContentAlignment: go.Spot.Center,
            allowDrop: true,
            allowLink: false,
            resizingTool: new go.ResizingTool(),
            draggingTool: new go.DraggingTool(),
            "undoManager.isEnabled": true,
            "layout.isOngoing": false,
            "draggingTool.isGridSnapEnabled": true,
            "draggingTool.gridSnapCellSpot": go.Spot.TopLeft,
            "resizingTool.isGridSnapEnabled": true,
            "commandHandler.archetypeGroupData": { isGroup: true },
            "rotatingTool.snapAngleEpsilon": 10,
            grid: $(go.Panel, "Grid",
                { gridCellSize: new go.Size(5, 5), visible: true },
                $(go.Shape, "LineH", { stroke: "lightgray" }),
                $(go.Shape, "LineV", { stroke: "lightgray" })),
            contextMenu: contextMenu,
            model: $(go.GraphLinksModel, { modelData: DEFAULT_MODELDATA })
        });

    // when model is changed, update stats in Statistics Window
    myDiagram.addModelChangedListener(function (e) { if (e.isTransactionFinished) updateStatistics(); });

    // when diagram is modified, change document title to include a *
    myDiagram.addDiagramListener("Modified", function (e) {
        var currentFile = document.getElementById("currentFile");
        var idx = currentFile.textContent.indexOf("*");
        if (myDiagram.isModified) { if (idx < 0) currentFile.textContent = currentFile.textContent + "*"; }
        else { if (idx >= 0) currentFile.textContent = currentFile.textContent.substr(0, idx); }
    });

    // check if diagram scale has been changed -- if so, update the 'Scale' item in the View menu
    myDiagram.addDiagramListener("ViewportBoundsChanged", function (e) {
        var scaleEl = document.getElementById('scaleDisplay');
        scaleEl.innerHTML = "Scale: " + (myDiagram.scale * 100).toFixed(2) + "%";
    });

    // if a node has been dropped onto the Diagram from the Palette, update the help text
    myDiagram.addDiagramListener("ExternalObjectsDropped", function (e) {
        var node = myDiagram.selection.first();
        // Event 1: handle a drag / drop of a wall node from the Palette (as opposed to wall construction via WallBuildingTool)
        if (node.category === "PaletteWallNode") {
            var paletteWallNode = myDiagram.selection.first();
            var endpoints = getWallPartEndpoints(paletteWallNode);
            var data = { key: "wall", category: "WallGroup", caption: "Wall", startpoint: endpoints[0], endpoint: endpoints[1], strokeWidth: parseFloat(myDiagram.model.modelData.wallWidth), isGroup: true, notes: "" };
            myDiagram.model.addNodeData(data);
            var wall = myDiagram.findPartForKey(data.key);
            updateWall(wall);
            myDiagram.remove(paletteWallNode);
        }
        // Event 2: Update the text of the Diagram Helper
        if (node.category === "WindowNode" || node.category === "DoorNode") setDiagramHelper("Drag part so the cursor is over a wall to add this part to a wall");
        else setDiagramHelper("Drag, resize, or rotate your selection (hold SHIFT for no grid-snapping)");
        // Event 3: If the select tool is not active, make it active
        if (myDiagram.toolManager.mouseDownTools.elt(0).isEnabled) setBehavior('dragging');
    });

    // set node info window based on selection whenever the selection changes
    myDiagram.addDiagramListener("ChangedSelection", function (e) {
        myDiagram.skipsUndoManager = true;
        myDiagram.startTransaction("remove dimension links and angle nodes");
        allPointNodes.iterator.each(function (node) { myDiagram.remove(node) });
        allDimensionLinks.iterator.each(function (link) { myDiagram.remove(link) });
        allPointNodes.clear();
        allDimensionLinks.clear();
        allAngleNodes.iterator.each(function (node) { myDiagram.remove(node); });
        allAngleNodes.clear();
        updateWallDimensions();
        updateWallAngles();
        myDiagram.commitTransaction("remove dimension links and angle nodes");
        myDiagram.skipsUndoManager = false;

        var selection = myDiagram.selection;
        if (selection.count === 0) setSelectionInfo('Nothing selected');
        else if (selection.count === 1) setSelectionInfo(myDiagram.selection.first());
        else setSelectionInfo('Selection: ');
    });

    // when a wall is copied / pasted, update the wall geometry, angle, etc
    myDiagram.addDiagramListener("ClipboardPasted", function (e) {
        myDiagram.selection.iterator.each(function (node) { if (node.category === "WallGroup") updateWall(node); });
    });

    // define the overview
    myOverview = $(go.Overview, "myOverviewDiv", { observed: myDiagram, maxScale: 0.5 });

    //  ************************************************************** STANDARD GROUP FUNCTIONALITY ***************************************************************
    function makeSelectionGroup() {
        myDiagram.startTransaction("group selection");
        // ungroup all selected nodes; then group them; if one of the selected nodes is a group, ungroup all its nodes
        var sel = myDiagram.selection; var nodes = [];
        sel.iterator.each(function (n) {
            if (n instanceof go.Group) n.memberParts.iterator.each(function (part) { nodes.push(part); })
            else nodes.push(n);
        });
        for (var i = 0; i < nodes.length; i++) nodes[i].isSelected = true;
        ungroupSelection();
        myDiagram.commandHandler.groupSelection();
        var group = myDiagram.selection.first(); // after grouping, the new group will be the only thing selected
        myDiagram.model.setDataProperty(group.data, "caption", "Group");
        myDiagram.model.setDataProperty(group.data, "notes", "");
        clearEmptyGroups();
        // unselect / reselect group so data appears properly in Selection Info Window
        myDiagram.clearSelection();
        myDiagram.select(group);
        myDiagram.commitTransaction("group selection");
    }

    // ungroup selected nodes; if the selection is a group, ungroup all it's memberParts
    function ungroupSelection() {
        myDiagram.startTransaction('ungroup selection');
        // helper function to ungroup nodes
        function ungroupNode(node) {
            var group = node.containingGroup;
            node.containingGroup = null;
            if (group != null) {
                if (group.memberParts.count === 0) myDiagram.remove(group);
                else if (group.memberParts.count === 1) group.memberParts.first().containingGroup = null;
            }
        }
        // ungroup any selected nodes; remember groups that are selected
        var sel = myDiagram.selection; var groups = [];
        sel.iterator.each(function (n) {
            if (!(n instanceof go.Group)) ungroupNode(n);
            else groups.push(n);
        });
        // go through selected groups, and ungroup their memberparts too
        var nodes = [];
        for (var i = 0; i < groups.length; i++) groups[i].memberParts.iterator.each(function (n) { nodes.push(n); });
        for (var i = 0; i < nodes.length; i++) ungroupNode(nodes[i]);
        clearEmptyGroups();
        myDiagram.commitTransaction('ungroup selection');
    }

    // clear all the groups that have no nodes
    function clearEmptyGroups() {
        var nodes = myDiagram.nodes; var arr = [];
        nodes.iterator.each(function (node) { if (node instanceof go.Group && node.memberParts.count === 0 && node.category !== "WallGroup") { arr.push(node); } });
        for (i = 0; i < arr.length; i++) { myDiagram.remove(arr[i]); }
    }

    // ******************************************************************* DIAGRAM NODE/ADORNMENT TEMPLATES *****************************************************************

    // resize adornment for furniture nodes -- fill and stroke bound to furniture node data 
    var furnitureResizeAdornmentTemplate =
      $(go.Adornment, "Spot", { locationSpot: go.Spot.Center },
        $(go.Placeholder),
        $(go.Shape, { alignment: go.Spot.Top, cursor: "n-resize", figure: "Rectangle", desiredSize: new go.Size(5, 5), fill: "#ffffff", stroke: "#808080" },
        new go.Binding("fill", "", function (obj) { return (obj.adornedPart === null) ? "#ffffff" : obj.adornedPart.data.color; }).ofObject(),
        new go.Binding("stroke", "", function (obj) { return (obj.adornedPart === null) ? "#000000" : obj.adornedPart.data.stroke; }).ofObject()),
        $(go.Shape, { alignment: go.Spot.TopRight, cursor: "ne-resize", figure: "Rectangle", desiredSize: new go.Size(5, 5), fill: "#ffffff", stroke: "#808080" },
        new go.Binding("fill", "", function (obj) { return (obj.adornedPart === null) ? "#ffffff" : obj.adornedPart.data.color; }).ofObject(),
        new go.Binding("stroke", "", function (obj) { return (obj.adornedPart === null) ? "#000000" : obj.adornedPart.data.stroke; }).ofObject()),
        $(go.Shape, { alignment: go.Spot.Right, cursor: "e-resize", figure: "Rectangle", desiredSize: new go.Size(5, 5), fill: "#ffffff", stroke: "#808080" },
        new go.Binding("fill", "", function (obj) { return (obj.adornedPart === null) ? "#ffffff" : obj.adornedPart.data.color; }).ofObject(),
        new go.Binding("stroke", "", function (obj) { return (obj.adornedPart === null) ? "#000000" : obj.adornedPart.data.stroke; }).ofObject()),
        $(go.Shape, { alignment: go.Spot.BottomRight, cursor: "se-resize", figure: "Rectangle", desiredSize: new go.Size(5, 5), fill: "#ffffff", stroke: "#808080" },
        new go.Binding("fill", "", function (obj) { return (obj.adornedPart === null) ? "#ffffff" : obj.adornedPart.data.color; }).ofObject(),
        new go.Binding("stroke", "", function (obj) { return (obj.adornedPart === null) ? "#000000" : obj.adornedPart.data.stroke; }).ofObject()),
        $(go.Shape, { alignment: go.Spot.Bottom, cursor: "s-resize", figure: "Rectangle", desiredSize: new go.Size(5, 5), fill: "#ffffff", stroke: "#808080" },
        new go.Binding("fill", "", function (obj) { return (obj.adornedPart === null) ? "#ffffff" : obj.adornedPart.data.color; }).ofObject(),
        new go.Binding("stroke", "", function (obj) { return (obj.adornedPart === null) ? "#000000" : obj.adornedPart.data.stroke; }).ofObject()),
        $(go.Shape, { alignment: go.Spot.BottomLeft, cursor: "sw-resize", figure: "Rectangle", desiredSize: new go.Size(5, 5), fill: "#ffffff", stroke: "#808080" },
        new go.Binding("fill", "", function (obj) { return (obj.adornedPart === null) ? "#ffffff" : obj.adornedPart.data.color; }).ofObject(),
        new go.Binding("stroke", "", function (obj) { return (obj.adornedPart === null) ? "#000000" : obj.adornedPart.data.stroke; }).ofObject()),
        $(go.Shape, { alignment: go.Spot.Left, cursor: "w-resize", figure: "Rectangle", desiredSize: new go.Size(5, 5), fill: "#ffffff", stroke: "#808080" },
        new go.Binding("fill", "", function (obj) { return (obj.adornedPart === null) ? "#ffffff" : obj.adornedPart.data.color; }).ofObject(),
        new go.Binding("stroke", "", function (obj) { return (obj.adornedPart === null) ? "#000000" : obj.adornedPart.data.stroke; }).ofObject()),
        $(go.Shape, { alignment: go.Spot.TopLeft, cursor: "nw-resize", figure: "Rectangle", desiredSize: new go.Size(5, 5), fill: "#ffffff", stroke: "#808080" },
        new go.Binding("fill", "", function (obj) { return (obj.adornedPart === null) ? "#ffffff" : obj.adornedPart.data.color; }).ofObject(),
        new go.Binding("stroke", "", function (obj) { return (obj.adornedPart === null) ? "#000000" : obj.adornedPart.data.stroke; }).ofObject())
      );

    // rotate adornment for furniture nodes -- fill and stroke bound to furniture node data 
    var furnitureRotateAdornmentTemplate =
        $(go.Adornment, { locationSpot: go.Spot.Center, locationObjectName: "CIRCLE" },
        $(go.Shape, "Circle", { name: "CIRCLE", cursor: "pointer", desiredSize: new go.Size(7, 7), fill: "#ffffff", stroke: "#808080" },
        new go.Binding("fill", "", function (obj) { return (obj.adornedPart === null) ? "#ffffff" : obj.adornedPart.data.color; }).ofObject(),
        new go.Binding("stroke", "", function (obj) { return (obj.adornedPart === null) ? "#000000" : obj.adornedPart.data.stroke; }).ofObject())
        );

    var nodeToolTip =
        $(go.Adornment, "Auto",
            $(go.Shape, { fill: "#FFFFCC" }),
            $(go.TextBlock, { margin: 4 },
            new go.Binding("text", "", function (text, obj) {
                var data = obj.part.adornedObject.data;
                var name = (obj.part.adornedObject.category === "MultiPurposeNode") ? data.text : data.caption;
                return "Name: " + name + "\nNotes: " + data.notes;
            }).ofObject())
        );

    // define the default Node template (used for most furniture)
    myDiagram.nodeTemplateMap.add("",
        $(go.Node, "Spot",
        {
            resizable: true,
            rotatable: true,
            toolTip: nodeToolTip,
            resizeAdornmentTemplate: furnitureResizeAdornmentTemplate,
            rotateAdornmentTemplate: furnitureRotateAdornmentTemplate,
            contextMenu: contextMenu,
            locationObjectName: "SHAPE",
            resizeObjectName: "SHAPE",
            minSize: new go.Size(5, 5),
            locationSpot: go.Spot.Center,
            selectionAdorned: false,  // use a Binding on the Shape.stroke to show selection
            doubleClick: function () { hideShow('selectionInfoWindow'); }
        },
        // remember location of the Node
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        // move a selected part into the Foreground layer so it's not obscuerd by non-selected Parts
        new go.Binding("layerName", "isSelected", function (s) { return s ? "Foreground" : ""; }).ofObject(),
        $(go.Shape,
        { strokeWidth: 1, name: "SHAPE", stroke: "#000000", geometryString: "F1 M0 0 L20 0 20 20 0 20 z", fill: "rgba(128, 128, 128, 0.5)" },
        new go.Binding("geometryString", "geo"),
        new go.Binding("angle", "angle").makeTwoWay(),
        new go.Binding("width", "width").makeTwoWay(),
        new go.Binding("height", "height").makeTwoWay(),
        // set Palette ID field properly when a node is selected
        new go.Binding("stroke", "isSelected", function (s, obj) { return s ? lightenColor(obj.stroke, 70) : invertColor(obj.part.data.color); }).ofObject(),
        new go.Binding("figure", "shape"),
        new go.Binding("fill", "color"))
      ));

    // define Node template for the multi purpose furniture node (rectangle with editable text)
    myDiagram.nodeTemplateMap.add("MultiPurposeNode",
      $(go.Node, "Spot",
        {
            contextMenu: contextMenu,
            toolTip: nodeToolTip,
            locationSpot: go.Spot.Center,
            resizeAdornmentTemplate: furnitureResizeAdornmentTemplate,
            rotateAdornmentTemplate: furnitureRotateAdornmentTemplate,
            locationObjectName: "SHAPE",
            resizable: true,
            rotatable: true,
            resizeObjectName: "SHAPE",
            minSize: new go.Size(5, 5),
            selectionAdorned: false,  // use a Binding on the Shape.stroke to show selection
            doubleClick: function () { hideShow('selectionInfoWindow'); }
        },
        // remember location, angle, height, and width of the node
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding("angle", "angle").makeTwoWay(),
        new go.Binding("width", "width").makeTwoWay(),
        new go.Binding("height", "height").makeTwoWay(),
        // move a selected part into the Foreground layer so it's not obscuerd by non-selected Parts
        new go.Binding("layerName", "isSelected", function (s) { return s ? "Foreground" : ""; }).ofObject(),
        $(go.Shape, { strokeWidth: 1, name: "SHAPE", fill: "rgba(128, 128, 128, 0.5)", },
        // set Palette ID field properly when a node is selected
        new go.Binding("stroke", "isSelected", function (s, obj) { return s ? lightenColor(obj.stroke, 70) : invertColor(obj.part.data.color); }).ofObject(),
        new go.Binding("figure", "shape"),
        new go.Binding("width", "width").makeTwoWay(),
        new go.Binding("height", "height").makeTwoWay(),
        new go.Binding("fill", "color")),
        $(go.TextBlock,
        {
            margin: 5,
            wrap: go.TextBlock.WrapFit,
            textAlign: "center",
            editable: true,
            isMultiline: false,
            stroke: '#454545',
            font: "10pt sans-serif"
        },
        new go.Binding("text").makeTwoWay(),
        new go.Binding("font", "height", function (height) {
            if (height > 25) return "10pt sans-serif";
            if (height < 25 && height > 15) return "8pt sans-serif";
            else return "6pt sans-serif";
        }),
        new go.Binding("stroke", "color", function (color) { return invertColor(color); })
        )
      ));

    // drag computation function for WindowNodes and DoorNodes; ensure wall parts stay in walls when dragged
    var dragWallParts = function (part, pt, gridPt) {
        if (part.containingGroup !== null && part.containingGroup.category === 'WallGroup') {
            // Edge Case: if part is not on its wall (due to incorrect load) snap part.loc onto its wall immediately hopefully this is never called
            var wall = part.containingGroup;
            var wStart = wall.data.startpoint;
            var wEnd = wall.data.endpoint;
            var dist1 = Math.sqrt(wStart.distanceSquaredPoint(part.location));
            var dist2 = Math.sqrt(part.location.distanceSquaredPoint(wEnd));
            var totalDist = Math.sqrt(wStart.distanceSquaredPoint(wEnd));
            if (dist1 + dist2 !== totalDist) part.location = part.location.copy().projectOntoLineSegmentPoint(wStart, wEnd);

            // main behavior
            var stretch = getWallPartStretch(part);
            var leftOrAbovePt = stretch.point1;
            var rightOrBelowPt = stretch.point2;

            // calc points along line created by the endpoints that are half the width of the moving window/door
            var totalLength = Math.sqrt(leftOrAbovePt.distanceSquaredPoint(rightOrBelowPt));
            var distance = (part.data.width / 2);
            var point1 = new go.Point(leftOrAbovePt.x + ((distance / totalLength) * (rightOrBelowPt.x - leftOrAbovePt.x)),
            leftOrAbovePt.y + ((distance / totalLength) * (rightOrBelowPt.y - leftOrAbovePt.y)));
            var point2 = new go.Point(rightOrBelowPt.x + ((distance / totalLength) * (leftOrAbovePt.x - rightOrBelowPt.x)),
            rightOrBelowPt.y + ((distance / totalLength) * (leftOrAbovePt.y - rightOrBelowPt.y)));

            // calc distance from pt to line (part's wall) - use point to 2pt line segment distance formula
            var distFromWall = Math.abs(((wEnd.y - wStart.y) * pt.x) - ((wEnd.x - wStart.x) * pt.y) + (wEnd.x * wStart.y) - (wEnd.y * wStart.x)) /
                Math.sqrt(Math.pow((wEnd.y - wStart.y), 2) + Math.pow((wEnd.x - wStart.x), 2));
            var tolerance = (20 * wall.data.strokeWidth < 100) ? (20 * wall.data.strokeWidth) : 100;

            // if distance from pt to line > some tolerance, detach the wallPart from the wall
            if (distFromWall > tolerance) {
                part.containingGroup = null;
                part.angle = 0;
                allPointNodes.iterator.each(function (node) { myDiagram.remove(node) });
                allDimensionLinks.iterator.each(function (link) { myDiagram.remove(link) });
                allPointNodes.clear();
                allDimensionLinks.clear();
                updateWallDimensions();
            }


            // project the proposed location onto the line segment created by the new points (ensures wall parts are constrained properly when dragged)
            pt = pt.copy().projectOntoLineSegmentPoint(point1, point2);
            myDiagram.skipsUndoManager = true;
            myDiagram.startTransaction("set loc");
            myDiagram.model.setDataProperty(part.data, "loc", go.Point.stringify(pt));
            myDiagram.commitTransaction("set loc");
            myDiagram.skipsUndoManager = false;

            updateWallDimensions(); // update the dimension links created by having this wall part selected
        } return pt;
    }

    // resize adornment for windows and doors
    var wallPartResizeAdornment =
      $(go.Adornment, "Spot",
        { name: "WallPartResizeAdornment", locationSpot: go.Spot.Center },
        $(go.Placeholder),
        $(go.Shape, { alignment: go.Spot.Left, cursor: "w-resize", figure: "Diamond", desiredSize: new go.Size(7, 7), fill: "#ffffff", stroke: "#808080" }),
        $(go.Shape, { alignment: go.Spot.Right, cursor: "e-resize", figure: "Diamond", desiredSize: new go.Size(7, 7), fill: "#ffffff", stroke: "#808080" })
      );

    // define Node template for the window nodes
    myDiagram.nodeTemplateMap.add("WindowNode",
      $(go.Node, "Spot",
        {
            contextMenu: contextMenu,
            selectionObjectName: "SHAPE",
            selectionAdorned: false,
            locationSpot: go.Spot.Center,
            name: "NODE",
            toolTip: nodeToolTip,
            minSize: new go.Size(5, 5),
            resizable: true,
            resizeAdornmentTemplate: wallPartResizeAdornment,
            rotatable: false,
            doubleClick: function () { hideShow('selectionInfoWindow'); },
            dragComputation: dragWallParts,
            layerName: 'Foreground' // make sure windows are always in front of walls
        },
        new go.Binding("width", "width").makeTwoWay(),
        new go.Binding("height", "height").makeTwoWay(),
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding("angle", "angle").makeTwoWay(),
        $(go.Shape,
        { name: "SHAPE", fill: "white", strokeWidth: 0 },
        new go.Binding("width", "width"),
        new go.Binding("height", "height"),
        new go.Binding("stroke", "isSelected", function (s, obj) { return s ? "dodgerblue" : "black"; }).ofObject(),
        new go.Binding("fill", "isSelected", function (s, obj) { return s ? "lightgray" : "white"; }).ofObject(),
        new go.Binding("figure", "shape")
        ),
        $(go.Shape,
        { name: "LINESHAPE", fill: "darkgray", strokeWidth: 0, height: 10 },
        new go.Binding("width", "width", function (width, obj) { return width - 10; }), // 5px padding each side
        new go.Binding("height", "height", function (height, obj) { return (height / 5); }),
        new go.Binding("stroke", "isSelected", function (s, obj) { return s ? "dodgerblue" : "black"; }).ofObject()
        )
      ));

    // define Node template for the palette Wall Node (becomes WallGroup when dropped onto diagram)
    myDiagram.nodeTemplateMap.add("PaletteWallNode",
      $(go.Node, "Spot", { selectionAdorned: false, locationSpot: go.Spot.Center },
        new go.Binding("width", "width").makeTwoWay(),
        new go.Binding("height", "height").makeTwoWay(),
        $(go.Shape, { name: "SHAPE", fill: "black", strokeWidth: 0, height: 10, figure: "Rectangle" },
        new go.Binding("width", "width").makeTwoWay(),
        new go.Binding("height", "height").makeTwoWay(),
        new go.Binding("fill", "isSelected", function (s, obj) { return s ? "dodgerblue" : "black"; }).ofObject(),
        new go.Binding("stroke", "isSelected", function (s, obj) { return s ? "dodgerblue" : "black"; }).ofObject())
      ));

    // selection adornment for door nodes 
    var doorSelectionAdornment =
        $(go.Adornment, "Vertical",
        { name: "DoorSelectionAdornment" },
        $(go.Panel, "Auto",
        $(go.Shape, { fill: null, stroke: null }),
        $(go.Placeholder)),
        $(go.Panel, "Horizontal", { defaultStretch: go.GraphObject.Vertical },
            $("Button",
                $(go.Picture, { source: "icons/flipDoorOpeningLeft.png", column: 0, desiredSize: new go.Size(12, 12) },
                    new go.Binding("source", "", function (obj) {
                        if (obj.adornedPart === null) return "icons/flipDoorOpeningRight.png";
                        else if (obj.adornedPart.data.swing === "left") return "icons/flipDoorOpeningRight.png";
                        else return "icons/flipDoorOpeningLeft.png";
                    }).ofObject()
                ),
                {
                    click: function (e, obj) {
                        myDiagram.startTransaction("flip door");
                        var door = obj.part.adornedPart;
                        if (door.data.swing === "left") myDiagram.model.setDataProperty(door.data, "swing", "right");
                        else myDiagram.model.setDataProperty(door.data, "swing", "left");
                        myDiagram.commitTransaction("flip door");
                    },
                    toolTip: $(go.Adornment, "Auto",
                        $(go.Shape, { fill: "#FFFFCC" }),
                        $(go.TextBlock, { margin: 4, text: "Flip Door Opening" }
                    ))
                },
                new go.Binding("visible", "", function (obj) { return (obj.adornedPart === null) ? false : (obj.adornedPart.containingGroup !== null); }).ofObject()
             ),
             $("Button",
                $(go.Picture, { source: "icons/flipDoorSide.png", column: 0, desiredSize: new go.Size(12, 12) }),
                {
                    click: function (e, obj) {
                        myDiagram.startTransaction("rotate door");
                        var door = obj.part.adornedPart;
                        door.angle = (door.angle + 180) % 360;
                        myDiagram.commitTransaction("rotate door");
                    },
                    toolTip: $(go.Adornment, "Auto",
                        $(go.Shape, { fill: "#FFFFCC" }),
                        $(go.TextBlock, { margin: 4, text: "Flip Door Side" }
                    ))
                }
             ),
             new go.Binding("visible", "", function (obj) { return (obj.adornedPart === null) ? false : (obj.adornedPart.containingGroup !== null); }).ofObject()
        )
      );

    // define Node template for the door nodes
    myDiagram.nodeTemplateMap.add("DoorNode",
      $(go.Node, "Spot",
        {
            contextMenu: contextMenu,
            selectionObjectName: "SHAPE",
            selectionAdornmentTemplate: doorSelectionAdornment,
            locationSpot: go.Spot.BottomCenter,
            resizable: true,
            resizeObjectName: "OPENING_SHAPE",
            rotatable: false,
            toolTip: nodeToolTip,
            minSize: new go.Size(10, 10),
            doubleClick: function () { hideShow('selectionInfoWindow'); },
            dragComputation: dragWallParts,
            resizeAdornmentTemplate: wallPartResizeAdornment,
            layerName: 'Foreground' // make sure windows are always in front of walls
        },
        // remember location of the Node
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding("angle", "angle").makeTwoWay(),
        // the door's locationSpot is affected by it's openingHeight, which is affected by the thickness of its containing wall
        new go.Binding("locationSpot", "doorOpeningHeight", function (doh, obj) { return new go.Spot(0.5, 1, 0, -(doh / 2)); }),
        // this is the shape that reprents the door itself and its swing
        $(go.Shape, { name: "SHAPE", strokeWidth: 1 },
        new go.Binding("width", "width"),
        new go.Binding("height", "width").makeTwoWay(),
        new go.Binding("stroke", "isSelected", function (s, obj) { return s ? "dodgerblue" : "black"; }).ofObject(),
        new go.Binding("fill", "color"),
        new go.Binding("geometryString", "swing", function (swing) {
            if (swing === "left") return "F1 M0,0 v-150 a150,150 0 0,1 150,150 ";
            else return "F1 M275,175 v-150 a150,150 0 0,0 -150,150 ";
        })
        ),
        // this is the Shape that represents the door opening
        $(go.Shape,
        {
            name: "OPENING_SHAPE", fill: "white",
            strokeWidth: 0, height: 5, width: 40,
            alignment: go.Spot.BottomCenter, alignmentFocus: go.Spot.Center
        },
        new go.Binding("height", "doorOpeningHeight").makeTwoWay(),
        new go.Binding("stroke", "isSelected", function (s, obj) { return s ? "dodgerblue" : "black"; }).ofObject(),
        new go.Binding("fill", "isSelected", function (s, obj) { return s ? "lightgray" : "white"; }).ofObject(),
        new go.Binding("width", "width").makeTwoWay()
        )
      ));

    // used to construct angles created by walls
    myDiagram.nodeTemplateMap.add("AngleNode", $(go.Node, "Spot",
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        { locationSpot: go.Spot.Center, locationObjectName: "SHAPE", selectionAdorned: false },
        $(go.Shape, "Circle", // placed where walls intersect, is invisible
        { name: "SHAPE", fill: "red", height: 0, width: 0 }),
        $(go.Shape, { stroke: "green", strokeWidth: 1.5, fill: null }, // arc
        new go.Binding("geometry", "", makeArc).ofObject(),
        new go.Binding("stroke", "stroke")),
        $(go.Panel, "Auto", { name: "ARCLABEL" },
        // position the label in the center of the arc
        new go.Binding("alignment", "sweep", function (sweep, panel) {
            var rad = Math.min(30, panel.part.data.maxRadius);
            var angle = panel.part.data.angle;
            var cntr = new go.Point(rad, 0).rotate(angle + sweep / 2);
            return new go.Spot(0.5, 0.5, cntr.x, cntr.y);
        }),
        $(go.Shape, { stroke: "black", fill: "white" },
        new go.Binding("stroke", "stroke")),
        $(go.TextBlock, { font: "7pt sans-serif", margin: new go.Margin(2, 2, 2, 2) },
        new go.Binding("text", "sweep", function (sweep) { return sweep.toFixed(2) + String.fromCharCode(176); }),
        new go.Binding("stroke", "color"))
      ))
      );

    // ********************************************************** DIAGRAM GROUP TEMPLATES ***********************************************************
    // standard group
    myDiagram.groupTemplateMap.add("",
        $(go.Group, "Vertical",
        {
            contextMenu: contextMenu, doubleClick: function () { hideShow('selectionInfoWindow'); },
            toolTip:
                $(go.Adornment, "Auto",
                    $(go.Shape, { fill: "#FFFFCC" }),
                    $(go.TextBlock, { margin: 4, text: "" },
                        new go.Binding("text", "", function (text, obj) {
                            var data = obj.part.adornedObject.data;
                            return "Name: " + data.caption + "\nNotes: " + data.notes;
                        }).ofObject())
                    )
        },
        new go.Binding("location", "loc"),
          $(go.Panel, "Auto",
            $(go.Shape, "RoundedRectangle",  { fill: "rgba(128,128,128,0.15)", stroke: 'rgba(128, 128, 128, .05)', name: 'SHAPE', strokeCap: 'square' },
              new go.Binding("fill", "isSelected", function (s, obj) {
                  return s ? "rgba(128, 128, 128, .15)" : "rgba(128, 128, 128, 0.10)";
              }).ofObject()
              ),
            $(go.Placeholder, { padding: 5 })  // extra padding around members
          )
        ));

    // drag computation function to snap walls to the grid properly while dragging
    var snapWalls = function (part, pt, gridPt) {
        updateWallDimensions();
        updateWallAngles();
        var grid = part.diagram.grid;
        var sPt = part.data.startpoint.copy();
        var ePt = part.data.endpoint.copy();
        var dx = pt.x - part.location.x;
        var dy = pt.y - part.location.y;
        var newSpt = sPt.offset(dx, dy);
        var newEpt = ePt.offset(dx, dy);
        if (myDiagram.toolManager.draggingTool.isGridSnapEnabled) {
            newSpt = newSpt.snapToGridPoint(grid.gridOrigin, grid.gridCellSize);
            newEpt = newEpt.snapToGridPoint(grid.gridOrigin, grid.gridCellSize);
        }
        myDiagram.model.setDataProperty(part.data, "startpoint", newSpt);
        myDiagram.model.setDataProperty(part.data, "endpoint", newEpt);
        return new go.Point((newSpt.x + newEpt.x) / 2, (newSpt.y + newEpt.y) / 2);
    }

    // used in addWallPart; find closest loc (to mousept) on wall a wallPart can be dropped onto without extending beyond wall endpoints or intruding into another wallPart
    function findClosestLocOnWall(wall, part) {
        var orderedConstrainingPts = []; // wall endpoints and wallPart endpoints
        var startpoint = wall.data.startpoint.copy();
        var endpoint = wall.data.endpoint.copy();
        // store all possible constraining endpoints (wall endpoints and wallPart endpoints) in the order in which they appear (left/top to right/bottom)
        var firstWallPt = ((startpoint.x + startpoint.y) <= (endpoint.x + endpoint.y)) ? startpoint : endpoint;
        var lastWallPt = ((startpoint.x + startpoint.y) > (endpoint.x + endpoint.y)) ? startpoint : endpoint;
        var wallPartEndpoints = [];
        wall.memberParts.iterator.each(function (wallPart) {
            var endpoints = getWallPartEndpoints(wallPart);
            wallPartEndpoints.push(endpoints[0]);
            wallPartEndpoints.push(endpoints[1]);
        });
        // sort all wallPartEndpoints by x coordinate left to right
        wallPartEndpoints.sort(function (a, b) {
            if ((a.x + a.y) > (b.x + b.y)) return 1;
            if ((a.x + a.y) < (b.x + b.y)) return -1;
            else return 0;
        });
        orderedConstrainingPts.push(firstWallPt);
        orderedConstrainingPts = orderedConstrainingPts.concat(wallPartEndpoints);
        orderedConstrainingPts.push(lastWallPt);

        // go through all constraining points; if there's a free stretch along the wall "part" could fit in, remember it
        var possibleStretches = [];
        for (var i = 0; i < orderedConstrainingPts.length; i += 2) {
            var point1 = orderedConstrainingPts[i];
            var point2 = orderedConstrainingPts[i + 1];
            var distanceBetween = Math.sqrt(point1.distanceSquaredPoint(point2));
            if (distanceBetween >= part.data.width) possibleStretches.push({ pt1: point1, pt2: point2 });
        }

        // go through all possible stretches along the wall the part *could* fit in; find the one closest to the part's current location
        var closestDist = Number.MAX_VALUE; var closestStretch = null;
        for (var i = 0; i < possibleStretches.length; i++) {
            var testStretch = possibleStretches[i];
            var testPoint1 = testStretch.pt1;
            var testPoint2 = testStretch.pt2;
            var testDistance1 = Math.sqrt(testPoint1.distanceSquaredPoint(part.location));
            var testDistance2 = Math.sqrt(testPoint2.distanceSquaredPoint(part.location));
            if (testDistance1 < closestDist) {
                closestDist = testDistance1;
                closestStretch = testStretch;
            }
            if (testDistance2 < closestDist) {
                closestDist = testDistance2;
                closestStretch = testStretch;
            }
        }

        // Edge Case: If there's no space for the wallPart, return null
        if (closestStretch === null) return null;

        // using the closest free stretch along the wall, calculate endpoints that make the stretch's line segment, then project part.location onto the segment
        var closestStretchLength = Math.sqrt(closestStretch.pt1.distanceSquaredPoint(closestStretch.pt2));
        var offset = part.data.width / 2;
        var point1 = new go.Point(closestStretch.pt1.x + ((offset / closestStretchLength) * (closestStretch.pt2.x - closestStretch.pt1.x)),
            closestStretch.pt1.y + ((offset / closestStretchLength) * (closestStretch.pt2.y - closestStretch.pt1.y)));
        var point2 = new go.Point(closestStretch.pt2.x + ((offset / closestStretchLength) * (closestStretch.pt1.x - closestStretch.pt2.x)),
        closestStretch.pt2.y + ((offset / closestStretchLength) * (closestStretch.pt1.y - closestStretch.pt2.y)));
        var newLoc = part.location.copy().projectOntoLineSegmentPoint(point1, point2);
        return newLoc;
    }

    // mouseDrop event for walls; if a door or window is dropped on a wall, add it to the wall group
    // do not allow dropping wallParts that would extend beyond wall endpoints or intrude into another wallPart
    var addWallPart = function (e, wall) {
        var wallPart = myDiagram.selection.first();
        if ((wallPart.category === "WindowNode" || wallPart.category === "DoorNode") && wallPart.containingGroup === null) {
            var newLoc = findClosestLocOnWall(wall, wallPart);
            if (newLoc !== null) {
                wall.findObject("SHAPE").stroke = "black";
                myDiagram.model.setDataProperty(wallPart.data, "group", wall.data.key);
                wallPart.location = newLoc.projectOntoLineSegmentPoint(wall.data.startpoint, wall.data.endpoint);
                wallPart.angle = wall.rotateObject.angle;
                if (wallPart.category === "WindowNode") myDiagram.model.setDataProperty(wallPart.data, "height", wall.data.strokeWidth);
                if (wallPart.category === "DoorNode") myDiagram.model.setDataProperty(wallPart.data, "doorOpeningHeight", wall.data.strokeWidth);
            } else {
                myDiagram.remove(wallPart);
                alert("There's not enough room on the wall!");
                return;
            }
        }
        setSelectionInfo(myDiagram.selection.first());
        updateWallDimensions();
    }

    // mouseDragEnter evemt for walls; if a door or window is dragged over a wall, highlight the wall and change its angle
    var wallPartDragOver = function (e, wall) {
        var parts = myDiagram.toolManager.draggingTool.draggingParts;
        parts.iterator.each(function (part) {
            if ((part.category === "WindowNode" || part.category === "DoorNode") && part.containingGroup === null) {
                wall.findObject("SHAPE").stroke = "lightblue";
                part.angle = wall.rotateObject.angle;
            }
        });
    }

    // mouseDragLeave event for walls; if a wall part is dragged past a wall, unhighlight the wall and change back the wall part's angle to 0
    var wallPartDragAway = function (e, wall) {
        wall.findObject("SHAPE").stroke = "black";
        var parts = myDiagram.toolManager.draggingTool.draggingParts;
        parts.iterator.each(function (part) {
            if ((part.category === "WindowNode" || part.category === "DoorNode") && part.containingGroup === null) part.angle = 0
        });
    }

    // wall group (has custom layout for handling window / door placement)
    myDiagram.groupTemplateMap.add("WallGroup", $(go.Group, "Spot",
        {
            contextMenu: contextMenu,
            toolTip: nodeToolTip,
            selectionObjectName: "SHAPE",
            rotateObjectName: "SHAPE",
            locationSpot: go.Spot.Center,
            reshapable: true,
            minSize: new go.Size(1, 1),
            dragComputation: snapWalls,
            selectionAdorned: false,
            mouseDrop: addWallPart,
            mouseDragEnter: wallPartDragOver,
            mouseDragLeave: wallPartDragAway,
            doubleClick: function () { hideShow('selectionInfoWindow'); }
        },
        $(go.Shape,
        {
            strokeWidth: 1,
            name: "SHAPE",
            fill: "black",
            stroke: "red",
            geometry: new go.Geometry(go.Geometry.Line),
            isGeometryPositioned: true
        },
        new go.Binding("strokeWidth", "strokeWidth"),
        new go.Binding("stroke", "isSelected", function (s, obj) {
            if (obj.part.containingGroup != null) {
                var group = obj.part.containingGroup;
                if (s) { group.data.isSelected = true; }
            }
            return s ? "dodgerblue" : "black";
        }).ofObject()
      )
      ));

    // ************************************************************************* PALETTE *****************************************************

    paletteModel = $(go.GraphLinksModel, { nodeDataArray: furnitureNodeDataArray });

    palette2Model = $(go.GraphLinksModel,
        {
            nodeDataArray: [
                {
                    category: "PaletteWallNode",
                    key: "wall",
                    caption: "Wall",
                    type: "Wall",
                    color: "#000000",
                    shape: "Rectangle",
                    height: 10,
                    width: 60,
                    notes: "",
                },
                {
                    category: "WindowNode",
                    key: "window",
                    color: "white",
                    caption: "Window",
                    type: "Window",
                    shape: "Rectangle",
                    height: 10,
                    width: 60,
                    notes: ""
                },
                {
                    key: "door",
                    category: "DoorNode",
                    color: "rgba(0, 0, 0, 0)",
                    caption: "Door",
                    type: "Door",
                    width: 40,
                    doorOpeningHeight: 5,
                    swing: "left",
                    notes: ""
                }
            ]
        });

    // Furniture Palette
    myPalette = $(go.Palette, "myPaletteDiv",
        {
            contentAlignment: go.Spot.Center,
            nodeTemplateMap: myDiagram.nodeTemplateMap, // shared node template with main diagram
            "contextMenuTool.isEnabled": false,
            model: paletteModel,
            scale: 1
        });

    // Wall Parts Palette
    myPalette2 = $(go.Palette, "myPalette2Div",
        {
            contentAlignment: go.Spot.Center,
            nodeTemplateMap: myDiagram.nodeTemplateMap, // shared node template with main diagram
            "contextMenuTool.isEnabled": false,
            model: palette2Model,
            scale: 1
        });

    // display different help depending on selection context
    myDiagram.addDiagramListener("ChangedSelection", function (e) {
        var selection = myDiagram.selection;
        var node = myDiagram.selection.first(); // only used if selection.count === 1
        if (selection.count === 0) setDiagramHelper("Click to select a part, drag one from a Palette, or draw a wall with the Wall Tool (Ctr + 1)");
        else if (selection.count > 1) {
            var ungroupable = false;
            selection.iterator.each(function (node) { if (node.category === "WindowNode" || node.category === "DoorNode" || node.category === "WallGroup") ungroupable = true; });
            if (!ungroupable) setDiagramHelper("You may group your selection with the context menu (Right Click anywhere)");
        }
        else if (node.category === "WallGroup") setDiagramHelper("Drag wall endpoints or add doors and windows to the wall from the Wall Parts Palette");
        else if (selection.first().category === "WindowNode" || selection.first().category === "DoorNode") {
            if (node.containingGroup !== null) setDiagramHelper("Drag and resize wall part along the wall; drag away from wall to detach");
            else setDiagramHelper("Drag part so the cursor is over a wall to add this part to a wall");
        }
        else if (selection.first().category === "MultiPurposeNode") setDiagramHelper("Double click on part text to revise it");
        else setDiagramHelper("Drag, resize, or rotate (hold SHIFT for no snap) your selection");
    });

    // ****************************************************************** OTHER TOOL OVERRIDES *****************************************************************

    // if a wall was dragged to intersect another wall, update angle displays
    myDiagram.toolManager.draggingTool.doMouseUp = function () {
        go.DraggingTool.prototype.doMouseUp.call(this);
        updateWallAngles();
        this.isGridSnapEnabled = myDiagram.model.modelData.preferences.gridSnap;
    }

    // if user is holding shift while dragging, do not use grid snap
    myDiagram.toolManager.draggingTool.doMouseMove = function () {
        if (myDiagram.lastInput.shift) {
            this.isGridSnapEnabled = false;
        } else this.isGridSnapEnabled = myDiagram.model.modelData.preferences.gridSnap;
        go.DraggingTool.prototype.doMouseMove.call(this);
    }

    // when resizing, constantly update the node info box with updated size info; constantly update dimension links
    myDiagram.toolManager.resizingTool.doMouseMove = function () {
        var node = this.adornedObject;
        // if node is the only thing selected, display its info as its resized
        if (this.diagram.selection.count === 1) setSelectionInfo(node);
        updateWallDimensions();
        go.ResizingTool.prototype.doMouseMove.call(this);
    }

    // when resizing a wallPart, do not allow it to be resized past the nearest wallPart / wall endpoints
    myDiagram.toolManager.resizingTool.computeMaxSize = function () {
        var tool = this;
        var obj = tool.adornedObject.part;
        var wall = myDiagram.findPartForKey(obj.data.group);
        if ((obj.category === 'DoorNode' || obj.category === 'WindowNode') && wall !== null) {
            var stationaryPt; var movingPt;
            var resizeAdornment = null;
            obj.adornments.iterator.each(function (adorn) { if (adorn.name === "WallPartResizeAdornment") resizeAdornment = adorn; });
            resizeAdornment.elements.iterator.each(function (el) {
                if (el instanceof go.Shape && el.alignment === tool.handle.alignment) movingPt = el.getDocumentPoint(go.Spot.Center);
                if (el instanceof go.Shape && el.alignment !== tool.handle.alignment) stationaryPt = el.getDocumentPoint(go.Spot.Center);
            });
            // find the constrainingPt; that is, the endpoint (wallPart endpoint or wall endpoint) that is the one closest to movingPt but still farther from stationaryPt than movingPt
            // this loop checks all other wallPart endpoints of the wall that the resizing wallPart is a part of
            var constrainingPt; var closestDist = Number.MAX_VALUE;
            wall.memberParts.iterator.each(function (part) {
                if (part.data.key !== obj.data.key) {
                    var endpoints = getWallPartEndpoints(part);
                    for (var i = 0; i < endpoints.length; i++) {
                        var point = endpoints[i];
                        var distanceToMovingPt = Math.sqrt(point.distanceSquaredPoint(movingPt));
                        if (distanceToMovingPt < closestDist) {
                            var distanceToStationaryPt = Math.sqrt(point.distanceSquaredPoint(stationaryPt));
                            if (distanceToStationaryPt > distanceToMovingPt) {
                                closestDist = distanceToMovingPt;
                                constrainingPt = point;
                            }
                        }
                    }
                }
            });
            // if we're not constrained by a wallPart endpoint, the constraint will come from a wall endpoint; figure out which one
            if (constrainingPt === undefined || constrainingPt === null) {
                if (wall.data.startpoint.distanceSquaredPoint(movingPt) > wall.data.startpoint.distanceSquaredPoint(stationaryPt)) constrainingPt = wall.data.endpoint;
                else constrainingPt = wall.data.startpoint;
            }
            // set the new max size of the wallPart according to the constrainingPt
            var maxLength = Math.sqrt(stationaryPt.distanceSquaredPoint(constrainingPt));
            return new go.Size(maxLength, wall.data.strokeWidth);
        }
        return go.ResizingTool.prototype.computeMaxSize.call(tool);
    }

    // ---------------------------------------------- INSTALL CUSTOM TOOLS --------------------------------------------------------------
    var wallBuildingTool = new WallBuildingTool();
    myDiagram.toolManager.mouseDownTools.insertAt(0, wallBuildingTool);

    var wallReshapingTool = new WallReshapingTool();
    myDiagram.toolManager.mouseDownTools.insertAt(3, wallReshapingTool);

    // --------------------------------------------- INITIALIZE VARIABLES AND UI ----------------------------------------------------------
    setBehavior('dragging'); // active tool is Move / Select (Ctrl + 2)
    // set grid size initially to 20cm boxes (10px by 10px, since 1px = 2cm)
    myDiagram.toolManager.draggingTool.gridCellSize = new go.Size(myDiagram.model.modelData.gridSize, myDiagram.model.modelData.gridSize);
    myDiagram.grid = $(go.Panel, "Grid",
                { gridCellSize: new go.Size(myDiagram.model.modelData.gridSize, myDiagram.model.modelData.gridSize), visible: true },
                $(go.Shape, "LineH", { stroke: "lightgray" }),
                $(go.Shape, "LineV", { stroke: "lightgray" }));
    setDiagramHelper("Drag a part to the Diagram or select the Wall Tool (Ctrl + 1) to begin");
    document.getElementById('gridSizeInput').value = convertPixelsToUnits(myDiagram.model.modelData.gridSize).toFixed(2);
    document.getElementById('wallWidthInput').value = convertPixelsToUnits(myDiagram.model.modelData.wallWidth).toFixed(2);
    loadFileToModel(document.getElementById("initialModel").value);
    myDiagram.isModified = false;
    updateStatistics();

} // end init
