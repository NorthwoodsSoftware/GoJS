/*
 *  Copyright 1998-2025 by Northwoods Software Corporation. All Rights Reserved.
 */
/*
 * This is an extension and not part of the main GoJS library.
 * The source code for this is at extensionsJSM/Buttons.ts.
 * Note that the API for this class may change with any version, even point releases.
 * If you intend to use an extension in production, you should copy the code to your own source directory.
 * Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
 * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
 */

// These are the definitions for all of the predefined buttons.
// You do not need to load this file in order to use buttons.
// A 'Button' is a Panel that has a Shape surrounding some content
// and that has mouseEnter/mouseLeave behavior to highlight the button.
// The content of the button, whether a TextBlock or a Picture or a complicated Panel,
// must be supplied by the caller.
// The caller must also provide a click event handler.
// Typical usage:
//    go.GraphObject.build('Button',
//        { click: (e, obj) => alert('I was clicked') })
//      .add(
//        new go.TextBlock('Click me!')
//      )
// or:
//    $('Button',
//      $(go.TextBlock, 'Click me!'),  // the content is just the text label
//      { click: (e, obj) => alert('I was clicked') }
//    )
// Note that a button click event handler is not invoked upon a click if isEnabledObject() returns false.
go.GraphObject.defineBuilder('Button', (args) => {
    // default colors for 'Button' shape
    const buttonFillNormal = '#f5f5f5';
    const buttonStrokeNormal = '#737373';
    const buttonFillOver = '#d4d4d4';
    const buttonStrokeOver = '#737373';
    const buttonFillDisabled = '#a3a3a3';
    // padding inside the ButtonBorder to match sizing from previous versions
    const paddingHorizontal = 2.76142374915397;
    const paddingVertical = 2.761423749153969;
    const button = new go.Panel('Auto', {
        isActionable: true, // needed so that the ActionTool intercepts mouse events
        enabledChanged: (btn, enabled) => {
            if (btn instanceof go.Panel) {
                const shape = btn.findObject('ButtonBorder');
                if (shape !== null) {
                    if (btn['_buttonFillNormal'] === undefined)
                        btn['_buttonFillNormal'] = shape.fill;
                    if (enabled) {
                        let fnd = null;
                        if (btn.layer !== null && btn.diagram !== null && btn.isVisibleObject()) {
                            fnd = btn.layer.findObjectAt(btn.diagram.lastInput.documentPoint);
                        }
                        if (fnd === btn || (fnd !== null && fnd.isContainedBy(btn))) {
                            shape.fill = btn['_buttonFillOver'];
                        }
                        else {
                            shape.fill = btn['_buttonFillNormal'];
                        }
                    }
                    else {
                        shape.fill = btn['_buttonFillDisabled'];
                    }
                }
            }
        },
        cursor: 'pointer'
    })
        .attach({
        // save these values for the mouseEnter and mouseLeave event handlers
        '_buttonFillNormal': undefined,
        '_buttonStrokeNormal': undefined,
        '_buttonFillOver': buttonFillOver,
        '_buttonStrokeOver': buttonStrokeOver,
        '_buttonFillDisabled': buttonFillDisabled
    })
        .add(new go.Shape('RoundedRectangle', // the border
    {
        name: 'ButtonBorder',
        spot1: new go.Spot(0, 0, paddingHorizontal, paddingVertical),
        spot2: new go.Spot(1, 1, -paddingHorizontal, -paddingVertical),
        parameter1: 2,
        fill: buttonFillNormal,
        stroke: buttonStrokeNormal
    }));
    // There's no GraphObject inside the button shape -- it must be added as part of the button definition.
    // This way the object could be a TextBlock or a Shape or a Picture or arbitrarily complex Panel.
    // mouse-over behavior
    button.mouseEnter = (e, btn, prev) => {
        if (!btn.isEnabledObject())
            return;
        if (!(btn instanceof go.Panel))
            return;
        const shape = btn.findObject('ButtonBorder'); // the border Shape
        if (shape instanceof go.Shape) {
            if (btn['_buttonFillNormal'] === undefined)
                btn['_buttonFillNormal'] = shape.fill;
            shape.fill = btn['_buttonFillOver'];
            if (btn['_buttonStrokeNormal'] === undefined)
                btn['_buttonStrokeNormal'] = shape.stroke;
            shape.stroke = btn['_buttonStrokeOver'];
        }
    };
    button.mouseLeave = (e, btn, prev) => {
        if (!btn.isEnabledObject())
            return;
        if (!(btn instanceof go.Panel))
            return;
        const shape = btn.findObject('ButtonBorder'); // the border Shape
        if (shape instanceof go.Shape) {
            if (btn['_buttonFillNormal'] !== undefined)
                shape.fill = btn['_buttonFillNormal'];
            if (btn['_buttonStrokeNormal'] !== undefined)
                shape.stroke = btn['_buttonStrokeNormal'];
        }
    };
    return button;
});
// This is a complete Button that you can have in a Node template
// to allow the user to collapse/expand the subtree beginning at that Node.
// Typical usage within a Node template:
//    go.GraphObject.build('TreeExpanderButton')
go.GraphObject.defineBuilder('TreeExpanderButton', (args) => {
    const button = go.GraphObject.build('Button');
    button.attach({
        // set these values for the isTreeExpanded binding conversion
        '_treeExpandedFigure': 'MinusLine',
        '_treeCollapsedFigure': 'PlusLine',
        // assume initially not visible because there are no links coming out
        visible: false
    });
    button.add(new go.Shape('MinusLine', // default value for isTreeExpanded is true  // the icon
    {
        name: 'ButtonIcon',
        stroke: '#0a0a0a',
        strokeWidth: 2,
        desiredSize: new go.Size(8, 8)
    })
        // bind the Shape.figure to the Node.isTreeExpanded value using this converter:
        .bindObject('figure', 'isTreeExpanded', (exp, shape) => {
        const but = shape.panel;
        return exp ? but['_treeExpandedFigure'] : but['_treeCollapsedFigure'];
    }));
    // bind the button visibility to whether it's not a leaf node
    button.bindObject('visible', 'isTreeLeaf', (leaf) => !leaf);
    // tree expand/collapse behavior
    button.click = (e, btn) => {
        let node = btn.part;
        if (node instanceof go.Adornment)
            node = node.adornedPart;
        if (!(node instanceof go.Node))
            return;
        const diagram = node.diagram;
        if (diagram === null)
            return;
        const cmd = diagram.commandHandler;
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
//    go.GraphObject.build('SubGraphExpanderButton')
go.GraphObject.defineBuilder('SubGraphExpanderButton', (args) => {
    const button = go.GraphObject.build('Button');
    button.attach({
        // set these values for the isSubGraphExpanded binding conversion
        '_subGraphExpandedFigure': 'MinusLine',
        '_subGraphCollapsedFigure': 'PlusLine'
    });
    button.add(new go.Shape('MinusLine', // default value for isSubGraphExpanded is true  // the icon
    {
        name: 'ButtonIcon',
        stroke: '#0a0a0a',
        strokeWidth: 2,
        desiredSize: new go.Size(8, 8)
    })
        // bind the Shape.figure to the Group.isSubGraphExpanded value using this converter:
        .bindObject('figure', 'isSubGraphExpanded', (exp, shape) => {
        const but = shape.panel;
        return exp ? but['_subGraphExpandedFigure'] : but['_subGraphCollapsedFigure'];
    }));
    // subgraph expand/collapse behavior
    button.click = (e, btn) => {
        let group = btn.part;
        if (group instanceof go.Adornment)
            group = group.adornedPart;
        if (!(group instanceof go.Group))
            return;
        const diagram = group.diagram;
        if (diagram === null)
            return;
        const cmd = diagram.commandHandler;
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
// This is just an "Auto" Adornment that can hold some contents within a light gray, shadowed box.
// Typical usage:
//   toolTip:
//     go.GraphObject.build("ToolTip").add(
//       new go.TextBlock(. . .)
//     )
go.GraphObject.defineBuilder('ToolTip', (args) => new go.Adornment('Auto', {
    isShadowed: true,
    shadowColor: 'rgba(0, 0, 0, .4)',
    shadowOffset: new go.Point(0, 2)
})
    .add(new go.Shape('RoundedRectangle', {
    name: 'Border',
    parameter1: 1,
    fill: '#f5f5f5',
    strokeWidth: 0,
    spot1: new go.Spot(0, 0, 4, 6),
    spot2: new go.Spot(1, 1, -4, -4)
})));
// This is just a "Vertical" Adornment that can hold some "ContextMenuButton"s.
// Typical usage:
//   contextMenu:
//     go.GraphObject.build("ContextMenu").add(
//       go.GraphObject.build("ContextMenuButton",
//           { click: . . .}).add(
//         new go.TextBlock(. . .)
//       ),
//       go.GraphObject.build("ContextMenuButton", . . .).add(. . .)
//     )
// or:
//   contextMenu:
//     $("ContextMenu",
//       $("ContextMenuButton",
//         $(go.TextBlock, . . .),
//         { click: . . .}
//       ),
//       $("ContextMenuButton", . . .), ...)
//     )
go.GraphObject.defineBuilder('ContextMenu', (args) => new go.Adornment('Vertical', {
    background: '#f5f5f5',
    isShadowed: true,
    shadowColor: 'rgba(0, 0, 0, .4)',
    shadowOffset: new go.Point(0, 2)
})
    // don't set the background if the ContextMenu is adorning something and there's a Placeholder
    .bindObject('background', '', (ad) => {
    const part = ad.adornedPart;
    if (part !== null && ad.hasPlaceholder())
        return null;
    return '#f5f5f5';
}));
// This just holds the 'ButtonBorder' Shape that acts as the border
// around the button contents, which must be supplied by the caller.
// The button contents are usually a TextBlock or Panel consisting of a Shape and a TextBlock.
// Typical usage within an Adornment that is either a GraphObject.contextMenu or a Diagram.contextMenu:
// go.GraphObject.build('ContextMenuButton',
//     { click: (e, obj) => alert('Command for ' + obj.part.adornedPart) })
//   .bind('visible', '', data => ... whether OK to perform Command ...)
//   .add(
//     new go.TextBlock(text)
//   )
// or:
// $('ContextMenuButton',
//   $(go.TextBlock, text),
//   { click: (e, obj) => alert('Command for ' + obj.part.adornedPart) },
//   new go.Binding('visible', '', data => ... whether OK to perform Command ...)
// )
go.GraphObject.defineBuilder('ContextMenuButton', (args) => {
    const button = go.GraphObject.build('Button');
    button.stretch = go.Stretch.Horizontal;
    const border = button.findObject('ButtonBorder');
    if (border instanceof go.Shape) {
        border.figure = 'Rectangle';
        border.strokeWidth = 0;
        border.spot1 = new go.Spot(0, 0, 4, 6);
        border.spot2 = new go.Spot(1, 1, -4, -4);
    }
    return button;
});
// This button is used to toggle the visibility of a GraphObject named
// by the second argument to GraphObject.make.  If the second argument is not present
// or if it is not a string, this assumes that the element name is 'COLLAPSIBLE'.
// You can only control the visibility of one element in a Part at a time,
// although that element might be an arbitrarily complex Panel.
// Typical usage:
//   new go.Panel(. . .).add(
//     . . .,
//     go.GraphObject.build('PanelExpanderButton', 'COLLAPSIBLE'),
//     . . .,
//     new go.Panel({ name: 'COLLAPSIBLE' })
//       .add(
//         . . . stuff to be hidden or shown as the PanelExpanderButton is clicked . . .
//       )
//     ),
//     . . .
//   )
// or:
//   $(go.Panel, . . .,
//     . . .,
//     $('PanelExpanderButton', 'COLLAPSIBLE'),
//     . . .,
//       $(go.Panel, . . .,
//         { name: 'COLLAPSIBLE' },
//         . . . stuff to be hidden or shown as the PanelExpanderButton is clicked . . .
//       ),
//     . . .
//   )
go.GraphObject.defineBuilder('PanelExpanderButton', (args) => {
    const eltname = go.GraphObject.takeBuilderArgument(args, 'COLLAPSIBLE');
    const button = go.GraphObject.build('Button');
    button.attach({
        // set these values for the button's look
        '_buttonExpandedFigure': 'M0 0 M0 6 L4 2 8 6 M8 8',
        '_buttonCollapsedFigure': 'M0 0 M0 2 L4 6 8 2 M8 8',
        'ButtonBorder.fill': 'rgba(0, 0, 0, 0)',
        '_buttonFillNormal': 'rgba(0, 0, 0, 0)',
        'ButtonBorder.stroke': null,
        '_buttonStrokeNormal': null,
        '_buttonFillOver': 'rgba(0, 0, 0, .2)',
        '_buttonStrokeOver': null
    });
    button.add(new go.Shape({ name: 'ButtonIcon', strokeWidth: 2 })
        .bindObject('geometryString', 'visible', (vis) => vis ? button['_buttonExpandedFigure'] : button['_buttonCollapsedFigure'], undefined, eltname));
    const border = button.findObject('ButtonBorder');
    if (border instanceof go.Shape) {
        border.stroke = null;
        border.fill = 'rgba(0, 0, 0, 0)';
    }
    button.click = (e, btn) => {
        if (!(btn instanceof go.Panel))
            return;
        const diagram = btn.diagram;
        if (diagram === null)
            return;
        if (diagram.isReadOnly)
            return;
        let elt = btn.findBindingPanel();
        if (elt === null)
            elt = btn.part;
        if (elt !== null) {
            const pan = elt.findObject(eltname);
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
// $('CheckBoxButton', '', { '_doClick': (e, obj) => alert('clicked!') })
go.GraphObject.defineBuilder('CheckBoxButton', (args) => {
    // process the one required string argument for this kind of button
    const propname = go.GraphObject.takeBuilderArgument(args);
    const button = go.GraphObject.build('Button', { desiredSize: new go.Size(14, 14) });
    button.add(new go.Shape({
        name: 'ButtonIcon',
        geometryString: 'M0 0 M0 8.85 L4.9 13.75 16.2 2.45 M16.2 16.2', // a 'check' mark
        strokeWidth: 2,
        stretch: go.Stretch.Fill, // this Shape expands to fill the Button
        geometryStretch: go.GeometryStretch.Uniform, // the check mark fills the Shape without distortion
        visible: false // visible set to false: not checked, unless data.PROPNAME is true
    }));
    // create a data Binding only if PROPNAME is supplied and not the empty string
    if (propname !== '') {
        button.bindTwoWay('visible', propname);
    }
    button.click = (e, btn) => {
        if (!(btn instanceof go.Panel))
            return;
        const diagram = e.diagram;
        if (diagram === null || diagram.isReadOnly)
            return;
        if (propname !== '' && diagram.model.isReadOnly)
            return;
        e.handled = true;
        const shape = btn.findObject('ButtonIcon');
        diagram.startTransaction('checkbox');
        if (shape !== null)
            shape.visible = !shape.visible; // this toggles data.checked due to TwoWay Binding
        // support extra side-effects without clobbering the click event handler:
        if (typeof btn['_doClick'] === 'function')
            btn['_doClick'](e, btn);
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
//   { '_doClick': (e, obj) => { ... perform extra side-effects ... } })
go.GraphObject.defineBuilder('CheckBox', (args) => {
    // process the one required string argument for this kind of button
    const propname = go.GraphObject.takeBuilderArgument(args);
    const button = go.GraphObject.build('CheckBoxButton', {
        name: 'Button',
        isActionable: false, // actionable is set on the whole horizontal panel
        margin: new go.Margin(0, 1, 0, 0)
    }, propname // bound to this data property
    );
    const box = new go.Panel('Horizontal', {
        isActionable: true,
        cursor: button.cursor,
        margin: 1,
        mouseEnter: button.mouseEnter,
        mouseLeave: button.mouseLeave,
        click: button.click
    })
        .attach({
        // transfer CheckBoxButton properties over to this new CheckBox panel
        '_buttonFillNormal': button['_buttonFillNormal'],
        '_buttonStrokeNormal': button['_buttonStrokeNormal'],
        '_buttonFillOver': button['_buttonFillOver'],
        '_buttonStrokeOver': button['_buttonStrokeOver'],
        '_buttonFillDisabled': button['_buttonFillDisabled'],
        // also save original Button behavior, for potential use in a Panel.click event handler
        '_buttonClick': button.click
    });
    box.add(button);
    // avoid potentially conflicting event handlers on the 'CheckBoxButton'
    button.mouseEnter = null;
    button.mouseLeave = null;
    button.click = null;
    return box;
});
