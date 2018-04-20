(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    *  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
    */
    var go = require("../release/go");
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
        type: {string} a string describing the data type. Supported values: "string|number|boolean|color|arrayofnumber|point|rect|size|spot|margin|select"
        defaultValue: {*} a default value for the property. Defaults to the empty string.
        choices: {Array|function} when type == "select", the Array of choices to use or a function that returns the Array of choices.
    
      Example usage of Inspector:
    
      var inspector = new Inspector("myInspector", myDiagram,
        {
          includesOwnProperties: false,
          properties: {
            "key": { show: Inspector.showIfPresent, readOnly: true },
            "comments": { show: Inspector.showIfNode  },
            "LinkComments": { show: Inspector.showIfLink },
            "chosen": { show: Inspector.showIfNode, type: "checkbox" },
            "state": { show: Inspector.showIfNode, type: "select", choices: ["Stopped", "Parked", "Moving"] }
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
    var Inspector = /** @class */ (function () {
        function Inspector(divid, diagram, options) {
            this._inspectedProperties = {};
            // Either a GoJS Part or a simple data object, such as Model.modelData
            this.inspectedObject = null;
            // Inspector options defaults:
            this.includesOwnProperties = true;
            this.declaredProperties = {};
            this.inspectsSelection = true;
            this.propertyModified = null;
            this.divid = divid;
            this.diagram = diagram;
            this.options = options;
            var mainDiv = document.getElementById(divid);
            mainDiv.className = "inspector";
            mainDiv.innerHTML = "";
            this._div = mainDiv;
            this._diagram = diagram;
            if (options !== undefined) {
                if (options["includesOwnProperties"] !== undefined)
                    this.includesOwnProperties = options["includesOwnProperties"];
                if (options["properties"] !== undefined)
                    this.declaredProperties = options["properties"];
                if (options["inspectSelection"] !== undefined)
                    this.inspectsSelection = options["inspectSelection"];
                if (options["propertyModified"] !== undefined)
                    this.propertyModified = options["propertyModified"];
            }
            var self = this;
            this.diagram.addModelChangedListener(function (e) {
                if (e.isTransactionFinished)
                    self.inspectObject();
            });
            if (this.inspectsSelection) {
                this.diagram.addDiagramListener("ChangedSelection", function (e) { self.inspectObject(); });
            }
        }
        // Some static predicates to use with the "show" property.
        Inspector.showIfNode = function (part) { return part instanceof go.Node; };
        ;
        Inspector.showIfLink = function (part) { return part instanceof go.Link; };
        ;
        Inspector.showIfGroup = function (part) { return part instanceof go.Group; };
        ;
        // Only show the property if its present. Useful for "key" which will be shown on Nodes and Groups, but normally not on Links
        Inspector.showIfPresent = function (data, propname) {
            if (data instanceof go.Part)
                data = data.data;
            return typeof data === "object" && data[propname] !== undefined;
        };
        /**
        * Update the HTML state of this Inspector given the properties of the {@link #inspectedObject}.
        * @param {Object} object is an optional argument, used when {@link #inspectSelection} is false to
        *                        set {@link #inspectedObject} and show and edit that object's properties.
        */
        Inspector.prototype.inspectObject = function (object) {
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
            if (this.inspectObject === null)
                return;
            var mainDiv = this._div;
            mainDiv.innerHTML = "";
            // use either the Part.data or the object itself (for model.modelData)
            var data = (inspectedObject instanceof go.Part) ? inspectedObject.data : inspectedObject;
            if (!data)
                return;
            // Build table:
            var table = document.createElement("table");
            var tbody = document.createElement("tbody");
            this._inspectedProperties = {};
            this.tabIndex = 0;
            var declaredProperties = this.declaredProperties;
            // Go through all the properties passed in to the inspector and show them, if appropriate:
            for (var k in declaredProperties) {
                var val = declaredProperties[k];
                if (!this.canShowProperty(k, val, inspectedObject))
                    continue;
                var defaultValue = "";
                if (val.defaultValue !== undefined)
                    defaultValue = val.defaultValue;
                if (data[k] !== undefined)
                    defaultValue = data[k];
                tbody.appendChild(this.buildPropertyRow(k, defaultValue || ""));
            }
            // Go through all the properties on the model data and show them, if appropriate:
            if (this.includesOwnProperties) {
                for (var k in data) {
                    if (k === "__gohashid")
                        continue; // skip internal GoJS hash property
                    if (this._inspectedProperties[k])
                        continue; // already exists
                    if (declaredProperties[k] && !this.canShowProperty(k, declaredProperties[k], inspectedObject))
                        continue;
                    tbody.appendChild(this.buildPropertyRow(k, data[k]));
                }
            }
            table.appendChild(tbody);
            mainDiv.appendChild(table);
        };
        ;
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
        Inspector.prototype.canShowProperty = function (propertyName, propertyDesc, inspectedObject) {
            if (propertyDesc.show === false)
                return false;
            // if "show" is a predicate, make sure it passes or do not show this property
            if (typeof propertyDesc.show === "function")
                return propertyDesc.show(inspectedObject, propertyName);
            return true;
        };
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
        Inspector.prototype.canEditProperty = function (propertyName, propertyDesc, inspectedObject) {
            if (this._diagram.isReadOnly || this._diagram.isModelReadOnly)
                return false;
            // assume property values that are functions of Objects cannot be edited
            var data = (inspectedObject instanceof go.Part) ? inspectedObject.data : inspectedObject;
            var valtype = typeof data[propertyName];
            if (valtype === "function")
                return false;
            if (propertyDesc) {
                if (propertyDesc.readOnly === true)
                    return false;
                // if "readOnly" is a predicate, make sure it passes or do not show this property
                if (typeof propertyDesc.readOnly === "function")
                    return !propertyDesc.readOnly(inspectedObject, propertyName);
            }
            return true;
        };
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
        Inspector.prototype.buildPropertyRow = function (propertyName, propertyValue) {
            var mainDiv = this._div;
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            td1.textContent = propertyName;
            tr.appendChild(td1);
            var td2 = document.createElement("td");
            var decProp = this.declaredProperties[propertyName];
            var input = null;
            var self = this;
            function updateall() { self.updateAllProperties(); }
            if (decProp && decProp.type === "select") {
                input = document.createElement("select");
                this.updateSelect(decProp, input, propertyName, propertyValue);
                input.addEventListener("change", updateall);
            }
            else {
                input = document.createElement("input");
                input.value = this.convertToString(propertyValue);
                if (decProp) {
                    var t = decProp.type;
                    if (t !== 'string' && t !== 'number' && t !== 'boolean' &&
                        t !== 'arrayofnumber' && t !== 'point' && t !== 'size' &&
                        t !== 'rect' && t !== 'spot' && t !== 'margin') {
                        input.setAttribute("type", decProp.type);
                    }
                    if (decProp.type === "color") {
                        if (input.type === "color") {
                            input.value = this.convertToColor(propertyValue);
                            input.addEventListener("input", updateall);
                            input.addEventListener("change", updateall);
                        }
                    }
                    if (decProp.type === "checkbox") {
                        input.checked = !!propertyValue;
                        input.addEventListener("change", updateall);
                    }
                }
                if (input.type !== "color")
                    input.addEventListener("blur", updateall);
            }
            if (input) {
                input.tabIndex = this.tabIndex++;
                input.disabled = !this.canEditProperty(propertyName, decProp, this.inspectedObject);
                td2.appendChild(input);
            }
            tr.appendChild(td2);
            this._inspectedProperties[propertyName] = input;
            return tr;
        };
        ;
        /**
        * @ignore
        * HTML5 color input will only take hex,
        * so let HTML5 canvas convert the color into hex format.
        * This converts "rgb(255, 0, 0)" into "#FF0000", etc.
        * @param {string} propertyValue
        * @return {string}
        */
        Inspector.prototype.convertToColor = function (propertyValue) {
            var ctx = document.createElement("canvas").getContext("2d");
            ctx.fillStyle = propertyValue;
            return ctx.fillStyle;
        };
        /**
        * @ignore
        * @param {string}
        * @return {Array.<number>}
        */
        Inspector.prototype.convertToArrayOfNumber = function (propertyValue) {
            if (propertyValue === "null")
                return null;
            var split = propertyValue.split(' ');
            var arr = [];
            for (var i = 0; i < split.length; i++) {
                var str = split[i];
                if (!str)
                    continue;
                arr.push(parseFloat(str));
            }
            return arr;
        };
        ;
        /**
        * @ignore
        * @param {*}
        * @return {string}
        */
        Inspector.prototype.convertToString = function (x) {
            if (x === undefined)
                return "undefined";
            if (x === null)
                return "null";
            if (x instanceof go.Point)
                return go.Point.stringify(x);
            if (x instanceof go.Size)
                return go.Size.stringify(x);
            if (x instanceof go.Rect)
                return go.Rect.stringify(x);
            if (x instanceof go.Spot)
                return go.Spot.stringify(x);
            if (x instanceof go.Margin)
                return go.Margin.stringify(x);
            if (x instanceof go.List)
                return this.convertToString(x.toArray());
            if (Array.isArray(x)) {
                var str = "";
                for (var i = 0; i < x.length; i++) {
                    if (i > 0)
                        str += " ";
                    var v = x[i];
                    str += this.convertToString(v);
                }
                return str;
            }
            return x.toString();
        };
        ;
        /**
        * @ignore
        * Update all of the HTML in this Inspector.
        */
        Inspector.prototype.updateAllHTML = function () {
            var inspectedProps = this._inspectedProperties;
            var diagram = this._diagram;
            var isPart = this.inspectedObject instanceof go.Part;
            var data = isPart ? this.inspectedObject.data : this.inspectedObject;
            if (!data) { // clear out all of the fields
                for (var name in inspectedProps) {
                    var input = inspectedProps[name];
                    if (input instanceof HTMLSelectElement) {
                        input.innerHTML = "";
                    }
                    else if (input.type === "color") {
                        input.value = "#000000";
                    }
                    else if (input.type === "checkbox") {
                        input.checked = false;
                    }
                    else {
                        input.value = "";
                    }
                }
            }
            else {
                for (var name in inspectedProps) {
                    var input = inspectedProps[name];
                    var propertyValue = data[name];
                    if (input instanceof HTMLSelectElement) {
                        var decProp = this.declaredProperties[name];
                        this.updateSelect(decProp, input, name, propertyValue);
                    }
                    else if (input.type === "color") {
                        input.value = this.convertToColor(propertyValue);
                    }
                    else if (input.type === "checkbox") {
                        input.checked = !!propertyValue;
                    }
                    else {
                        input.value = this.convertToString(propertyValue);
                    }
                }
            }
        };
        /**
        * @ignore
        * Update an HTMLSelectElement with an appropriate list of choices, given the propertyName
        */
        Inspector.prototype.updateSelect = function (decProp, select, propertyName, propertyValue) {
            select.innerHTML = ""; // clear out anything that was there
            var choices = decProp.choices;
            if (typeof choices === "function")
                choices = choices(this.inspectedObject, propertyName);
            if (!Array.isArray(choices))
                choices = [];
            decProp.choicesArray = choices; // remember list of actual choice values (not strings)
            for (var i = 0; i < choices.length; i++) {
                var choice = choices[i];
                var opt = document.createElement("option");
                opt.text = this.convertToString(choice);
                select.add(opt, null);
            }
            select.value = this.convertToString(propertyValue);
        };
        /**
        * @ignore
        * Update all of the data properties of {@link #inspectedObject} according to the
        * current values held in the HTML input elements.
        */
        Inspector.prototype.updateAllProperties = function () {
            var inspectedProps = this._inspectedProperties;
            var diagram = this._diagram;
            var isPart = this.inspectedObject instanceof go.Part;
            var data = isPart ? this.inspectedObject.data : this.inspectedObject;
            if (!data)
                return; // must not try to update data when there's no data!
            diagram.startTransaction("set all properties");
            for (var name in inspectedProps) {
                var input = inspectedProps[name];
                var value = input.value;
                // don't update "readOnly" data properties
                var decProp = this.declaredProperties[name];
                if (!this.canEditProperty(name, decProp, this.inspectedObject))
                    continue;
                // If it's a boolean, or if its previous value was boolean,
                // parse the value to be a boolean and then update the input.value to match
                var type = "";
                if (decProp !== undefined && decProp.type !== undefined) {
                    type = decProp.type;
                }
                if (type === "") {
                    var oldval = data[name];
                    if (typeof oldval === "boolean")
                        type = "boolean"; // infer boolean
                    else if (typeof oldval === "number")
                        type = "number";
                    else if (oldval instanceof go.Point)
                        type = "point";
                    else if (oldval instanceof go.Size)
                        type = "size";
                    else if (oldval instanceof go.Rect)
                        type = "rect";
                    else if (oldval instanceof go.Spot)
                        type = "spot";
                    else if (oldval instanceof go.Margin)
                        type = "margin";
                }
                // convert to specific type, if needed
                switch (type) {
                    case "boolean":
                        value = !(value == false || value === "false" || value === "0");
                        break;
                    case "number":
                        value = parseFloat(value);
                        break;
                    case "arrayofnumber":
                        value = this.convertToArrayOfNumber(value);
                        break;
                    case "point":
                        value = go.Point.parse(value);
                        break;
                    case "size":
                        value = go.Size.parse(value);
                        break;
                    case "rect":
                        value = go.Rect.parse(value);
                        break;
                    case "spot":
                        value = go.Spot.parse(value);
                        break;
                    case "margin":
                        value = go.Margin.parse(value);
                        break;
                    case "checkbox":
                        value = input.checked;
                        break;
                    case "select":
                        value = decProp.choicesArray[input.selectedIndex];
                        break;
                }
                // in case parsed to be different, such as in the case of boolean values,
                // the value shown should match the actual value
                input.value = value;
                // modify the data object in an undo-able fashion
                diagram.model.setDataProperty(data, name, value);
                // notify any listener
                if (this.propertyModified !== null)
                    this.propertyModified(name, value, this);
            }
            diagram.commitTransaction("set all properties");
        };
        ;
        return Inspector;
    }());
    exports.Inspector = Inspector;
});
