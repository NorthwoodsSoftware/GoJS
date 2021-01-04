/*
* Copyright (C) 1998-2021 by Northwoods Software Corporation
* All Rights Reserved.
*
* FLOOR PLANNER CODE: TEMPLATES - GENERAL
* General GraphObject templates used in the Floor Planner sample
* Includes Context Menu, Diagram, Default Group, AngleNode, DimensionLink, PointNode
*/

/*
* Dependencies for Context Menu:
* Make Selection Group, Ungroup Selection, Clear Empty Groups
*/

// Make the selection a group
function makeSelectionGroup(floorplan) {
    floorplan.startTransaction("group selection");
    // ungroup all selected nodes; then group them; if one of the selected nodes is a group, ungroup all its nodes
    var sel = floorplan.selection; var nodes = [];
    sel.iterator.each(function (n) {
        if (n instanceof go.Group) n.memberParts.iterator.each(function (part) { nodes.push(part); })
        else nodes.push(n);
    });
    for (var i = 0; i < nodes.length; i++) nodes[i].isSelected = true;
    ungroupSelection(floorplan);
    floorplan.commandHandler.groupSelection();
    var group = floorplan.selection.first(); // after grouping, the new group will be the only thing selected
    floorplan.model.setDataProperty(group.data, "caption", "Group");
    floorplan.model.setDataProperty(group.data, "notes", "");
    clearEmptyGroups(floorplan);
    // unselect / reselect group so data appears properly in Selection Info Window
    floorplan.clearSelection();
    floorplan.select(group);
    floorplan.commitTransaction("group selection");
}

// Ungroup selected nodes; if the selection is a group, ungroup all it's memberParts
function ungroupSelection(floorplan) {
    floorplan.startTransaction('ungroup selection');
    // helper function to ungroup nodes
    function ungroupNode(node) {
        var group = node.containingGroup;
        node.containingGroup = null;
        if (group != null) {
            if (group.memberParts.count === 0) floorplan.remove(group);
            else if (group.memberParts.count === 1) group.memberParts.first().containingGroup = null;
        }
    }
    // ungroup any selected nodes; remember groups that are selected
    var sel = floorplan.selection; var groups = [];
    sel.iterator.each(function (n) {
        if (!(n instanceof go.Group)) ungroupNode(n);
        else groups.push(n);
    });
    // go through selected groups, and ungroup their memberparts too
    var nodes = [];
    for (var i = 0; i < groups.length; i++) groups[i].memberParts.iterator.each(function (n) { nodes.push(n); });
    for (var i = 0; i < nodes.length; i++) ungroupNode(nodes[i]);
    clearEmptyGroups(floorplan);
    floorplan.commitTransaction('ungroup selection');
}

// Clear all the groups that have no nodes
function clearEmptyGroups(floorplan) {
    var nodes = floorplan.nodes; var arr = [];
    nodes.iterator.each(function (node) { if (node instanceof go.Group && node.memberParts.count === 0 && node.category !== "WallGroup") { arr.push(node); } });
    for (i = 0; i < arr.length; i++) { floorplan.remove(arr[i]); }
}

/*
* General Group Dependencies:
* Group Tool Tip
*/

// Group Tool Tip
function makeGroupToolTip() {
    var $ = go.GraphObject.make;
    return $(go.Adornment, "Auto",
        $(go.Shape, { fill: "#FFFFCC" }),
        $(go.TextBlock, { margin: 4 },
            new go.Binding("text", "", function (text, obj) {
                var data = obj.part.adornedObject.data;
                var name = (obj.part.adornedObject.category === "MultiPurposeNode") ? data.text : data.caption;
                return "Name: " + name + "\nNotes: " + data.notes + '\nMembers: ' + obj.part.adornedObject.memberParts.count;
            }).ofObject())
    );
}

/*
* General Templates:
* Context Menu, Default Group
*/

// Context Menu -- referenced by Node, Diagram and Group Templates
function makeContextMenu() {
    var $ = go.GraphObject.make
    return $(go.Adornment, "Vertical",
        // Make Selection Group Button
        $("ContextMenuButton",
            $(go.TextBlock, "Make Group"),
            { click: function (e, obj) { makeSelectionGroup(obj.part.diagram); } },
            new go.Binding("visible", "visible", function (v, obj) {
                var floorplan = obj.part.diagram;
                if (floorplan.selection.count <= 1) return false;
                var flag = true;
                floorplan.selection.iterator.each(function (node) {
                    if (node.category === "WallGroup" || node.category === "WindowNode" || node.category === "DoorNode") flag = false;
                });
                return flag;
            }).ofObject()
        ),
        // Ungroup Selection Button
        $("ContextMenuButton",
            $(go.TextBlock, "Ungroup"),
            { click: function (e, obj) { ungroupSelection(obj.part.diagram); } },
            new go.Binding("visible", "", function (v, obj) {
                var floorplan = obj.part.diagram;
                if (floorplan !== null) {
                    var node = floorplan.selection.first();
                    return ((node instanceof go.Node && node.containingGroup != null && node.containingGroup.category != 'WallGroup') ||
                        (node instanceof go.Group && node.category === ''));
                } return false;
            }).ofObject()
        ),
        // Copy Button
        $("ContextMenuButton",
            $(go.TextBlock, "Copy"),
            { click: function (e, obj) { obj.part.diagram.commandHandler.copySelection() } },
            new go.Binding("visible", "", function (v, obj) {
                if (obj.part.diagram !== null) {
                    return obj.part.diagram.selection.count > 0;
                } return false;
            }).ofObject()
        ),
        // Cut Button
        $("ContextMenuButton",
            $(go.TextBlock, "Cut"),
            { click: function (e, obj) { obj.part.diagram.commandHandler.cutSelection() } },
            new go.Binding("visible", "", function (v, obj) {
                if (obj.part.diagram !== null) {
                    return obj.part.diagram.selection.count > 0;
                } return false;
            }).ofObject()
        ),
        // Delete Button
        $("ContextMenuButton",
            $(go.TextBlock, "Delete"),
            { click: function (e, obj) { obj.part.diagram.commandHandler.deleteSelection() } },
            new go.Binding("visible", "", function (v, obj) {
                if (obj.part.diagram !== null) {
                    return obj.part.diagram.selection.count > 0;
                } return false;
            }).ofObject()
        ),
        // Paste Button
        $("ContextMenuButton",
            $(go.TextBlock, "Paste"),
            { click: function (e, obj) { obj.part.diagram.commandHandler.pasteSelection(obj.part.diagram.toolManager.contextMenuTool.mouseDownPoint) } }
        ),
        // Show Selection Info Button (only available when selection count > 0)
        $("ContextMenuButton",
            $(go.TextBlock, "Show Selection Info"),
            {
                click: function (e, obj) {
                    if (e.diagram.floorplanUI) {
                        var selectionInfoWindow = document.getElementById(e.diagram.floorplanUI.state.windows.selectionInfoWindow.id);
                        if (selectionInfoWindow.style.visibility !== 'visible') e.diagram.floorplanUI.hideShow('selectionInfoWindow');
                    }
                }
            },
            new go.Binding("visible", "", function (v, obj) {
                if (obj.part.diagram !== null) {
                    return obj.part.diagram.selection.count > 0;
                } return false;
            }).ofObject()
        ),
        // Flip Dimension Side Button (only available when selection contains Wall Group(s))
        $("ContextMenuButton",
            $(go.TextBlock, "Flip Dimension Side"),
            {
                click: function (e, obj) {
                    var floorplan = obj.part.diagram;
                    if (floorplan !== null) {
                        floorplan.startTransaction("flip dimension link side");
                        var walls = [];
                        floorplan.selection.iterator.each(function (part) {
                            if (part.category === "WallGroup") walls.push(part);
                        });
                        for (var i = 0; i < walls.length; i++) {
                            var wall = walls[i];
                            var sPt = wall.data.startpoint.copy();
                            var ePt = wall.data.endpoint.copy();
                            floorplan.model.setDataProperty(wall.data, "startpoint", ePt);
                            floorplan.model.setDataProperty(wall.data, "endpoint", sPt);
                            floorplan.updateWall(wall);
                        }
                        floorplan.commitTransaction("flip dimension link side");
                    }
                }
            },
            new go.Binding("visible", "", function (v, obj) {
                if (obj.part.diagram !== null) {
                    var sel = obj.part.diagram.selection;
                    if (sel.count === 0) return false;
                    var flag = false;
                    sel.iterator.each(function (part) {
                        if (part.category === "WallGroup") flag = true;
                    });
                    return flag;
                } return false;
            }).ofObject()
        )
    );
}

// Default Group
function makeDefaultGroup() {
    var $ = go.GraphObject.make;
    return $(go.Group, "Vertical",
        {
            contextMenu: makeContextMenu(),
            doubleClick: function (e) {
                if (e.diagram.floorplanUI) e.diagram.floorplanUI.hideShow("selectionInfoWindow");
            },
            toolTip: makeGroupToolTip()
        },
        new go.Binding("location", "loc"),
        $(go.Panel, "Auto",
            $(go.Shape, "RoundedRectangle", { fill: "rgba(128,128,128,0.15)", stroke: 'rgba(128, 128, 128, .05)', name: 'SHAPE', strokeCap: 'square' },
                new go.Binding("fill", "isSelected", function (s, obj) {
                    return s ? "rgba(128, 128, 128, .15)" : "rgba(128, 128, 128, 0.10)";
                }).ofObject()
            ),
            $(go.Placeholder, { padding: 5 })  // extra padding around group members
        )
    )
}

/*
* Dependencies for Angle Nodes:
* Make Arc
*/

// Return arc geometry for Angle Nodes
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

/*
* Dependencies for Dimension Links
* Make Point Node
*/

// Return a Point Node (used for Dimension Links)
function makePointNode() {
    var $ = go.GraphObject.make
    return $(go.Node, "Position", new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify));
}

/*
* Dynamically appearing parts:
* Angle Node, Dimension Link
*/

// Return an Angle Node (for each angle ndeeded in the diagram, one angle node is made)
function makeAngleNode() {
    var $ = go.GraphObject.make;
    return $(go.Node, "Spot",
        { locationSpot: go.Spot.Center, locationObjectName: "SHAPE", selectionAdorned: false },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, "Circle", // placed where walls intersect, is invisible
            { name: "SHAPE", height: 0, width: 0 }),
        $(go.Shape, // arc
            { strokeWidth: 1.5, fill: null },
            new go.Binding("geometry", "", makeArc).ofObject(),
            new go.Binding("stroke", "sweep", function (sweep) {
                return (sweep % 45 < 1 || sweep % 45 > 44) ? "dodgerblue" : "lightblue";
            })),
        // Arc label panel
        $(go.Panel, "Auto",
            { name: "ARCLABEL" },
            // position the label in the center of the arc
            new go.Binding("alignment", "sweep", function (sweep, panel) {
                var rad = Math.min(30, panel.part.data.maxRadius);
                var angle = panel.part.data.angle;
                var cntr = new go.Point(rad, 0).rotate(angle + sweep / 2);
                return new go.Spot(0.5, 0.5, cntr.x, cntr.y);
            }),
            // rectangle containing angle text
            $(go.Shape,
                { fill: "white" },
                new go.Binding("stroke", "sweep", function (sweep) {
                    return (sweep % 45 < 1 || sweep % 45 > 44) ? "dodgerblue" : "lightblue";
                })),
            // angle text
            $(go.TextBlock,
                { font: "7pt sans-serif", margin: 2 },
                new go.Binding("text", "sweep", function (sweep) {
                    return sweep.toFixed(2) + String.fromCharCode(176);
                }))
        )
    );
}

// Returns a Dimension Link
function makeDimensionLink() {
    var $ = go.GraphObject.make
    return $(go.Link,
        // link itself
        $(go.Shape,
            { stroke: "gray", strokeWidth: 2, name: 'SHAPE' }),
        // to arrow shape
        $(go.Shape,
            { toArrow: "OpenTriangle", stroke: "gray", strokeWidth: 2 }),
        $(go.Shape,
            // from arrow shape
            { fromArrow: "BackwardOpenTriangle", stroke: "gray", strokeWidth: 2 }),
        // dimension link text
        $(go.TextBlock,
            { text: 'sometext', segmentOffset: new go.Point(0, -10), font: "13px sans-serif" },
            new go.Binding("text", "", function (link) {
                var floorplan = link.diagram;
                if (floorplan) {
                    var fromPtNode = null; var toPtNode = null;
                    floorplan.pointNodes.iterator.each(function (node) {
                        if (node.data.key === link.data.from) fromPtNode = node;
                        if (node.data.key === link.data.to) toPtNode = node;
                    });
                    if (fromPtNode !== null) {
                        var fromPt = fromPtNode.location;
                        var toPt = toPtNode.location;
                        return floorplan.convertPixelsToUnits(Math.sqrt(fromPt.distanceSquaredPoint(toPt))).toFixed(2) + floorplan.model.modelData.unitsAbbreviation;
                    } return null;
                } return null;
            }).ofObject(),
            // bind angle of textblock to angle of link -- always make text rightside up and readable
            new go.Binding("angle", "angle", function (angle, link) {
                if (angle > 90 && angle < 270) return (angle + 180) % 360;
                return angle;
            }),
            // default poisiton text above / below dimension link based on angle
            new go.Binding("segmentOffset", "angle", function (angle, textblock) {
                var floorplan = textblock.part.diagram;
                if (floorplan) {
                    var wall = floorplan.findPartForKey(textblock.part.data.wall);
                    if (wall.rotateObject.angle > 135 && wall.rotateObject.angle < 315) return new go.Point(0, 10);
                    return new go.Point(0, -10);
                } return new go.Point(0, 0);
            }).ofObject(),
            // scale font size according to the length of the link
            new go.Binding("font", "", function (link) {
                var floorplan = link.diagram;
                var fromPtNode = null; var toPtNode = null;
                floorplan.pointNodes.iterator.each(function (node) {
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