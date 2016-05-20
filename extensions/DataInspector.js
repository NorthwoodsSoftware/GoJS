"use strict";
/*
*  Copyright (C) 1998-2016 by Northwoods Software Corporation. All Rights Reserved.
*/

/**
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
    readOnly: {boolean|function} whether or not the property is read-only
    type: {string} a string describing the data type. Supported values: "string|number|color|boolean" Not yet implemented: "point|rect|size"
    defaultValue: {*} a default value for the property. Defaults to the empty string.

  Example usage of Inspector:

  var inspector = new Inspector("myInspector", myDiagram,
    {
      includesOwnProperties: false,
      properties: {
        "key": { readOnly: true, show: Inspector.showIfPresent },
        "comments": { show: Inspector.showIfNode  },
        "LinkComments": { show: Inspector.showIfLink },
      }
    });

  This is the basic HTML Structure that the Inspector creates within the given DIV element:

  <div id="divid" class="inspector">
    <tr>
      <td>propertyName</td>
      <td><input value=propertyValue /></td>
    </tr>
    ...
  </div>

*/
function Inspector(divid, diagram, options) {
  var mainDiv = document.getElementById(divid);
  mainDiv.className = "inspector";
  mainDiv.innerHTML = "";
  this._div = mainDiv;
  this._diagram = diagram;
  this._inspectedProperties = {};

  // Either a GoJS Part or a simple data object, such as Model.modelData
  this.inspectedObject = null;

  // Inspector options defaults:
  this.includesOwnProperties = true;
  this.declaredProperties = {};
  this.inspectsSelection = true;
  this.propertyModified = null;

  if (options !== undefined) {
    if (options["includesOwnProperties"] !== undefined) this.includesOwnProperties = options["includesOwnProperties"];
    if (options["properties"] !== undefined) this.declaredProperties = options["properties"];
    if (options["inspectSelection"] !== undefined) this.inspectsSelection = options["inspectSelection"];
    if (options["propertyModified"] !== undefined) this.propertyModified = options["propertyModified"];
  }

  var self = this;
  diagram.addModelChangedListener(function(e) {
    if (e.isTransactionFinished) self.inspectObject();
  });
  if (this.inspectsSelection) {
    diagram.addDiagramListener("ChangedSelection", function(e) { self.inspectObject(); });
  }
}

// Some static predicates to use with the "show" property.
Inspector.showIfNode = function(part) { return part instanceof go.Node };
Inspector.showIfLink = function(part) { return part instanceof go.Link };
Inspector.showIfGroup = function(part) { return part instanceof go.Group };

// Only show the property if its present. Useful for "key" which will be shown on Nodes and Groups, but normally not on Links
Inspector.showIfPresent = function(data, propname) {
  if (data instanceof go.Part) data = data.data;
  return typeof data === "object" && data[propname] !== undefined;
};

/**
* Update the HTML state of this Inspector given the properties of the {@link #inspectedObject}.
* @param {Object} object is an optional argument, used when {@link #inspectSelection} is false to
*                        set {@link #inspectedObject} and show and edit that object's properties.
*/
Inspector.prototype.inspectObject = function(object) {
  var inspectedObject = object;
  if (inspectedObject === undefined) {
    if (this.inspectsSelection)
      inspectedObject = this._diagram.selection.first();
    else
      inspectedObject = this.inspectedObject;
  }

  if (inspectedObject === null || this.inspectedObject === inspectedObject) {
    this.inspectedObject = inspectedObject;
    this.updateAllHTML();
    return;
  }

  this.inspectedObject = inspectedObject;
  var mainDiv = this._div;
  mainDiv.innerHTML = "";
  if (inspectedObject === null) return;

  // use either the Part.data or the object itself (for model.modelData)
  var data = (inspectedObject instanceof go.Part) ? inspectedObject.data : inspectedObject;
  if (!data) return;
  // Build table:
  var table = document.createElement("table");
  var tbody = document.createElement("tbody");
  this._inspectedProperties = {};
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
      if (k === "__gohashid") continue; // skip internal GoJS hash property
      if (this._inspectedProperties[k]) continue; // already exists
      if (declaredProperties[k] && !this.canShowProperty(k, declaredProperties[k], inspectedObject)) continue;
      tbody.appendChild(this.buildPropertyRow(k, data[k]));
    }
  }

  table.appendChild(tbody);
  mainDiv.appendChild(table);
};

/**
* @ignore
* This predicate should be false if the given property should not be shown.
* Normally it only checks the value of "show" on the property descriptor.
* The default value is true.
* @param {string} propertyName the property name
* @param {Object} propertyDesc the property descriptor
* @param {Object} inspectedObject the data object
* @return {boolean} whether a particular property should be shown in this Inspector
*/
Inspector.prototype.canShowProperty = function(propertyName, propertyDesc, inspectedObject) {
  if (propertyDesc.show === false) return false;
  // if "show" is a predicate, make sure it passes or do not show this property
  if (typeof propertyDesc.show === "function") return propertyDesc.show(inspectedObject, propertyName);
  return true;
}

/**
* @ignore
* This predicate should be false if the given property should not be editable by the user.
* Normally it only checks the value of "readOnly" on the property descriptor.
* The default value is true.
* @param {string} propertyName the property name
* @param {Object} propertyDesc the property descriptor
* @param {Object} inspectedObject the data object
* @return {boolean} whether a particular property should be shown in this Inspector
*/
Inspector.prototype.canEditProperty = function(propertyName, propertyDesc, inspectedObject) {
  // assume property values that are functions of Objects cannot be edited
  var data = (inspectedObject instanceof go.Part) ? inspectedObject.data : inspectedObject;
  var valtype = typeof data[propertyName];
  if (valtype === "function" || valtype === "object") return false;  //?? handle Objects such as Points
  if (propertyDesc) {
    if (propertyDesc.readOnly === true) return false;
    // if "readOnly" is a predicate, make sure it passes or do not show this property
    if (typeof propertyDesc.readOnly === "function") return !propertyDesc.readOnly(inspectedObject, propertyName);
  }
  return true;
}

/**
* @ignore
* This sets this._inspectedProperties[propertyName] and creates the HTML table row:
*    <tr>
*      <td>propertyName</td>
*      <td><input value=propertyValue /></td>
*    </tr>
* @param {string} propertyName the property name
* @param {*} propertyValue the property value
* @return the table row
*/
Inspector.prototype.buildPropertyRow = function(propertyName, propertyValue) {
  var mainDiv = this._div;
  var tr = document.createElement("tr");

  var td1 = document.createElement("td");
  td1.textContent = propertyName;
  tr.appendChild(td1);

  var td2 = document.createElement("td");
  var input = document.createElement("input");
  var decProp = this.declaredProperties[propertyName];
  input.tabIndex = this.tabIndex++;

  var self = this;
  function setprops() { self.updateAllProperties(); }

  input.value = propertyValue;
  input.disabled = !this.canEditProperty(propertyName, decProp, this.inspectedObject);
  if (decProp !== undefined && decProp.type === "color") {
    input.setAttribute("type", "color");
    if (input.type === "color") {
      input.addEventListener("input", setprops);
      input.addEventListener("change", setprops);
      input.value = this.setColor(propertyValue);
    }
  }
  if (this._diagram.model.isReadOnly) input.disabled = true;

  if (input.type !== "color") input.addEventListener("blur", setprops);

  td2.appendChild(input);
  tr.appendChild(td2);

  this._inspectedProperties[propertyName] = input;
  return tr;
};

/**
* @ignore
* HTML5 color input will only take hex,
* so let HTML5 canvas convert the color into hex format.
* This converts "rgb(255, 0, 0)" into "#FF0000", etc.
* @param {string} propertyValue
* @return {string}
*/
Inspector.prototype.setColor = function(propertyValue) {
  var ctx = document.createElement("canvas").getContext("2d");
  ctx.fillStyle = propertyValue;
  return ctx.fillStyle;
}

/**
* @ignore
* Update all of the HTML in this Inspector.
*/
Inspector.prototype.updateAllHTML = function() {
  var inspectedProps = this._inspectedProperties;
  var diagram = this._diagram;
  var isPart = this.inspectedObject instanceof go.Part;
  var data = isPart ? this.inspectedObject.data : this.inspectedObject;
  if (!data) {  // clear out all of the fields
    for (var name in inspectedProps) {
      var input = inspectedProps[name];
      input.value = "";
    }
  } else {
    for (var name in inspectedProps) {
      var input = inspectedProps[name];
      var propertyValue = data[name];
      if (input.type === "color") {
        input.value = this.setColor(propertyValue);
      } else {
        input.value = propertyValue;
      }
    }
  }
}

/**
* @ignore
* Update all of the data properties of {@link #inspectedObject} according to the
* current values held in the HTML input elements.
*/
Inspector.prototype.updateAllProperties = function() {
  var inspectedProps = this._inspectedProperties;
  var diagram = this._diagram;
  var isPart = this.inspectedObject instanceof go.Part;
  var data = isPart ? this.inspectedObject.data : this.inspectedObject;
  if (!data) return;  // must not try to update data when there's no data!

  diagram.startTransaction("set all properties");
  for (var name in inspectedProps) {
    var value = inspectedProps[name].value;

    // don't update "readOnly" data properties
    var decProp = this.declaredProperties[name];
    if (!this.canEditProperty(name, decProp, this.inspectedObject)) continue;

    // If it's a boolean, or if its previous value was boolean,
    // parse the value to be a boolean and then update the input.value to match
    var type = "";
    if (decProp !== undefined && decProp.type !== undefined) {
      type = decProp.type;
    }
    if (type === "" && typeof data[name] === "boolean") type = "boolean"; // infer boolean

    // convert to specific type, if needed
    switch (type) {
      case "boolean":
        value = !(value == false || value === "false" || value === "0");
        break;
      case "number":
        value = parseFloat(value);
        break;
    }

    // in case parsed to be different, such as in the case of boolean values,
    // the value shown should match the actual value
    inspectedProps[name].value = value;

    // modify the data object in an undo-able fashion
    diagram.model.setDataProperty(data, name, value);

    // notify any listener
    if (this.propertyModified !== null) this.propertyModified(name, value);
  }
  diagram.commitTransaction("set all properties");
};
