/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/
// HTML + JavaScript context menu, made with HTMLInfo
// This file exposes one instance of HTMLInfo, window.myHTMLLightBox
// see also LightBoxContextMenu.css and /samples/htmlLightBoxContextMenu.html
"use strict";
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
      command: function(diagram) { diagram.commandHandler.copySelection(); },
      isVisible: function(diagram) { return diagram.commandHandler.canCopySelection(); }
    }, {
      text: 'Cut',
      command: function(diagram) { diagram.commandHandler.cutSelection(); },
      isVisible: function(diagram) { return diagram.commandHandler.canCutSelection(); }
    }, {
      text: 'Delete',
      command: function(diagram) { diagram.commandHandler.deleteSelection(); },
      isVisible: function(diagram) { return diagram.commandHandler.canDeleteSelection(); }
    }, {
      text: 'Paste',
      command: function(diagram) { diagram.commandHandler.pasteSelection(diagram.lastInput.documentPoint); },
      isVisible: function(diagram) { return diagram.commandHandler.canPasteSelection(); }
    }, {
      text: 'Select All',
      command: function(diagram) { diagram.commandHandler.selectAll(); },
      isVisible: function(diagram) { return diagram.commandHandler.canSelectAll(); }
    }, {
      text: 'Undo',
      command: function(diagram) { diagram.commandHandler.undo(); },
      isVisible: function(diagram) { return diagram.commandHandler.canUndo(); }
    }, {
      text: 'Redo',
      command: function(diagram) { diagram.commandHandler.redo(); },
      isVisible: function(diagram) { return diagram.commandHandler.canRedo(); }
    }, {
      text: 'Scroll To Part',
      command: function(diagram) { diagram.commandHandler.scrollToPart(); },
      isVisible: function(diagram) { return diagram.commandHandler.canScrollToPart(); }
    }, {
      text: 'Zoom To Fit',
      command: function(diagram) { diagram.commandHandler.zoomToFit(); },
      isVisible: function(diagram) { return diagram.commandHandler.canZoomToFit(); }
    }, {
      text: 'Reset Zoom',
      command: function(diagram) { diagram.commandHandler.resetZoom(); },
      isVisible: function(diagram) { return diagram.commandHandler.canResetZoom(); }
    }, {
      text: 'Group Selection',
      command: function(diagram) { diagram.commandHandler.groupSelection(); },
      isVisible: function(diagram) { return diagram.commandHandler.canGroupSelection(); }
    }, {
      text: 'Ungroup Selection',
      command: function(diagram) { diagram.commandHandler.ungroupSelection(); },
      isVisible: function(diagram) { return diagram.commandHandler.canUngroupSelection(); }
    }, {
      text: 'Edit Text',
      command: function(diagram) { diagram.commandHandler.editTextBlock(); },
      isVisible: function(diagram) { return diagram.commandHandler.canEditTextBlock(); }
    }
  ];

  var $ = go.GraphObject.make;
  var myContextMenu = $(go.HTMLInfo, {
    show: showContextMenu,
    hide: hideContextMenu
  });

  var firstTime = true;

  function showContextMenu(obj, diagram, tool) {
    if (firstTime) {
      // We don't want the div acting as a context menu to have a (browser) context menu!
      cmLight.addEventListener('contextmenu', function(e) { e.preventDefault(); return false; }, false);
      cmLight.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);
      contextMenuDIV.addEventListener('contextmenu', function(e) { e.preventDefault(); return false; }, false);
      // Stop the context menu tool if you click on the dark part:
      contextMenuDIV.addEventListener('click', function(e) { diagram.currentTool.stopTool(); return false; }, false);
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
      ahref._command = button.command;
      ahref.addEventListener('click', function(e) {
        this._command(diagram);
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

  function hideContextMenu(diagram, tool) {
    document.body.removeChild(contextMenuDIV);
  }

  window.myHTMLLightBox = myContextMenu;
})(window);