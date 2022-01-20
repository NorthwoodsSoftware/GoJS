'use strict';
/*
*  Copyright (C) 1998-2022 by Northwoods Software Corporation. All Rights Reserved.
*/

// These are the definitions for all of the predefined buttons.
// You do not need to load this file in order to use buttons.

// A 'Button' is a Panel that has a Shape surrounding some content
// and that has mouseEnter/mouseLeave behavior to highlight the button.
// The content of the button, whether a TextBlock or a Picture or a complicated Panel,
// must be supplied by the caller.
// The caller must also provide a click event handler.

// Typical usage:
//    $('Button',
//      $(go.TextBlock, 'Click me!'),  // the content is just the text label
//      { click: function(e, obj) { alert('I was clicked'); } }
//    )

// Note that a button click event handler is not invoked upon a click if isEnabledObject() returns false.

go.GraphObject.defineBuilder('Button', function (args) {
  // default colors for 'Button' shape
  var buttonFillNormal = '#F5F5F5';
  var buttonStrokeNormal = '#BDBDBD';
  var buttonFillOver = '#E0E0E0';
  var buttonStrokeOver = '#9E9E9E';
  var buttonFillPressed = '#BDBDBD'; // set to null for no button pressed effects
  var buttonStrokePressed = '#9E9E9E';
  var buttonFillDisabled = '#E5E5E5';

  // padding inside the ButtonBorder to match sizing from previous versions
  var paddingHorizontal = 2.76142374915397;
  var paddingVertical = 2.761423749153969;

  var button = /** @type {Panel} */ (
    go.GraphObject.make(go.Panel, 'Auto',
      {
        isActionable: true,  // needed so that the ActionTool intercepts mouse events
        enabledChanged: function (btn, enabled) {
          var shape = btn.findObject('ButtonBorder');
          if (shape !== null) {
            shape.fill = enabled ? btn['_buttonFillNormal'] : btn['_buttonFillDisabled'];
          }
        },
        cursor: 'pointer',
        // save these values for the mouseEnter and mouseLeave event handlers
        '_buttonFillNormal': buttonFillNormal,
        '_buttonStrokeNormal': buttonStrokeNormal,
        '_buttonFillOver': buttonFillOver,
        '_buttonStrokeOver': buttonStrokeOver,
        '_buttonFillPressed': buttonFillPressed,
        '_buttonStrokePressed': buttonStrokePressed,
        '_buttonFillDisabled': buttonFillDisabled
      },
      go.GraphObject.make(go.Shape,  // the border
        {
          name: 'ButtonBorder',
          figure: 'RoundedRectangle',
          spot1: new go.Spot(0, 0, paddingHorizontal, paddingVertical),
          spot2: new go.Spot(1, 1, -paddingHorizontal, -paddingVertical),
          parameter1: 2,
          parameter2: 2,
          fill: buttonFillNormal,
          stroke: buttonStrokeNormal
        }
      )
    )
  );

  // There's no GraphObject inside the button shape -- it must be added as part of the button definition.
  // This way the object could be a TextBlock or a Shape or a Picture or arbitrarily complex Panel.

  // mouse-over behavior
  button.mouseEnter = function (e, btn, prev) {
    if (!btn.isEnabledObject()) return;
    var shape = btn.findObject('ButtonBorder');  // the border Shape
    if (shape instanceof go.Shape) {
      var brush = btn['_buttonFillOver'];
      btn['_buttonFillNormal'] = shape.fill;
      shape.fill = brush;
      brush = btn['_buttonStrokeOver'];
      btn['_buttonStrokeNormal'] = shape.stroke;
      shape.stroke = brush;
    }
  };

  button.mouseLeave = function (e, btn, prev) {
    if (!btn.isEnabledObject()) return;
    var shape = btn.findObject('ButtonBorder');  // the border Shape
    if (shape instanceof go.Shape) {
      shape.fill = btn['_buttonFillNormal'];
      shape.stroke = btn['_buttonStrokeNormal'];
    }
  };

  // mousedown/mouseup behavior
  button.actionDown = function (e, btn) {
    if (!btn.isEnabledObject()) return;
    if (btn['_buttonFillPressed'] === null) return;
    if (e.button !== 0) return;
    var shape = btn.findObject('ButtonBorder');  // the border Shape
    if (shape instanceof go.Shape) {
      var diagram = e.diagram;
      var oldskip = diagram.skipsUndoManager;
      diagram.skipsUndoManager = true;
      var brush = btn['_buttonFillPressed'];
      btn['_buttonFillOver'] = shape.fill;
      shape.fill = brush;
      brush = btn['_buttonStrokePressed'];
      btn['_buttonStrokeOver'] = shape.stroke;
      shape.stroke = brush;
      diagram.skipsUndoManager = oldskip;
    }
  };

  button.actionUp = function (e, btn) {
    if (!btn.isEnabledObject()) return;
    if (btn['_buttonFillPressed'] === null) return;
    if (e.button !== 0) return;
    var shape = btn.findObject('ButtonBorder');  // the border Shape
    if (shape instanceof go.Shape) {
      var diagram = e.diagram;
      var oldskip = diagram.skipsUndoManager;
      diagram.skipsUndoManager = true;
      if (overButton(e, btn)) {
        shape.fill = btn['_buttonFillOver'];
        shape.stroke = btn['_buttonStrokeOver'];
      } else {
        shape.fill = btn['_buttonFillNormal'];
        shape.stroke = btn['_buttonStrokeNormal'];
      }
      diagram.skipsUndoManager = oldskip;
    }
  };

  button.actionCancel = function (e, btn) {
    if (!btn.isEnabledObject()) return;
    if (btn['_buttonFillPressed'] === null) return;
    var shape = btn.findObject('ButtonBorder');  // the border Shape
    if (shape instanceof go.Shape) {
      var diagram = e.diagram;
      var oldskip = diagram.skipsUndoManager;
      diagram.skipsUndoManager = true;
      if (overButton(e, btn)) {
        shape.fill = btn['_buttonFillOver'];
        shape.stroke = btn['_buttonStrokeOver'];
      } else {
        shape.fill = btn['_buttonFillNormal'];
        shape.stroke = btn['_buttonStrokeNormal'];
      }
      diagram.skipsUndoManager = oldskip;
    }
  };

  button.actionMove = function (e, btn) {
    if (!btn.isEnabledObject()) return;
    if (btn['_buttonFillPressed'] === null) return;
    var diagram = e.diagram;
    if (diagram.firstInput.button !== 0) return;
    diagram.currentTool.standardMouseOver();
    if (overButton(e, btn)) {
      var shape = btn.findObject('ButtonBorder');
      if (shape instanceof go.Shape) {
        var oldskip = diagram.skipsUndoManager;
        diagram.skipsUndoManager = true;
        var brush = btn['_buttonFillPressed'];
        if (shape.fill !== brush) shape.fill = brush;
        brush = btn['_buttonStrokePressed'];
        if (shape.stroke !== brush) shape.stroke = brush;
        diagram.skipsUndoManager = oldskip;
      }
    }
  };

  function overButton(e, btn) {
    var over = e.diagram.findObjectAt(
      e.documentPoint,
      function (x) {
        while (x.panel !== null) {
          if (x.isActionable) return x;
          x = x.panel;
        }
        return x;
      },
      function (x) { return x === btn; }
    );
    return over !== null;
  }

  return button;
});


// This is a complete Button that you can have in a Node template
// to allow the user to collapse/expand the subtree beginning at that Node.

// Typical usage within a Node template:
//    $('TreeExpanderButton')

go.GraphObject.defineBuilder('TreeExpanderButton', function (args) {
  var button = /** @type {Panel} */ (
    go.GraphObject.make('Button',
      { // set these values for the isTreeExpanded binding conversion
        '_treeExpandedFigure': 'MinusLine',
        '_treeCollapsedFigure': 'PlusLine'
      },
      go.GraphObject.make(go.Shape,  // the icon
        {
          name: 'ButtonIcon',
          figure: 'MinusLine',  // default value for isTreeExpanded is true
          stroke: '#424242',
          strokeWidth: 2,
          desiredSize: new go.Size(8, 8)
        },
        // bind the Shape.figure to the Node.isTreeExpanded value using this converter:
        new go.Binding('figure', 'isTreeExpanded',
          function (exp, shape) {
            var but = shape.panel;
            return exp ? but['_treeExpandedFigure'] : but['_treeCollapsedFigure'];
          }
        ).ofObject()
      ),
      // assume initially not visible because there are no links coming out
      { visible: false },
      // bind the button visibility to whether it's not a leaf node
      new go.Binding('visible', 'isTreeLeaf',
        function (leaf) { return !leaf; }
      ).ofObject()
    )
  );

  // tree expand/collapse behavior
  button.click = function (e, btn) {
    var node = btn.part;
    if (node instanceof go.Adornment) node = node.adornedPart;
    if (!(node instanceof go.Node)) return;
    var diagram = node.diagram;
    if (diagram === null) return;
    var cmd = diagram.commandHandler;
    if (node.isTreeExpanded) {
      if (!cmd.canCollapseTree(node)) return;
    } else {
      if (!cmd.canExpandTree(node)) return;
    }
    e.handled = true;
    if (node.isTreeExpanded) {
      cmd.collapseTree(node);
    } else {
      cmd.expandTree(node);
    }
  };

  return button;
});


// This is a complete Button that you can have in a Group template
// to allow the user to collapse/expand the subgraph that the Group holds.

// Typical usage within a Group template:
//    $('SubGraphExpanderButton')

go.GraphObject.defineBuilder('SubGraphExpanderButton', function (args) {
  var button = /** @type {Panel} */ (
    go.GraphObject.make('Button',
      { // set these values for the isSubGraphExpanded binding conversion
        '_subGraphExpandedFigure': 'MinusLine',
        '_subGraphCollapsedFigure': 'PlusLine'
      },
      go.GraphObject.make(go.Shape,  // the icon
        {
          name: 'ButtonIcon',
          figure: 'MinusLine',  // default value for isSubGraphExpanded is true
          stroke: '#424242',
          strokeWidth: 2,
          desiredSize: new go.Size(8, 8)
        },
        // bind the Shape.figure to the Group.isSubGraphExpanded value using this converter:
        new go.Binding('figure', 'isSubGraphExpanded',
          function (exp, shape) {
            var but = shape.panel;
            return exp ? but['_subGraphExpandedFigure'] : but['_subGraphCollapsedFigure'];
          }
        ).ofObject()
      )
    )
  );

  // subgraph expand/collapse behavior
  button.click = function (e, btn) {
    var group = btn.part;
    if (group instanceof go.Adornment) group = group.adornedPart;
    if (!(group instanceof go.Group)) return;
    var diagram = group.diagram;
    if (diagram === null) return;
    var cmd = diagram.commandHandler;
    if (group.isSubGraphExpanded) {
      if (!cmd.canCollapseSubGraph(group)) return;
    } else {
      if (!cmd.canExpandSubGraph(group)) return;
    }
    e.handled = true;
    if (group.isSubGraphExpanded) {
      cmd.collapseSubGraph(group);
    } else {
      cmd.expandSubGraph(group);
    }
  };

  return button;
});


// This is just an "Auto" Adornment that can hold some contents within a light gray, shadowed box.

// Typical usage:
//   toolTip:
//     $("ToolTip",
//       $(go.TextBlock, . . .)
//     )
go.GraphObject.defineBuilder('ToolTip', function (args) {
  var ad = go.GraphObject.make(go.Adornment, 'Auto',
    {
      isShadowed: true,
      shadowColor: 'rgba(0, 0, 0, .4)',
      shadowOffset: new go.Point(0, 3),
      shadowBlur: 5
    },
    go.GraphObject.make(go.Shape,
      {
        name: 'Border',
        figure: 'RoundedRectangle',
        parameter1: 1,
        parameter2: 1,
        fill: '#F5F5F5',
        stroke: '#F0F0F0',
        spot1: new go.Spot(0, 0, 4, 6),
        spot2: new go.Spot(1, 1, -4, -4)
      }
    )
  );
  return ad;
});


// This is just a "Vertical" Adornment that can hold some "ContextMenuButton"s.

// Typical usage:
//   contextMenu:
//     $("ContextMenu",
//       $("ContextMenuButton",
//         $(go.TextBlock, . . .),
//         { click: . . .}
//       ),
//       $("ContextMenuButton", . . .)
//     )
go.GraphObject.defineBuilder('ContextMenu', function (args) {
  var ad = go.GraphObject.make(go.Adornment, 'Vertical',
    {
      background: '#F5F5F5',
      isShadowed: true,
      shadowColor: 'rgba(0, 0, 0, .4)',
      shadowOffset: new go.Point(0, 3),
      shadowBlur: 5
    },
    // don't set the background if the ContextMenu is adorning something and there's a Placeholder
    new go.Binding('background', '', function (obj) {
      var part = obj.adornedPart;
      if (part !== null && obj.placeholder !== null) return null;
      return '#F5F5F5';
    })
  );
  return ad;
});


// This just holds the 'ButtonBorder' Shape that acts as the border
// around the button contents, which must be supplied by the caller.
// The button contents are usually a TextBlock or Panel consisting of a Shape and a TextBlock.

// Typical usage within an Adornment that is either a GraphObject.contextMenu or a Diagram.contextMenu:
// $('ContextMenuButton',
//   $(go.TextBlock, text),
//   { click: function(e, obj) { alert('Command for ' + obj.part.adornedPart); } },
//   new go.Binding('visible', '', function(data) { return ...OK to perform Command...; })
// )

go.GraphObject.defineBuilder('ContextMenuButton', function (args) {
  var button = /** @type {Panel} */ (go.GraphObject.make('Button'));
  button.stretch = go.GraphObject.Horizontal;
  var border = button.findObject('ButtonBorder');
  if (border instanceof go.Shape) {
    border.figure = 'Rectangle';
    border.spot1 = new go.Spot(0, 0, 2, 3);
    border.spot2 = new go.Spot(1, 1, -2, -2);
  }
  return button;
});


// This button is used to toggle the visibility of a GraphObject named
// by the second argument to GraphObject.make.  If the second argument is not present
// or if it is not a string, this assumes that the element name is 'COLLAPSIBLE'.
// You can only control the visibility of one element in a Part at a time,
// although that element might be an arbitrarily complex Panel.

// Typical usage:
//   $(go.Panel, . . .,
//     $('PanelExpanderButton', 'COLLAPSIBLE'),
//     . . .,
//       $(go.Panel, . . .,
//         { name: 'COLLAPSIBLE' },
//         . . . stuff to be hidden or shown as the PanelExpanderButton is clicked . . .
//       ),
//     . . .
//   )

go.GraphObject.defineBuilder('PanelExpanderButton', function (args) {
  var eltname = /** @type {string} */ (go.GraphObject.takeBuilderArgument(args, 'COLLAPSIBLE'));

  var button = /** @type {Panel} */ (
    go.GraphObject.make('Button',
      { // set these values for the button's look
        '_buttonExpandedFigure': 'M0 0 M0 6 L4 2 8 6 M8 8',
        '_buttonCollapsedFigure': 'M0 0 M0 2 L4 6 8 2 M8 8',
        '_buttonFillNormal': 'rgba(0, 0, 0, 0)',
        '_buttonStrokeNormal': null,
        '_buttonFillOver': 'rgba(0, 0, 0, .2)',
        '_buttonStrokeOver': null,
        '_buttonFillPressed': 'rgba(0, 0, 0, .4)',
        '_buttonStrokePressed': null
      },
      go.GraphObject.make(go.Shape,
        { name: 'ButtonIcon', strokeWidth: 2 },
        new go.Binding('geometryString', 'visible',
          function (vis) { return vis ? button['_buttonExpandedFigure'] : button['_buttonCollapsedFigure']; }
        ).ofObject(eltname)
      )
    )
  );

  var border = button.findObject('ButtonBorder');
  if (border instanceof go.Shape) {
    border.stroke = null;
    border.fill = 'rgba(0, 0, 0, 0)';
  }

  button.click = function (e, btn) {
    var diagram = btn.diagram;
    if (diagram === null) return;
    if (diagram.isReadOnly) return;
    var elt = btn.findBindingPanel();
    if (elt === null) elt = btn.part;
    if (elt !== null) {
      var pan = elt.findObject(eltname);
      if (pan !== null) {
        e.handled = true;
        diagram.startTransaction('Collapse/Expand Panel');
        pan.visible = !pan.visible;
        diagram.commitTransaction('Collapse/Expand Panel');
      }
    }
  };

  return button;
});


// Define a common checkbox button; the first argument is the name of the data property
// to which the state of this checkbox is data bound.  If the first argument is not a string,
// it raises an error.  If no data binding of the checked state is desired,
// pass an empty string as the first argument.

// Examples:
// $('CheckBoxButton', 'dataPropertyName', ...)
// or:
// $('CheckBoxButton', '', { '_doClick': function(e, obj) { alert('clicked!'); } })

go.GraphObject.defineBuilder('CheckBoxButton', function (args) {
  // process the one required string argument for this kind of button
  var propname = /** @type {string} */ (go.GraphObject.takeBuilderArgument(args));

  var button = /** @type {Panel} */ (
    go.GraphObject.make('Button',
      { desiredSize: new go.Size(14, 14) },
      go.GraphObject.make(go.Shape,
        {
          name: 'ButtonIcon',
          geometryString: 'M0 0 M0 8.85 L4.9 13.75 16.2 2.45 M16.2 16.2',  // a 'check' mark
          strokeWidth: 2,
          stretch: go.GraphObject.Fill,  // this Shape expands to fill the Button
          geometryStretch: go.GraphObject.Uniform,  // the check mark fills the Shape without distortion
          visible: false  // visible set to false: not checked, unless data.PROPNAME is true
        },
        // create a data Binding only if PROPNAME is supplied and not the empty string
        (propname !== '' ? new go.Binding('visible', propname).makeTwoWay() : []))
    )
  );

  button.click = function (e, btn) {
    var diagram = e.diagram;
    if (diagram === null || diagram.isReadOnly) return;
    if (propname !== '' && diagram.model.isReadOnly) return;
    e.handled = true;
    var shape = btn.findObject('ButtonIcon');
    diagram.startTransaction('checkbox');
    shape.visible = !shape.visible;  // this toggles data.checked due to TwoWay Binding
    // support extra side-effects without clobbering the click event handler:
    if (typeof btn['_doClick'] === 'function') btn['_doClick'](e, btn);
    diagram.commitTransaction('checkbox');
  };

  return button;
});


// This defines a whole check-box -- including both a 'CheckBoxButton' and whatever you want as the check box label.
// Note that mouseEnter/mouseLeave/click events apply to everything in the panel, not just in the 'CheckBoxButton'.

// Examples:
// $('CheckBox', 'aBooleanDataProperty', $(go.TextBlock, 'the checkbox label'))
// or
// $('CheckBox', 'someProperty', $(go.TextBlock, 'A choice'),
//   { '_doClick': function(e, obj) { ... perform extra side-effects ... } })

go.GraphObject.defineBuilder('CheckBox', function (args) {
  // process the one required string argument for this kind of button
  var propname = /** @type {string} */ (go.GraphObject.takeBuilderArgument(args));

  var button = /** @type {Panel} */ (
    go.GraphObject.make('CheckBoxButton', propname,  // bound to this data property
      {
        name: 'Button',
        isActionable: false, // actionable is set on the whole horizontal panel
        margin: new go.Margin(0, 1, 0, 0)
      })
  );

  var box = /** @type {Panel} */ (
    go.GraphObject.make(go.Panel, 'Horizontal',
      button,
      {
        isActionable: true,
        cursor: button.cursor,
        margin: 1,
        // transfer CheckBoxButton properties over to this new CheckBox panel
        '_buttonFillNormal': button['_buttonFillNormal'],
        '_buttonStrokeNormal': button['_buttonStrokeNormal'],
        '_buttonFillOver': button['_buttonFillOver'],
        '_buttonStrokeOver': button['_buttonStrokeOver'],
        '_buttonFillPressed': button['_buttonFillPressed'],
        '_buttonStrokePressed': button['_buttonStrokePressed'],
        '_buttonFillDisabled': button['_buttonFillDisabled'],
        mouseEnter: button.mouseEnter,
        mouseLeave: button.mouseLeave,
        actionDown: button.actionDown,
        actionUp: button.actionUp,
        actionCancel: button.actionCancel,
        actionMove: button.actionMove,
        click: button.click,
        // also save original Button behavior, for potential use in a Panel.click event handler
        '_buttonClick': button.click
      }
    )
  );
  // avoid potentially conflicting event handlers on the 'CheckBoxButton'
  button.mouseEnter = null;
  button.mouseLeave = null;
  button.actionDown = null;
  button.actionUp = null;
  button.actionCancel = null;
  button.actionMove = null;
  button.click = null;
  return box;
});
