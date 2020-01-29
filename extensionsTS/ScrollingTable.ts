/*
*  Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved.
*/

/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/

import * as go from '../release/go.js';

// A "ScrollingTable" Panel

// This also defines an "AutoRepeatButton" Panel,
// which is used by the scrollbar in the "ScrollingTable" Panel.

// This defines a custom "Button" that automatically repeats its click
// action when the user holds down the mouse.
go.GraphObject.defineBuilder('AutoRepeatButton', function(args) {
  const $ = go.GraphObject.make;
  // some internal helper functions for auto-repeating
  function delayClicking(e: go.InputEvent, obj: any) {
    endClicking(e, obj);
    if (obj.click) {
      obj._timer =
        setTimeout(function() { repeatClicking(e, obj); },
          500);  // wait 0.5 seconds before starting clicks
    }
  }
  function repeatClicking(e: go.InputEvent, obj: any) {
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
  function endClicking(e: go.InputEvent, obj: any) {
    if (obj._timer) {
      clearTimeout(obj._timer);
      obj._timer = undefined;
    }
  }

  return $('Button',
    { actionDown: delayClicking, actionUp: endClicking });
});

// Create a scrolling Table Panel, whose name is given as the optional first argument.
// If not given the name defaults to "TABLE".
// Example use:
//   $("ScrollingTable", "TABLE",
//     new go.Binding("TABLE.itemArray", "someArrayProperty"),
//     ...)
// Note that if you have more than one of these in a Part,
// you'll want to make sure each one has a unique name.
go.GraphObject.defineBuilder('ScrollingTable', function(args) {
  const $ = go.GraphObject.make;
  const tablename = go.GraphObject.takeBuilderArgument(args, 'TABLE');

  // an internal helper function for actually performing a scrolling operation
  function incrTableIndex(obj: go.GraphObject, i: number) {
    const diagram = obj.diagram;
    if (!obj.panel || !obj.panel.panel || !obj.panel.panel.panel) return;
    const table = obj.panel.panel.panel.findObject(tablename) as go.Panel;
    if (i === +Infinity || i === -Infinity) {  // page up or down
      const tabh = table.actualBounds.height;
      const rowh = table.elt(table.topIndex).actualBounds.height;  // assume each row has same height?
      if (i === +Infinity) {
        i = Math.max(1, Math.ceil(tabh / rowh) - 1);
      } else {
        i = -Math.max(1, Math.ceil(tabh / rowh) - 1);
      }
    }
    let idx = table.topIndex + i;
    if (idx < 0) idx = 0;
    else if (idx >= table.rowCount - 1) idx = table.rowCount - 1;
    if (table.topIndex !== idx) {
      if (diagram !== null) diagram.startTransaction('scroll');
      table.topIndex = idx;
      const node = table.part;  // may need to reroute links if the table contains any ports
      if (node instanceof go.Node) node.invalidateConnectedLinks();
      updateScrollBar(table);
      if (diagram !== null) diagram.commitTransaction('scroll');
    }
  }

  function updateScrollBar(table: go.Panel) {
    if (table.panel === null) return;
    const bar = table.panel.elt(1) as go.Node;  // the scrollbar is a sibling of the table
    if (!bar) return;
    const idx = table.topIndex;

    const up = bar.findObject('UP');
    if (up) up.opacity = (idx > 0) ? 1.0 : 0.3;

    const down = bar.findObject('DOWN');
    if (down) down.opacity = (idx < table.rowCount - 1) ? 1.0 : 0.3;

    const tabh = bar.actualBounds.height;
    let rowh = table.elt(idx).actualBounds.height;  // ?? assume each row has same height?
    if (rowh === 0 && idx < table.rowCount - 2) rowh = table.elt(idx + 1).actualBounds.height;
    const numVisibleRows = Math.max(1, Math.ceil(tabh / rowh) - 1);
    const needed = idx > 0 || idx + numVisibleRows <= table.rowCount;
    bar.opacity = needed ? 1.0 : 0.0;
  }

  return $(go.Panel, 'Table',
    {
      _updateScrollBar: updateScrollBar
    },
    // this actually holds the item elements
    $(go.Panel, 'Table',
      {
        name: tablename,
        column: 0,
        stretch: go.GraphObject.Fill,
        background: 'whitesmoke',
        rowSizing: go.RowColumnDefinition.None,
        defaultAlignment: go.Spot.Top
      }),

    // this is the scrollbar
    $(go.RowColumnDefinition,
      { column: 1, sizing: go.RowColumnDefinition.None }),
    $(go.Panel, 'Table',
      { column: 1, stretch: go.GraphObject.Vertical, background: '#DDDDDD' },
      // the scroll up button
      $('AutoRepeatButton',
        {
          name: 'UP',
          row: 0,
          alignment: go.Spot.Top,
          'ButtonBorder.figure': 'Rectangle',
          'ButtonBorder.fill': 'lightgray',
          click: function(e: go.InputEvent, obj: go.GraphObject) { incrTableIndex(obj, -1); }
        },
        $(go.Shape, 'TriangleUp',
          { stroke: null, desiredSize: new go.Size(6, 6) })),
      // (someday implement a thumb here and support dragging to scroll)
      // the scroll down button
      $('AutoRepeatButton',
        {
          name: 'DOWN',
          row: 2,
          alignment: go.Spot.Bottom,
          'ButtonBorder.figure': 'Rectangle',
          'ButtonBorder.fill': 'lightgray',
          click: function(e: go.InputEvent, obj: go.GraphObject) { incrTableIndex(obj, +1); }
        },
        $(go.Shape, 'TriangleDown',
          { stroke: null, desiredSize: new go.Size(6, 6) }))
    )
  );
});
