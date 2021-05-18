(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../release/go", "./DataInspectorOverrides", "./EditorHelper", "./Floorplan", "./FloorplanPalette"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var go = require("../../../release/go");
    var DataInspectorOverrides_1 = require("./DataInspectorOverrides");
    var EditorHelper_1 = require("./EditorHelper");
    var Floorplan_1 = require("./Floorplan");
    var FloorplanPalette_1 = require("./FloorplanPalette");
    /**
     * Script to set up the Floorplanner editor
     * @param JQUERY jQuery passed to this script in floorplannerTS/index.html via requireJS
     * @hidden @internal
     */
    function init(JQUERY) {
        var editorHelper = new EditorHelper_1.EditorHelper(1, 2, '../../projects/storage', Floorplan_1.Floorplan, JQUERY);
        // replace generic palettes with FloorplanPalettes
        var myFloorplan = editorHelper.diagrams[0];
        editorHelper.palettes[0].div = null;
        editorHelper.palettes[1].div = null;
        var furniturePalette = new FloorplanPalette_1.FloorplanPalette('ge-palette-0', myFloorplan);
        furniturePalette.model = new go.GraphLinksModel(myFloorplan.makeDefaultFurniturePaletteNodeData());
        editorHelper.palettes[0] = furniturePalette;
        var wallPartsPalette = new FloorplanPalette_1.FloorplanPalette('ge-palette-1', myFloorplan);
        wallPartsPalette.model = new go.GraphLinksModel(myFloorplan.makeDefaultWallpartsPaletteNodeData());
        editorHelper.palettes[1] = wallPartsPalette;
        // set default model for all Cloud Storage subclasses
        for (var i in editorHelper.storages) {
            var storage = editorHelper.storages[i];
            var dm = JSON.stringify({
                'class': 'GraphLinksModel',
                'copiesKey': false,
                'modelData': {
                    'units': 'meters', 'unitsAbbreviation': 'm', 'unitsConversionFactor': 0.02, 'gridSize': 10,
                    'wallThickness': 10, 'preferences': {
                        'showWallGuidelines': true, 'showWallLengths': true, 'showWallAngles': true,
                        'showOnlySmallWallAngles': true, 'showGrid': true, 'gridSnap': true
                    }
                },
                'nodeDataArray': [],
                'linkDataArray': []
            });
            storage.defaultModel = dm;
        }
        // listen if the model of the Floorplan changes completely -- if so, there has been a load event, and we must update walls / rooms
        myFloorplan.addDiagramListener('InitialLayoutCompleted', function (e) {
            // update units, grid size, units / px, showGrid, and preferences from the loading model's modelData
            var unitsForm = document.getElementById('unitsForm');
            var gridSizeInput = document.getElementById('gridSizeInput');
            var showGridCheckbox = document.getElementById('showGridCheckbox');
            var gridSnapCheckbox = document.getElementById('gridSnapCheckbox');
            var showWallGuidelinesCheckbox = document.getElementById('wallGuidelinesCheckbox');
            var showWallLengthsCheckbox = document.getElementById('wallLengthsCheckbox');
            var showWallAnglesCheckbox = document.getElementById('wallAnglesCheckbox');
            var showOnlySmallWallAnglesCheckbox = document.getElementById('onlySmallWallAnglesCheckbox');
            var unitsConversionFactorInput = document.getElementById('unitsConversionFactorInput');
            var fp = e.diagram;
            var md = fp.model.modelData;
            var units = md.units;
            var unitsRadioChecked = document.getElementById(units);
            unitsRadioChecked.checked = true;
            var gridSize = md.gridSize;
            gridSize = fp.convertPixelsToUnits(gridSize);
            gridSizeInput.value = gridSize;
            fp.changeGridSize(gridSizeInput);
            var unitsConversionFactor = md.unitsConversionFactor;
            unitsConversionFactorInput.value = unitsConversionFactor;
            fp.changeUnitsConversionFactor(unitsConversionFactorInput, gridSizeInput);
            fp.changeUnits(unitsForm);
            var showGrid = md.preferences.showGrid;
            var gridSnap = md.preferences.gridSnap;
            var showWallGuidelines = md.preferences.showWallGuidelines;
            var showWallLengths = md.preferences.showWallLengths;
            var showWallAngles = md.preferences.showWallAngles;
            var showOnlySmallWallAngles = md.preferences.showOnlySmallWallAngles;
            showGridCheckbox.checked = showGrid;
            gridSnapCheckbox.checked = gridSnap;
            showWallGuidelinesCheckbox.checked = showWallGuidelines;
            showWallLengthsCheckbox.checked = showWallLengths;
            showWallAnglesCheckbox.checked = showWallAngles;
            showOnlySmallWallAnglesCheckbox.checked = showOnlySmallWallAngles;
            fp.checkboxChanged('showGridCheckbox');
            fp.checkboxChanged('gridSnapCheckbox');
            fp.checkboxChanged('wallGuidelinesCheckbox');
            fp.checkboxChanged('wallLengthsCheckbox');
            fp.checkboxChanged('wallAnglesCheckbox');
            fp.checkboxChanged('onlySmallWallAnglesCheckbox');
            // update walls and rooms geometries
            fp.nodes.iterator.each(function (n) {
                if (n.category === 'WallGroup') {
                    fp.updateWall(n);
                }
                if (n.category === 'RoomNode') {
                    fp.updateRoom(n);
                }
            });
        });
        /**
         * Update the tools buttons so the tool in use is highlighted
         */
        window.updateButtons = function (func, el) {
            func.call(myFloorplan);
            var toolButtons = document.getElementsByClassName('toolButtons');
            for (var i = 0; i < toolButtons.length; i++) {
                var tb = toolButtons[i];
                if (tb === el) {
                    tb.style.background = '#4b545f';
                    tb.style.color = 'white';
                }
                else {
                    tb.style.background = 'rgb(221, 221, 221)';
                    tb.style.color = 'black';
                }
            }
        };
        JQUERY(function () {
            JQUERY('#ge-palettes-container').accordion({
                heightStyle: 'content',
                activate: function () {
                    for (var i = 0; i < editorHelper.palettes.length; i++) {
                        var palette = editorHelper.palettes[i];
                        palette.requestUpdate();
                    }
                }
            });
            // JQUERY("#ge-overviews-container").accordion();
            var draggables = document.getElementsByClassName('ge-draggable');
            for (var i = 0; i < draggables.length; i++) {
                var draggable = draggables[i];
                var id = '#' + draggable.id;
                var hid = id + '-handle';
                // When a window is dragged, its height is set. this is bad. unset height / maybe width after dragging
                JQUERY(id).draggable({
                    handle: hid, stack: '.ge-draggable', containment: 'parent', scroll: false, stop: function (event) {
                        this.style.height = 'unset';
                        var did = event.target.id;
                        // only unset width for inspector and options menu, whose widths are dependent on contents
                        if (did === 'ge-inspector-window' || did === 'optionsWindow') {
                            this.style.width = 'unset';
                        }
                    }
                });
            }
        }); // end jQuery
        // add options window hotkey (other hotkeys are defined in goeditor-setup.js)
        document.body.addEventListener('keydown', function (e) {
            var keynum = e.which;
            if (e.ctrlKey) {
                e.preventDefault();
                switch (keynum) {
                    case 66:
                        editorHelper.geHideShowWindow('optionsWindow');
                        break; // ctrl + b
                }
            }
        });
        // function to tweak inspector for app-specific stuff is in floorplanner-datainspector-overrides.js
        DataInspectorOverrides_1.tweakInspectorForFloorplanner(editorHelper.inspector, myFloorplan, editorHelper);
        var defaultModelTextarea = document.getElementById('defaultModelTextarea');
        var defaultModelString = defaultModelTextarea.value;
        var defaultModelJson = JSON.parse(defaultModelString);
        myFloorplan.model = go.Model.fromJson(defaultModelJson);
        // Some global function required to be on the window object for click handling
        window.handlePromise = function (action) {
            EditorHelper_1.EditorHelper.prototype.handlePromise.call(editorHelper, action);
        };
    }
    exports.init = init;
});
