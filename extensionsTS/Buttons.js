(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    *  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
    */
    var go = require("../release/go");
    // These are the definitions for all of the predefined buttons.
    // You do not need to load this file in order to use buttons.
    // A "Button" is a Panel that has a Shape surrounding some content
    // and that has mouseEnter/mouseLeave behavior to highlight the button.
    // The content of the button, whether a TextBlock or a Picture or a complicated Panel,
    // must be supplied by the caller.
    // The caller must also provide a click event handler.
    // Typical usage:
    //    $("Button",
    //      $(go.TextBlock, "Click me!"),  // the content is just the text label
    //      { click: function(e, obj) { alert("I was clicked"); } }
    //    )
    // Note that a button click event handler is not invoked upon a click if isEnabledObject() returns false.
    go.GraphObject.defineBuilder("Button", function (args) {
        // default brushes for "Button" shape
        var buttonFillNormal = go.GraphObject.make(go.Brush, "Linear", { 0: "white", 1: "lightgray" });
        var buttonStrokeNormal = "gray";
        var buttonFillOver = go.GraphObject.make(go.Brush, "Linear", { 0: "white", 1: "dodgerblue" });
        var buttonStrokeOver = "blue";
        var buttonFillDisabled = "darkgray";
        // offset identical to that needed to match the original RoundedRectangle figure, to keep the same size
        var offset = 2.761423749153968;
        var button = /** @type {Panel} */ (go.GraphObject.make(go.Panel, "Auto", {
            isActionable: true,
            enabledChanged: function (button, enabled) {
                var shape = button.findObject("ButtonBorder");
                if (shape !== null) {
                    shape.fill = enabled ? button["_buttonFillNormal"] : button["_buttonFillDisabled"];
                }
            },
            // save these values for the mouseEnter and mouseLeave event handlers
            "_buttonFillNormal": buttonFillNormal,
            "_buttonStrokeNormal": buttonStrokeNormal,
            "_buttonFillOver": buttonFillOver,
            "_buttonStrokeOver": buttonStrokeOver,
            "_buttonFillDisabled": buttonFillDisabled
        }, go.GraphObject.make(go.Shape, // the border
        {
            name: "ButtonBorder",
            figure: "Rectangle",
            spot1: new go.Spot(0, 0, offset, offset),
            spot2: new go.Spot(1, 1, -offset, -offset),
            fill: buttonFillNormal,
            stroke: buttonStrokeNormal
        })));
        // There's no GraphObject inside the button shape -- it must be added as part of the button definition.
        // This way the object could be a TextBlock or a Shape or a Picture or arbitrarily complex Panel.
        // mouse-over behavior
        button.mouseEnter = function (e, button, prev) {
            var shape = button.findObject("ButtonBorder"); // the border Shape
            if (shape instanceof go.Shape) {
                var brush = button["_buttonFillOver"];
                button["_buttonFillNormal"] = shape.fill;
                shape.fill = brush;
                brush = button["_buttonStrokeOver"];
                button["_buttonStrokeNormal"] = shape.stroke;
                shape.stroke = brush;
            }
        };
        button.mouseLeave = function (e, button, prev) {
            var shape = button.findObject("ButtonBorder"); // the border Shape
            if (shape instanceof go.Shape) {
                shape.fill = button["_buttonFillNormal"];
                shape.stroke = button["_buttonStrokeNormal"];
            }
        };
        return button;
    });
    // This is a complete Button that you can have in a Node template
    // to allow the user to collapse/expand the subtree beginning at that Node.
    // Typical usage within a Node template:
    //    $("TreeExpanderButton")
    go.GraphObject.defineBuilder("TreeExpanderButton", function (args) {
        var button = /** @type {Panel} */ (go.GraphObject.make("Button", {
            "_treeExpandedFigure": "MinusLine",
            "_treeCollapsedFigure": "PlusLine"
        }, go.GraphObject.make(go.Shape, // the icon
        {
            name: "ButtonIcon",
            figure: "MinusLine",
            desiredSize: new go.Size(6, 6)
        }, 
        // bind the Shape.figure to the Node.isTreeExpanded value using this converter:
        new go.Binding("figure", "isTreeExpanded", function (exp, shape) {
            var but = shape.panel;
            return exp ? but["_treeExpandedFigure"] : but["_treeCollapsedFigure"];
        })
            .ofObject()), 
        // assume initially not visible because there are no links coming out
        { visible: false }, 
        // bind the button visibility to whether it's not a leaf node
        new go.Binding("visible", "isTreeLeaf", function (leaf) { return !leaf; })
            .ofObject()));
        // tree expand/collapse behavior
        button.click = function (e, button) {
            var node = button.part;
            if (node instanceof go.Adornment)
                node = node.adornedPart;
            if (!(node instanceof go.Node))
                return;
            var diagram = node.diagram;
            if (diagram === null)
                return;
            var cmd = diagram.commandHandler;
            if (node.isTreeExpanded) {
                if (!cmd.canCollapseTree(node))
                    return;
            }
            else {
                if (!cmd.canExpandTree(node))
                    return;
            }
            e.handled = true;
            if (node.isTreeExpanded) {
                cmd.collapseTree(node);
            }
            else {
                cmd.expandTree(node);
            }
        };
        return button;
    });
    // This is a complete Button that you can have in a Group template
    // to allow the user to collapse/expand the subgraph that the Group holds.
    // Typical usage within a Group template:
    //    $("SubGraphExpanderButton")
    go.GraphObject.defineBuilder("SubGraphExpanderButton", function (args) {
        var button = /** @type {Panel} */ (go.GraphObject.make("Button", {
            "_subGraphExpandedFigure": "MinusLine",
            "_subGraphCollapsedFigure": "PlusLine"
        }, go.GraphObject.make(go.Shape, // the icon
        {
            name: "ButtonIcon",
            figure: "MinusLine",
            desiredSize: new go.Size(6, 6)
        }, 
        // bind the Shape.figure to the Group.isSubGraphExpanded value using this converter:
        new go.Binding("figure", "isSubGraphExpanded", function (exp, shape) {
            var but = shape.panel;
            return exp ? but["_subGraphExpandedFigure"] : but["_subGraphCollapsedFigure"];
        })
            .ofObject())));
        // subgraph expand/collapse behavior
        button.click = function (e, button) {
            var group = button.part;
            if (group instanceof go.Adornment)
                group = group.adornedPart;
            if (!(group instanceof go.Group))
                return;
            var diagram = group.diagram;
            if (diagram === null)
                return;
            var cmd = diagram.commandHandler;
            if (group.isSubGraphExpanded) {
                if (!cmd.canCollapseSubGraph(group))
                    return;
            }
            else {
                if (!cmd.canExpandSubGraph(group))
                    return;
            }
            e.handled = true;
            if (group.isSubGraphExpanded) {
                cmd.collapseSubGraph(group);
            }
            else {
                cmd.expandSubGraph(group);
            }
        };
        return button;
    });
    // This is just an "Auto" Adornment that can hold some contents within a light yellow box.
    // Typical usage:
    //   toolTip:
    //     $("ToolTip",
    //       $(go.TextBlock, . . .)
    //     )
    go.GraphObject.defineBuilder('ToolTip', function (args) {
        var ad = new go.Adornment(go.Panel.Auto);
        var border = new go.Shape();
        border.name = 'Border';
        border.fill = '#FFFFE0';
        border.stroke = '#CCCCCC';
        ad.add(border);
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
        var ad = new go.Adornment(go.Panel.Vertical);
        return ad;
    });
    // This just holds the "ButtonBorder" Shape that acts as the border
    // around the button contents, which must be supplied by the caller.
    // The button contents are usually a TextBlock or Panel consisting of a Shape and a TextBlock.
    // Typical usage within an Adornment that is either a GraphObject.contextMenu or a Diagram.contextMenu:
    // $("ContextMenuButton",
    //   $(go.TextBlock, text),
    //   { click: function(e, obj) { alert("Command for " + obj.part.adornedPart); } },
    //   new go.Binding("visible", "", function(data) { return ...OK to perform Command...; })
    // )
    go.GraphObject.defineBuilder("ContextMenuButton", function (args) {
        var button = /** @type {Panel} */ (go.GraphObject.make("Button"));
        button.stretch = go.GraphObject.Horizontal;
        var border = button.findObject("ButtonBorder");
        if (border instanceof go.Shape) {
            border.figure = "Rectangle";
            border.spot1 = new go.Spot(0, 0, 2, 3);
            border.spot2 = new go.Spot(1, 1, -2, -2);
        }
        return button;
    });
    // This button is used to toggle the visibility of a GraphObject named
    // by the second argument to GraphObject.make.  If the second argument is not present
    // or if it is not a string, this assumes that the element name is "COLLAPSIBLE".
    // You can only control the visibility of one element in a Part at a time,
    // although that element might be an arbitrarily complex Panel.
    // Typical usage:
    //   $(go.Panel, . . .,
    //     $("PanelExpanderButton", "COLLAPSIBLE"),
    //     . . .,
    //       $(go.Panel, . . .,
    //         { name: "COLLAPSIBLE" },
    //         . . . stuff to be hidden or shown as the PanelExpanderButton is clicked . . .
    //       ),
    //     . . .
    //   )
    go.GraphObject.defineBuilder("PanelExpanderButton", function (args) {
        var eltname = (go.GraphObject.takeBuilderArgument(args, "COLLAPSIBLE"));
        var button = (go.GraphObject.make("Button", {
            "_buttonExpandedFigure": "TriangleUp",
            "_buttonCollapsedFigure": "TriangleDown"
        }, go.GraphObject.make(go.Shape, "TriangleUp", { name: "ButtonIcon", desiredSize: new go.Size(6, 4) }, new go.Binding("figure", "visible", function (vis) { return vis ? button["_buttonExpandedFigure"] : button["_buttonCollapsedFigure"]; })
            .ofObject(eltname))));
        var border = button.findObject("ButtonBorder");
        if (border instanceof go.Shape) {
            border.stroke = null;
            border.fill = "transparent";
        }
        button.click = function (e, button) {
            var diagram = button.diagram;
            if (diagram === null)
                return;
            if (diagram.isReadOnly)
                return;
            var elt = button.findTemplateBinder();
            if (elt === null)
                elt = button.part;
            if (elt !== null) {
                var pan = elt.findObject(eltname);
                if (pan !== null) {
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
    // $("CheckBoxButton", "dataPropertyName", ...)
    // or:
    // $("CheckBoxButton", "", { "_doClick": function(e, obj) { alert("clicked!"); } })
    go.GraphObject.defineBuilder("CheckBoxButton", function (args) {
        // process the one required string argument for this kind of button
        var propname = /** @type {string} */ (go.GraphObject.takeBuilderArgument(args));
        var button = /** @type {Panel} */ (go.GraphObject.make("Button", {
            "ButtonBorder.fill": "white",
            "ButtonBorder.stroke": "gray",
            width: 14,
            height: 14
        }, go.GraphObject.make(go.Shape, {
            name: "ButtonIcon",
            geometryString: "M0 4 L3 9 9 0",
            strokeWidth: 2,
            stretch: go.GraphObject.Fill,
            geometryStretch: go.GraphObject.Uniform,
            visible: false // visible set to false: not checked, unless data.PROPNAME is true
        }, 
        // create a data Binding only if PROPNAME is supplied and not the empty string
        (propname !== "" ? new go.Binding("visible", propname).makeTwoWay() : []))));
        button.click = function (e, button) {
            var diagram = e.diagram;
            if (diagram === null || diagram.isReadOnly)
                return;
            if (propname !== "" && diagram.model.isReadOnly)
                return;
            e.handled = true;
            var shape = button.findObject("ButtonIcon");
            diagram.startTransaction("checkbox");
            shape.visible = !shape.visible; // this toggles data.checked due to TwoWay Binding
            // support extra side-effects without clobbering the click event handler:
            if (typeof button["_doClick"] === "function")
                button["_doClick"](e, button);
            diagram.commitTransaction("checkbox");
        };
        return button;
    });
    // This defines a whole check-box -- including both a "CheckBoxButton" and whatever you want as the check box label.
    // Note that mouseEnter/mouseLeave/click events apply to everything in the panel, not just in the "CheckBoxButton".
    // Examples:
    // $("CheckBox", "aBooleanDataProperty", $(go.TextBlock, "the checkbox label"))
    // or
    // $("CheckBox", "someProperty", $(go.TextBlock, "A choice"),
    //   { "_doClick": function(e, obj) { ... perform extra side-effects ... } })
    go.GraphObject.defineBuilder("CheckBox", function (args) {
        // process the one required string argument for this kind of button
        var propname = /** @type {string} */ (go.GraphObject.takeBuilderArgument(args));
        var button = /** @type {Panel} */ (go.GraphObject.make("CheckBoxButton", propname, // bound to this data property
        {
            name: "Button",
            margin: new go.Margin(0, 1, 0, 0)
        }));
        var box = /** @type {Panel} */ (go.GraphObject.make(go.Panel, "Horizontal", button, {
            isActionable: true,
            margin: 1,
            // transfer CheckBoxButton properties over to this new CheckBox panel
            "_buttonFillNormal": button["_buttonFillNormal"],
            "_buttonStrokeNormal": button["_buttonStrokeNormal"],
            "_buttonFillOver": button["_buttonFillOver"],
            "_buttonStrokeOver": button["_buttonStrokeOver"],
            "_buttonFillDisabled": button["_buttonFillDisabled"],
            mouseEnter: button.mouseEnter,
            mouseLeave: button.mouseLeave,
            click: button.click,
            // also save original Button behavior, for potential use in a Panel.click event handler
            "_buttonClick": button.click
        }));
        // avoid potentially conflicting event handlers on the "CheckBoxButton"
        button.mouseEnter = null;
        button.mouseLeave = null;
        button.click = null;
        return box;
    });
});
