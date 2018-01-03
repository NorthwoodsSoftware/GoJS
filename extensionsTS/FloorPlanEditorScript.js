(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go", "./DrawCommandHandler", "./RotateMultipleTool", "./ResizeMultipleTool", "./GuidedDraggingTool"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    *  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
    */
    var go = require("../release/go");
    var DrawCommandHandler_1 = require("./DrawCommandHandler");
    var RotateMultipleTool_1 = require("./RotateMultipleTool");
    var ResizeMultipleTool_1 = require("./ResizeMultipleTool");
    var GuidedDraggingTool_1 = require("./GuidedDraggingTool");
    /*function checkLocalStorage () {
            try {
                window.localStorage.setItem('item', 'item');
                window.localStorage.removeItem('item');
                return true;
            } catch (e) {
                return false;
            }
        }*/
    var myDiagram;
    function init() {
        // hides open HTML Element
        var openDocument = document.getElementById("openDocument");
        openDocument.style.visibility = "hidden";
        // hides remove HTML Element
        var removeDocument = document.getElementById("removeDocument");
        removeDocument.style.visibility = "hidden";
        var $ = go.GraphObject.make; // for more concise visual tree definitions
        myDiagram =
            $(go.Diagram, "myDiagramDiv", {
                initialContentAlignment: go.Spot.Center,
                allowDrop: true,
                allowLink: false,
                commandHandler: new DrawCommandHandler_1.DrawCommandHandler(),
                // default to having arrow keys move selected nodes
                "commandHandler.arrowKeyBehavior": "move",
                // allow Ctrl-G to call groupSelection()
                "commandHandler.archetypeGroupData": { text: "Group", isGroup: true },
                rotatingTool: new RotateMultipleTool_1.RotateMultipleTool(),
                resizingTool: new ResizeMultipleTool_1.ResizeMultipleTool(),
                draggingTool: new GuidedDraggingTool_1.GuidedDraggingTool(),
                "draggingTool.horizontalGuidelineColor": "blue",
                "draggingTool.verticalGuidelineColor": "blue",
                "draggingTool.centerGuidelineColor": "green",
                "draggingTool.guidelineWidth": 1,
                // notice whenever the selection may have changed
                "ChangedSelection": enableAll,
                // notice when the Paste command may need to be reenabled
                "ClipboardChanged": enableAll,
                // notice when an object has been dropped from the palette
                "ExternalObjectsDropped": function (e) {
                    document.getElementById("myDiagramDiv").focus(); // assume keyboard focus should be on myDiagram
                    myDiagram.toolManager.draggingTool.clearGuidelines(); // remove any guidelines
                }
            });
        // sets the qualities of the tooltip
        var tooltiptemplate = $(go.Adornment, go.Panel.Auto, $(go.Shape, "RoundedRectangle", { fill: "whitesmoke", stroke: "gray" }), $(go.TextBlock, { margin: 3, editable: true }, 
        // converts data about the part into a string
        new go.Binding("text", "", function (data) {
            if (data.item != undefined)
                return data.item;
            return "(unnamed item)";
        })));
        // Define the generic furniture and structure Nodes.
        // The Shape gets it Geometry from a geometry path string in the bound data.
        myDiagram.nodeTemplate =
            $(go.Node, "Spot", {
                locationObjectName: "SHAPE",
                locationSpot: go.Spot.Center,
                toolTip: tooltiptemplate,
                selectionAdorned: false // use a Binding on the Shape.stroke to show selection
            }, 
            // remember the location of this Node
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify), 
            // move a selected part into the Foreground layer, so it isn't obscured by any non-selected parts
            new go.Binding("layerName", "isSelected", function (s) { return s ? "Foreground" : ""; }).ofObject(), 
            // can be resided according to the user's desires
            { resizable: true, resizeObjectName: "SHAPE" }, { rotatable: true, rotateObjectName: "SHAPE" }, $(go.Shape, {
                name: "SHAPE",
                // the following are default values;
                // actual values may come from the node data object via data-binding
                geometryString: "F1 M0 0 L20 0 20 20 0 20 z",
                fill: "rgb(130, 130, 256)"
            }, 
            // this determines the actual shape of the Shape
            new go.Binding("geometryString", "geo"), 
            // allows the color to be determined by the node data
            new go.Binding("fill", "color"), 
            // selection causes the stroke to be blue instead of black
            new go.Binding("stroke", "isSelected", function (s) { return s ? "dodgerblue" : "black"; }).ofObject(), 
            // remember the size of this node
            new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify), 
            // can set the angle of this Node
            new go.Binding("angle", "angle").makeTwoWay()));
        myDiagram.nodeTemplate.contextMenu =
            $(go.Adornment, "Vertical", $("ContextMenuButton", $(go.TextBlock, "Rename", { margin: 3 }), { click: function (e, obj) { rename(obj); } }), $("ContextMenuButton", $(go.TextBlock, "Cut", { margin: 3 }), { click: function (e, obj) { myDiagram.commandHandler.cutSelection(); } }), $("ContextMenuButton", $(go.TextBlock, "Copy", { margin: 3 }), { click: function (e, obj) { myDiagram.commandHandler.copySelection(); } }), $("ContextMenuButton", $(go.TextBlock, "Rotate +45", { margin: 3 }), { click: function (e, obj) { myDiagram.commandHandler.rotate(45); } }), $("ContextMenuButton", $(go.TextBlock, "Rotate -45", { margin: 3 }), { click: function (e, obj) { myDiagram.commandHandler.rotate(-45); } }), $("ContextMenuButton", $(go.TextBlock, "Rotate +90", { margin: 3 }), { click: function (e, obj) { myDiagram.commandHandler.rotate(90); } }), $("ContextMenuButton", $(go.TextBlock, "Rotate -90", { margin: 3 }), { click: function (e, obj) { myDiagram.commandHandler.rotate(-90); } }), $("ContextMenuButton", $(go.TextBlock, "Rotate 180", { margin: 3 }), { click: function (e, obj) { myDiagram.commandHandler.rotate(180); } }));
        // group settings from basic.html to lock things together
        myDiagram.groupTemplate =
            $(go.Group, go.Panel.Auto, {
                ungroupable: true,
                toolTip: tooltiptemplate
            }, $(go.Shape, "Rectangle", // the Group is not seen but can be selected due to the transparent fill
            { fill: "transparent", stroke: "lightgray", strokeWidth: 1 }), $(go.Placeholder));
        // make grouped Parts unselectable
        myDiagram.addDiagramListener("SelectionGrouped", function (e) {
            // e.subject should be the new Group
            e.subject.memberParts.each(function (part) { part.selectable = false; });
        });
        myDiagram.addDiagramListener("SelectionUngrouped", function (e) {
            // e.parameter should be collection of ungrouped former members
            e.parameter.each(function (part) {
                part.selectable = true;
                part.isSelected = true;
            });
        });
        myDiagram.addDiagramListener("SelectionCopied", function (e) {
            // selection collection will be modified during this loop,
            // so make a copy of it first
            var sel = myDiagram.selection.toArray();
            for (var i = 0; i < sel.length; i++) {
                var part = sel[i];
                // don't have any members of Groups be selected or selectable
                if (part instanceof go.Group) {
                    var mems = new go.Set().addAll(part.memberParts);
                    mems.each(function (member) {
                        member.isSelected = false;
                        member.selectable = false;
                    });
                }
            }
        });
        // change the title to indicate that the diagram has been modified
        myDiagram.addDiagramListener("Modified", function (e) {
            var currentFile = document.getElementById("currentFile");
            var idx = currentFile.textContent.indexOf("*");
            if (myDiagram.isModified) {
                if (idx < 0)
                    currentFile.textContent = currentFile.textContent + "*";
            }
            else {
                if (idx >= 0)
                    currentFile.textContent = currentFile.textContent.substr(0, idx);
            }
        });
        // the Palette
        // brushes for furniture structures
        var wood = $(go.Brush, "Linear", { 0: "#964514", 1: "#5E2605" });
        var wall = $(go.Brush, "Linear", { 0: "#A8A8A8", 1: "#545454" });
        var blue = $(go.Brush, "Linear", { 0: "#42C0FB", 1: "#009ACD" });
        var metal = $(go.Brush, "Linear", { 0: "#A8A8A8", 1: "#474747" });
        var green = $(go.Brush, "Linear", { 0: "#9CCB19", 1: "#698B22" });
        // default structures and furniture
        var myPalette = $(go.Palette, "myPaletteDiv", {
            nodeTemplate: myDiagram.nodeTemplate,
            "contextMenuTool.isEnabled": false,
            allowZoom: false,
            layout: $(go.GridLayout, { cellSize: new go.Size(1, 1), spacing: new go.Size(5, 5) }),
            // initialize the Palette with a few furniture and structure nodes
            model: $(go.GraphLinksModel, {
                nodeDataArray: [
                    {
                        key: 1,
                        geo: "F1 M0 0 L5,0 5,40 0,40 0,0z x M0,0 a40,40 0 0,0 -40,40 ",
                        item: "left door",
                        color: wall
                    },
                    {
                        key: 2,
                        geo: "F1 M0 0 L5,0 5,40 0,40 0,0z x M5,0 a40,40 0 0,1 40,40 ",
                        item: "right door",
                        color: wall
                    },
                    {
                        key: 3, angle: 90,
                        geo: "F1 M0,0 L0,100 12,100 12,0 0,0z",
                        item: "wall",
                        color: wall
                    },
                    {
                        key: 4, angle: 90,
                        geo: "F1 M0,0 L0,50 10,50 10,0 0,0 x M5,0 L5,50z",
                        item: "window",
                        color: "whitesmoke"
                    },
                    {
                        key: 5,
                        geo: "F1 M0,0 L50,0 50,12 12,12 12,50 0,50 0,0 z",
                        item: "corner",
                        color: wall
                    },
                    {
                        key: 6,
                        geo: "F1 M0 0 L40 0 40 40 0 40 0 0 x M0 10 L40 10 x M 8 10 8 40 x M 32 10 32 40 z",
                        item: "arm chair",
                        color: blue
                    },
                    {
                        key: 7,
                        geo: "F1 M0 0 L80,0 80,40 0,40 0 0 x M0,10 L80,10 x M 7,10 7,40 x M 73,10 73,40 z",
                        item: "couch",
                        color: blue
                    },
                    {
                        key: 8,
                        geo: "F1 M0 0 L30 0 30 30 0 30 z",
                        item: "Side Table",
                        color: wood
                    },
                    {
                        key: 9,
                        geo: "F1 M0 0 L80,0 80,90 0,90 0,0 x M0,7 L80,7 x M 0,30 80,30 z",
                        item: "queen bed",
                        color: green
                    },
                    {
                        key: 10,
                        geo: "F1 M5 5 L30,5 35,30 0,30 5,5 x F M0 0 L 35,0 35,5 0,5 0,0 z",
                        item: "chair",
                        color: wood
                    },
                    {
                        key: 11,
                        geo: "F1 M0 0 L50,0 50,90 0,90 0,0 x M0,7 L50,7 x M 0,30 50,30 z",
                        item: "twin bed",
                        color: green
                    },
                    {
                        key: 12,
                        geo: "F1 M0 0 L0 60 80 60 80 0z",
                        item: "kitchen table",
                        color: wood
                    },
                    {
                        key: 13,
                        geo: "F1 M 0,0 a35,35 0 1,0 1,-1 z",
                        item: "round table",
                        color: wood
                    },
                    {
                        key: 14,
                        geo: "F1 M 0,0 L35,0 35,30 0,30 0,0 x M 5,5 L 30, 5 30,25 5,25 5,5 x M 17,2 L 17,10 19,10 19,2 17,2 z",
                        item: "kitchen sink",
                        color: metal
                    },
                    {
                        key: 15,
                        geo: "F1 M0,0 L55,0, 55,50, 0,50 0,0 x M 40,7 a 7,7 0 1 0 0.00001 0z x M 40,10 a 4,4 0 1 0 0.00001 0z x M 38,27 a 7,7 0 1 0 0.00001 0z x M 38,30 a 4,4 0 1 0 0.00001 0z x M 16,27 a 7,7 0 1 0 0.00001 0z xM 16,30 a 4,4 0 1 0 0.00001 0z x M 14,7 a 7,7 0 1 0 0.00001 0z x M 14,10 a 4,4 0 1 0 0.00001 0z",
                        item: "stove",
                        color: metal
                    },
                    {
                        key: 16,
                        geo: "F1 M0,0 L55,0, 55,50, 0,50 0,0 x F1 M0,51 L55,51 55,60 0,60 0,51 x F1 M5,60 L10,60 10,63 5,63z",
                        item: "refrigerator",
                        color: metal
                    },
                    {
                        key: 17,
                        geo: "F1 M0,0 100,0 100,40 0,40z",
                        item: "bookcase",
                        color: wood
                    },
                    {
                        key: 18,
                        geo: "F1 M0,0 70,0 70,50 0,50 0,0 x F1 M15,58 55,58 55,62 15,62 x F1 M17,58 16,50 54,50 53,58z",
                        item: "desk",
                        color: wood
                    },
                ] // end nodeDataArray
            }) // end model
        }); // end Palette
        // the Overview
        var myOverview = $(go.Overview, "myOverviewDiv", { observed: myDiagram, maxScale: 0.5 });
        // change color of viewport border in Overview
        myOverview.box.elt(0).stroke = "dodgerblue";
        // start off with an empty document
        myDiagram.isModified = false;
        newDocument();
        if (!checkLocalStorage()) {
            var currentFile = document.getElementById("currentFile");
            currentFile.textContent = "Sorry! No web storage support. If you're using Internet Explorer / Microsoft Edge, you must load the page from a server for local storage to work.";
        }
    } // end init
    exports.init = init;
    // enable or disable a particular button
    function enable(name, ok) {
        var button = document.getElementById(name);
        if (button)
            button.disabled = !ok;
    }
    exports.enable = enable;
    // enable or disable all context-sensitive command buttons
    function enableAll() {
        var cmdhnd = myDiagram.commandHandler;
        enable("Rename", myDiagram.selection.count > 0);
        enable("Undo", cmdhnd.canUndo());
        enable("Redo", cmdhnd.canRedo());
        enable("Cut", cmdhnd.canCutSelection());
        enable("Copy", cmdhnd.canCopySelection());
        enable("Paste", cmdhnd.canPasteSelection());
        enable("Delete", cmdhnd.canDeleteSelection());
        enable("SelectAll", cmdhnd.canSelectAll());
        enable("AlignLeft", cmdhnd.canAlignSelection());
        enable("AlignRight", cmdhnd.canAlignSelection());
        enable("AlignTop", cmdhnd.canAlignSelection());
        enable("AlignBottom", cmdhnd.canAlignSelection());
        enable("AlignCenterX", cmdhnd.canAlignSelection());
        enable("AlignCenterY", cmdhnd.canAlignSelection());
        enable("AlignRows", cmdhnd.canAlignSelection());
        enable("AlignColumns", cmdhnd.canAlignSelection());
        enable("AlignGrid", cmdhnd.canAlignSelection());
        enable("Rotate45", cmdhnd.canRotate(45));
        enable("Rotate_45", cmdhnd.canRotate(-45));
        enable("Rotate90", cmdhnd.canRotate(90));
        enable("Rotate_90", cmdhnd.canRotate(-90));
        enable("Rotate180", cmdhnd.canRotate(180));
    }
    exports.enableAll = enableAll;
    // Commands for this application
    // changes the item of the object
    function rename(obj) {
        if (!obj)
            obj = myDiagram.selection.first();
        if (!obj)
            return;
        myDiagram.startTransaction("rename");
        var newName = prompt("Rename " + obj.part.data.item + " to:", obj.part.data.item);
        myDiagram.model.setDataProperty(obj.part.data, "item", newName);
        myDiagram.commitTransaction("rename");
    }
    // shows/hides gridlines
    // to be implemented onclick of a button
    function updateGridOption() {
        myDiagram.startTransaction("grid");
        var grid = document.getElementById("grid");
        myDiagram.grid.visible = (grid.checked === true);
        myDiagram.commitTransaction("grid");
    }
    exports.updateGridOption = updateGridOption;
    // enables/disables guidelines when dragging
    function updateGuidelinesOption() {
        // no transaction needed, because we are modifying a tool for future use
        var guide = document.getElementById("guidelines");
        if (guide.checked === true) {
            myDiagram.toolManager.draggingTool.isGuidelineEnabled = true;
        }
        else {
            myDiagram.toolManager.draggingTool.isGuidelineEnabled = false;
        }
    }
    exports.updateGuidelinesOption = updateGuidelinesOption;
    // enables/disables snapping tools, to be implemented by buttons
    function updateSnapOption() {
        // no transaction needed, because we are modifying tools for future use
        var snap = document.getElementById("snap");
        if (snap.checked === true) {
            myDiagram.toolManager.draggingTool.isGridSnapEnabled = true;
            myDiagram.toolManager.resizingTool.isGridSnapEnabled = true;
        }
        else {
            myDiagram.toolManager.draggingTool.isGridSnapEnabled = false;
            myDiagram.toolManager.resizingTool.isGridSnapEnabled = false;
        }
    }
    exports.updateSnapOption = updateSnapOption;
    // user specifies the amount of space between nodes when making rows and column
    function askSpace() {
        var space = prompt("Desired space between nodes (in pixels):", "0");
        return parseFloat(space);
    }
    // update arrowkey function
    function arrowMode() {
        // no transaction needed, because we are modifying the CommandHandler for future use
        var move = document.getElementById("move");
        var select = document.getElementById("select");
        var scroll = document.getElementById("scroll");
        if (move.checked === true) {
            myDiagram.commandHandler.arrowKeyBehavior = "move";
        }
        else if (select.checked === true) {
            myDiagram.commandHandler.arrowKeyBehavior = "select";
        }
        else if (scroll.checked === true) {
            myDiagram.commandHandler.arrowKeyBehavior = "scroll";
        }
    }
    exports.arrowMode = arrowMode;
    var UnsavedFileName = "(Unsaved File)";
    function checkLocalStorage() {
        try {
            window.localStorage.setItem('item', 'item');
            window.localStorage.removeItem('item');
            return true;
        }
        catch (e) {
            return false;
        }
    }
    exports.checkLocalStorage = checkLocalStorage;
    function getCurrentFileName() {
        var currentFile = document.getElementById("currentFile");
        var name = currentFile.textContent;
        if (name[name.length - 1] === "*")
            return name.substr(0, name.length - 1);
        return name;
    }
    exports.getCurrentFileName = getCurrentFileName;
    function setCurrentFileName(name) {
        var currentFile = document.getElementById("currentFile");
        if (myDiagram.isModified) {
            name += "*";
        }
        currentFile.textContent = name;
    }
    exports.setCurrentFileName = setCurrentFileName;
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
        myDiagram.model = new go.GraphLinksModel();
        myDiagram.undoManager.isEnabled = true;
        myDiagram.addModelChangedListener(function (e) {
            if (e.isTransactionFinished)
                enableAll();
        });
        myDiagram.isModified = false;
    }
    exports.newDocument = newDocument;
    // saves the current floor plan to local storage
    function saveDocument() {
        if (checkLocalStorage()) {
            var saveName = getCurrentFileName();
            if (saveName === UnsavedFileName) {
                saveDocumentAs();
            }
            else {
                saveDiagramProperties();
                window.localStorage.setItem(saveName, myDiagram.model.toJson());
                myDiagram.isModified = false;
            }
        }
    }
    exports.saveDocument = saveDocument;
    // saves floor plan to local storage with a new name
    function saveDocumentAs() {
        if (checkLocalStorage()) {
            var saveName = prompt("Save file as...", getCurrentFileName());
            if (saveName && saveName !== UnsavedFileName) {
                setCurrentFileName(saveName);
                saveDiagramProperties();
                window.localStorage.setItem(saveName, myDiagram.model.toJson());
                myDiagram.isModified = false;
            }
        }
    }
    exports.saveDocumentAs = saveDocumentAs;
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
    exports.openDocument = openDocument;
    // shows the remove HTML element
    function removeDocument() {
        if (checkLocalStorage()) {
            openElement("removeDocument", "mySavedFiles2");
        }
    }
    exports.removeDocument = removeDocument;
    // these functions are called when panel buttons are clicked
    function loadFile() {
        var listbox = document.getElementById("mySavedFiles");
        // get selected filename
        var fileName = undefined;
        for (var i = 0; i < listbox.options.length; i++) {
            if (listbox.options[i].selected)
                fileName = listbox.options[i].text; // selected file
        }
        if (fileName !== undefined) {
            // changes the text of "currentFile" to be the same as the floor plan now loaded
            setCurrentFileName(fileName);
            // actually load the model from the JSON format string
            var savedFile = window.localStorage.getItem(fileName);
            myDiagram.model = go.Model.fromJson(savedFile);
            loadDiagramProperties();
            myDiagram.undoManager.isEnabled = true;
            myDiagram.addModelChangedListener(function (e) {
                if (e.isTransactionFinished)
                    enableAll();
            });
            myDiagram.isModified = false;
            // eventually loadDiagramProperties will be called to finish
            // restoring shared saved model/diagram properties
        }
        closeElement("openDocument");
    }
    exports.loadFile = loadFile;
    // Store shared model state in the Model.modelData property
    // (will be loaded by loadDiagramProperties)
    function saveDiagramProperties() {
        myDiagram.model.modelData.position = go.Point.stringify(myDiagram.position);
    }
    exports.saveDiagramProperties = saveDiagramProperties;
    // Called by loadFile.
    function loadDiagramProperties(e) {
        // set Diagram.initialPosition, not Diagram.position, to handle initialization side-effects
        var pos = myDiagram.model.modelData.position;
        if (pos)
            myDiagram.initialPosition = go.Point.parse(pos);
    }
    exports.loadDiagramProperties = loadDiagramProperties;
    // deletes the selected file from local storage
    function removeFile() {
        var listbox = document.getElementById("mySavedFiles2");
        // get selected filename
        var fileName = undefined;
        for (var i = 0; i < listbox.options.length; i++) {
            if (listbox.options[i].selected)
                fileName = listbox.options[i].text; // selected file
        }
        if (fileName !== undefined) {
            // removes file from local storage
            window.localStorage.removeItem(fileName);
            // the current document remains open, even if its storage was deleted
        }
        closeElement("removeDocument");
    }
    exports.removeFile = removeFile;
    function updateFileList(id) {
        // displays cached floor plan files in the listboxes
        var listbox = document.getElementById(id);
        // remove any old listing of files
        var last;
        while (last = listbox.lastChild)
            listbox.removeChild(last);
        // now add all saved files to the listbox
        for (var key in window.localStorage) {
            var storedFile = window.localStorage.getItem(key);
            if (!storedFile)
                continue;
            var option = document.createElement("option");
            option.value = key;
            option.text = key;
            listbox.add(option, null);
        }
    }
    exports.updateFileList = updateFileList;
    function openElement(id, listid) {
        var panel = document.getElementById(id);
        if (panel.style.visibility === "hidden") {
            updateFileList(listid);
            panel.style.visibility = "visible";
        }
    }
    exports.openElement = openElement;
    // hides the open/remove elements when the "cancel" button is pressed
    function closeElement(id) {
        var panel = document.getElementById(id);
        if (panel.style.visibility === "visible") {
            panel.style.visibility = "hidden";
        }
    }
    exports.closeElement = closeElement;
    function undo() { myDiagram.commandHandler.undo(); }
    exports.undo = undo;
    function redo() { myDiagram.commandHandler.redo(); }
    exports.redo = redo;
    function cutSelection() { myDiagram.commandHandler.cutSelection(); }
    exports.cutSelection = cutSelection;
    function copySelection() { myDiagram.commandHandler.copySelection(); }
    exports.copySelection = copySelection;
    function pasteSelection() { myDiagram.commandHandler.pasteSelection(); }
    exports.pasteSelection = pasteSelection;
    function deleteSelection() { myDiagram.commandHandler.deleteSelection(); }
    exports.deleteSelection = deleteSelection;
    function selectAll() { myDiagram.commandHandler.selectAll(); }
    exports.selectAll = selectAll;
    function alignLeft() { myDiagram.commandHandler.alignLeft(); }
    exports.alignLeft = alignLeft;
    function alignRight() { myDiagram.commandHandler.alignRight(); }
    exports.alignRight = alignRight;
    function alignTop() { myDiagram.commandHandler.alignTop(); }
    exports.alignTop = alignTop;
    function alignBottom() { myDiagram.commandHandler.alignBottom(); }
    exports.alignBottom = alignBottom;
    function alignCemterX() { myDiagram.commandHandler.alignCenterX(); }
    exports.alignCemterX = alignCemterX;
    function alignCenterY() { myDiagram.commandHandler.alignCenterY(); }
    exports.alignCenterY = alignCenterY;
    function rotate45() { myDiagram.commandHandler.rotate(45); }
    exports.rotate45 = rotate45;
    function rotate_45() { myDiagram.commandHandler.rotate(-45); }
    exports.rotate_45 = rotate_45;
    function rotate90() { myDiagram.commandHandler.rotate(90); }
    exports.rotate90 = rotate90;
    function rotate_90() { myDiagram.commandHandler.rotate(-90); }
    exports.rotate_90 = rotate_90;
    function rotate180() { myDiagram.commandHandler.rotate(180); }
    exports.rotate180 = rotate180;
    function cancel1() { closeElement('openDocument'); }
    exports.cancel1 = cancel1;
    function cancel2() { closeElement('removeDocument'); }
    exports.cancel2 = cancel2;
    function alignRows() { myDiagram.commandHandler.alignRow(askSpace()); }
    exports.alignRows = alignRows;
    function alignColumns() { myDiagram.commandHandler.alignColumn(askSpace()); }
    exports.alignColumns = alignColumns;
});
