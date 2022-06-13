"use strict";
/*
*  Copyright (C) 1998-2022 by Northwoods Software Corporation. All Rights Reserved.
*/

/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/

/**
* @constructor
* @extends CommandHandler
* @class
* This CommandHandler class allows the user to position selected Parts in a diagram
* relative to the first part selected, in addition to overriding the doKeyDown method
* of the CommandHandler for handling the arrow keys in additional manners.
* <p>
* Typical usage:
* <pre>
*   $(go.Diagram, "myDiagramDiv",
*     {
*       commandHandler: $(DrawCommandHandler),
*       . . .
*     }
*   )
* </pre>
* or:
* <pre>
*    myDiagram.commandHandler = new DrawCommandHandler();
* </pre>*/
function DrawCommandHandler() {
  go.CommandHandler.call(this);
  this._arrowKeyBehavior = "move";
  this._pasteOffset = new go.Point(10, 10);
  this._lastPasteOffset = new go.Point(0, 0);
}
go.Diagram.inherit(DrawCommandHandler, go.CommandHandler);

/**
* This controls whether or not the user can invoke the {@link #alignLeft}, {@link #alignRight},
* {@link #alignTop}, {@link #alignBottom}, {@link #alignCenterX}, {@link #alignCenterY} commands.
* @this {DrawCommandHandler}
* @return {boolean}
* This returns true:
* if the diagram is not {@link Diagram#isReadOnly},
* if the model is not {@link Model#isReadOnly}, and
* if there are at least two selected {@link Part}s.
*/
DrawCommandHandler.prototype.canAlignSelection = function() {
  var diagram = this.diagram;
  if (diagram === null || diagram.isReadOnly || diagram.isModelReadOnly) return false;
  if (diagram.selection.count < 2) return false;
  return true;
};

/**
* Aligns selected parts along the left-most edge of the left-most part.
* @this {DrawCommandHandler}
*/
DrawCommandHandler.prototype.alignLeft = function() {
  var diagram = this.diagram;
  diagram.startTransaction("aligning left");
  var minPosition = Infinity;
  diagram.selection.each(function(current) {
    if (current instanceof go.Link) return; // skips over go.Link
    minPosition = Math.min(current.position.x, minPosition);
  });
  diagram.selection.each(function(current) {
    if (current instanceof go.Link) return; // skips over go.Link
    current.move(new go.Point(minPosition, current.position.y));
  });
  diagram.commitTransaction("aligning left");
};

/**
* Aligns selected parts at the right-most edge of the right-most part.
* @this {DrawCommandHandler}
*/
DrawCommandHandler.prototype.alignRight = function() {
  var diagram = this.diagram;
  diagram.startTransaction("aligning right");
  var maxPosition = -Infinity;
  diagram.selection.each(function(current) {
    if (current instanceof go.Link) return; // skips over go.Link
    var rightSideLoc = current.actualBounds.x + current.actualBounds.width;
    maxPosition = Math.max(rightSideLoc, maxPosition);
  });
  diagram.selection.each(function(current) {
    if (current instanceof go.Link) return; // skips over go.Link
    current.move(new go.Point(maxPosition - current.actualBounds.width, current.position.y));
  });
  diagram.commitTransaction("aligning right");
};

/**
* Aligns selected parts at the top-most edge of the top-most part.
* @this {DrawCommandHandler}
*/
DrawCommandHandler.prototype.alignTop = function() {
  var diagram = this.diagram;
  diagram.startTransaction("alignTop");
  var minPosition = Infinity;
  diagram.selection.each(function(current) {
    if (current instanceof go.Link) return; // skips over go.Link
    minPosition = Math.min(current.position.y, minPosition);
  });
  diagram.selection.each(function(current) {
    if (current instanceof go.Link) return; // skips over go.Link
    current.move(new go.Point(current.position.x, minPosition));
  });
  diagram.commitTransaction("alignTop");
};

/**
* Aligns selected parts at the bottom-most edge of the bottom-most part.
* @this {DrawCommandHandler}
*/
DrawCommandHandler.prototype.alignBottom = function() {
  var diagram = this.diagram;
  diagram.startTransaction("aligning bottom");
  var maxPosition = -Infinity;
  diagram.selection.each(function(current) {
    if (current instanceof go.Link) return; // skips over go.Link
    var bottomSideLoc = current.actualBounds.y + current.actualBounds.height;
    maxPosition = Math.max(bottomSideLoc, maxPosition);
  });
  diagram.selection.each(function(current) {
    if (current instanceof go.Link) return; // skips over go.Link
    current.move(new go.Point(current.actualBounds.x, maxPosition - current.actualBounds.height));
  });
  diagram.commitTransaction("aligning bottom");
};

/**
* Aligns selected parts at the x-value of the center point of the first selected part.
* @this {DrawCommandHandler}
*/
DrawCommandHandler.prototype.alignCenterX = function() {
  var diagram = this.diagram;
  var firstSelection = diagram.selection.first();
  if (!firstSelection) return;
  diagram.startTransaction("aligning Center X");
  var centerX = firstSelection.actualBounds.x + firstSelection.actualBounds.width / 2;
  diagram.selection.each(function(current) {
    if (current instanceof go.Link) return; // skips over go.Link
    current.move(new go.Point(centerX - current.actualBounds.width / 2, current.actualBounds.y));
  });
  diagram.commitTransaction("aligning Center X");
};


/**
* Aligns selected parts at the y-value of the center point of the first selected part.
* @this {DrawCommandHandler}
*/
DrawCommandHandler.prototype.alignCenterY = function() {
  var diagram = this.diagram;
  var firstSelection = diagram.selection.first();
  if (!firstSelection) return;
  diagram.startTransaction("aligning Center Y");
  var centerY = firstSelection.actualBounds.y + firstSelection.actualBounds.height / 2;
  diagram.selection.each(function(current) {
    if (current instanceof go.Link) return; // skips over go.Link
    current.move(new go.Point(current.actualBounds.x, centerY - current.actualBounds.height / 2));
  });
  diagram.commitTransaction("aligning Center Y");
};


/**
* Aligns selected parts top-to-bottom in order of the order selected.
* Distance between parts can be specified. Default distance is 0.
* @this {DrawCommandHandler}
* @param {number} distance
*/
DrawCommandHandler.prototype.alignColumn = function(distance) {
  var diagram = this.diagram;
  diagram.startTransaction("align Column");
  if (distance === undefined) distance = 0; // for aligning edge to edge
  distance = parseFloat(distance);
  var selectedParts = new Array();
  diagram.selection.each(function(current) {
    if (current instanceof go.Link) return; // skips over go.Link
    selectedParts.push(current);
  });
  for (var i = 0; i < selectedParts.length - 1; i++) {
    var current = selectedParts[i];
    // adds distance specified between parts
    var curBottomSideLoc = current.actualBounds.y + current.actualBounds.height + distance;
    var next = selectedParts[i + 1];
    next.move(new go.Point(current.actualBounds.x, curBottomSideLoc));
  }
  diagram.commitTransaction("align Column");
};

/**
* Aligns selected parts left-to-right in order of the order selected.
* Distance between parts can be specified. Default distance is 0.
* @this {DrawCommandHandler}
* @param {number} distance
*/
DrawCommandHandler.prototype.alignRow = function(distance) {
  if (distance === undefined) distance = 0; // for aligning edge to edge
  distance = parseFloat(distance);
  var diagram = this.diagram;
  diagram.startTransaction("align Row");
  var selectedParts = new Array();
  diagram.selection.each(function(current) {
    if (current instanceof go.Link) return; // skips over go.Link
    selectedParts.push(current);
  });
  for (var i = 0; i < selectedParts.length - 1; i++) {
    var current = selectedParts[i];
    // adds distance specified between parts
    var curRightSideLoc = current.actualBounds.x + current.actualBounds.width + distance;
    var next = selectedParts[i + 1];
    next.move(new go.Point(curRightSideLoc, current.actualBounds.y));
  }
  diagram.commitTransaction("align Row");
};


/**
* This controls whether or not the user can invoke the {@link #rotate} command.
* @this {DrawCommandHandler}
* @param {number=} angle the positive (clockwise) or negative (counter-clockwise) change in the rotation angle of each Part, in degrees.
* @return {boolean}
* This returns true:
* if the diagram is not {@link Diagram#isReadOnly},
* if the model is not {@link Model#isReadOnly}, and
* if there is at least one selected {@link Part}.
*/
DrawCommandHandler.prototype.canRotate = function(number) {
  var diagram = this.diagram;
  if (diagram === null || diagram.isReadOnly || diagram.isModelReadOnly) return false;
  if (diagram.selection.count < 1) return false;
  return true;
};

/**
* Change the angle of the parts connected with the given part. This is in the command handler
* so it can be easily accessed for the purpose of creating commands that change the rotation of a part.
* @this {DrawCommandHandler}
* @param {number=} angle the positive (clockwise) or negative (counter-clockwise) change in the rotation angle of each Part, in degrees.
*/
DrawCommandHandler.prototype.rotate = function(angle) {
  if (angle === undefined) angle = 90;
  var diagram = this.diagram;
  diagram.startTransaction("rotate " + angle.toString());
  var diagram = this.diagram;
  diagram.selection.each(function(current) {
    if (current instanceof go.Link || current instanceof go.Group) return; // skips over Links and Groups
    current.angle += angle;
  });
  diagram.commitTransaction("rotate " + angle.toString());
};


/**
 * Change the z-ordering of selected parts to pull them forward, in front of all other parts
 * in their respective layers.
 * All unselected parts in each layer with a selected Part with a non-numeric {@link Part#zOrder} will get a zOrder of zero.
 * @this {DrawCommandHandler}
 */
DrawCommandHandler.prototype.pullToFront = function() {
  var diagram = this.diagram;
  diagram.startTransaction("pullToFront");
  // find the affected Layers
  var layers = new go.Map();
  diagram.selection.each(function(part) {
    layers.set(part.layer, 0);
  });
  // find the maximum zOrder in each Layer
  layers.iteratorKeys.each(function(layer) {
    var max = 0;
    layer.parts.each(function(part) {
      if (part.isSelected) return;
      var z = part.zOrder;
      if (isNaN(z)) {
        part.zOrder = 0;
      } else {
        max = Math.max(max, z);
      }
    });
    layers.set(layer, max);
  });
  // assign each selected Part.zOrder to the computed value for each Layer
  diagram.selection.each(function(part) {
    DrawCommandHandler._assignZOrder(part, layers.get(part.layer) + 1);
  });
  diagram.commitTransaction("pullToFront");
};

/**
 * Change the z-ordering of selected parts to push them backward, behind of all other parts
 * in their respective layers.
 * All unselected parts in each layer with a selected Part with a non-numeric {@link Part#zOrder} will get a zOrder of zero.
 * @this {DrawCommandHandler}
 */
DrawCommandHandler.prototype.pushToBack = function() {
  var diagram = this.diagram;
  diagram.startTransaction("pushToBack");
  // find the affected Layers
  var layers = new go.Map();
  diagram.selection.each(function(part) {
    layers.set(part.layer, 0);
  });
  // find the minimum zOrder in each Layer
  layers.iteratorKeys.each(function(layer) {
    var min = 0;
    layer.parts.each(function(part) {
      if (part.isSelected) return;
      var z = part.zOrder;
      if (isNaN(z)) {
        part.zOrder = 0;
      } else {
        min = Math.min(min, z);
      }
    });
    layers.set(layer, min);
  });
  // assign each selected Part.zOrder to the computed value for each Layer
  diagram.selection.each(function(part) {
    DrawCommandHandler._assignZOrder(part,
        // make sure a group's nested nodes are also behind everything else
        layers.get(part.layer) - 1 - DrawCommandHandler._findGroupDepth(part));
  });
  diagram.commitTransaction("pushToBack");
};

DrawCommandHandler._assignZOrder = function(part, z, root) {
  if (root === undefined) root = part;
  if (part.layer === root.layer) part.zOrder = z;
  if (part instanceof go.Group) {
    part.memberParts.each(function(m) {
      DrawCommandHandler._assignZOrder(m, z+1, root);
    });
  }
};

DrawCommandHandler._findGroupDepth = function(part) {
  if (part instanceof go.Group) {
    var d = 0;
    part.memberParts.each(function(m) {
      d = Math.max(d, DrawCommandHandler._findGroupDepth(m));
    });
    return d+1;
  } else {
    return 0;
  }
};


/**
* This implements custom behaviors for arrow key keyboard events.
* Set {@link #arrowKeyBehavior} to "select", "move" (the default), "scroll" (the standard behavior), or "none"
* to affect the behavior when the user types an arrow key.
* @this {DrawCommandHandler}*/
DrawCommandHandler.prototype.doKeyDown = function() {
  var diagram = this.diagram;
  if (diagram === null) return;
  var e = diagram.lastInput;

  // determines the function of the arrow keys
  if (e.key === "Up" || e.key === "Down" || e.key === "Left" || e.key === "Right") {
    var behavior = this.arrowKeyBehavior;
    if (behavior === "none") {
      // no-op
      return;
    } else if (behavior === "select") {
      this._arrowKeySelect();
      return;
    } else if (behavior === "move") {
      this._arrowKeyMove();
      return;
    } else if (behavior === "tree") {
      this._arrowKeyTree();
      return;
    }
    // otherwise drop through to get the default scrolling behavior
  }

  // otherwise still does all standard commands
  go.CommandHandler.prototype.doKeyDown.call(this);
};

/**
* Collects in an Array all of the non-Link Parts currently in the Diagram.
* @this {DrawCommandHandler}
* @return {Array}
*/
DrawCommandHandler.prototype._getAllParts = function() {
  var allParts = new Array();
  this.diagram.nodes.each(function(node) { allParts.push(node); });
  this.diagram.parts.each(function(part) { allParts.push(part); });
  // note that this ignores Links
  return allParts;
};

/**
* To be called when arrow keys should move the Diagram.selection.
* @this {DrawCommandHandler}
*/
DrawCommandHandler.prototype._arrowKeyMove = function() {
  var diagram = this.diagram;
  var e = diagram.lastInput;
  // moves all selected parts in the specified direction
  var vdistance = 0;
  var hdistance = 0;
  // if control is being held down, move pixel by pixel. Else, moves by grid cell size
  if (e.control || e.meta) {
    vdistance = 1;
    hdistance = 1;
  } else if (diagram.grid !== null) {
    var cellsize = diagram.grid.gridCellSize;
    hdistance = cellsize.width;
    vdistance = cellsize.height;
  }
  diagram.startTransaction("arrowKeyMove");
  diagram.selection.each(function(part) {
    if (e.key === "Up") {
      part.move(new go.Point(part.actualBounds.x, part.actualBounds.y - vdistance));
    } else if (e.key === "Down") {
      part.move(new go.Point(part.actualBounds.x, part.actualBounds.y + vdistance));
    } else if (e.key === "Left") {
      part.move(new go.Point(part.actualBounds.x - hdistance, part.actualBounds.y));
    } else if (e.key === "Right") {
      part.move(new go.Point(part.actualBounds.x + hdistance, part.actualBounds.y));
    }
  });
  diagram.commitTransaction("arrowKeyMove");
};

/**
* To be called when arrow keys should change selection.
* @this {DrawCommandHandler}
*/
DrawCommandHandler.prototype._arrowKeySelect = function() {
  var diagram = this.diagram;
  var e = diagram.lastInput;
  // with a part selected, arrow keys change the selection
  // arrow keys + shift selects the additional part in the specified direction
  // arrow keys + control toggles the selection of the additional part
  var nextPart = null;
  if (e.key === "Up") {
    nextPart = this._findNearestPartTowards(270);
  } else if (e.key === "Down") {
    nextPart = this._findNearestPartTowards(90);
  } else if (e.key === "Left") {
    nextPart = this._findNearestPartTowards(180);
  } else if (e.key === "Right") {
    nextPart = this._findNearestPartTowards(0);
  }
  if (nextPart !== null) {
    if (e.shift) {
      nextPart.isSelected = true;
    } else if (e.control || e.meta) {
      nextPart.isSelected = !nextPart.isSelected;
    } else {
      diagram.select(nextPart);
    }
  }
};

/**
* Finds the nearest Part in the specified direction, based on their center points.
* if it doesn't find anything, it just returns the current Part.
* @this {DrawCommandHandler}
* @param {number} dir the direction, in degrees
* @return {Part} the closest Part found in the given direction
*/
DrawCommandHandler.prototype._findNearestPartTowards = function(dir) {
  var originalPart = this.diagram.selection.first();
  if (originalPart === null) return null;
  var originalPoint = originalPart.actualBounds.center;
  var allParts = this._getAllParts();
  var closestDistance = Infinity;
  var closest = originalPart;  // if no parts meet the criteria, the same part remains selected

  for (var i = 0; i < allParts.length; i++) {
    var nextPart = allParts[i];
    if (nextPart === originalPart) continue;  // skips over currently selected part
    var nextPoint = nextPart.actualBounds.center;
    var angle = originalPoint.directionPoint(nextPoint);
    var anglediff = this._angleCloseness(angle, dir);
    if (anglediff <= 45) {  // if this part's center is within the desired direction's sector,
      var distance = originalPoint.distanceSquaredPoint(nextPoint);
      distance *= 1+Math.sin(anglediff*Math.PI/180);  // the more different from the intended angle, the further it is
      if (distance < closestDistance) {  // and if it's closer than any other part,
        closestDistance = distance;      // remember it as a better choice
        closest = nextPart;
      }
    }
  }
  return closest;
};

/**
* @this {DrawCommandHandler}
* @param {number} a
* @param {number} dir
* @return {number}
*/
DrawCommandHandler.prototype._angleCloseness = function(a, dir) {
  return Math.min(Math.abs(dir - a), Math.min(Math.abs(dir + 360 - a), Math.abs(dir - 360 - a)));
};

/**
* To be called when arrow keys should change the selected node in a tree and expand or collapse subtrees.
* @this {DrawCommandHandler}
*/
DrawCommandHandler.prototype._arrowKeyTree = function() {
  var diagram = this.diagram;
  var selected = diagram.selection.first();
  if (!(selected instanceof go.Node)) return;

  var e = diagram.lastInput;
  if (e.key === "Right") {
    if (selected.isTreeLeaf) {
      // no-op
    } else if (!selected.isTreeExpanded) {
      if (diagram.commandHandler.canExpandTree(selected)) {
        diagram.commandHandler.expandTree(selected);  // expands the tree
      }
    } else {  // already expanded -- select the first child node
      var first = this._sortTreeChildrenByY(selected).first();
      if (first !== null) diagram.select(first);
    }
  } else if (e.key === "Left") {
    if (!selected.isTreeLeaf && selected.isTreeExpanded) {
      if (diagram.commandHandler.canCollapseTree(selected)) {
        diagram.commandHandler.collapseTree(selected);  // collapses the tree
      }
    } else {  // either a leaf or is already collapsed -- select the parent node
      var parent = selected.findTreeParentNode();
      if (parent !== null) diagram.select(parent);
    }
  } else if (e.key === "Up") {
    var parent = selected.findTreeParentNode();
    if (parent !== null) {
      var list = this._sortTreeChildrenByY(parent);
      var idx = list.indexOf(selected);
      if (idx > 0) {  // if there is a previous sibling
        var prev = list.elt(idx - 1);
        // keep looking at the last child until it's a leaf or collapsed
        while (prev !== null && prev.isTreeExpanded && !prev.isTreeLeaf) {
          var children = this._sortTreeChildrenByY(prev);
          prev = children.last();
        }
        if (prev !== null) diagram.select(prev);
      } else {  // no previous sibling -- select parent
        diagram.select(parent);
      }
    }
  } else if (e.key === "Down") {
    // if at an expanded parent, select the first child
    if (selected.isTreeExpanded && !selected.isTreeLeaf) {
      var first = this._sortTreeChildrenByY(selected).first();
      if (first !== null) diagram.select(first);
    } else {
      while (selected !== null) {
        var parent = selected.findTreeParentNode();
        if (parent === null) break;
        var list = this._sortTreeChildrenByY(parent);
        var idx = list.indexOf(selected);
        if (idx < list.length - 1) {  // select next lower node
          diagram.select(list.elt(idx + 1));
          break;
        } else {  // already at bottom of list of children
          selected = parent;
        }
      }
    }
  }

  // make sure the selection is now in the viewport, but not necessarily centered
  var sel = diagram.selection.first();
  if (sel !== null) diagram.scrollToRect(sel.actualBounds);
}

DrawCommandHandler.prototype._sortTreeChildrenByY = function(node) {
  var list = new go.List().addAll(node.findTreeChildrenNodes());
  list.sort(function(a, b) {
    var aloc = a.location;
    var bloc = b.location;
    if (aloc.y < bloc.y) return -1;
    if (aloc.y > bloc.y) return 1;
    if (aloc.x < bloc.x) return -1;
    if (aloc.x > bloc.x) return 1;
    return 0;
  });
  return list;
};


/**
* Reset the last offset for pasting.
* @this {DrawCommandHandler}
* @param {Iterable.<Part>} coll a collection of {@link Part}s.
*/
DrawCommandHandler.prototype.copyToClipboard = function(coll) {
  go.CommandHandler.prototype.copyToClipboard.call(this, coll);
  this._lastPasteOffset.set(this.pasteOffset);
};

/**
* Paste from the clipboard with an offset incremented on each paste, and reset when copied.
* @this {DrawCommandHandler}
* @return {Set.<Part>} a collection of newly pasted {@link Part}s
*/
DrawCommandHandler.prototype.pasteFromClipboard = function() {
  var coll = go.CommandHandler.prototype.pasteFromClipboard.call(this);
  this.diagram.moveParts(coll, this._lastPasteOffset);
  this._lastPasteOffset.add(this.pasteOffset);
  return coll;
};


/**
* Gets or sets the arrow key behavior. Possible values are "move", "select", "scroll", and "tree".
* The default value is "move".
* @name DrawCommandHandler#arrowKeyBehavior

* @return {string}
*/
Object.defineProperty(DrawCommandHandler.prototype, "arrowKeyBehavior", {
  get: function() { return this._arrowKeyBehavior; },
  set: function(val) {
    if (val !== "move" && val !== "select" && val !== "scroll" && val !== "tree" && val !== "none") {
      throw new Error("DrawCommandHandler.arrowKeyBehavior must be either \"move\", \"select\", \"scroll\", \"tree\", or \"none\", not: " + val);
    }
    this._arrowKeyBehavior = val;
  }
});

/**
* Gets or sets the offset at which each repeated pasteSelection() puts the new copied parts from the clipboard.
* The default value is (10,10).
* @name DrawCommandHandler#pasteOffset

* @return {Point}
*/
Object.defineProperty(DrawCommandHandler.prototype, "pasteOffset", {
  get: function() { return this._pasteOffset; },
  set: function(val) {
    if (!(val instanceof go.Point)) throw new Error("DrawCommandHandler.pasteOffset must be a Point, not: " + val);
    this._pasteOffset.set(val);
  }
});
