/*
 *  Copyright 1998-2025 by Northwoods Software Corporation. All Rights Reserved.
 */
/*
 * This is an extension and not part of the main GoJS library.
 * The source code for this is at extensionsJSM/Robot.ts.
 * Note that the API for this class may change with any version, even point releases.
 * If you intend to use an extension in production, you should copy the code to your own source directory.
 * Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
 * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
 */

/**
 * A class for simulating mouse and keyboard input.
 *
 * As a special feature, this supports limited simulation of drag-and-drop between Diagrams,
 * by setting both the `sourceDiagram` and `targetDiagram` properties
 * on the `eventprops` argument of the mouseDown/mouseMove/mouseUp methods.
 * Although {@link go.InputEvent.targetDiagram} is a real property,
 * the `sourceDiagram` property is only used by these Robot methods.
 *
 * Typical setup:
 * ```js
 *    // a shared Robot that can be used by all commands for this one Diagram
 *    myRobot = new Robot(myDiagram);  // defined in Robot.js
 * ```
 * Then later:
 * ```js
 *    // Simulate a mouse drag to move a node:
 *    const loc = ...;  // some Point in document coordinates that is within the bounds of a node
 *    const options = {};  // possible settings of InputEvent, such as setting control or shift to true
 *    myRobot.mouseDown(loc.x, loc.y, 0, options);
 *    myRobot.mouseMove(loc.x + 80, loc.y + 50, 50, options);
 *    myRobot.mouseMove(loc.x + 20, loc.y + 100, 100, options);
 *    myRobot.mouseUp(loc.x + 20, loc.y + 100, 150, options);
 * ```
 *
 * If you want to experiment with this extension, try the <a href="../../samples/Robot.html">Simulating Input</a> sample.
 * @category Extension
 */
class Robot {
    /**
     * Construct a robot for a given {@link go.Diagram}. If none is provided, a new Diagram will be created.
     */
    constructor(dia) {
        if (dia instanceof go.Diagram) {
            this._diagram = dia;
        }
        else {
            this._diagram = new go.Diagram();
        }
    }
    /**
     * Gets or sets the {@link go.Diagram} associated with this Robot.
     */
    get diagram() {
        return this._diagram;
    }
    set diagram(val) {
        if (!(val instanceof go.Diagram))
            throw new Error('Robot.diagram must be a Diagram, not: ' + val);
        this._diagram = val;
    }
    /**
     * @hidden @internal
     * Transfer property settings from a JavaScript Object to an {@link go.InputEvent}.
     */
    initializeEvent(e, props) {
        if (!props)
            return;
        for (const p in props) {
            if (p !== 'sourceDiagram')
                e[p] = props[p];
        }
    }
    /**
     * Simulate a mouse down event.
     * @param x - the X-coordinate of the mouse point in document coordinates.
     * @param y - the Y-coordinate of the mouse point in document coordinates.
     * @param time - the timestamp of the simulated event, in milliseconds; default zero
     * @param eventprops - an optional argument providing properties for the InputEvent.
     */
    mouseDown(x, y, time, eventprops) {
        if (typeof x !== 'number' || typeof y !== 'number')
            throw new Error('Robot.mouseDown first two args must be X,Y numbers');
        if (time === undefined)
            time = 0;
        let diagram = this._diagram;
        if (eventprops && eventprops.sourceDiagram)
            diagram = eventprops.sourceDiagram;
        if (!diagram.isEnabled)
            return;
        const n = new go.InputEvent();
        n.diagram = diagram;
        n.documentPoint = new go.Point(x, y);
        n.viewPoint = diagram.transformDocToView(n.documentPoint);
        n.timestamp = time;
        n.down = true;
        this.initializeEvent(n, eventprops);
        diagram.lastInput = n;
        diagram.firstInput = n.copy();
        diagram.currentTool.doMouseDown();
    }
    /**
     * Simulate a mouse move event.
     * @param x - the X-coordinate of the mouse point in document coordinates.
     * @param y - the Y-coordinate of the mouse point in document coordinates.
     * @param time - the timestamp of the simulated event, in milliseconds; default zero
     * @param eventprops - an optional argument providing properties for the InputEvent.
     */
    mouseMove(x, y, time, eventprops) {
        if (typeof x !== 'number' || typeof y !== 'number')
            throw new Error('Robot.mouseMove first two args must be X,Y numbers');
        if (time === undefined)
            time = 0;
        let diagram = this._diagram;
        if (eventprops && eventprops.sourceDiagram)
            diagram = eventprops.sourceDiagram;
        if (!diagram.isEnabled)
            return;
        const n = new go.InputEvent();
        n.diagram = diagram;
        n.documentPoint = new go.Point(x, y);
        n.viewPoint = diagram.transformDocToView(n.documentPoint);
        n.timestamp = time;
        this.initializeEvent(n, eventprops);
        diagram.lastInput = n;
        diagram.currentTool.doMouseMove();
    }
    /**
     * Simulate a mouse up event.
     * @param x - the X-coordinate of the mouse point in document coordinates.
     * @param y - the Y-coordinate of the mouse point in document coordinates.
     * @param time - the timestamp of the simulated event, in milliseconds; default zero
     * @param eventprops - an optional argument providing properties for the InputEvent.
     */
    mouseUp(x, y, time, eventprops) {
        if (typeof x !== 'number' || typeof y !== 'number')
            throw new Error('Robot.mouseUp first two args must be X,Y numbers');
        if (time === undefined)
            time = 0;
        let diagram = this._diagram;
        if (eventprops && eventprops.sourceDiagram)
            diagram = eventprops.sourceDiagram;
        if (!diagram.isEnabled)
            return;
        const n = new go.InputEvent();
        n.diagram = diagram;
        n.documentPoint = new go.Point(x, y);
        n.viewPoint = diagram.transformDocToView(n.documentPoint);
        n.timestamp = time;
        n.up = true;
        if (diagram.firstInput.documentPoint.equals(n.documentPoint))
            n.clickCount = 1; // at least??
        this.initializeEvent(n, eventprops);
        diagram.lastInput = n;
        // if (diagram.simulatedMouseUp(null, (n as any).sourceDiagram, n.documentPoint, n.targetDiagram)) return;
        diagram.currentTool.doMouseUp();
    }
    /**
     * Simulate a mouse wheel event.
     * @param delta - non-zero turn
     * @param time - the timestamp of the simulated event, in milliseconds; default zero
     * @param eventprops - an optional argument providing properties for the InputEvent.
     */
    mouseWheel(delta, time, eventprops) {
        if (typeof delta !== 'number')
            throw new Error('Robot.mouseWheel first arg must be DELTA number');
        if (time === undefined)
            time = 0;
        const diagram = this._diagram;
        if (!diagram.isEnabled)
            return;
        const n = diagram.lastInput.copy();
        n.diagram = diagram;
        n.delta = delta;
        n.timestamp = time;
        this.initializeEvent(n, eventprops);
        diagram.lastInput = n;
        diagram.currentTool.doMouseWheel();
    }
    /**
     * Simulate a key down event.
     * @param keyCodeOrKey A simulated KeyboardEvent.keyCode (number) or KeyboardEvent.key (string)
     * @param time - the timestamp of the simulated event, in milliseconds; default zero
     * @param eventprops - an optional argument providing properties for the InputEvent.
     */
    keyDown(keyCodeOrKey, time, eventprops) {
        if (typeof keyCodeOrKey !== 'string' && typeof keyCodeOrKey !== 'number')
            throw new Error('Robot.keyDown first arg must be a string or a number');
        if (time === undefined)
            time = 0;
        const diagram = this._diagram;
        if (!diagram.isEnabled)
            return;
        const n = diagram.lastInput.copy();
        n.diagram = diagram;
        if (typeof keyCodeOrKey === 'string') {
            n.key = keyCodeOrKey;
        }
        else if (typeof keyCodeOrKey === 'number') {
            n.key = String.fromCharCode(keyCodeOrKey);
        }
        n.timestamp = time;
        n.down = true;
        this.initializeEvent(n, eventprops);
        diagram.lastInput = n;
        diagram.currentTool.doKeyDown();
    }
    /**
     * Simulate a key up event.
     * @param keyCodeOrKey A simulated KeyboardEvent.keyCode (number) or KeyboardEvent.key (string)
     * @param time - the timestamp of the simulated event, in milliseconds; default zero
     * @param eventprops - an optional argument providing properties for the InputEvent.
     */
    keyUp(keyCodeOrKey, time, eventprops) {
        if (typeof keyCodeOrKey !== 'string' && typeof keyCodeOrKey !== 'number')
            throw new Error('Robot.keyUp first arg must be a string or a number');
        if (time === undefined)
            time = 0;
        const diagram = this._diagram;
        if (!diagram.isEnabled)
            return;
        const n = diagram.lastInput.copy();
        n.diagram = diagram;
        if (typeof keyCodeOrKey === 'string') {
            n.key = keyCodeOrKey;
        }
        else if (typeof keyCodeOrKey === 'number') {
            n.key = String.fromCharCode(keyCodeOrKey);
        }
        n.timestamp = time;
        n.up = true;
        this.initializeEvent(n, eventprops);
        diagram.lastInput = n;
        diagram.currentTool.doKeyUp();
    }
}
