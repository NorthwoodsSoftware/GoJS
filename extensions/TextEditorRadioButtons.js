/*
 *  Copyright 1998-2025 by Northwoods Software Corporation. All Rights Reserved.
 */
/*
 * This is an extension and not part of the main GoJS library.
 * The source code for this is at extensionsJSM/TextEditorRadioButtons.ts.
 * Note that the API for this class may change with any version, even point releases.
 * If you intend to use an extension in production, you should copy the code to your own source directory.
 * Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
 * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
 */

// HTML + JavaScript text editor menu, using HTML radio inputs and HTMLInfo.
// This file exposes one instance of HTMLInfo, window.TextEditorRadioButtons
// Typical usage is:
// ```js
//   new go.Diagram(...,
//      {
//        "textEditingTool.defaultTextEditor": window.TextEditorRadioButtons,
//        . . .
//      })
// ```
// or:
// ```js
//    myDiagram.toolManager.textEditingTool.defaultTextEditor = window.TextEditorRadioButtons;
// ```
// or:
// ```js
//   $(go.Node, . . .,
//     . . .
//       $(go.TextBlock, { textEditor: window.TextEditorRadioButtons, . . . })
//     . . .
//   )
// ```
// If you do use this code, copy it into your project and modify it there.
// see /samples/customTextEditingTool.html
// see also textEditorSelectBox.js for another custom editor
// see also textEditor.html for a re-implementation of the default text editor
((window) => {
    // Use the following HTML:
    const customText = document.createElement('div');
    customText.id = 'customTextEditor';
    customText.style.cssText = 'border: 1px solid black; background-color: white;';
    customText.innerHTML =
        '  <label for="One">One</label> <input type="radio" name="group1" id="One" value="One"> <br/>' +
            '  <label for="Two">Two</label> <input type="radio" name="group1" id="Two" value="Two"> <br/>' +
            '  <label for="Three">Three</label> <input type="radio" name="group1" id="Three" value="Three"> <br/>' +
            '  <label for="Four">Four</label> <input type="radio" name="group1" id="Four" value="Four">';
    const customEditor = new go.HTMLInfo();
    customEditor.show = (textBlock, diagram, tool) => {
        if (!(textBlock instanceof go.TextBlock))
            return;
        const startingValue = textBlock.text;
        // Populate the select box:
        customText.innerHTML = '';
        let list = textBlock.choices;
        // Perhaps give some default choices if textBlock.choices is null
        if (list === null)
            list = ['Default A', 'Default B', 'Default C'];
        let l = list.length;
        for (let i = 0; i < l; i++) {
            const value = list[i];
            const label = document.createElement('label');
            const input = document.createElement('input');
            label.htmlFor = value;
            label.textContent = value;
            input.type = 'radio';
            input.name = 'group1';
            input.id = value;
            input.value = value;
            customText.appendChild(label);
            customText.appendChild(input);
            if (i !== l - 1)
                customText.appendChild(document.createElement('br'));
        }
        // consider also adding the current value, if it is not in the choices list
        const children = customText.children;
        l = children.length;
        for (let i = 0; i < l; i++) {
            const child = children[i];
            if (!(child instanceof HTMLInputElement))
                continue;
            // Make sure the radio button that equals the text is checked
            if (child.value === startingValue) {
                child.checked = true;
            }
            // Finish immediately when a radio button is pressed
            customText.addEventListener('change', (e) => {
                tool.acceptText(go.TextEditingAccept.Tab);
            }, false);
        }
        // Do a few different things when a user presses a key
        customText.addEventListener('keydown', (e) => {
            if (e.isComposing)
                return;
            const code = e.code;
            if (code === 'Enter') {
                // Accept on Enter
                tool.acceptText(go.TextEditingAccept.Enter);
            }
            else if (code === 'Tab') {
                // Accept on Tab
                tool.acceptText(go.TextEditingAccept.Tab);
                e.preventDefault();
            }
            else if (code === 'Escape') {
                // Cancel on Esc
                tool.doCancel();
                if (tool.diagram)
                    tool.diagram.focus();
            }
        }, false);
        const loc = textBlock.getDocumentPoint(go.Spot.TopLeft);
        const pos = diagram.transformDocToView(loc);
        customText.style.left = pos.x + 'px';
        customText.style.top = pos.y + 'px';
        customText.style.position = 'absolute';
        customText.style.zIndex = (100).toString(); // place it in front of the Diagram
        if (diagram.div !== null)
            diagram.div.appendChild(customText);
    };
    customEditor.hide = (diagram, tool) => {
        if (diagram.div !== null)
            diagram.div.removeChild(customText);
    };
    // customText is a div and doesn't have a "value" field
    // So we will make value into a function that will return
    // the "value" of the checked radio button
    customEditor.valueFunction = () => {
        const children = customText.children;
        const l = children.length;
        for (let i = 0; i < l; i++) {
            const child = children[i];
            if (!(child instanceof HTMLInputElement))
                continue;
            if (child.checked) {
                return child.value;
            }
        }
        return '';
    };
    window.TextEditorRadioButtons = customEditor;
})(window);
