'use strict';
/*
*  Copyright (C) 1998-2016 by Northwoods Software Corporation. All Rights Reserved.
*/

/*
  HTML Structure of the Inspector:

  <div id="divid" class="inspector">
    <tr>
      <td>propertyName</td>
      <td><input value=propertyValue /></td>
    </tr>
    ...
  </div>
*/



/*
  This class implements an inspector for GoJS model data objects.
  The constructor takes three arguments:
    {string} divid a string referencing the HTML ID of the to-be inspector's div.
    {Diagram} diagram a reference to a GoJS Diagram.
    {Object} options An optional JS Object describing options for the inspector.

  Options:
    inspectSelection {boolean} Default true, whether to automatically show and populate the Inspector
                               with the currently selected Diagram Part. If set to false, the inspector won't show anything
                               until you call Inspector.inspectObject(object) with a Part or JavaScript object as the argument.
    includesOwnProperties {boolean} Default true, whether to list all properties currently on the inspected data object.
    properties {Object} An object of string:Object pairs representing propertyName:propertyOptions.
                        Can be used to include or exclude additional properties.
    propertyModified function(propertyName, newValue) a callback

  Options for properties:
    show: {boolean|function} a boolean value to show or hide the property from the inspector, or a predicate function to show conditionally.
    readOnly: {boolean} whether or not the property is read-only
    type: {string} a string describing the data type. Supported values: "string|number|color|boolean" Not yet implemented: "point|rect|size"
    defaultValue: {*} a default value for the property. Defaults to the empty string.

  Example usage of Inspector:

  var inspector = new Inspector('myInspector', myDiagram,
    {
      includesOwnProperties: false,
      properties: {
        "key": { readOnly: true, show: Inspector.showIfPresent },
        "comments": { show: Inspector.showIfNode  },
        "LinkComments": { show: Inspector.showIfLink },
      }
    });

*/
function Inspector(divid, diagram, options) {
  var mainDiv = document.getElementById(divid);
  mainDiv.className = 'inspector';
  mainDiv.innerHTML = '';
  this.div = mainDiv;
  this.diagram = diagram;
  // Either a GoJS Part or a simple data object, such as Model.modelData
  this.inspectedObject = null;
  this.inspectedProperties = null;

  // Inspector options defaults:
  this.includesOwnProperties = true;
  this.declaredProperties = {};
  this.inspectsSelection = true;
  this.propertyModified = null;

  if (options !== undefined) {
    if (options['includesOwnProperties'] !== undefined) this.includesOwnProperties = options['includesOwnProperties'];
    if (options['properties'] !== undefined) this.declaredProperties = options['properties'];
    if (options['inspectSelection'] !== undefined) this.inspectsSelection = options['inspectSelection'];
    if (options['propertyModified'] !== undefined) this.propertyModified = options['propertyModified'];
  }

  var self = this;
  diagram.addModelChangedListener(function(e) {
    if (e.isTransactionFinished) self.inspectObject();
  });
  if (this.inspectsSelection) {
    diagram.addDiagramListener('ChangedSelection', function(e) { self.inspectObject(); });
  }
}

// Some static predicates to use with the "show" property.
Inspector.showIfNode = function(part) { return part instanceof go.Node };
Inspector.showIfLink = function(part) { return part instanceof go.Link };
Inspector.showIfGroup = function(part) { return part instanceof go.Group };
// Only show the property if its present. Useful for "key" which will be shown on Nodes and Groups, but not Links
Inspector.showIfPresent = function(part, propname) { return part.data[propname] !== undefined };

// object is an optional argument, not used in the default case of inspectSelection: false
Inspector.prototype.inspectObject = function(object) {
  var inspectedObject = object;
  if (inspectedObject === null || inspectedObject === undefined) {
    if (this.inspectsSelection)
      inspectedObject = this.diagram.selection.first();
    else
      inspectedObject = this.inspectedObject;
  }
  if (inspectedObject === null || inspectedObject === undefined) return; // nothing to inspect
  if (this.inspectedObject === inspectedObject) {
    this.updateAllProperties();
    return;
  }
  this.inspectedObject = inspectedObject;
  var mainDiv = this.div;
  mainDiv.innerHTML = '';
  if (inspectedObject === null) return;

  // use either the Part.data or the object itself (for model.modelData)
  var data = (inspectedObject instanceof go.Part) ? inspectedObject.data : inspectedObject;
  // Build table:
  var table = document.createElement('table');
  var tbody = document.createElement('tbody');
  this.inspectedProperties = {};
  this.tabIndex = 0;
  var declaredProperties = this.declaredProperties;

  // Go through all the properties passed in to the inspector and show them, if appropriate:
  for (var k in declaredProperties) {
    var val = declaredProperties[k];
    if (!this.canShowProperty(k, val, inspectedObject)) continue;
    var defaultValue = "";
    if (val.defaultValue !== undefined) defaultValue = val.defaultValue;
    if (data[k] !== undefined) defaultValue = data[k];
    tbody.appendChild(this.buildPropertyRow(k, defaultValue || ""));
  }
  // Go through all the properties on the model data and show them, if appropriate:
  if (this.includesOwnProperties) {
    for (var k in data) {
      if (k === '__gohashid') continue; // skip internal GoJS hash property
      if (this.inspectedProperties[k]) continue; // already exists
      if (declaredProperties[k] && !this.canShowProperty(k, declaredProperties[k], inspectedObject)) continue;

      tbody.appendChild(this.buildPropertyRow(k, data[k]));
    }
  }

  table.appendChild(tbody);
  mainDiv.appendChild(table);
};

Inspector.prototype.canShowProperty = function(propertyName, property, inspectedObject) {
  if (property.show === false) return false;
  // if "show" is a predicate, make sure it passes or do not show this property
  if (typeof property.show === "function") return property.show(inspectedObject, propertyName);
  return true;
}

/*  This sets this.inspectedProperties[propertyName] and creates the HTML table row:
    <tr>
      <td>propertyName</td>
      <td><input value=propertyValue /></td>
    </tr>
*/
Inspector.prototype.buildPropertyRow = function(propertyName, propertyValue) {
  var mainDiv = this.div;
  var tr = document.createElement('tr');
  var td1 = document.createElement('td');
  var td2 = document.createElement('td');
  var input = document.createElement('input');
  td1.textContent = propertyName;
  var decProp = this.declaredProperties[propertyName];
  input.tabIndex = this.tabIndex++;
  var self = this;
  function setprops() { self.setAllProperties(); }
  input.value = propertyValue;
  if (decProp !== undefined) {
    if (decProp.readOnly) input.disabled = true;
    if (decProp.type === 'color') {
      input.setAttribute('type', 'color');
      if (input.type === 'color') {
        input.addEventListener('input', setprops);
        input.addEventListener('change', setprops);
        input.value = this.setColor(propertyValue);
      }
    }
  }
  if (this.diagram.model.isReadOnly) input.disabled = true;

  if (input.type !== 'color') input.addEventListener('blur', setprops);

  td2.appendChild(input);
  tr.appendChild(td1);
  tr.appendChild(td2);
  this.inspectedProperties[propertyName] = input;
  return tr;
};

Inspector.prototype.setColor = function(propertyValue) {
  // hack: HTML5 color input will only take hex,
  // so let HTML5 canvas convert the color into hex format.
  // this converts "rgb(255, 0, 0)" into "#FF0000", etc.
  var ctx = document.createElement("canvas").getContext('2d');
  ctx.fillStyle = propertyValue;
  return ctx.fillStyle;
}

Inspector.prototype.updateAllProperties = function() {
  var inspectedProps = this.inspectedProperties;
  var diagram = this.diagram;
  var isPart = this.inspectedObject instanceof go.Part;
  var data = isPart ? this.inspectedObject.data : this.inspectedObject;

  for (var name in inspectedProps) {
    var input = inspectedProps[name];
    var propertyValue = data[name];
    if (input.type === 'color') {
      input.value = this.setColor(propertyValue);
    } else {
      input.value = propertyValue;
    }

  }
}

Inspector.prototype.setAllProperties = function() {
  var inspectedProps = this.inspectedProperties;
  var diagram = this.diagram;
  var model = diagram.model;
  var isPart = this.inspectedObject instanceof go.Part;
  var data = isPart ? this.inspectedObject.data : this.inspectedObject;
  diagram.startTransaction('set all properties');
  for (var name in inspectedProps) {
    var value = inspectedProps[name].value;

    // If its a boolean, or if its previous value was boolean,
    // parse the value to be a boolean and then update the input.value to match
    var decProp = this.declaredProperties[name];
    var readonly = false;
    if (decProp !== undefined && decProp.readOnly !== undefined) {
      readonly = !!decProp.readOnly;
    }
    if (readonly) continue;
    var type = '';
    if (decProp !== undefined && decProp.type !== undefined) {
      type = decProp.type;
    }
    if (type === '' && this.isBoolean(data[name])) type = 'boolean'; // infer boolean
    switch (type) {
      case 'boolean':
        value = !(value == false || value === "false");
        break;
      case 'number':
        value = parseFloat(value);
        break;
    }
    // In case parsed to be different, such as in the case of boolean values:
    inspectedProps[name].value = value;

    model.setDataProperty(data, name, value);
    if (this.propertyModified !== null) this.propertyModified(name, value);
  }
  diagram.commitTransaction('set all properties');
};

// whether or not something is strictly a bool value
Inspector.prototype.isBoolean = function(value) {
  return value === true || value === false;
}