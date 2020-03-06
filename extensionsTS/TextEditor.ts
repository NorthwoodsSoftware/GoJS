/*
*  Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved.
*/

// This is the definitions of the predefined text editor used by TextEditingTool
// when you set or bind TextBlock.editable to true.
// You do not need to load this file in order to use in-place text editing.

import * as go from '../release/go.js';

// HTML + JavaScript text editor menu, made with HTMLInfo
// This is a re-implementation of the default text editor
// This file exposes one instance of HTMLInfo, window.TextEditor
// See also TextEditor.html
((window: any) => {
  const TextEditor: go.HTMLInfo = new go.HTMLInfo();
  const textarea = document.createElement('textarea');
  textarea.id = 'myTextArea';

  textarea.addEventListener('input', (e) => {
    const tool = (TextEditor as any).tool;
    if (tool.textBlock === null) return;
    const tempText = tool.measureTemporaryTextBlock(textarea.value);
    const scale = (textarea as any).textScale;
    textarea.style.width = 20 + tempText.measuredBounds.width * scale + 'px';
    textarea.rows = tempText.lineCount;
  }, false);

  textarea.addEventListener('keydown', (e) => {
    const tool = (TextEditor as any).tool;
    if (tool.textBlock === null) return;
    const keynum = e.which;
    if (keynum === 13) { // Enter
      if (tool.textBlock.isMultiline === false) e.preventDefault();
      tool.acceptText(go.TextEditingTool.Enter);
      return;
    } else if (keynum === 9) { // Tab
      tool.acceptText(go.TextEditingTool.Tab);
      e.preventDefault();
      return;
    } else if (keynum === 27) { // Esc
      tool.doCancel();
      if (tool.diagram !== null) tool.diagram.doFocus();
    }
  }, false);

  // handle focus:
  textarea.addEventListener('focus', (e) => {
    const tool = (TextEditor as any).tool;
    if (!tool || tool.currentTextEditor === null) return;

    if (tool.state === (go.TextEditingTool as any).StateActive) {
      tool.state = (go.TextEditingTool as any).StateEditing;
    }

    if (tool.selectsTextOnActivate) {
      textarea.select();
      textarea.setSelectionRange(0, 9999);
    }
  }, false);

  // Disallow blur.
  // If the textEditingTool blurs and the text is not valid,
  // we do not want focus taken off the element just because a user clicked elsewhere.
  textarea.addEventListener('blur', (e) => {
    const tool = (TextEditor as any).tool;
    if (!tool || tool.currentTextEditor === null || tool.state === (go.TextEditingTool as any).StateNone) return;

    textarea.focus();

    if (tool.selectsTextOnActivate) {
      textarea.select();
      textarea.setSelectionRange(0, 9999);
    }
  }, false);

  TextEditor.valueFunction = () => textarea.value;

  TextEditor.mainElement = textarea; // to reference it more easily

  (TextEditor as any).tool = null; // Initialize

  // used to be in doActivate
  TextEditor.show = (textBlock: go.GraphObject, diagram: go.Diagram, tool: go.Tool) => {
    if (!diagram || !diagram.div) return;
    if (!(textBlock instanceof go.TextBlock)) return;
    if ((TextEditor as any).tool !== null) return; // Only one at a time.

    (TextEditor as any).tool = tool;  // remember the TextEditingTool for use by listeners

    // This is called during validation, if validation failed:
    if ((tool as any).state === (go.TextEditingTool as any).StateInvalid) {
      textarea.style.border = '3px solid red';
      textarea.focus();
      return;
    }

    // This part is called during initalization:

    const loc = textBlock.getDocumentPoint(go.Spot.Center);
    const pos = diagram.position;
    const sc = diagram.scale;
    let textscale = textBlock.getDocumentScale() * sc;
    if (textscale < (tool as any).minimumEditorScale) textscale = (tool as any).minimumEditorScale;
    // Add slightly more width/height to stop scrollbars and line wrapping on some browsers
    // +6 is firefox minimum, otherwise lines will be wrapped improperly
    const textwidth = (textBlock.naturalBounds.width * textscale) + 6;
    const textheight = (textBlock.naturalBounds.height * textscale) + 2;
    const left = (loc.x - pos.x) * sc;
    const top = (loc.y - pos.y) * sc;

    textarea.value = textBlock.text;
    // the only way you can mix font and fontSize is if the font inherits and the fontSize overrides
    // in the future maybe have textarea contained in its own div
    diagram.div.style['font'] = textBlock.font;

    const paddingsize = 1;
    textarea.style['position'] = 'absolute';
    textarea.style['zIndex'] = '100';
    textarea.style['font'] = 'inherit';
    textarea.style['fontSize'] = (textscale * 100) + '%';
    textarea.style['lineHeight'] = 'normal';
    textarea.style['width'] = (textwidth) + 'px';
    textarea.style['left'] = ((left - (textwidth / 2) | 0) - paddingsize) + 'px';
    textarea.style['top'] = ((top - (textheight / 2) | 0) - paddingsize) + 'px';
    textarea.style['textAlign'] = textBlock.textAlign;
    textarea.style['margin'] = '0';
    textarea.style['padding'] = paddingsize + 'px';
    textarea.style['border'] = '0';
    textarea.style['outline'] = 'none';
    textarea.style['whiteSpace'] = 'pre-wrap';
    textarea.style['overflow'] = 'hidden'; // for proper IE wrap
    textarea.rows = textBlock.lineCount;
    (textarea as any).textScale = textscale; // attach a value to the textarea, for convenience
    textarea.className = 'goTXarea';

    // Show:
    diagram.div.appendChild(textarea);

    // After adding, focus:
    textarea.focus();
    if ((tool as any).selectsTextOnActivate) {
      textarea.select();
      textarea.setSelectionRange(0, 9999);
    }
  };

  TextEditor.hide = (diagram: go.Diagram, tool: go.Tool) => {
    (TextEditor as any).tool = null;  // forget reference to TextEditingTool
    if (diagram.div) diagram.div.removeChild(textarea);
  };

  window.TextEditor = TextEditor;
})(window);
