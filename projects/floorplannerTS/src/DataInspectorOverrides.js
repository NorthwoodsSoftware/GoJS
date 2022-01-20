/*
* Copyright (C) 1998-2022 by Northwoods Software Corporation
* All Rights Reserved.
*
* Floorplanner app-specific tweaks to the basic Data Inspector class
*/
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../release/go", "./DataInspector"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.tweakInspectorForFloorplanner = void 0;
    var go = require("../../../release/go");
    var DataInspector_1 = require("./DataInspector");
    function tweakInspectorForFloorplanner(inspector, myFloorplan, editorHelper) {
        inspector.properties = {
            'key': { show: false },
            'shape': { show: false },
            'caption': { show: false },
            'loc': { show: false },
            'geo': { show: false },
            'doorOpeningHeight': { show: false },
            'type': { show: DataInspector_1.Inspector.showIfPresent, readOnly: true },
            'category': { show: false },
            'isGroup': { show: false },
            'startpoint': { show: false },
            'endpoint': { show: false },
            'smpt1': { show: false },
            'smpt2': { show: false },
            'empt1': { show: false },
            'empt2': { show: false },
            'swing': { show: false },
            'area': { show: DataInspector_1.Inspector.showIfPresent, readOnly: true },
            'name': { show: DataInspector_1.Inspector.showIfPresent },
            'boundaryWalls': { show: false },
            'holes': { show: false },
            'angle': { show: false },
            'group': { show: false },
            'notes': { show: DataInspector_1.Inspector.showIfPresent },
            'color': {
                show: function (part) {
                    return DataInspector_1.Inspector.showIfPresent && !part.data.usesTexture &&
                        (part.category === '' || part.category === 'MultiPurposeNode');
                },
                type: 'color'
            },
            'stroke': { show: false, type: 'color' },
            'text': { show: DataInspector_1.Inspector.showIfPresent },
            'height': { show: function (part) { return part.category === '' || part.category === 'MultiPurposeNode'; } },
            'width': { show: function (part) { return part.category === '' || part.category === 'MultiPurposeNode'; } },
            'thickness': { show: function (part) { return part.category === 'WallGroup' && !part.data.isDivider; } },
            'isDivider': { show: false },
            'showLabel': { show: DataInspector_1.Inspector.showIfPresent, type: 'checkbox' },
            'floorImage': { show: false },
            'showFlooringOptions': { show: false },
            'labelAlignment': { show: false },
            'texture': { show: false },
            'textures': { show: false },
            'showTextureOptions': { show: false },
            'usesTexture': { show: DataInspector_1.Inspector.showIfPresent, type: 'checkbox' }
        };
        // this is tangentially related to inspector
        // when a node is double clicked on, show the inspector (if it is not shown)
        myFloorplan.nodeTemplateMap.iterator.each(function (kvp) {
            var template = kvp.value;
            template.doubleClick = function () {
                editorHelper.geHideShowWindow('ge-inspector-window', true);
            };
            myFloorplan.nodeTemplateMap.add(kvp.key, template);
        });
        myFloorplan.groupTemplateMap.iterator.each(function (kvp) {
            var template = kvp.value;
            template.doubleClick = function () {
                editorHelper.geHideShowWindow('ge-inspector-window', true);
            };
            myFloorplan.groupTemplateMap.add(kvp.key, template);
        });
        /**
         * Override changes include
         * - Convert raw measurement numbers to units (cm, m, ft, in)
         */
        DataInspector_1.Inspector.prototype.buildPropertyRow = function (propertyName, propertyValue) {
            var mainDiv = this.div;
            var tr = document.createElement('tr');
            var td1 = document.createElement('td');
            td1.textContent = propertyName;
            tr.appendChild(td1);
            var td2 = document.createElement('td');
            var decProp = this.properties[propertyName];
            var input = null;
            var self = this;
            function updateall() { self.updateAllProperties(); }
            if (decProp && decProp.type === 'select') {
                input = document.createElement('select');
                this.updateSelect(decProp, input, propertyName, propertyValue);
                input.addEventListener('change', updateall);
            }
            else {
                input = document.createElement('input');
                var doModify = true;
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
                    var t = decProp.type;
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
                    }
                    if (decProp.type === 'checkbox') {
                        input.checked = !!propertyValue;
                        input.addEventListener('change', updateall);
                    }
                }
                if (input.type !== 'color')
                    input.addEventListener('blur', updateall);
            }
            if (input) {
                input.tabIndex = this.tabIndex++;
                input.disabled = !this.canEditProperty(propertyName, decProp, this.inspectedObject);
                td2.appendChild(input);
            }
            tr.appendChild(td2);
            // maybe need a units tag
            if (input && propertyName === 'height' || propertyName === 'width' || propertyName === 'thickness' || propertyName === 'length' || propertyName === 'area') {
                var input2 = document.createElement('input');
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
        DataInspector_1.Inspector.prototype.updateAllHTML = function () {
            var inspectedProps = this.inspectedProperties;
            var diagram = this.diagram;
            var isPart = this.inspectedObject instanceof go.Part;
            if (this.inspectedObject instanceof go.Node) {
                var node = this.inspectedObject;
                if (node.category !== 'RoomNode') {
                    node.updateTargetBindings();
                    node.updateAdornments();
                }
            }
            var data = isPart ? this.inspectedObject.data : this.inspectedObject;
            if (!data) { // clear out all of the fields
                for (var name_1 in inspectedProps) {
                    var input = inspectedProps[name_1];
                    var table = input.parentNode.parentNode.parentNode;
                    if (table) {
                        table.innerHTML = 'No node selected';
                    }
                }
            }
            else {
                for (var name_2 in inspectedProps) {
                    var input = inspectedProps[name_2];
                    var propertyValue = data[name_2];
                    // if height | width, convert to units (cm, m, ft, in)
                    if (name_2 === 'height' || name_2 === 'width' || name_2 === 'thickness' || name_2 === 'length' || name_2 === 'area') {
                        propertyValue = myFloorplan.convertPixelsToUnits(propertyValue);
                        if (name_2 === 'area') {
                            // units squared, must convert twice
                            propertyValue = myFloorplan.convertPixelsToUnits(propertyValue);
                            propertyValue = propertyValue.toFixed(2);
                        }
                        input.value = propertyValue;
                    }
                    else if (input instanceof HTMLSelectElement) {
                        var decProp = this.properties[name_2];
                        this.updateSelect(decProp, input, name_2, propertyValue);
                    }
                    else if (input.type === 'color') {
                        input.value = this.convertToColor(propertyValue);
                    }
                    else if (input.type === 'checkbox') {
                        input.checked = !!propertyValue;
                    }
                    else {
                        input.value = this.convertToString(propertyValue);
                    }
                }
            }
        };
        /**
         * Override changes include
         * - Convert units measurements to raw units (cm, m, ft, in to document units)
         */
        DataInspector_1.Inspector.prototype.updateAllProperties = function () {
            var inspectedProps = this.inspectedProperties;
            var diagram = this.diagram;
            if (diagram.selection.count === 1 || !this.multipleSelection) { // single object update
                var isPart = this.inspectedObject instanceof go.Part;
                var data = isPart ? this.inspectedObject.data : this.inspectedObject;
                if (!data)
                    return; // must not try to update data when there's no data!
                diagram.startTransaction('set all properties');
                for (var name_3 in inspectedProps) {
                    var input = inspectedProps[name_3];
                    var value = input.value;
                    // don't update "readOnly" data properties
                    var decProp = this.properties[name_3];
                    if (!this.canEditProperty(name_3, decProp, this.inspectedObject))
                        continue;
                    // If it's a boolean, or if its previous value was boolean,
                    // parse the value to be a boolean and then update the input.value to match
                    var type = '';
                    if (decProp !== undefined && decProp.type !== undefined) {
                        type = decProp.type;
                    }
                    if (type === '') {
                        var oldval = data[name_3];
                        if (typeof oldval === 'boolean')
                            type = 'boolean'; // infer boolean
                        else if (typeof oldval === 'number')
                            type = 'number';
                        else if (oldval instanceof go.Point)
                            type = 'point';
                        else if (oldval instanceof go.Size)
                            type = 'size';
                        else if (oldval instanceof go.Rect)
                            type = 'rect';
                        else if (oldval instanceof go.Spot)
                            type = 'spot';
                        else if (oldval instanceof go.Margin)
                            type = 'margin';
                    }
                    // convert to specific type, if needed
                    switch (type) {
                        case 'boolean':
                            value = !(value === false || value === 'false' || value === '0');
                            break;
                        case 'number':
                            value = parseFloat(value);
                            break;
                        case 'arrayofnumber':
                            value = this.convertToArrayOfNumber(value);
                            break;
                        case 'point':
                            value = go.Point.parse(value);
                            break;
                        case 'size':
                            value = go.Size.parse(value);
                            break;
                        case 'rect':
                            value = go.Rect.parse(value);
                            break;
                        case 'spot':
                            value = go.Spot.parse(value);
                            break;
                        case 'margin':
                            value = go.Margin.parse(value);
                            break;
                        case 'checkbox':
                            value = input.checked;
                            break;
                        case 'select':
                            value = decProp.choicesArray[input.selectedIndex];
                            break;
                    }
                    // if height | width, convert to units (cm, m, ft, in)
                    if (input && name_3 === 'height' || name_3 === 'width' || name_3 === 'thickness' || name_3 === 'length' || name_3 === 'area') {
                        value = myFloorplan.convertUnitsToPixels(value);
                        if (name_3 === 'area') {
                            // units squared, must convert twice
                            value = myFloorplan.convertUnitsToPixels(value);
                            value = value.toFixed(2);
                        }
                        if (isNaN(parseFloat(value)) || parseFloat(value) <= 0) {
                            var oldVal = this.inspectedObject.data[name_3];
                            value = oldVal;
                        }
                    }
                    // in case parsed to be different, such as in the case of boolean values,
                    // the value shown should match the actual value
                    if (!(input && name_3 === 'height' || name_3 === 'width' || name_3 === 'thickness' || name_3 === 'length' || name_3 === 'area')) {
                        input.value = value;
                    }
                    // modify the data object in an undo-able fashion
                    diagram.model.setDataProperty(data, name_3, value);
                    if (this.inspectedObject.category === 'WallGroup') {
                        var wall = this.inspectedObject;
                        var wrt = myFloorplan.toolManager.mouseDownTools.elt(3);
                        wrt.performMiteringOnWall(wall);
                        var set = new go.Set();
                        set.add(wall);
                        myFloorplan.updateAllRoomBoundaries(set);
                    }
                    // notify any listener
                    if (this.propertyModified !== null)
                        this.propertyModified(name_3, value, this);
                }
                diagram.commitTransaction('set all properties');
            }
        };
    }
    exports.tweakInspectorForFloorplanner = tweakInspectorForFloorplanner;
});
