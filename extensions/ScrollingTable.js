"use strict";
/*
*  Copyright (C) 1998-2015 by Northwoods Software Corporation. All Rights Reserved.
*/

// A "ScrollingTable" Panel

// This also defines an "AutoRepeatButton" Panel,
// which is used by the scrollbar in the "ScrollingTable" Panel.

var $ = go.GraphObject.make;

// This defines a custom "Button" that automatically repeats its click
// action when the user holds down the mouse.
go.GraphObject.defineBuilder("AutoRepeatButton", function(args) {

  // some internal helper functions for auto-repeating
  function delayClicking(e, obj) {
    endClicking(e, obj);
    if (obj.click) {
      obj._timer =
        setTimeout(function() { repeatClicking(e, obj); },
                   500);  // wait 0.5 seconds before starting clicks
    }
  }
  function repeatClicking(e, obj) {
    if (obj._timer) clearTimeout(obj._timer);
    if (obj.click) {
      obj._timer =
        setTimeout(function() {
                     if (obj.click) {
                       (obj.click)(e, obj);
                       repeatClicking(e, obj);
                     }
                   },
                   100);  // 0.1 seconds between clicks
    }
  }
  function endClicking(e, obj) {
    if (obj._timer) {
      clearTimeout(obj._timer);
      obj._timer = undefined;
    }
  }

  return $("Button",
           { actionDown: delayClicking, actionUp: endClicking });
});

// Set or bind "TABLE.itemArray" in this custom Table Panel:
go.GraphObject.defineBuilder("ScrollingTable", function(args) {

  // an internal helper function for actually performing a scrolling operation
  function incrTableIndex(obj, i) {
    var table = obj.panel.panel.panel.findObject("TABLE");
    if (i === +Infinity || i === -Infinity) {  // page up or down
      var tabh = table.actualBounds.height;
      var rowh = table.elt(table.topIndex).actualBounds.height;  // assume each row has same height?
      if (i === +Infinity) {
        i = Math.max(1, Math.ceil(tabh / rowh) - 1);
      } else {
        i = -Math.max(1, Math.ceil(tabh / rowh) - 1);
      }
    }
    var idx = table.topIndex + i;
    if (idx < 0) idx = 0;
    else if (idx >= table.rowCount - 1) idx = table.rowCount - 1;
    table.topIndex = idx;
    var up = table.panel.findObject("UP");
    if (up) up.visible = (idx > 0);
    var down = table.panel.findObject("DOWN");
    if (down) down.visible = (idx < table.rowCount - 1);
  }

  return $(go.Panel, "Table",

            // this actually holds the item elements
            $(go.Panel, "Table",
              {
                name: "TABLE",
                column: 0,
                stretch: go.GraphObject.Fill,
                //alignment: go.Spot.Top,
                //stretch: go.GraphObject.Horizontal,
                background: "whitesmoke"
              }),

            // this is the scrollbar
            $(go.RowColumnDefinition,
              { column: 1, sizing: go.RowColumnDefinition.None }),
            $(go.Panel, "Table",
              { column: 1, stretch: go.GraphObject.Vertical },
              // the scroll up button
              $("AutoRepeatButton",
                {
                  row: 0,
                  alignment: go.Spot.Top,
                  "ButtonBorder.figure": "Rectangle",
                  "ButtonBorder.fill": "lightgray",
                  click: function(e, obj) { incrTableIndex(obj, -1); }
                },
                $(go.Shape, "TriangleUp",
                  { stroke: null, desiredSize: new go.Size(6, 6), margin: 2 })),
              // the filler between the scroll buttons
              // (someday implement a thumb here and support dragging to scroll)
              $(go.Shape,
                { row: 1, stretch: go.GraphObject.Fill, fill: "lightgray", stroke: "gray" }),
              // the scroll down button
              $("AutoRepeatButton",
                {
                  row: 3,
                  alignment: go.Spot.Bottom,
                  "ButtonBorder.figure": "Rectangle",
                  "ButtonBorder.fill": "lightgray",
                  click: function(e, obj) { incrTableIndex(obj, +1); }
                },
                $(go.Shape, "TriangleDown",
                  { stroke: null, desiredSize: new go.Size(6, 6), margin: 2 }))
            )
         );
});
