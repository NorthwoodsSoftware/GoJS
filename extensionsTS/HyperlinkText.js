/*
*  Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved.
*/
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    * This is an extension and not part of the main GoJS library.
    * Note that the API for this class may change with any version, even point releases.
    * If you intend to use an extension in production, you should copy the code to your own source directory.
    * Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
    * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
    */
    var go = require("../release/go.js");
    // A "HyperlinkText" is either a TextBlock or a Panel containing a TextBlock that when clicked
    // opens a new browser window with a given or computed URL.
    // When the user's mouse passes over a "HyperlinkText", the text is underlined.
    // When the mouse hovers over a "HyperlinkText", it shows a tooltip that displays the URL.
    // This "HyperlinkText" builder is not pre-defined in the GoJS library, so you will need to load this definition.
    // Typical usages:
    //    $("HyperlinkText", "https://gojs.net", "Visit GoJS")
    //
    //    $("HyperlinkText",
    //        function(node) { return "https://gojs.net/" + node.data.version; },
    //        function(node) { return "Visit GoJS version " + node.data.version; })
    //
    //    $("HyperlinkText",
    //        function(node) { return "https://gojs.net/" + node.data.version; },
    //        $(go.Panel, "Auto",
    //            $(go.Shape, ...),
    //            $(go.TextBlock, ...)
    //        )
    //    )
    // The first argument to the "HyperlinkText" builder should be either the URL string or a function
    // that takes the data-bound Panel and returns the URL string.
    // If the URL string is empty or if the function returns an empty string,
    // the text will not be underlined on a mouse-over and a click has no effect.
    // The second argument to the "HyperlinkText" builder may be either a string to display in a TextBlock,
    // or a function that takes the data-bound Panel and returns the string to display in a TextBlock.
    // If no text string or function is provided, it assumes all of the arguments are used to
    // define the visual tree for the "HyperlinkText", in the normal fashion for a Panel.
    // The result is either a TextBlock or a Panel.
    go.GraphObject.defineBuilder('HyperlinkText', function (args) {
        // the URL is required as the first argument, either a string or a side-effect-free function returning a string
        var url = go.GraphObject.takeBuilderArgument(args, undefined, function (x) { return typeof x === 'string' || typeof x === 'function'; });
        // the text for the HyperlinkText is the optional second argument, either a string or a side-effect-free function returning a string
        var text = go.GraphObject.takeBuilderArgument(args, null, function (x) { return typeof x === 'string' || typeof x === 'function'; });
        // see if the visual tree is supplied in the arguments to the "HyperlinkText"
        var anyGraphObjects = false;
        for (var i = 0; i < args.length; i++) {
            var a = args[i];
            if (a && a instanceof go.GraphObject)
                anyGraphObjects = true;
        }
        // define the click behavior
        var click = function (e, obj) {
            var u = obj._url;
            if (typeof u === 'function')
                u = u(obj.findTemplateBinder());
            if (u)
                window.open(u, '_blank');
        };
        // define the tooltip
        var tooltip = go.GraphObject.make('ToolTip', go.GraphObject.make(go.TextBlock, { name: 'TB', margin: 4 }, new go.Binding('text', '', function (obj) {
            // here OBJ will be in the Adornment, need to get the HyperlinkText/TextBlock
            obj = obj.part.adornedObject;
            var u = obj._url;
            if (typeof u === 'function')
                u = u(obj.findTemplateBinder());
            return u;
        }).ofObject()), new go.Binding('visible', 'text', function (t) { return !!t; }).ofObject('TB'));
        // if the text is provided, use a new TextBlock; otherwise assume the TextBlock is provided
        if (typeof (text) === 'string' || typeof (text) === 'function' || !anyGraphObjects) {
            if (text === null && typeof (url) === 'string')
                text = url;
            var tb = go.GraphObject.make(go.TextBlock, {
                '_url': url,
                cursor: 'pointer',
                mouseEnter: function (e, obj) {
                    var u = obj._url;
                    if (typeof u === 'function')
                        u = u(obj.findTemplateBinder());
                    if (u && obj instanceof go.TextBlock)
                        obj.isUnderline = true;
                },
                mouseLeave: function (e, obj) { if (obj instanceof go.TextBlock)
                    obj.isUnderline = false; },
                click: click,
                toolTip: tooltip // shared by all HyperlinkText textblocks
            });
            if (typeof (text) === 'string') {
                tb.text = text;
            }
            else if (typeof (text) === 'function') {
                tb.bind(new go.Binding('text', '', text).ofObject());
            }
            else if (typeof (url) === 'function') {
                tb.bind(new go.Binding('text', '', url).ofObject());
            }
            return tb;
        }
        else {
            var findTextBlock_1 = function (obj) {
                if (obj instanceof go.TextBlock)
                    return obj;
                if (obj instanceof go.Panel) {
                    var it = obj.elements;
                    while (it.next()) {
                        var result = findTextBlock_1(it.value);
                        if (result !== null)
                            return result;
                    }
                }
                return null;
            };
            return go.GraphObject.make(go.Panel, {
                '_url': url,
                cursor: 'pointer',
                mouseEnter: function (e, panel) {
                    var tb = findTextBlock_1(panel);
                    var u = panel._url;
                    if (typeof u === 'function')
                        u = u(panel.findTemplateBinder());
                    if (tb !== null && u)
                        tb.isUnderline = true;
                },
                mouseLeave: function (e, panel) {
                    var tb = findTextBlock_1(panel);
                    if (tb !== null)
                        tb.isUnderline = false;
                },
                click: click,
                toolTip: tooltip // shared by all HyperlinkText panels
            });
        }
    });
});
