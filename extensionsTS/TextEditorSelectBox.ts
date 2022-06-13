/*
*  Copyright (C) 1998-2022 by Northwoods Software Corporation. All Rights Reserved.
*/

/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/

import * as go from '../release/go.js';

// HTML + JavaScript text editor using an HTML Select Element and HTMLInfo.
// This file exposes one instance of HTMLInfo, window.TextEditorSelectBox
// see /samples/customTextEditingTool.html
// see also textEditorRadioButton.js for another custom editor
// see also textEditor.html for a re-implementation of the default text editor
((window: any) => {
  const customEditor = new go.HTMLInfo();

  const customSelectBox = document.createElement('select');

  customEditor.show = (textBlock, diagram, tool) => {
    if (!(textBlock instanceof go.TextBlock)) return;

    // Populate the select box:
    customSelectBox.innerHTML = '';

    let list = textBlock.choices;
    // Perhaps give some default choices if textBlock.choices is null
    if (list === null) list = ['Default A', 'Default B', 'Default C'];
    const l = list.length;
    for (let i = 0; i < l; i++) {
      const op = document.createElement('option');
      op.text = list[i];
      op.value = list[i];
      if (list[i] === textBlock.text) op.selected = true;
      customSelectBox.add(op);

      // consider also adding the current value, if it is not in the choices list
    }

    // After the list is populated, set the value:
    customSelectBox.value = textBlock.text;

    // Do a few different things when a user presses a key
    customSelectBox.addEventListener('keydown', (e) => {
      const key = e.key;
      if (key === "Enter") { // Accept on Enter
        (tool as any).acceptText(go.TextEditingTool.Enter);
        return;
      } else if (key === "Tab") { // Accept on Tab
        (tool as any).acceptText(go.TextEditingTool.Tab);
        e.preventDefault();
        return false;
      } else if (key === "Escape") { // Cancel on Esc
        tool.doCancel();
        if (tool.diagram) tool.diagram.focus();
      }
    }, false);

    const loc = textBlock.getDocumentPoint(go.Spot.TopLeft);
    const pos = diagram.transformDocToView(loc);
    customSelectBox.style.left = pos.x + 'px';
    customSelectBox.style.top  = pos.y + 'px';
    customSelectBox.style.position = 'absolute';
    customSelectBox.style.zIndex = (100).toString(); // place it in front of the Diagram

    if (diagram.div !== null) diagram.div.appendChild(customSelectBox);
    customSelectBox.focus();
  };

  customEditor.hide = (diagram, tool) => {
    if (diagram.div !== null) diagram.div.removeChild(customSelectBox);
  };

  customEditor.valueFunction = () => customSelectBox.value;

  window.TextEditorSelectBox = customEditor;
})(window);
