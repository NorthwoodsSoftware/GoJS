/*
*  Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved.
*/
/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/
import * as go from '../release/go-module.js';
/**
 * This class implements an inspector for GoJS model data objects.
 * The constructor takes three arguments:
 *   - `divid` ***string*** a string referencing the HTML ID of the to-be inspector's div
 *   - `diagram` ***Diagram*** a reference to a GoJS Diagram
 *   - `options` ***Object*** an optional JS Object describing options for the inspector
 *
 * Options:
 *   - `inspectSelection` ***boolean*** see {@link #inspectSelection}
 *   - `includesOwnProperties` ***boolean*** see {@link #includesOwnProperties}
 *   - `properties` ***Object*** see {@link #properties}
 *   - `propertyModified` ***function(propertyName, newValue, inspector)*** see {@link #propertyModified}
 *   - `multipleSelection` ***boolean*** see {@link #multipleSelection}
 *   - `showUnionProperties` ***boolean*** see {@link #showUnionProperties}
 *   - `showLimit` ***number*** see {@link #showLimit}
 *
 * Options for properties:
 *   - `show` ***boolean | function*** a boolean value to show or hide the property from the inspector, or a predicate function to show conditionally.
 *   - `readOnly` ***boolean | function*** whether or not the property is read-only
 *   - `type` ***string*** a string describing the data type. Supported values: "string|number|boolean|color|arrayofnumber|point|rect|size|spot|margin|select"
 *   - `defaultValue` ***any*** a default value for the property. Defaults to the empty string.
 *   - `choices` ***Array | function*** when type === "select", the Array of choices to use or a function that returns the Array of choices.
 *
 * Example usage of Inspector:
 * ```js
 * var inspector = new Inspector("myInspector", myDiagram,
 *   {
 *     includesOwnProperties: false,
 *     properties: {
 *       "key": { show: Inspector.showIfPresent, readOnly: true },
 *       "comments": { show: Inspector.showIfNode  },
 *       "LinkComments": { show: Inspector.showIfLink },
 *       "chosen": { show: Inspector.showIfNode, type: "checkbox" },
 *       "state": { show: Inspector.showIfNode, type: "select", choices: ["Stopped", "Parked", "Moving"] }
 *     }
 *   });
 * ```
 *
 * This is the basic HTML Structure that the Inspector creates within the given DIV element:
 * ```html
 * <div id="divid" class="inspector">
 *   <tr>
 *     <td>propertyName</td>
 *     <td><input value=propertyValue /></td>
 *   </tr>
 *   ...
 * </div>
 * ```
 *
 * If you want to experiment with this extension, try the <a href="../../extensionsTS/DataInspector.html">Data Inspector</a> sample.
 * @category Extension
 */
export class Inspector {
    /**
     * Constructs an Inspector and sets up properties based on the options provided.
     * Also sets up change listeners on the Diagram so the Inspector stays up-to-date.
     * @param {string} divid a string referencing the HTML ID of the to-be Inspector's div
     * @param {Diagram} diagram a reference to a GoJS Diagram
     * @param {Object=} options an optional JS Object describing options for the inspector
     */
    constructor(divid, diagram, options) {
        this._inspectedObject = null;
        // Inspector options defaults:
        this._inspectSelection = true;
        this._includesOwnProperties = true;
        this._properties = {};
        this._propertyModified = null;
        this._multipleSelection = false;
        this._showUnionProperties = false;
        this._showLimit = 0;
        // Private variables used to keep track of internal state
        this.inspectedProperties = {};
        this.multipleProperties = {};
        const mainDiv = document.getElementById(divid);
        mainDiv.className = 'inspector';
        mainDiv.innerHTML = '';
        this._div = mainDiv;
        this._diagram = diagram;
        this.tabIndex = 0;
        // Set properties based on options
        if (options !== undefined) {
            if (options.inspectSelection !== undefined)
                this._inspectSelection = options.inspectSelection;
            if (options.includesOwnProperties !== undefined)
                this._includesOwnProperties = options.includesOwnProperties;
            if (options.properties !== undefined)
                this._properties = options.properties;
            if (options.propertyModified !== undefined)
                this._propertyModified = options.propertyModified;
            if (options.multipleSelection !== undefined)
                this._multipleSelection = options.multipleSelection;
            if (options.showUnionProperties !== undefined)
                this._showUnionProperties = options.showUnionProperties;
            if (options.showLimit !== undefined)
                this._showLimit = options.showLimit;
        }
        // Prepare change listeners
        const self = this;
        this.inspectOnModelChanged = (e) => {
            if (e.isTransactionFinished)
                self.inspectObject();
        };
        this.inspectOnSelectionChanged = (e) => { self.inspectObject(); };
        this._diagram.addModelChangedListener(this.inspectOnModelChanged);
        if (this._inspectSelection) {
            this._diagram.addDiagramListener('ChangedSelection', this.inspectOnSelectionChanged);
        }
    }
    /**
     * This read-only property returns the HTMLElement containing the Inspector.
     */
    get div() { return this._div; }
    /**
     * Gets or sets the {@link Diagram} associated with this Inspector.
     */
    get diagram() { return this._diagram; }
    set diagram(val) {
        if (val !== this._diagram) {
            // First, unassociate change listeners with current inspected diagram
            this._diagram.removeModelChangedListener(this.inspectOnModelChanged);
            this._diagram.removeDiagramListener('ChangedSelection', this.inspectOnSelectionChanged);
            // Now set the diagram and add the necessary change listeners
            this._diagram = val;
            this._diagram.addModelChangedListener(this.inspectOnModelChanged);
            if (this._inspectSelection) {
                this._diagram.addDiagramListener('ChangedSelection', this.inspectOnSelectionChanged);
                this.inspectObject();
            }
            else {
                this.inspectObject(null);
            }
        }
    }
    /**
     * This read-only property returns the object currently being inspected.
     *
     * To set the inspected object, call {@link #inspectObject}.
     */
    get inspectedObject() { return this._inspectedObject; }
    /**
     * Gets or sets whether the Inspector automatically inspects the associated Diagram's selection.
     * When set to false, the Inspector won't show anything until {@link #inspectObject} is called.
     *
     * The default value is true.
     */
    get inspectSelection() { return this._inspectSelection; }
    set inspectSelection(val) {
        if (val !== this._inspectSelection) {
            this._inspectSelection = val;
            if (this._inspectSelection) {
                this._diagram.addDiagramListener('ChangedSelection', this.inspectOnSelectionChanged);
                this.inspectObject();
            }
            else {
                this._diagram.removeDiagramListener('ChangedSelection', this.inspectOnSelectionChanged);
                this.inspectObject(null);
            }
        }
    }
    /**
     * Gets or sets whether the Inspector includes all properties currently on the inspected object.
     *
     * The default value is true.
     */
    get includesOwnProperties() { return this._includesOwnProperties; }
    set includesOwnProperties(val) {
        if (val !== this._includesOwnProperties) {
            this._includesOwnProperties = val;
            this.inspectObject();
        }
    }
    /**
     * Gets or sets the properties that the Inspector will inspect, maybe setting options for those properties.
     * The object should contain string: Object pairs represnting propertyName: propertyOptions.
     * Can be used to include or exclude additional properties.
     *
     * The default value is an empty object.
     */
    get properties() { return this._properties; }
    set properties(val) {
        if (val !== this._properties) {
            this._properties = val;
            this.inspectObject();
        }
    }
    /**
     * Gets or sets the function to be called when a property is modified by the Inspector.
     * The first paremeter will be the property name, the second will be the new value, and the third will be a reference to this Inspector.
     *
     * The default value is null, meaning nothing will be done.
     */
    get propertyModified() { return this._propertyModified; }
    set propertyModified(val) {
        if (val !== this._propertyModified) {
            this._propertyModified = val;
        }
    }
    /**
     * Gets or sets whether the Inspector displays properties for multiple selected objects or just the first.
     *
     * The default value is false, meaning only the first item in the {@link Diagram#selection} is inspected.
     */
    get multipleSelection() { return this._multipleSelection; }
    set multipleSelection(val) {
        if (val !== this._multipleSelection) {
            this._multipleSelection = val;
            this.inspectObject();
        }
    }
    /**
     * Gets or sets whether the Inspector displays the union or intersection of properties for multiple selected objects.
     *
     * The default value is false, meaning the intersection of properties is inspected.
     */
    get showUnionProperties() { return this._showUnionProperties; }
    set showUnionProperties(val) {
        if (val !== this._showUnionProperties) {
            this._showUnionProperties = val;
            this.inspectObject();
        }
    }
    /**
     * Gets or sets how many objects will be displayed when {@link #multipleSelection} is true.
     *
     * The default value is 0, meaning all selected objects will be displayed for a given property.
     */
    get showLimit() { return this._showLimit; }
    set showLimit(val) {
        if (val !== this._showLimit) {
            this._showLimit = val;
            this.inspectObject();
        }
    }
    /**
     * This predicate function can be used as a value for the `show` option for properties.
     * When used, the property will only be shown when inspecting a {@link Node}.
     * @param {Part} part the Part being inspected
     * @return {boolean}
     */
    static showIfNode(part) { return part instanceof go.Node; }
    /**
     * This predicate function can be used as a value for the `show` option for properties.
     * When used, the property will only be shown when inspecting a {@link Link}.
     * @param {Part} part the Part being inspected
     * @return {boolean}
     */
    static showIfLink(part) { return part instanceof go.Link; }
    /**
     * This predicate function can be used as a value for the `show` option for properties.
     * When used, the property will only be shown when inspecting a {@link Group}.
     * @param {Part} part the Part being inspected
     * @return {boolean}
     */
    static showIfGroup(part) { return part instanceof go.Group; }
    /**
     * This predicate function can be used as a value for the `show` option for properties.
     * When used, the property will only be shown if present.
     * Useful for properties such as `key`, which will be shown on Nodes and Groups, but normally not on Links
     * @param {Part|null} part the Part being inspected
     * @param {string} propname the property to check presence of
     * @return {boolean}
     */
    static showIfPresent(data, propname) {
        if (data instanceof go.Part)
            data = data.data;
        return typeof data === 'object' && data[propname] !== undefined;
    }
    /**
     * Update the HTML state of this Inspector with the given object.
     *
     * If passed an object, the Inspector will inspect that object.
     * If passed null, this will do nothing.
     * If no parameter is supplied, the {@link #inspectedObject} will be set based on the value of {@link #inspectSelection}.
     * @param {Object=} object an optional argument, used when {@link #inspectSelection} is false to
     *   set {@link #inspectedObject} and show and edit that object's properties.
     */
    inspectObject(object) {
        let inspectedObject = null;
        let inspectedObjects = null;
        if (object === null)
            return;
        if (object === undefined) {
            if (this._inspectSelection) {
                if (this._multipleSelection) { // gets the selection if multiple selection is true
                    inspectedObjects = this._diagram.selection;
                }
                else { // otherwise grab the first object
                    inspectedObject = this._diagram.selection.first();
                }
            }
            else { // if there is a single inspected object
                inspectedObject = this._inspectedObject;
            }
        }
        else { // if object was passed in as a parameter
            inspectedObject = object;
        }
        if (!inspectedObjects && inspectedObject) {
            inspectedObjects = new go.Set();
            inspectedObjects.add(inspectedObject);
        }
        if (!inspectedObjects || inspectedObjects.count < 1) { // if nothing is selected
            this.updateAllHTML();
            return;
        }
        if (inspectedObjects) {
            const mainDiv = this._div;
            mainDiv.innerHTML = '';
            const shared = new go.Map(); // for properties that the nodes have in common
            const properties = new go.Map(); // for adding properties
            const all = new go.Map(); // used later to prevent changing properties when unneeded
            const it = inspectedObjects.iterator;
            let nodecount = 2;
            // Build table:
            const table = document.createElement('table');
            const tbody = document.createElement('tbody');
            this.inspectedProperties = {};
            this.tabIndex = 0;
            const declaredProperties = this._properties;
            it.next();
            inspectedObject = it.value;
            this._inspectedObject = inspectedObject;
            let data = (inspectedObject instanceof go.Part) ? inspectedObject.data : inspectedObject;
            if (data) { // initial pass to set shared and all
                // Go through all the properties passed in to the inspector and add them to the map, if appropriate:
                for (const name in declaredProperties) {
                    const desc = declaredProperties[name];
                    if (!this.canShowProperty(name, desc, inspectedObject))
                        continue;
                    const val = this.findValue(name, desc, data);
                    if (val === '' && this._properties[name] && this._properties[name].type === 'checkbox') {
                        shared.add(name, false);
                        all.add(name, false);
                    }
                    else {
                        shared.add(name, val);
                        all.add(name, val);
                    }
                }
                // Go through all the properties on the model data and add them to the map, if appropriate:
                if (this._includesOwnProperties) {
                    for (const k in data) {
                        if (k === '__gohashid')
                            continue; // skip internal GoJS hash property
                        if (this.inspectedProperties[k])
                            continue; // already exists
                        if (declaredProperties[k] && !this.canShowProperty(k, declaredProperties[k], inspectedObject))
                            continue;
                        shared.add(k, data[k]);
                        all.add(k, data[k]);
                    }
                }
            }
            while (it.next() && (this._showLimit < 1 || nodecount <= this._showLimit)) { // grabs all the properties from the other selected objects
                properties.clear();
                inspectedObject = it.value;
                if (inspectedObject) {
                    // use either the Part.data or the object itself (for model.modelData)
                    data = (inspectedObject instanceof go.Part) ? inspectedObject.data : inspectedObject;
                    if (data) {
                        // Go through all the properties passed in to the inspector and add them to properties to add, if appropriate:
                        for (const name in declaredProperties) {
                            const desc = declaredProperties[name];
                            if (!this.canShowProperty(name, desc, inspectedObject))
                                continue;
                            const val = this.findValue(name, desc, data);
                            if (val === '' && this._properties[name] && this._properties[name].type === 'checkbox') {
                                properties.add(name, false);
                            }
                            else {
                                properties.add(name, val);
                            }
                        }
                        // Go through all the properties on the model data and add them to properties to add, if appropriate:
                        if (this._includesOwnProperties) {
                            for (const k in data) {
                                if (k === '__gohashid')
                                    continue; // skip internal GoJS hash property
                                if (this.inspectedProperties[k])
                                    continue; // already exists
                                if (declaredProperties[k] && !this.canShowProperty(k, declaredProperties[k], inspectedObject))
                                    continue;
                                properties.add(k, data[k]);
                            }
                        }
                    }
                }
                if (!this._showUnionProperties) {
                    // Cleans up shared map with properties that aren't shared between the selected objects
                    // Also adds properties to the add and shared maps if applicable
                    const addIt = shared.iterator;
                    const toRemove = [];
                    while (addIt.next()) {
                        if (properties.has(addIt.key)) {
                            let newVal = all.get(addIt.key) + '|' + properties.get(addIt.key);
                            all.set(addIt.key, newVal);
                            if ((declaredProperties[addIt.key] && declaredProperties[addIt.key].type !== 'color'
                                && declaredProperties[addIt.key].type !== 'checkbox' && declaredProperties[addIt.key].type !== 'select')
                                || !declaredProperties[addIt.key]) { // for non-string properties i.e color
                                newVal = shared.get(addIt.key) + '|' + properties.get(addIt.key);
                                shared.set(addIt.key, newVal);
                            }
                        }
                        else { // toRemove array since addIt is still iterating
                            toRemove.push(addIt.key);
                        }
                    }
                    for (let i = 0; i < toRemove.length; i++) { // removes anything that doesn't showUnionProperties
                        shared.remove(toRemove[i]);
                        all.remove(toRemove[i]);
                    }
                }
                else {
                    // Adds missing properties to all with the correct amount of seperators
                    let addIt = properties.iterator;
                    while (addIt.next()) {
                        if (all.has(addIt.key)) {
                            if ((declaredProperties[addIt.key] && declaredProperties[addIt.key].type !== 'color'
                                && declaredProperties[addIt.key].type !== 'checkbox' && declaredProperties[addIt.key].type !== 'select')
                                || !declaredProperties[addIt.key]) { // for non-string properties i.e color
                                const newVal = all.get(addIt.key) + '|' + properties.get(addIt.key);
                                all.set(addIt.key, newVal);
                            }
                        }
                        else {
                            let newVal = '';
                            for (let i = 0; i < nodecount - 1; i++)
                                newVal += '|';
                            newVal += properties.get(addIt.key);
                            all.set(addIt.key, newVal);
                        }
                    }
                    // Adds bars in case properties is not in all
                    addIt = all.iterator;
                    while (addIt.next()) {
                        if (!properties.has(addIt.key)) {
                            if ((declaredProperties[addIt.key] && declaredProperties[addIt.key].type !== 'color'
                                && declaredProperties[addIt.key].type !== 'checkbox' && declaredProperties[addIt.key].type !== 'select')
                                || !declaredProperties[addIt.key]) { // for non-string properties i.e color
                                const newVal = all.get(addIt.key) + '|';
                                all.set(addIt.key, newVal);
                            }
                        }
                    }
                }
                nodecount++;
            }
            // builds the table property rows and sets multipleProperties to help with updateall
            let mapIt;
            if (!this._showUnionProperties)
                mapIt = shared.iterator;
            else
                mapIt = all.iterator;
            while (mapIt.next()) {
                tbody.appendChild(this.buildPropertyRow(mapIt.key, mapIt.value)); // shows the properties that are allowed
            }
            table.appendChild(tbody);
            mainDiv.appendChild(table);
            const allIt = all.iterator;
            while (allIt.next()) {
                this.multipleProperties[allIt.key] = allIt.value; // used for updateall to know which properties to change
            }
        }
    }
    /**
     * This predicate should be false if the given property should not be shown.
     * Normally it only checks the value of "show" on the property descriptor.
     *
     * The default value is true.
     * @param {string} propertyName the property name
     * @param {Object} propertyDesc the property descriptor
     * @param {Object} inspectedObject the data object
     * @return {boolean} whether a particular property should be shown in this Inspector
     */
    canShowProperty(propertyName, propertyDesc, inspectedObject) {
        const prop = propertyDesc;
        if (prop.show === false)
            return false;
        // if "show" is a predicate, make sure it passes or do not show this property
        if (typeof prop.show === 'function')
            return prop.show(inspectedObject, propertyName);
        return true;
    }
    /**
     * This predicate should be false if the given property should not be editable by the user.
     * Normally it only checks the value of "readOnly" on the property descriptor.
     *
     * The default value is true.
     * @param {string} propertyName the property name
     * @param {Object} propertyDesc the property descriptor
     * @param {Object} inspectedObject the data object
     * @return {boolean} whether a particular property should be shown in this Inspector
     */
    canEditProperty(propertyName, propertyDesc, inspectedObject) {
        if (this._diagram.isReadOnly || this._diagram.isModelReadOnly)
            return false;
        if (inspectedObject === null)
            return false;
        // assume property values that are functions of Objects cannot be edited
        const data = (inspectedObject instanceof go.Part) ? inspectedObject.data : inspectedObject;
        const valtype = typeof data[propertyName];
        if (valtype === 'function')
            return false;
        if (propertyDesc) {
            const prop = propertyDesc;
            if (prop.readOnly === true)
                return false;
            // if "readOnly" is a predicate, make sure it passes or do not show this property
            if (typeof prop.readOnly === 'function')
                return !prop.readOnly(inspectedObject, propertyName);
        }
        return true;
    }
    /**
     * @ignore
     * @param propName
     * @param propDesc
     * @param data
     */
    findValue(propName, propDesc, data) {
        let val = '';
        if (propDesc && propDesc.defaultValue !== undefined)
            val = propDesc.defaultValue;
        if (data[propName] !== undefined)
            val = data[propName];
        if (val === undefined)
            return '';
        return val;
    }
    /**
     * This sets `inspectedProperties[propertyName]` and creates the HTML table row for a given property:
     * ```html
     * <tr>
     *   <td>propertyName</td>
     *   <td><input value=propertyValue /></td>
     * </tr>
     * ```
     *
     * This method can be customized to change how an Inspector row is rendered.
     * @param {string} propertyName the property name
     * @param {*} propertyValue the property value
     * @return {HTMLTableRowElement} the table row
     */
    buildPropertyRow(propertyName, propertyValue) {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        let displayName;
        if (this._properties[propertyName] && this._properties[propertyName].name !== undefined) { // name changes the dispaly name shown on inspector
            displayName = this._properties[propertyName].name;
        }
        else {
            displayName = propertyName;
        }
        td1.textContent = displayName;
        tr.appendChild(td1);
        const td2 = document.createElement('td');
        const decProp = this._properties[propertyName];
        let input = null;
        const self = this;
        function updateall() {
            if (self._diagram.selection.count === 1 || !self.multipleSelection) {
                self.updateAllProperties();
            }
            else {
                self.updateAllObjectsProperties();
            }
        }
        if (decProp && decProp.type === 'select') {
            input = document.createElement('select');
            this.updateSelect(decProp, input, propertyName, propertyValue);
            input.addEventListener('change', updateall);
        }
        else {
            input = document.createElement('input');
            input.value = this.convertToString(propertyValue);
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
                        // input.addEventListener('input', updateall); // removed with multi select
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
            input.disabled = !this.canEditProperty(propertyName, decProp, this._inspectedObject);
            td2.appendChild(input);
        }
        tr.appendChild(td2);
        this.inspectedProperties[propertyName] = input;
        return tr;
    }
    /**
     * @hidden @ignore
     * HTML5 color input will only take hex,
     * so let HTML5 canvas convert the color into hex format.
     * This converts "rgb(255, 0, 0)" into "#FF0000", etc.
     */
    convertToColor(propertyValue) {
        const ctx = document.createElement('canvas').getContext('2d');
        if (ctx === null)
            return '#000000';
        ctx.fillStyle = propertyValue;
        return ctx.fillStyle;
    }
    /**
     * @hidden @ignore
     */
    convertToArrayOfNumber(propertyValue) {
        if (propertyValue === 'null')
            return null;
        const split = propertyValue.split(' ');
        const arr = [];
        for (let i = 0; i < split.length; i++) {
            const str = split[i];
            if (!str)
                continue;
            arr.push(parseFloat(str));
        }
        return arr;
    }
    /**
     * @hidden @ignore
     */
    convertToString(x) {
        if (x === undefined)
            return 'undefined';
        if (x === null)
            return 'null';
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
            let str = '';
            for (let i = 0; i < x.length; i++) {
                if (i > 0)
                    str += ' ';
                const v = x[i];
                str += this.convertToString(v);
            }
            return str;
        }
        return x.toString();
    }
    /**
     * @hidden @ignore
     * Update all of the HTML in this Inspector.
     */
    updateAllHTML() {
        const inspectedProps = this.inspectedProperties;
        const isPart = this._inspectedObject instanceof go.Part;
        const data = isPart ? this._inspectedObject.data : this._inspectedObject;
        if (!data) { // clear out all of the fields
            for (const name in inspectedProps) {
                const input = inspectedProps[name];
                if (input instanceof HTMLSelectElement) {
                    input.innerHTML = '';
                }
                else if (input.type === 'color') {
                    input.value = '#000000';
                }
                else if (input.type === 'checkbox') {
                    input.checked = false;
                }
                else {
                    input.value = '';
                }
            }
        }
        else {
            for (const name in inspectedProps) {
                const input = inspectedProps[name];
                const propertyValue = data[name];
                if (input instanceof HTMLSelectElement) {
                    const decProp = this._properties[name];
                    this.updateSelect(decProp, input, name, propertyValue);
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
    }
    /**
     * @hidden @ignore
     * Update an HTMLSelectElement with an appropriate list of choices, given the propertyName
     */
    updateSelect(decProp, select, propertyName, propertyValue) {
        select.innerHTML = ''; // clear out anything that was there
        let choices = decProp.choices;
        if (typeof choices === 'function')
            choices = choices(this._inspectedObject, propertyName);
        if (!Array.isArray(choices))
            choices = [];
        decProp.choicesArray = choices; // remember list of actual choice values (not strings)
        for (let i = 0; i < choices.length; i++) {
            const choice = choices[i];
            const opt = document.createElement('option');
            opt.text = this.convertToString(choice);
            select.add(opt);
        }
        select.value = this.convertToString(propertyValue);
    }
    parseValue(decProp, value, input, oldval) {
        // If it's a boolean, or if its previous value was boolean,
        // parse the value to be a boolean and then update the input.value to match
        let type = '';
        if (decProp !== undefined && decProp.type !== undefined) {
            type = decProp.type;
        }
        if (type === '') {
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
        return value;
    }
    /**
     * @hidden @ignore
     * Update all of the data properties of all the objects in {@link #inspectedObjects} according to the
     * current values held in the HTML input elements.
     */
    updateAllObjectsProperties() {
        const inspectedProps = this.inspectedProperties;
        const diagram = this._diagram;
        diagram.startTransaction('set all properties');
        for (const name in inspectedProps) {
            const input = inspectedProps[name];
            let value = input.value;
            const arr1 = value.split('|');
            let arr2 = [];
            if (this.multipleProperties[name]) {
                // don't split if it is union and its checkbox type
                if (this._properties[name] && this._properties[name].type === 'checkbox' && this._showUnionProperties) {
                    arr2.push(this.multipleProperties[name]);
                }
                else if (this._properties[name]) {
                    arr2 = this.multipleProperties[name].toString().split('|');
                }
            }
            const it = diagram.selection.iterator;
            let change = false;
            if (this._properties[name] && this._properties[name].type === 'checkbox')
                change = true; // always change checkbox
            if (arr1.length < arr2.length // i.e Alpha|Beta -> Alpha procs the change
                && (!this._properties[name] // from and to links
                    || !(this._properties[name] // do not change color checkbox and choices due to them always having less
                        && (this._properties[name].type === 'color' || this._properties[name].type === 'checkbox' || this._properties[name].type === 'choices')))) {
                change = true;
            }
            else { // standard detection in change in properties
                for (let j = 0; j < arr1.length && j < arr2.length; j++) {
                    if (!(arr1[j] === arr2[j])
                        && !(this._properties[name] && this._properties[name].type === 'color' && arr1[j].toLowerCase() === arr2[j].toLowerCase())) {
                        change = true;
                    }
                }
            }
            if (change) { // only change properties it needs to change instead all of them
                for (let i = 0; i < diagram.selection.count; i++) {
                    it.next();
                    const isPart = it.value instanceof go.Part;
                    const data = isPart ? it.value.data : it.value;
                    if (data) { // ignores the selected node if there is no data
                        if (i < arr1.length)
                            value = arr1[i];
                        else
                            value = arr1[0];
                        // don't update "readOnly" data properties
                        const decProp = this._properties[name];
                        if (!this.canEditProperty(name, decProp, it.value))
                            continue;
                        const oldval = data[name];
                        value = this.parseValue(decProp, value, input, oldval);
                        // in case parsed to be different, such as in the case of boolean values,
                        // the value shown should match the actual value
                        input.value = value;
                        // modify the data object in an undo-able fashion
                        diagram.model.setDataProperty(data, name, value);
                        // notify any listener
                        if (this.propertyModified !== null)
                            this.propertyModified(name, value, this);
                    }
                }
            }
        }
        diagram.commitTransaction('set all properties');
    }
    /**
     * @hidden @ignore
     * Update all of the data properties of {@link #inspectedObject} according to the
     * current values held in the HTML input elements.
     */
    updateAllProperties() {
        const inspectedProps = this.inspectedProperties;
        const diagram = this._diagram;
        const isPart = this.inspectedObject instanceof go.Part;
        const data = isPart ? this.inspectedObject.data : this.inspectedObject;
        if (!data)
            return; // must not try to update data when there's no data!
        diagram.startTransaction('set all properties');
        for (const name in inspectedProps) {
            const input = inspectedProps[name];
            let value = input.value;
            // don't update "readOnly" data properties
            const decProp = this._properties[name];
            if (!this.canEditProperty(name, decProp, this.inspectedObject))
                continue;
            const oldval = data[name];
            value = this.parseValue(decProp, value, input, oldval);
            // in case parsed to be different, such as in the case of boolean values,
            // the value shown should match the actual value
            input.value = value;
            // modify the data object in an undo-able fashion
            diagram.model.setDataProperty(data, name, value);
            // notify any listener
            if (this.propertyModified !== null)
                this.propertyModified(name, value, this);
        }
        diagram.commitTransaction('set all properties');
    }
}
