"use strict";
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

// HTML + JavaScript text editor menu, using HTML radio inputs and HTMLInfo.
// This file exposes one instance of HTMLInfo, window.TextEditorRadioButtons
// see /samples/customTextEditingTool.html
// see also textEditorSelectBox.js for another custom editor
// see also textEditor.html for a re-implementation of the default text editor
(function(window) {
  // Use the following HTML:
  var customText = document.createElement("div");
  customText.id = "customTextEditor";
  customText.style.cssText = "border: 1px solid black; background-color: white;";
  customText.innerHTML =
  '  <label for="One">One</label> <input type="radio" name="group1" id="One" value="One"> <br/>' +
  '  <label for="Two">Two</label> <input type="radio" name="group1" id="Two" value="Two"> <br/>' +
  '  <label for="Three">Three</label> <input type="radio" name="group1" id="Three" value="Three"> <br/>' +
  '  <label for="Four">Four</label> <input type="radio" name="group1" id="Four" value="Four">';

  var customEditor = new go.HTMLInfo();


  customEditor.show = function(textBlock, diagram, tool) {
    if (!(textBlock instanceof go.TextBlock)) return;
    var startingValue = textBlock.text;

    // Populate the select box:
    customText.innerHTML = "";

    var list = textBlock.choices;
    // Perhaps give some default choices if textBlock.choices is null
    if (list === null) list = ["Default A", "Default B", "Default C"];
    var l = list.length;
    for (var i = 0; i < l; i++) {
      var value = list[i];
      var label = document.createElement("label");
      var input = document.createElement("input");
      label.htmlFor = value;
      label.textContent = value;
      input.type = "radio";
      input.name = "group1";
      input.id = value;
      input.value = value;
      customText.appendChild(label);
      customText.appendChild(input);
      if (i !== l-1) customText.appendChild(document.createElement("br"));
    }

    // consider also adding the current value, if it is not in the choices list

    var children = customText.children
    var l = children.length;
    for (var i = 0; i < l; i++) {
      var child = children[i];
      if (!(child instanceof HTMLInputElement)) continue;
      // Make sure the radio button that equals the text is checked
      if (child.value == startingValue) {
        child.checked = true;
      }

      // Finish immediately when a radio button is pressed
      customText.addEventListener("change", function(e) {
        tool.acceptText(go.TextEditingTool.Tab);
      }, false);

    }

    // Do a few different things when a user presses a key
    customText.addEventListener("keydown", function(e) {
      var keynum = e.which;
      if (keynum == 13) { // Accept on Enter
        tool.acceptText(go.TextEditingTool.Enter);
        return;
      } else if (keynum == 9) { // Accept on Tab
        tool.acceptText(go.TextEditingTool.Tab);
        e.preventDefault();
        return false;
      } else if (keynum === 27) { // Cancel on Esc
        tool.doCancel();
        if (tool.diagram) tool.diagram.focus();
      }
    }, false);

    var loc = textBlock.getDocumentPoint(go.Spot.TopLeft);
    var pos = diagram.transformDocToView(loc);
    customText.style.left = pos.x + "px";
    customText.style.top  = pos.y + "px";
    customText.style.position = 'absolute';
    customText.style.zIndex = 100; // place it in front of the Diagram
    diagram.div.appendChild(customText);
  }

  customEditor.hide = function(diagram, tool) {
    diagram.div.removeChild(customText);
  }

  // customText is a div and doesn't have a "value" field
  // So we will make value into a function that will return
  // the "value" of the checked radio button
  customEditor.valueFunction = function() {
    var children = customText.children
    var l = children.length;
    for (var i = 0; i < l; i++) {
      var child = children[i];
      if (!(child instanceof HTMLInputElement)) continue;
      if (child.checked) {
        return child.value;
      }
    }
    return "";
  }

  window.TextEditorRadioButtons = customEditor;
})(window);