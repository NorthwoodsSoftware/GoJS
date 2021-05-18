import * as go from '../../../release/go';
import { tweakInspectorForFloorplanner } from './DataInspectorOverrides';
import { EditorHelper } from './EditorHelper';
import { Floorplan } from './Floorplan';
import { FloorplanPalette } from './FloorplanPalette';

/**
 * Script to set up the Floorplanner editor
 * @param JQUERY jQuery passed to this script in floorplannerTS/index.html via requireJS
 * @hidden @internal
 */
export function init(JQUERY: any) {

  const editorHelper = new EditorHelper(1, 2, '../../projects/storage', Floorplan, JQUERY);

  // replace generic palettes with FloorplanPalettes
  const myFloorplan: Floorplan = editorHelper.diagrams[0] as Floorplan;
  editorHelper.palettes[0].div = null;
  editorHelper.palettes[1].div = null;

  const furniturePalette = new FloorplanPalette('ge-palette-0', myFloorplan);
  furniturePalette.model = new go.GraphLinksModel(myFloorplan.makeDefaultFurniturePaletteNodeData());
  editorHelper.palettes[0] = furniturePalette;

  const wallPartsPalette = new FloorplanPalette('ge-palette-1', myFloorplan);
  wallPartsPalette.model = new go.GraphLinksModel(myFloorplan.makeDefaultWallpartsPaletteNodeData());
  editorHelper.palettes[1] = wallPartsPalette;

  // set default model for all Cloud Storage subclasses
  for (const i in editorHelper.storages) {
    const storage = editorHelper.storages[i];
    const dm = JSON.stringify({
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
  myFloorplan.addDiagramListener('InitialLayoutCompleted', function(e: go.DiagramEvent) {

    // update units, grid size, units / px, showGrid, and preferences from the loading model's modelData
    const unitsForm = document.getElementById('unitsForm') as HTMLFormElement;
    const gridSizeInput = document.getElementById('gridSizeInput') as HTMLInputElement;
    const showGridCheckbox = document.getElementById('showGridCheckbox') as HTMLInputElement;
    const gridSnapCheckbox = document.getElementById('gridSnapCheckbox') as HTMLInputElement;
    const showWallGuidelinesCheckbox = document.getElementById('wallGuidelinesCheckbox') as HTMLInputElement;
    const showWallLengthsCheckbox = document.getElementById('wallLengthsCheckbox') as HTMLInputElement;
    const showWallAnglesCheckbox = document.getElementById('wallAnglesCheckbox') as HTMLInputElement;
    const showOnlySmallWallAnglesCheckbox = document.getElementById('onlySmallWallAnglesCheckbox') as HTMLInputElement;

    const unitsConversionFactorInput = document.getElementById('unitsConversionFactorInput') as HTMLInputElement;

    const fp = e.diagram as Floorplan;
    const md = fp.model.modelData;
    const units = md.units;
    const unitsRadioChecked = document.getElementById(units) as HTMLInputElement;
    unitsRadioChecked.checked = true;
    let gridSize = md.gridSize;
    gridSize = fp.convertPixelsToUnits(gridSize);
    gridSizeInput.value = gridSize;
    fp.changeGridSize(gridSizeInput);
    const unitsConversionFactor = md.unitsConversionFactor;
    unitsConversionFactorInput.value = unitsConversionFactor;
    fp.changeUnitsConversionFactor(unitsConversionFactorInput, gridSizeInput);
    fp.changeUnits(unitsForm);

    const showGrid = md.preferences.showGrid;
    const gridSnap = md.preferences.gridSnap;
    const showWallGuidelines = md.preferences.showWallGuidelines;
    const showWallLengths = md.preferences.showWallLengths;
    const showWallAngles = md.preferences.showWallAngles;
    const showOnlySmallWallAngles = md.preferences.showOnlySmallWallAngles;

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
    fp.nodes.iterator.each(function(n) {
      if (n.category === 'WallGroup') {
        fp.updateWall(n as go.Group);
      }

      if (n.category === 'RoomNode') {
        fp.updateRoom(n);
      }
    });

  });

  /**
   * Update the tools buttons so the tool in use is highlighted
   */
  (window as any).updateButtons = function(func: Function, el: HTMLElement) {
    func.call(myFloorplan);
    const toolButtons = document.getElementsByClassName('toolButtons');
    for (let i = 0; i < toolButtons.length; i++) {
      const tb = toolButtons[i] as HTMLElement;
      if (tb === el) {
        tb.style.background = '#4b545f';
        tb.style.color = 'white';
      } else {
        tb.style.background = 'rgb(221, 221, 221)';
        tb.style.color = 'black';
      }
    }
  };

  JQUERY(function() {
    JQUERY('#ge-palettes-container').accordion({
      heightStyle: 'content',
      activate: function() {
        for (let i = 0; i < editorHelper.palettes.length; i++) {
          const palette = editorHelper.palettes[i];
          palette.requestUpdate();
        }
      }
    });
    // JQUERY("#ge-overviews-container").accordion();
    const draggables = document.getElementsByClassName('ge-draggable');
    for (let i = 0; i < draggables.length; i++) {
      const draggable = draggables[i];
      const id = '#' + draggable.id; const hid = id + '-handle';
      // When a window is dragged, its height is set. this is bad. unset height / maybe width after dragging
      JQUERY(id).draggable({
        handle: hid, stack: '.ge-draggable', containment: 'parent', scroll: false, stop: function(event: any) {
          this.style.height = 'unset';
          const did = event.target.id;
          // only unset width for inspector and options menu, whose widths are dependent on contents
          if (did === 'ge-inspector-window' || did === 'optionsWindow') {
            this.style.width = 'unset';
          }
        }
      });
    }
  }); // end jQuery

  // add options window hotkey (other hotkeys are defined in goeditor-setup.js)
  document.body.addEventListener('keydown', function(e) {
    const keynum = e.which;
    if (e.ctrlKey) {
      e.preventDefault();
      switch (keynum) {
        case 66: editorHelper.geHideShowWindow('optionsWindow'); break; // ctrl + b
      }
    }
  });

  // function to tweak inspector for app-specific stuff is in floorplanner-datainspector-overrides.js
  tweakInspectorForFloorplanner(editorHelper.inspector, myFloorplan, editorHelper);

  const defaultModelTextarea = document.getElementById('defaultModelTextarea') as HTMLInputElement;
  const defaultModelString = defaultModelTextarea.value;
  const defaultModelJson = JSON.parse(defaultModelString);
  myFloorplan.model = go.Model.fromJson(defaultModelJson);

  // Some global function required to be on the window object for click handling
  (window as any).handlePromise = (action: string) => {
    EditorHelper.prototype.handlePromise.call(editorHelper, action);
  };

}
