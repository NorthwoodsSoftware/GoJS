/*
*  Copyright (C) 1998-2021 by Northwoods Software Corporation. All Rights Reserved.
*/
/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/
import * as go from '../release/go-module.js';
// HTML + JavaScript context menu, made with HTMLInfo
// This file exposes one instance of HTMLInfo, window.myHTMLLightBox
// see also LightBoxContextMenu.css and /samples/htmlLightBoxContextMenu.html
(function (window) {
    /* HTML for context menu:
    <div id="contextMenuDIV">
      <div id="cmLight"></div>
      <div id="cmDark"></div>
    </div>
    */
    const contextMenuDIV = document.createElement('div');
    contextMenuDIV.id = 'contextMenuDIV';
    // This is the actual HTML LightBox-style context menu, composed of buttons and a background:
    const cmLight = document.createElement('div');
    cmLight.id = 'cmLight';
    cmLight.className = 'goCXforeground';
    const cmDark = document.createElement('div');
    cmDark.id = 'cmDark';
    cmDark.className = 'goCXbackground';
    contextMenuDIV.appendChild(cmLight);
    contextMenuDIV.appendChild(cmDark);
    const cxMenuButtons = [
        {
            text: 'Copy',
            command: (diagram) => { diagram.commandHandler.copySelection(); },
            isVisible: (diagram) => diagram.commandHandler.canCopySelection()
        }, {
            text: 'Cut',
            command: (diagram) => { diagram.commandHandler.cutSelection(); },
            isVisible: (diagram) => diagram.commandHandler.canCutSelection()
        }, {
            text: 'Delete',
            command: (diagram) => { diagram.commandHandler.deleteSelection(); },
            isVisible: (diagram) => diagram.commandHandler.canDeleteSelection()
        }, {
            text: 'Paste',
            command: (diagram) => { diagram.commandHandler.pasteSelection(diagram.toolManager.contextMenuTool.mouseDownPoint); },
            isVisible: (diagram) => diagram.commandHandler.canPasteSelection(diagram.toolManager.contextMenuTool.mouseDownPoint)
        }, {
            text: 'Select All',
            command: (diagram) => { diagram.commandHandler.selectAll(); },
            isVisible: (diagram) => diagram.commandHandler.canSelectAll()
        }, {
            text: 'Undo',
            command: (diagram) => { diagram.commandHandler.undo(); },
            isVisible: (diagram) => diagram.commandHandler.canUndo()
        }, {
            text: 'Redo',
            command: (diagram) => { diagram.commandHandler.redo(); },
            isVisible: (diagram) => diagram.commandHandler.canRedo()
        }, {
            text: 'Scroll To Part',
            command: (diagram) => { diagram.commandHandler.scrollToPart(); },
            isVisible: (diagram) => diagram.commandHandler.canScrollToPart()
        }, {
            text: 'Zoom To Fit',
            command: (diagram) => { diagram.commandHandler.zoomToFit(); },
            isVisible: (diagram) => diagram.commandHandler.canZoomToFit()
        }, {
            text: 'Reset Zoom',
            command: (diagram) => { diagram.commandHandler.resetZoom(); },
            isVisible: (diagram) => diagram.commandHandler.canResetZoom()
        }, {
            text: 'Group Selection',
            command: (diagram) => { diagram.commandHandler.groupSelection(); },
            isVisible: (diagram) => diagram.commandHandler.canGroupSelection()
        }, {
            text: 'Ungroup Selection',
            command: (diagram) => { diagram.commandHandler.ungroupSelection(); },
            isVisible: (diagram) => diagram.commandHandler.canUngroupSelection()
        }, {
            text: 'Edit Text',
            command: (diagram) => { diagram.commandHandler.editTextBlock(); },
            isVisible: (diagram) => diagram.commandHandler.canEditTextBlock()
        }
    ];
    const $ = go.GraphObject.make;
    const myContextMenu = $(go.HTMLInfo, {
        show: showContextMenu,
        hide: hideContextMenu
    });
    let firstTime = true;
    function showContextMenu(obj, diagram, tool) {
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
        const ul = document.createElement('ul');
        cmLight.appendChild(ul);
        for (let i = 0; i < cxMenuButtons.length; i++) {
            const button = cxMenuButtons[i];
            const command = button.command;
            const isVisible = button.isVisible;
            if (!(typeof command === 'function'))
                continue;
            // Only show buttons that have isVisible = true
            if (typeof isVisible === 'function' && !isVisible(diagram))
                continue;
            const li = document.createElement('li');
            const ahref = document.createElement('a');
            ahref.href = '#';
            ahref._command = button.command;
            ahref.addEventListener('click', (e) => {
                ahref._command(diagram);
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
    }
    function hideContextMenu(diagram, tool) {
        document.body.removeChild(contextMenuDIV);
    }
    window.myHTMLLightBox = myContextMenu;
})(window);
