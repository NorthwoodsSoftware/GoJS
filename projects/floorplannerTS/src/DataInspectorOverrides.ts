/*
* Copyright (C) 1998-2023 by Northwoods Software Corporation
* All Rights Reserved.
*
* Floorplanner app-specific tweaks to the basic Data Inspector class
*/

import * as go from '../../../release/go';
import { Inspector } from './DataInspector';
import { EditorHelper } from './EditorHelper';
import { Floorplan } from './Floorplan';
import { WallReshapingTool } from './WallReshapingTool';

export function tweakInspectorForFloorplanner(inspector: Inspector, myFloorplan: Floorplan, editorHelper: EditorHelper) {

  inspector.properties = {
    'key': { show: false },
    'shape': { show: false },
    'caption': { show: false },
    'loc': { show: false },
    'geo': { show: false },
    'doorOpeningHeight': { show: false },
    'type': { show: Inspector.showIfPresent, readOnly: true },
    'category': { show: false },
    'isGroup': { show: false },
    'startpoint': { show: false },
    'endpoint': { show: false },
    'smpt1': { show: false },
    'smpt2': { show: false },
    'empt1': { show: false },
    'empt2': { show: false },
    'swing': { show: false },
    'area': { show: Inspector.showIfPresent, readOnly: true },
    'name': { show: Inspector.showIfPresent },
    'boundaryWalls': { show: false },
    'holes': { show: false },
    'angle': { show: false },
    'group': { show: false },
    'notes': { show: Inspector.showIfPresent },
    'color': {
      show: function(part: go.Part) {
        return Inspector.showIfPresent && !part.data.usesTexture &&
          (part.category === '' || part.category === 'MultiPurposeNode');
      }, type: 'color'
    },
    'stroke': { show: false, type: 'color' },
    'text': { show: Inspector.showIfPresent },
    'height': { show: function(part: go.Part) { return part.category === '' || part.category === 'MultiPurposeNode'; } },
    'width': { show: function(part: go.Part) { return part.category === '' || part.category === 'MultiPurposeNode'; } },
    'thickness': { show: function(part: go.Part) { return part.category === 'WallGroup' && !part.data.isDivider; } },
    'isDivider': { show: false },
    'showLabel': { show: Inspector.showIfPresent, type: 'checkbox' },
    'floorImage': { show: false },
    'showFlooringOptions': { show: false },
    'labelAlignment': { show: false },
    'texture': { show: false },
    'textures': { show: false },
    'showTextureOptions': { show: false },
    'usesTexture': { show: Inspector.showIfPresent, type: 'checkbox' }
  };

  // this is tangentially related to inspector
  // when a node is double clicked on, show the inspector (if it is not shown)
  myFloorplan.nodeTemplateMap.iterator.each(function(kvp) {
    const template = kvp.value;
    template.doubleClick = function() {
      editorHelper.geHideShowWindow('ge-inspector-window', true);
    };
    myFloorplan.nodeTemplateMap.add(kvp.key, template);
  });

  myFloorplan.groupTemplateMap.iterator.each(function(kvp) {
    const template = kvp.value;
    template.doubleClick = function() {
      editorHelper.geHideShowWindow('ge-inspector-window', true);
    };
    myFloorplan.groupTemplateMap.add(kvp.key, template);
  });

  /**
   * Override changes include
   * - Convert raw measurement numbers to units (cm, m, ft, in)
   */
  Inspector.prototype.buildPropertyRow = function(propertyName, propertyValue) {
    const mainDiv = this.div;
    const tr = document.createElement('tr');

    const td1 = document.createElement('td');
    td1.textContent = propertyName;
    tr.appendChild(td1);

    const td2 = document.createElement('td');
    const decProp = this.properties[propertyName];
    let input = null;
    const self = this;
    function updateall() { self.updateAllProperties(); }

    if (decProp && decProp.type === 'select') {
      input = document.createElement('select');
      this.updateSelect(decProp, input, propertyName, propertyValue);
      input.addEventListener('change', updateall);
    } else {
      input = document.createElement('input');
      let doModify = true;
      // if height | width, convert to units (cm, m, ft, in)
      if (propertyName === 'height' || propertyName === 'width' || propertyName === 'thickness' || propertyName === 'length' || propertyName === 'area') {
        propertyValue = myFloorplan.convertPixelsToUnits(propertyValue);
        if (propertyName === 'area') {
          // units squared, must convert twice
          propertyValue = myFloorplan.convertPixelsToUnits(propertyValue);
          propertyValue = propertyValue.toFixed(2);
        }
        input.className = 'unitsInput'; // this ensures values in these inputs are updated when units change
        if (isNaN(propertyValue) || propertyValue <= 0) {
          doModify = false;
        }
      }

      if (doModify) {
        input.value = this.convertToString(propertyValue);
      }

      if (decProp) {
        const t = decProp.type;
        if (t !== 'string' && t !== 'number' && t !== 'boolean' &&
          t !== 'arrayofnumber' && t !== 'point' && t !== 'size' &&
          t !== 'rect' && t !== 'spot' && t !== 'margin') {
          input.setAttribute('type', decProp.type);
        }
        if (decProp.type === 'color') {
          if (input.type === 'color') {
            input.value = this.convertToColor(propertyValue);
            input.addEventListener('change', updateall);
          }
        } if (decProp.type === 'checkbox') {
          input.checked = !!propertyValue;
          input.addEventListener('change', updateall);
        }
      }
      if (input.type !== 'color') input.addEventListener('blur', updateall);
    }

    if (input) {
      input.tabIndex = this.tabIndex++;
      input.disabled = !this.canEditProperty(propertyName, decProp, this.inspectedObject);
      td2.appendChild(input);
    }
    tr.appendChild(td2);

    // maybe need a units tag
    if (input && propertyName === 'height' || propertyName === 'width' || propertyName === 'thickness' || propertyName === 'length' || propertyName === 'area') {
      const input2 = document.createElement('input');
      input2.value = myFloorplan.model.modelData.unitsAbbreviation;
      input2.disabled = true;
      input2.className = 'unitsBox';
      if (propertyName === 'area') {
        input2.value += String.fromCharCode(178);
      }
      td2.appendChild(input2);
    }

    this.inspectedProperties[propertyName] = input;
    return tr;
  };

  /**
   * Override changes include
   * - Convert raw measurement numbers to units (cm, m, ft, in)
   */
  Inspector.prototype.updateAllHTML = function() {
    const inspectedProps = this.inspectedProperties;
    const diagram = this.diagram;
    const isPart = this.inspectedObject instanceof go.Part;
    if (this.inspectedObject instanceof go.Node) {
      const node = this.inspectedObject;
      if (node.category !== 'RoomNode') {
        node.updateTargetBindings();
        node.updateAdornments();
      }
    }
    const data = isPart ? (this.inspectedObject as go.ObjectData).data : this.inspectedObject;
    if (!data) {  // clear out all of the fields
      for (const name in inspectedProps) {
        const input = inspectedProps[name];
        const table = input.parentNode.parentNode.parentNode;
        if (table) {
          table.innerHTML = 'No node selected';
        }
      }
    } else {
      for (const name in inspectedProps) {
        const input = inspectedProps[name];
        let propertyValue = data[name];
        // if height | width, convert to units (cm, m, ft, in)
        if (name === 'height' || name === 'width' || name === 'thickness' || name === 'length' || name === 'area') {
          propertyValue = myFloorplan.convertPixelsToUnits(propertyValue);
          if (name === 'area') {
            // units squared, must convert twice
            propertyValue = myFloorplan.convertPixelsToUnits(propertyValue);
            propertyValue = propertyValue.toFixed(2);
          }
          input.value = propertyValue;
        } else if (input instanceof HTMLSelectElement) {
          const decProp = this.properties[name];
          this.updateSelect(decProp, input, name, propertyValue);
        } else if (input.type === 'color') {
          input.value = this.convertToColor(propertyValue);
        } else if (input.type === 'checkbox') {
          input.checked = !!propertyValue;
        } else {
          input.value = this.convertToString(propertyValue);
        }
      }
    }
  };

  /**
   * Override changes include
   * - Convert units measurements to raw units (cm, m, ft, in to document units)
   */
  Inspector.prototype.updateAllProperties = function() {
    const inspectedProps = this.inspectedProperties;
    const diagram = this.diagram;
    if (diagram.selection.count === 1 || !this.multipleSelection) { // single object update
      const isPart = this.inspectedObject instanceof go.Part;
      const data = isPart ? (this.inspectedObject as go.ObjectData).data : this.inspectedObject;
      if (!data) return;  // must not try to update data when there's no data!

      diagram.startTransaction('set all properties');
      for (const name in inspectedProps) {
        const input = inspectedProps[name];
        let value = input.value;

        // don't update "readOnly" data properties
        const decProp = this.properties[name];
        if (!this.canEditProperty(name, decProp, this.inspectedObject)) continue;

        // If it's a boolean, or if its previous value was boolean,
        // parse the value to be a boolean and then update the input.value to match
        let type = '';
        if (decProp !== undefined && decProp.type !== undefined) {
          type = decProp.type;
        }
        if (type === '') {
          const oldval = data[name];
          if (typeof oldval === 'boolean') type = 'boolean'; // infer boolean
          else if (typeof oldval === 'number') type = 'number';
          else if (oldval instanceof go.Point) type = 'point';
          else if (oldval instanceof go.Size) type = 'size';
          else if (oldval instanceof go.Rect) type = 'rect';
          else if (oldval instanceof go.Spot) type = 'spot';
          else if (oldval instanceof go.Margin) type = 'margin';
        }

        // convert to specific type, if needed
        switch (type) {
          case 'boolean': value = !(value === false || value === 'false' || value === '0'); break;
          case 'number': value = parseFloat(value); break;
          case 'arrayofnumber': value = this.convertToArrayOfNumber(value); break;
          case 'point': value = go.Point.parse(value); break;
          case 'size': value = go.Size.parse(value); break;
          case 'rect': value = go.Rect.parse(value); break;
          case 'spot': value = go.Spot.parse(value); break;
          case 'margin': value = go.Margin.parse(value); break;
          case 'checkbox': value = input.checked; break;
          case 'select': value = decProp.choicesArray[input.selectedIndex]; break;
        }

        // if height | width, convert to units (cm, m, ft, in)
        if (input && name === 'height' || name === 'width' || name === 'thickness' || name === 'length' || name === 'area') {
          value = myFloorplan.convertUnitsToPixels(value);
          if (name === 'area') {
            // units squared, must convert twice
            value = myFloorplan.convertUnitsToPixels(value);
            value = value.toFixed(2);
          }
          if (isNaN(parseFloat(value)) || parseFloat(value) <= 0) {
            const oldVal = (this.inspectedObject as go.ObjectData).data[name];
            value = oldVal;
          }
        }

        // in case parsed to be different, such as in the case of boolean values,
        // the value shown should match the actual value
        if (!(input && name === 'height' || name === 'width' || name === 'thickness' || name === 'length' || name === 'area')) {
          input.value = value;
        }

        // modify the data object in an undo-able fashion
        diagram.model.setDataProperty(data, name, value);

        if ((this.inspectedObject as go.ObjectData).category === 'WallGroup') {
          const wall = this.inspectedObject as go.Group;
          const wrt = myFloorplan.toolManager.mouseDownTools.elt(3) as WallReshapingTool;
          wrt.performMiteringOnWall(wall);
          const set = new go.Set<go.Group>(); set.add(wall);
          myFloorplan.updateAllRoomBoundaries(set);
        }

        // notify any listener
        if (this.propertyModified !== null) this.propertyModified(name, value, this);
      }

      diagram.commitTransaction('set all properties');
    }
  };

}



