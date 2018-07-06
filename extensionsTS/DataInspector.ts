'use strict';
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from '../release/go';

/**
 * This class implements an inspector for GoJS model data objects.
 * The constructor takes three arguments:
 *   {string} divid a string referencing the HTML ID of the to-be inspector's div.
 *   {Diagram} diagram a reference to a GoJS Diagram.
 *   {Object} options An optional JS Object describing options for the inspector.
 *
 * Options:
 *   inspectSelection {boolean} Default true, whether to automatically show and populate the Inspector
 *                              with the currently selected Diagram Part. If set to false, the inspector won't show anything
 *                              until you call Inspector.inspectObject(object) with a Part or JavaScript object as the argument.
 *   includesOwnProperties {boolean} Default true, whether to list all properties currently on the inspected data object.
 *   properties {Object} An object of string:Object pairs representing propertyName:propertyOptions.
 *                       Can be used to include or exclude additional properties.
 *   propertyModified function(propertyName, newValue) a callback
 *   multipleSelection {boolean} Default false, whether to allow multiple selection and change the properties of all the selected instead of
 *                               the single first object
 *   showAllProperties {boolean} Default false, whether properties that are shown with multipleSelection use the intersect of the properties when false or the union when true
 *                               only affects if multipleSelection is true
 *   showSize {number} Defaults 0, shows how many nodes are showed when selecting multiple nodes
 *                     when its lower than 1, it shows all nodes
 *
 * Options for properties:
 *   show: {boolean|function} a boolean value to show or hide the property from the inspector, or a predicate function to show conditionally.
 *   readOnly: {boolean|function} whether or not the property is read-only
 *   type: {string} a string describing the data type. Supported values: "string|number|boolean|color|arrayofnumber|point|rect|size|spot|margin|select"
 *   defaultValue: {*} a default value for the property. Defaults to the empty string.
 *   choices: {Array|function} when type == "select", the Array of choices to use or a function that returns the Array of choices.
 *
 * Example usage of Inspector:
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
 *
 * This is the basic HTML Structure that the Inspector creates within the given DIV element:
 * <div id="divid" class="inspector">
 *   <tr>
 *     <td>propertyName</td>
 *     <td><input value=propertyValue /></td>
 *   </tr>
 *   ...
 * </div>
 */
export class Inspector {
  public divid: string;
  public diagram: go.Diagram & any;
  public options: Object;
  private _div: HTMLElement;
  private _diagram: go.Diagram & any;
  private _inspectedProperties: { [index: string]: any } = {};
  private _multipleProperties: { [index: string]: any } = {};

  // Either a GoJS Part or a simple data object, such as Model.modelData
  private inspectedObject: Object | null = null;

  // Inspector options defaults:
  private includesOwnProperties: boolean = true;
  private declaredProperties: { [index: string]: any } = {};
  private inspectsSelection = true;
  private propertyModified: any = null;
  private multipleSelection: boolean = false;
  private showAllProperties: boolean = false;
  private showSize: number = 0;

  private tabIndex: number;

  constructor(divid: string, diagram: go.Diagram, options: Object) {
    this.divid = divid;
    this.diagram = diagram;
    this.options = options;
    this.tabIndex = 0;
    const mainDiv = document.getElementById(divid) as HTMLDivElement;
    mainDiv.className = 'inspector';
    mainDiv.innerHTML = '';
    this._div = mainDiv;
    this._diagram = diagram;
    if (options !== undefined) {
      if ((options as any)['includesOwnProperties'] !== undefined) this.includesOwnProperties = (options as any)['includesOwnProperties'];
      if ((options as any)['properties'] !== undefined) this.declaredProperties = (options as any)['properties'];
      if ((options as any)['inspectSelection'] !== undefined) this.inspectsSelection = (options as any)['inspectSelection'];
      if ((options as any)['propertyModified'] !== undefined) this.propertyModified = (options as any)['propertyModified'];
      if ((options as any)['multipleSelection'] !== undefined) this.multipleSelection = (options as any)['multipleSelection'];
      if ((options as any)['showAllProperties'] !== undefined) this.showAllProperties = (options as any)['showAllProperties'];
      if ((options as any)['showSize'] !== undefined) this.showSize = (options as any)['showSize'];
    }
    const self = this;
    this.diagram.addModelChangedListener((e: go.ChangedEvent) => {
      if (e.isTransactionFinished) self.inspectObject();
    });
    if (this.inspectsSelection) {
      this.diagram.addDiagramListener('ChangedSelection', (e: go.ChangedEvent) => { self.inspectObject(); });
    }
  }

  // Some static predicates to use with the "show" property.
  public static showIfNode(part: go.Part) { return part instanceof go.Node; }
  public static showIfLink(part: go.Part) { return part instanceof go.Link; }
  public static showIfGroup(part: go.Part) { return part instanceof go.Group; }

  // Only show the property if its present. Useful for "key" which will be shown on Nodes and Groups, but normally not on Links
  public static showIfPresent(data: go.Part | null, propname: string) {
    if (data instanceof go.Part) data = data.data;
    return typeof data === 'object' && (data as any)[propname] !== undefined;
  }

  /**
   * Update the HTML state of this Inspector given the properties of the {@link #inspectedObject}.
   * @param {Object} object is an optional argument, used when {@link #inspectSelection} is false to
   *                        set {@link #inspectedObject} and show and edit that object's properties.
   */
  public inspectObject(object?: Object | null) {
    let inspectedObject: Object | null = null;
    let inspectedObjects: go.Set<Object> | null = null;
    if (object === null) return;
    if (object === undefined) {
      if (this.inspectsSelection) {
        if (this.multipleSelection) { // gets the selection if multiple selection is true
          inspectedObjects = this._diagram.selection;
        } else { // otherwise grab the first object
          inspectedObject = this._diagram.selection.first();
        }
      } else { // if there is a single inspected object
        inspectedObject = this.inspectedObject;
      }
    } else { // if object was passed in as a parameter
      inspectedObject = object;
    }
    if (inspectedObjects && inspectedObjects.count === 1) {
      inspectedObject = inspectedObjects.first();
    }
    if (inspectedObjects && inspectedObjects.count <= 1) {
      inspectedObjects = null;
    }

    // single object or no objects
    if (!inspectedObjects || !this.multipleSelection) {
      if (inspectedObject === null || this.inspectedObject === inspectedObject) {
        this.inspectedObject = inspectedObject;
        this.updateAllHTML();
        return;
      }

      this.inspectedObject = inspectedObject;
      if (this.inspectObject === null) return;
      const mainDiv = this._div;
      mainDiv.innerHTML = '';

      // use either the Part.data or the object itself (for model.modelData)
      const data = (inspectedObject instanceof go.Part) ? inspectedObject.data : inspectedObject;
      if (!data) return;
      // Build table:
      const table = document.createElement('table');
      const tbody = document.createElement('tbody');
      this._inspectedProperties = {};
      this.tabIndex = 0;
      const declaredProperties = this.declaredProperties;

      // Go through all the properties passed in to the inspector and show them, if appropriate:
      for (const k in declaredProperties) {
        const val = declaredProperties[k];
        if (!this.canShowProperty(k, val, inspectedObject)) continue;
        let defaultValue = '';
        if (val.defaultValue !== undefined) defaultValue = val.defaultValue;
        if (data[k] !== undefined) defaultValue = data[k];
        tbody.appendChild(this.buildPropertyRow(k, defaultValue || ''));
      }
      // Go through all the properties on the model data and show them, if appropriate:
      if (this.includesOwnProperties) {
        for (const k in data) {
          if (k === '__gohashid') continue; // skip internal GoJS hash property
          if (this._inspectedProperties[k]) continue; // already exists
          if (declaredProperties[k] && !this.canShowProperty(k, declaredProperties[k], inspectedObject)) continue;
          tbody.appendChild(this.buildPropertyRow(k, data[k]));
        }
      }

      table.appendChild(tbody);
      mainDiv.appendChild(table);
    } else { // multiple objects selected
      const mainDiv = this._div;
      mainDiv.innerHTML = '';
      const shared: go.Map<string, any> = new go.Map<string, any>(); // for properties that the nodes have in common
      const properties: go.Map<string, any> = new go.Map<string, any>(); // for adding properties
      const all: go.Map<string, any> = new go.Map<string, any>(); // used later to prevent changing properties when unneeded
      const it = inspectedObjects.iterator;
      // Build table:
      const table = document.createElement('table');
      const tbody = document.createElement('tbody');
      this._inspectedProperties = {};
      this.tabIndex = 0;
      const declaredProperties = this.declaredProperties;
      it.next();
      inspectedObject = it.value;
      this.inspectedObject = inspectedObject;
      let data = (inspectedObject instanceof go.Part) ? inspectedObject.data : inspectedObject;
      if (data) { // initial pass to set shared and all
        // Go through all the properties passed in to the inspector and add them to the map, if appropriate:
        for (const k in declaredProperties) {
          const val = declaredProperties[k];
          if (!this.canShowProperty(k, val, inspectedObject)) continue;
          let defaultValue = '';
          if (val.defaultValue !== undefined) defaultValue = val.defaultValue;
          if (data[k] !== undefined) defaultValue = data[k];
          if (defaultValue === '' && this.declaredProperties[k] && this.declaredProperties[k].type === 'checkbox') {
            shared.add(k, false);
            all.add(k, false);
          } else {
            shared.add(k, defaultValue || '');
            all.add(k, defaultValue || '');
          }
        }
        // Go through all the properties on the model data and add them to the map, if appropriate:
        if (this.includesOwnProperties) {
          for (const k in data) {
            if (k === '__gohashid') continue; // skip internal GoJS hash property
            if (this._inspectedProperties[k]) continue; // already exists
            if (declaredProperties[k] && !this.canShowProperty(k, declaredProperties[k], inspectedObject)) continue;
            shared.add(k, data[k]);
            all.add(k, data[k]);
          }
        }
      }
      let nodecount = 2;
      while (it.next() && (this.showSize < 1 || nodecount <= this.showSize)) { // grabs all the properties from the other selected objects
        properties.clear();
        inspectedObject = it.value;
        if (inspectedObject) {
          // use either the Part.data or the object itself (for model.modelData)
          data = (inspectedObject instanceof go.Part) ? inspectedObject.data : inspectedObject;
          if (data) {
            // Go through all the properties passed in to the inspector and add them to properties to add, if appropriate:
            for (const k in declaredProperties) {
              const val = declaredProperties[k];
              if (!this.canShowProperty(k, val, inspectedObject)) continue;
              let defaultValue = '';
              if (val.defaultValue !== undefined) defaultValue = val.defaultValue;
              if (data[k] !== undefined) defaultValue = data[k];
              if (defaultValue === '' && this.declaredProperties[k] && this.declaredProperties[k].type === 'checkbox') {
                properties.add(k, false);
              } else {
                properties.add(k, defaultValue || '');
              }
            }
            // Go through all the properties on the model data and add them to properties to add, if appropriate:
            if (this.includesOwnProperties) {
              for (const k in data) {
                if (k === '__gohashid') continue; // skip internal GoJS hash property
                if (this._inspectedProperties[k]) continue; // already exists
                if (declaredProperties[k] && !this.canShowProperty(k, declaredProperties[k], inspectedObject)) continue;
                properties.add(k, data[k]);
              }
            }
          }
        }
        if (!this.showAllProperties) {
          // Cleans up shared map with properties that aren't shared between the selected objects
          // Also adds properties to the add and shared maps if applicable
          const addIt = shared.iterator;
          const toRemove: Array<string> = [];
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
            } else { // toRemove array since addIt is still iterating
              toRemove.push(addIt.key);
            }
          }
          for (let i = 0; i < toRemove.length; i++) { // removes anything that doesn't showAllPropertiess
            shared.remove(toRemove[i]);
            all.remove(toRemove[i]);
          }
        } else {
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
            } else {
              let newVal = '';
              for (let i = 0; i < nodecount - 1; i++) newVal += '|';
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
      if (!this.showAllProperties) mapIt = shared.iterator;
      else mapIt = all.iterator;
      while (mapIt.next()) {
        tbody.appendChild(this.buildPropertyRow(mapIt.key, mapIt.value)); // shows the properties that are allowed
      }
      table.appendChild(tbody);
      mainDiv.appendChild(table);
      const allIt = all.iterator;
      while (allIt.next()) {
        this._multipleProperties[allIt.key] = allIt.value; // used for updateall to know which properties to change
      }
    }
  }

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
  public canShowProperty(propertyName: string, propertyDesc: Object & any, inspectedObject: Object): boolean {
    if (propertyDesc.show === false) return false;
    // if "show" is a predicate, make sure it passes or do not show this property
    if (typeof propertyDesc.show === 'function') return propertyDesc.show(inspectedObject, propertyName);
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
  public canEditProperty(propertyName: string, propertyDesc: Object & any, inspectedObject: Object | null): boolean {
    if (this._diagram.isReadOnly || this._diagram.isModelReadOnly) return false;
    if (inspectedObject === null) return false;
    // assume property values that are functions of Objects cannot be edited
    const data = (inspectedObject instanceof go.Part) ? inspectedObject.data : inspectedObject;
    const valtype = typeof data[propertyName];
    if (valtype === 'function') return false;
    if (propertyDesc) {
      if (propertyDesc.readOnly === true) return false;
      // if "readOnly" is a predicate, make sure it passes or do not show this property
      if (typeof propertyDesc.readOnly === 'function') return !propertyDesc.readOnly(inspectedObject, propertyName);
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
  public buildPropertyRow(propertyName: string, propertyValue: any): HTMLTableRowElement {
    const mainDiv = this._div;
    const tr = document.createElement('tr');

    const td1 = document.createElement('td');
    td1.textContent = propertyName;
    tr.appendChild(td1);

    const td2 = document.createElement('td');
    const decProp = this.declaredProperties[propertyName];
    let input = null;
    const self = this;
    function updateall() { self.updateAllProperties(); }

    if (decProp && decProp.type === 'select') {
      input = document.createElement('select');
      this.updateSelect(decProp, input, propertyName, propertyValue);
      input.addEventListener('change', updateall);
    } else {
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

    this._inspectedProperties[propertyName] = input;
    return tr;
  }

  /**
   * @ignore
   * HTML5 color input will only take hex,
   * so let HTML5 canvas convert the color into hex format.
   * This converts "rgb(255, 0, 0)" into "#FF0000", etc.
   * @param {string} propertyValue
   * @return {string}
   */
  public convertToColor(propertyValue: string): string {
    const ctx: CanvasRenderingContext2D | null = document.createElement('canvas').getContext('2d');
    if (ctx === null) return '#000000';
    ctx.fillStyle = propertyValue;
    return ctx.fillStyle;
  }

  /**
   * @ignore
   * @param {string}
   * @return {Array.<number>|null}
   */
  public convertToArrayOfNumber(propertyValue: string): Array<number> | null {
    if (propertyValue === 'null') return null;
    const split = propertyValue.split(' ');
    const arr = [];
    for (let i = 0; i < split.length; i++) {
      const str = split[i];
      if (!str) continue;
      arr.push(parseFloat(str));
    }
    return arr;
  }

  /**
   * @ignore
   * @param {*}
   * @return {string}
   */
  public convertToString(x: any): string {
    if (x === undefined) return 'undefined';
    if (x === null) return 'null';
    if (x instanceof go.Point) return go.Point.stringify(x);
    if (x instanceof go.Size) return go.Size.stringify(x);
    if (x instanceof go.Rect) return go.Rect.stringify(x);
    if (x instanceof go.Spot) return go.Spot.stringify(x);
    if (x instanceof go.Margin) return go.Margin.stringify(x);
    if (x instanceof go.List) return this.convertToString(x.toArray());
    if (Array.isArray(x)) {
      let str = '';
      for (let i = 0; i < x.length; i++) {
        if (i > 0) str += ' ';
        const v = x[i];
        str += this.convertToString(v);
      }
      return str;
    }
    return x.toString();
  }

  /**
   * @ignore
   * Update all of the HTML in this Inspector.
   */
  public updateAllHTML() {
    const inspectedProps = this._inspectedProperties;
    const diagram = this._diagram;
    const isPart = this.inspectedObject instanceof go.Part;
    const data = isPart ? (this.inspectedObject as any).data : this.inspectedObject;
    if (!data) {  // clear out all of the fields
      for (const name in inspectedProps) {
        const input = inspectedProps[name];
        if (input instanceof HTMLSelectElement) {
          input.innerHTML = '';
        } else if (input.type === 'color') {
          input.value = '#000000';
        } else if (input.type === 'checkbox') {
          input.checked = false;
        } else {
          input.value = '';
        }
      }
    } else {
      for (const name in inspectedProps) {
        const input = inspectedProps[name];
        const propertyValue = data[name];
        if (input instanceof HTMLSelectElement) {
          const decProp = this.declaredProperties[name];
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
  }

  /**
   * @ignore
   * Update an HTMLSelectElement with an appropriate list of choices, given the propertyName
   */
  public updateSelect(decProp: any, select: HTMLSelectElement, propertyName: string, propertyValue: any) {
    select.innerHTML = '';  // clear out anything that was there
    let choices = decProp.choices;
    if (typeof choices === 'function') choices = choices(this.inspectedObject, propertyName);
    if (!Array.isArray(choices)) choices = [];
    decProp.choicesArray = choices;  // remember list of actual choice values (not strings)
    for (let i = 0; i < choices.length; i++) {
      const choice = choices[i];
      const opt = document.createElement('option');
      opt.text = this.convertToString(choice);
      select.add(opt);
    }
    select.value = this.convertToString(propertyValue);
  }

  /**
   * @ignore
   * Update all of the data properties of {@link #inspectedObject} according to the
   * current values held in the HTML input elements.
   */
  public updateAllProperties() {
    const inspectedProps = this._inspectedProperties;
    const diagram = this._diagram;
    if (diagram.selection.count === 1 || !this.multipleSelection) { // single object update
      const isPart = this.inspectedObject instanceof go.Part;
      const data = isPart ? (this.inspectedObject as any).data : this.inspectedObject;
      if (!data) return;  // must not try to update data when there's no data!

      diagram.startTransaction('set all properties');
      for (const name in inspectedProps) {
        const input = inspectedProps[name];
        let value = input.value;

        // don't update "readOnly" data properties
        const decProp = this.declaredProperties[name];
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

        // in case parsed to be different, such as in the case of boolean values,
        // the value shown should match the actual value
        input.value = value;

        // modify the data object in an undo-able fashion
        diagram.model.setDataProperty(data, name, value);

        // notify any listener
        if (this.propertyModified !== null) this.propertyModified(name, value, this);
      }
      diagram.commitTransaction('set all properties');
    } else { // selection object update
      diagram.startTransaction('set all properties');
      for (const name in inspectedProps) {
        const input = inspectedProps[name];
        let value = input.value;
        const arr1: Array<string> = value.split('|');
        let arr2: Array<string> = [];
        if (this._multipleProperties[name]) {
          // don't split if it is union and its checkbox type
          if (this.declaredProperties[name] && this.declaredProperties[name].type === 'checkbox' && this.showAllProperties) {
            arr2.push(this._multipleProperties[name]);
          } else {
            arr2 = this._multipleProperties[name].toString().split('|');
          }
        }
        const it = diagram.selection.iterator;
        let change = false;
        if (this.declaredProperties[name] && this.declaredProperties[name].type === 'checkbox') change = true; // always change checkbox
        if (arr1.length < arr2.length // i.e Alpha|Beta -> Alpha procs the change
            && (!this.declaredProperties[name] // from and to links
            || !(this.declaredProperties[name] // do not change color checkbox and choices due to them always having less
            && (this.declaredProperties[name].type === 'color' || this.declaredProperties[name].type === 'checkbox' || this.declaredProperties[name].type === 'choices')))) {
              change = true;
        } else { // standard detection in change in properties
          for (let j = 0; j < arr1.length && j < arr2.length; j++) {
            if (!(arr1[j] === arr2[j])
                && !(this.declaredProperties[name] && this.declaredProperties[name].type === 'color' && arr1[j].toLowerCase() === arr2[j].toLowerCase())) {
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
              if (i < arr1.length) value = arr1[i];
              else value = arr1[0];

              // don't update "readOnly" data properties
              const decProp = this.declaredProperties[name];
              if (!this.canEditProperty(name, decProp, it.value)) continue;

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

              // in case parsed to be different, such as in the case of boolean values,
              // the value shown should match the actual value
              input.value = value;

              // modify the data object in an undo-able fashion
              diagram.model.setDataProperty(data, name, value);

              // notify any listener
              if (this.propertyModified !== null) this.propertyModified(name, value, this);
            }
          }
        }
      }
      diagram.commitTransaction('set all properties');
    }
  }
}
