"use strict";
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go";

// A class for simulating mouse and keyboard input.

// As a special hack, this supports limited simulation of drag-and-drop between Diagrams,
// by setting on the EVENTPROPS argument of the mouseDown/mouseMove/mouseUp methods
// both the "sourceDiagram" and "targetDiagram" properties.
// Although InputEvent.targetDiagram is a real property,
// the "sourceDiagram" property is only used by these Robot methods.

/**
* @constructor
* @class
* @param {Diagram=} dia the Diagram on which the Robot simulates input events
*/
export class Robot {
	diagram: go.Diagram;
	constructor(dia: go.Diagram) {
		if (dia === undefined) dia = null;
		this.diagram = dia;
	}

  /**
  * @ignore
  * Transfer property settings from a JavaScript Object to an InputEvent.
  * @this {Robot}
  * @param {InputEvent} e
  * @param {Object} props
  */
	public initializeEvent(e: go.InputEvent, props: Object) {
		if (!props) return;
		for (var p in props) {
			if (p !== "sourceDiagram") (<any>e)[p] = (<any>props)[p];
		}
	};

  /**
  * Simulate a mouse down event.
  * @this {Robot}
  * @param {number} x the X-coordinate of the mouse point in document coordinates.
  * @param {number} y the Y-coordinate of the mouse point in document coordinates.
  * @param {number=} time the timestamp of the simulated event, in milliseconds; default zero
  * @param {object=} eventprops an optional argument providing properties for the InputEvent.
  */
	public mouseDown(x: number, y: number, time?: number, eventprops?: Object) {
		if (typeof x !== "number" || typeof y !== "number") throw new Error("Robot.mouseDown first two args must be X,Y numbers");
		if (time === undefined) time = 0;

		var diagram = this.diagram;
		if (eventprops && (eventprops as any).sourceDiagram) diagram = (eventprops as any).sourceDiagram;
		if (!diagram.isEnabled) return;

		var n = new go.InputEvent();
		n.diagram = diagram;
		n.documentPoint = new go.Point(x, y);
		n.viewPoint = diagram.transformDocToView(n.documentPoint);
		n.timestamp = time;
		n.down = true;
		this.initializeEvent(n, eventprops);
		diagram.lastInput = n;
		diagram.firstInput = n.copy();
		diagram.currentTool.doMouseDown();
	};

  /**
  * Simulate a mouse move event.
  * @this {Robot}
  * @param {number} x the X-coordinate of the mouse point in document coordinates.
  * @param {number} y the Y-coordinate of the mouse point in document coordinates.
  * @param {number=} time the timestamp of the simulated event, in milliseconds; default zero
  * @param {object=} eventprops an optional argument providing properties for the InputEvent.
  */
	public mouseMove(x: number, y: number, time?: number, eventprops?: Object) {
		if (typeof x !== "number" || typeof y !== "number") throw new Error("Robot.mouseMove first two args must be X,Y numbers");
		if (time === undefined) time = 0;

		var diagram = this.diagram;
		if (eventprops && (eventprops as any).sourceDiagram) diagram = (eventprops as any).sourceDiagram;
		if (!diagram.isEnabled) return;

		var n = new go.InputEvent();
		n.diagram = diagram;
		n.documentPoint = new go.Point(x, y);
		n.viewPoint = diagram.transformDocToView(n.documentPoint);
		n.timestamp = time;
		this.initializeEvent(n, eventprops);
		diagram.lastInput = n;
		if (diagram.simulatedMouseMove(null, n.documentPoint, n.targetDiagram)) return;
		diagram.currentTool.doMouseMove();
	};

  /**
  * Simulate a mouse up event.
  * @this {Robot}
  * @param {number} x the X-coordinate of the mouse point in document coordinates.
  * @param {number} y the Y-coordinate of the mouse point in document coordinates.
  * @param {number=} time the timestamp of the simulated event, in milliseconds; default zero
  * @param {object=} eventprops an optional argument providing properties for the InputEvent.
  */
	public mouseUp(x: number, y: number, time?: number, eventprops?: Object) {
		if (typeof x !== "number" || typeof y !== "number") throw new Error("Robot.mouseUp first two args must be X,Y numbers");
		if (time === undefined) time = 0;

		var diagram = this.diagram;
		if (eventprops && (eventprops as any).sourceDiagram) diagram = (eventprops as any).sourceDiagram;
		if (!diagram.isEnabled) return;

		var n: go.InputEvent = new go.InputEvent();
		n.diagram = diagram;
		n.documentPoint = new go.Point(x, y);
		n.viewPoint = diagram.transformDocToView(n.documentPoint);
		n.timestamp = time;
		n.up = true;
		if (diagram.firstInput.documentPoint.equals(n.documentPoint)) n.clickCount = 1;  // at least??
		this.initializeEvent(n, eventprops);
		diagram.lastInput = n;
		if (diagram.simulatedMouseUp(null, (n as any).sourceDiagram, n.documentPoint, n.targetDiagram)) return;
		diagram.currentTool.doMouseUp();
	};

  /**
  * Simulate a mouse wheel event.
  * @this {Robot}
  * @param {number} delta non-zero turn
  * @param {number=} time the timestamp of the simulated event, in milliseconds; default zero
  * @param {object=} eventprops an optional argument providing properties for the InputEvent.
  */
	public mouseWheel(delta: number, time?: number, eventprops?: Object) {
		if (typeof delta !== "number") throw new Error("Robot.mouseWheel first arg must be DELTA number");
		if (time === undefined) time = 0;

		var diagram = this.diagram;
		if (!diagram.isEnabled) return;

		var n = diagram.lastInput.copy();
		n.diagram = diagram;
		n.delta = delta;
		n.timestamp = time;
		this.initializeEvent(n, eventprops);
		diagram.lastInput = n;
		diagram.currentTool.doMouseWheel();
	};

  /**
  * Simulate a key down event.
  * @this {Robot}
  * @param {string|number} keyorcode
  * @param {number=} time the timestamp of the simulated event, in milliseconds; default zero
  * @param {object=} eventprops an optional argument providing properties for the InputEvent.
  */
	public keyDown(keyorcode: string | number, time?: number, eventprops?: Object) {
		if (typeof keyorcode !== "string" && typeof keyorcode !== "number") throw new Error("Robot.keyDown first arg must be a string or a number");
		if (time === undefined) time = 0;

		var diagram = this.diagram;
		if (!diagram.isEnabled) return;

		var n = diagram.lastInput.copy();
		n.diagram = diagram;
		if (typeof (keyorcode) === 'string') {
			n.key = keyorcode;
		} else if (typeof (keyorcode) === 'number') {
			n.key = String.fromCharCode(keyorcode);
		}
		n.timestamp = time;
		n.down = true;
		this.initializeEvent(n, eventprops);
		diagram.lastInput = n;
		diagram.currentTool.doKeyDown();
	};

  /**
  * Simulate a key up event.
  * @this {Robot}
  * @param {string|number} keyorcode
  * @param {number=} time the timestamp of the simulated event, in milliseconds; default zero
  * @param {object=} eventprops an optional argument providing properties for the InputEvent.
  */
	public keyUp(keyorcode: string | number, time?: number, eventprops?: Object) {
		if (typeof keyorcode !== "string" && typeof keyorcode !== "number") throw new Error("Robot.keyUp first arg must be a string or a number");
		if (time === undefined) time = 0;

		var diagram = this.diagram;
		if (!diagram.isEnabled) return;

		var n = diagram.lastInput.copy();
		n.diagram = diagram;
		if (typeof (keyorcode) === 'string') {
			n.key = keyorcode;
		} else if (typeof (keyorcode) === 'number') {
			n.key = String.fromCharCode(keyorcode);
		}
		n.timestamp = time;
		n.up = true;
		this.initializeEvent(n, eventprops);
		diagram.lastInput = n;
		diagram.currentTool.doKeyUp();
	};

}