"use strict";
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go"

// HTML + JavaScript text editor using an HTML Select Element and HTMLInfo.
// This file exposes one instance of HTMLInfo, window.TextEditorSelectBox
// see /samples/customTextEditingTool.html
// see also textEditorRadioButton.js for another custom editor
// see also textEditor.html for a re-implementation of the default text editor
((window: any) => {
  var customEditor = new go.HTMLInfo();

  var customSelectBox = document.createElement("select");

  customEditor.show = (textBlock, diagram, tool) => {
    if (!(textBlock instanceof go.TextBlock)) return;

    // Populate the select box:
    customSelectBox.innerHTML = "";

    var list = textBlock.choices;
    // Perhaps give some default choices if textBlock.choices is null
    if (list === null) list = ["Default A", "Default B", "Default C"];
    var l = list.length;
    for (var i = 0; i < l; i++) {
      var op = document.createElement("option");
      op.text = list[i];
      op.value = list[i];
      customSelectBox.add(op, null);

      // consider also adding the current value, if it is not in the choices list
    }

    // After the list is populated, set the value:
    customSelectBox.value = textBlock.text;

    // Do a few different things when a user presses a key
    customSelectBox.addEventListener("keydown", (e) => {
      var keynum = e.which;
      if (keynum == 13) { // Accept on Enter
        (<any>tool).acceptText(go.TextEditingTool.Enter);
        return;
      } else if (keynum == 9) { // Accept on Tab
        (<any>tool).acceptText(go.TextEditingTool.Tab);
        e.preventDefault();
        return false;
      } else if (keynum === 27) { // Cancel on Esc
        tool.doCancel();
        if (tool.diagram) tool.diagram.focus();
      }
    }, false);

    var loc = textBlock.getDocumentPoint(go.Spot.TopLeft);
    var pos = diagram.transformDocToView(loc);
    customSelectBox.style.left = pos.x + "px";
    customSelectBox.style.top  = pos.y + "px";
    customSelectBox.style.position = 'absolute';
    customSelectBox.style.zIndex = (100).toString(); // place it in front of the Diagram

    diagram.div.appendChild(customSelectBox);
  }

  customEditor.hide = (diagram, tool) => {
    diagram.div.removeChild(customSelectBox);
  }

  customEditor.valueFunction = () => { return customSelectBox.value; }

  window.TextEditorSelectBox = customEditor;
})(window);