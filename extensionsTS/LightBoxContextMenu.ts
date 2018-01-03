// HTML + JavaScript context menu, made with HTMLInfo
// This file exposes one instance of HTMLInfo, window.myHTMLLightBox
// see also LightBoxContextMenu.css and /samples/htmlLightBoxContextMenu.html
"use strict";
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go"

(function(window) {
  /* HTML for context menu:
  <div id="contextMenuDIV">
    <div id="cmLight"></div>
    <div id="cmDark"></div>
  </div>
  */

  var contextMenuDIV = document.createElement("div");
  contextMenuDIV.id = "contextMenuDIV";
  // This is the actual HTML LightBox-style context menu, composed of buttons and a background:
  var cmLight = document.createElement("div");
  cmLight.id = "cmLight";
  var cmDark = document.createElement("div");
  cmDark.id = "cmDark";
  contextMenuDIV.appendChild(cmLight);
  contextMenuDIV.appendChild(cmDark);

  var cxMenuButtons = [
    {
      text: 'Copy',
      command: (diagram: go.Diagram) => { diagram.commandHandler.copySelection(); },
      isVisible: (diagram: go.Diagram) => { return diagram.commandHandler.canCopySelection(); }
    }, {
      text: 'Cut',
      command: (diagram: go.Diagram) => { diagram.commandHandler.cutSelection(); },
      isVisible: (diagram: go.Diagram) => { return diagram.commandHandler.canCutSelection(); }
    }, {
      text: 'Delete',
      command: (diagram: go.Diagram) => { diagram.commandHandler.deleteSelection(); },
      isVisible: (diagram: go.Diagram) => { return diagram.commandHandler.canDeleteSelection(); }
    }, {
      text: 'Paste',
      command: (diagram: go.Diagram) => { diagram.commandHandler.pasteSelection(diagram.lastInput.documentPoint); },
      isVisible: (diagram: go.Diagram) => { return diagram.commandHandler.canPasteSelection(); }
    }, {
      text: 'Select All',
      command: (diagram: go.Diagram) => { diagram.commandHandler.selectAll(); },
      isVisible: (diagram: go.Diagram) => { return diagram.commandHandler.canSelectAll(); }
    }, {
      text: 'Undo',
      command: (diagram: go.Diagram) => { diagram.commandHandler.undo(); },
      isVisible: (diagram: go.Diagram) => { return diagram.commandHandler.canUndo(); }
    }, {
      text: 'Redo',
      command: (diagram: go.Diagram) => { diagram.commandHandler.redo(); },
      isVisible: (diagram: go.Diagram) => { return diagram.commandHandler.canRedo(); }
    }, {
      text: 'Scroll To Part',
      command: (diagram: go.Diagram) => { diagram.commandHandler.scrollToPart(); },
      isVisible: (diagram: go.Diagram) => { return diagram.commandHandler.canScrollToPart(); }
    }, {
      text: 'Zoom To Fit',
      command: (diagram: go.Diagram) => { diagram.commandHandler.zoomToFit(); },
      isVisible: (diagram: go.Diagram) => { return diagram.commandHandler.canZoomToFit(); }
    }, {
      text: 'Reset Zoom',
      command: (diagram: go.Diagram) => { diagram.commandHandler.resetZoom(); },
      isVisible: (diagram: go.Diagram) => { return diagram.commandHandler.canResetZoom(); }
    }, {
      text: 'Group Selection',
      command: (diagram: go.Diagram) => { diagram.commandHandler.groupSelection(); },
      isVisible: (diagram: go.Diagram) => { return diagram.commandHandler.canGroupSelection(); }
    }, {
      text: 'Ungroup Selection',
      command: (diagram: go.Diagram) => { diagram.commandHandler.ungroupSelection(); },
      isVisible: (diagram: go.Diagram) => { return diagram.commandHandler.canUngroupSelection(); }
    }, {
      text: 'Edit Text',
      command: (diagram: go.Diagram) => { diagram.commandHandler.editTextBlock(); },
      isVisible: (diagram: go.Diagram) => { return diagram.commandHandler.canEditTextBlock(); }
    }
  ];

  const $ = go.GraphObject.make;
  var myContextMenu = $(go.HTMLInfo, {
    show: showContextMenu,
    hide: hideContextMenu
  });

  var firstTime = true;

  function showContextMenu(obj: go.GraphObject, diagram: go.Diagram, tool: go.Tool) {
    if (firstTime) {
      // We don't want the div acting as a context menu to have a (browser) context menu!
      cmLight.addEventListener('contextmenu', (e) => { e.preventDefault(); return false; }, false);
      cmLight.addEventListener('selectstart', (e) => { e.preventDefault(); return false; }, false);
      contextMenuDIV.addEventListener('contextmenu', (e) => { e.preventDefault(); return false; }, false);
      // Stop the context menu tool if you click on the dark part:
      contextMenuDIV.addEventListener('click', (e) => { diagram.currentTool.stopTool(); return false; }, false);
      firstTime = false;
    }

    // Empty the context menu and only show buttons that are relevant
    cmLight.innerHTML = '';

    var ul = document.createElement('ul');
    cmLight.appendChild(ul);

    for (var i = 0; i < cxMenuButtons.length; i++) {
      var button = cxMenuButtons[i];
      var command = button.command;
      var isVisible = button.isVisible;

      if (!(typeof command === 'function')) continue;
      // Only show buttons that have isVisible = true
      if (typeof isVisible === 'function' && !isVisible(diagram)) continue;
      var li = document.createElement('li');
      var ahref = document.createElement('a');
      ahref.href = '#';
      (<any>ahref)["_command"] = button.command;
      ahref.addEventListener('click', (e) => {
        (this as any)._command(diagram);
        tool.stopTool();
        e.preventDefault();
        return false;
      }, false);
      ahref.textContent = button.text;
      li.appendChild(ahref);
      ul.appendChild(li);
    }

    // show the whole LightBox context menu
    document.body.appendChild(contextMenuDIV);
  };

  function hideContextMenu(diagram: go.Diagram, tool: go.Tool) {
    document.body.removeChild(contextMenuDIV);
  }

  (window as any).myHTMLLightBox = myContextMenu;
})(window);