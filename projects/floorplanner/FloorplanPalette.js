/*
* Copyright (C) 1998-2018 by Northwoods Software Corporation
* All Rights Reserved.
*
* Floorplan Palette Class
* A Palette linked to a specified Floorplan
*/

/* 
* Floorplan Palette Constructor
* @param {HTMLDivElement|string} div A reference to a div or its ID as a string.
* @param {Floorplan} floorplan A valid instance of Floorplan
* @param {Array} nodeDataArray An array for the Palette's model's node data
*/
function FloorplanPalette(div, floorplan, nodeDataArray) {
    go.Palette.call(this, div);

    var $ = go.GraphObject.make;
    this.model = $(go.GraphLinksModel, { nodeDataArray: nodeDataArray });
    this.contentAlignment = go.Spot.Center;
    this.nodeTemplateMap = floorplan.nodeTemplateMap;
    this.toolManager.contextMenuTool.isEnabled = false;

    // add this new FloorplanPalette to the "palettes" field of its associated Floorplan
    floorplan.palettes.push(this);

} go.Diagram.inherit(FloorplanPalette, go.Palette);

