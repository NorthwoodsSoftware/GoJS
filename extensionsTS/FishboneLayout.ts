
/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go";

// FishboneLayout is a custom Layout derived from TreeLayout for creating "fishbone" diagrams.
// A fishbone diagram also requires a Link class that implements custom routing, FishboneLink,
// which is also defined in this file.

/**
* @constructor
* @extends TreeLayout
* @class
* This only works for angle === 0 or angle === 180.
* <p>
* This layout assumes Links are automatically routed in the way needed by fishbone diagrams,
* by using the FishboneLink class instead of go.Link.
*/
export class FishboneLayout extends go.TreeLayout {
  public alignment: go.EnumValue = go.TreeLayout.AlignmentBusBranching;
  public setsPortSpot: boolean = false;
  public setsChildPortSpot: boolean = false;

  public makeNetwork(coll: go.Diagram|go.Group|go.Iterable<go.Part>) {
    // assert(this.angle === 0 || this.angle === 180);
    // assert(this.alignment === go.TreeLayout.AlignmentBusBranching);
    // assert(this.path !== go.TreeLayout.PathSource);

    // call base method for standard behavior
    var net = super.makeNetwork.call(this, coll);
    // make a copy of the collection of TreeVertexes
    // because we will be modifying the TreeNetwork.vertexes collection in the loop
    var verts = new go.List(go.TreeVertex).addAll(net.vertexes);
    verts.each(function (v: go.TreeVertex) {
      // ignore leaves of tree
      if (v.destinationEdges.count === 0) return;
      if (v.destinationEdges.count % 2 === 1) {
        // if there's an odd number of real children, add two dummies
        var dummy = net.createVertex();
        dummy.bounds = new go.Rect();
        dummy.focus = new go.Point();
        net.addVertex(dummy);
        net.linkVertexes(v, dummy, null);
      }
      // make sure there's an odd number of children, including at least one dummy;
      // commitNodes will move the parent node to where this dummy child node is placed
      var dummy2 = net.createVertex();
      dummy2.bounds = v.bounds;
      dummy2.focus = v.focus;
      net.addVertex(dummy2);
      net.linkVertexes(v, dummy2, null);
    });
    return net;
  };

  public assignTreeVertexValues(v: go.TreeVertex) {
    super.assignTreeVertexValues.call(this, v);
    (<any>v)["_direction"] = 0;  // add this property to each TreeVertex
    if (v.parent !== null) {
      // The parent node will be moved to where the last dummy will be;
      // reduce the space to account for the future hole.
      if (v.angle === 0 || v.angle === 180) {
        v.layerSpacing -= v.bounds.width;
      } else {
        v.layerSpacing -= v.bounds.height;
      }
    }
  };

  public commitNodes() {
    if (this.network === null) return;
    // vertex Angle is set by BusBranching "inheritance";
    // assign spots assuming overall Angle === 0 or 180
    // and links are always connecting horizontal with vertical
    this.network.edges.each(function (e) {
      var link = e.link;
      if (link === null) return;
      link.fromSpot = go.Spot.None;
      link.toSpot = go.Spot.None;

      var v: go.TreeVertex = e.fromVertex as go.TreeVertex;
      var w: go.TreeVertex = e.toVertex as go.TreeVertex;

      if (v.angle === 0) {
        link.fromSpot = go.Spot.MiddleLeft;
      } else if (v.angle === 180) {
        link.fromSpot = go.Spot.MiddleRight;
      }

      if (w.angle === 0) {
        link.toSpot = go.Spot.MiddleLeft;
      } else if (w.angle === 180) {
        link.toSpot = go.Spot.MiddleRight;
      }
    });

    // move the parent node to the location of the last dummy
    this.network.vertexes.each(function (v: go.TreeVertex) {
      var len = v.children.length;
      if (len === 0) return;  // ignore leaf nodes
      if (v.parent === null) return; // don't move root node
      var dummy2 = v.children[len - 1];
      v.centerX = dummy2.centerX;
      v.centerY = dummy2.centerY;
    });

    var layout = this;
    this.network.vertexes.each(function (v: go.TreeVertex) {
      if (v.parent === null) {
        layout.shift(v);
      }
    });

    // now actually change the Node.location of all nodes
    super.commitNodes.call(this);
  };

  // don't use the standard routing done by TreeLayout
  public commitLinks() { };

  public shift(v: go.TreeVertex) {
    var p = v.parent;
    if (p !== null && (v.angle === 90 || v.angle === 270)) {
      var g = p.parent;
      if (g !== null) {
        var shift = v.nodeSpacing;
        if ((<any>g)["_direction"] > 0) {
          if (g.angle === 90) {
            if (p.angle === 0) {
              (<any>v)["_direction"] = 1;
              if (v.angle === 270) this.shiftAll(2, -shift, p, v);
            } else if (p.angle === 180) {
              (<any>v)["_direction"] = -1;
              if (v.angle === 90) this.shiftAll(-2, shift, p, v);
            }
          } else if (g.angle === 270) {
            if (p.angle === 0) {
              (<any>v)["_direction"] = 1;
              if (v.angle === 90) this.shiftAll(2, -shift, p, v);
            } else if (p.angle === 180) {
              (<any>v)["_direction"] = -1;
              if (v.angle === 270) this.shiftAll(-2, shift, p, v);
            }
          }
        } else if ((<any>g)["_direction"] < 0) {
          if (g.angle === 90) {
            if (p.angle === 0) {
              (<any>v)["_direction"] = 1;
              if (v.angle === 90) this.shiftAll(2, -shift, p, v);
            } else if (p.angle === 180) {
              (<any>v)["_direction"] = -1;
              if (v.angle === 270) this.shiftAll(-2, shift, p, v);
            }
          } else if (g.angle === 270) {
            if (p.angle === 0) {
              (<any>v)["_direction"] = 1;
              if (v.angle === 270) this.shiftAll(2, -shift, p, v);
            } else if (p.angle === 180) {
              (<any>v)["_direction"] = -1;
              if (v.angle === 90) this.shiftAll(-2, shift, p, v);
            }
          }
        }
      } else {  // g === null: V is a child of the tree ROOT
        var dir = ((p.angle === 0) ? 1 : -1);
        (<any>v)["_direction"] = dir;
        this.shiftAll(dir, 0, p, v);
      }
    }
    for (var i = 0; i < v.children.length; i++) {
      var c = v.children[i];
      this.shift(c);
    };
  };

  public shiftAll(direction: number, absolute: number, root: go.TreeVertex, v: go.TreeVertex) {
    // assert(root.angle === 0 || root.angle === 180);
    var locx = v.centerX;
    locx += direction * Math.abs(root.centerY - v.centerY) / 2;
    locx += absolute;
    v.centerX = locx;
    for (var i = 0; i < v.children.length; i++) {
      var c = v.children[i];
      this.shiftAll(direction, absolute, root, c);
    };
  };
  // end FishboneLayout
}

// FishboneLink has custom routing
export class FishboneLink extends go.Link {
  //go.Link.call(this);

  public computePoints(): boolean {
    var result = super.computePoints.call(this);
    if (result) {
      // insert middle point to maintain horizontal lines
      if (this.fromSpot.equals(go.Spot.MiddleRight) || this.fromSpot.equals(go.Spot.MiddleLeft)) {
        var p1: go.Point;
        // deal with root node being on the "wrong" side
        var fromnode = this.fromNode;
        var fromport = this.fromPort;
        if (fromnode !== null && fromport !== null && fromnode.findLinksInto().count === 0) {
          // pretend the link is coming from the opposite direction than the declared FromSpot
          var fromctr = fromport.getDocumentPoint(go.Spot.Center);
          var fromfar = fromctr.copy();
          fromfar.x += (this.fromSpot.equals(go.Spot.MiddleLeft) ? 99999 : -99999);
          p1 = this.getLinkPointFromPoint(fromnode, fromport, fromctr, fromfar, true).copy();
          // update the route points
          this.setPoint(0, p1);
          var endseg = this.fromEndSegmentLength;
          if (isNaN(endseg)) endseg = fromport.fromEndSegmentLength;
          p1.x += (this.fromSpot.equals(go.Spot.MiddleLeft)) ? endseg : -endseg;
          this.setPoint(1, p1);
        } else {
          p1 = this.getPoint(1);  // points 0 & 1 should be OK already
        }
        var tonode = this.toNode;
        var toport = this.toPort;
        if (tonode !== null && toport !== null) {
          var toctr = toport.getDocumentPoint(go.Spot.Center);
          var far = toctr.copy();
          far.x += (this.fromSpot.equals(go.Spot.MiddleLeft)) ? -99999 / 2 : 99999 / 2;
          far.y += (toctr.y < p1.y) ? 99999 : -99999;
          var p2 = this.getLinkPointFromPoint(tonode, toport, toctr, far, false);
          this.setPoint(2, p2);
          var dx = Math.abs(p2.y - p1.y) / 2;
          if (this.fromSpot.equals(go.Spot.MiddleLeft)) dx = -dx;
          this.insertPoint(2, new go.Point(p2.x + dx, p1.y));
        }
      } else if (this.toSpot.equals(go.Spot.MiddleRight) || this.toSpot.equals(go.Spot.MiddleLeft)) {
        var p1: go.Point = this.getPoint(1);  // points 1 & 2 should be OK already
        var fromnode = this.fromNode;
        var fromport = this.fromPort;
        if (fromnode !== null && fromport !== null) {
          var parentlink = fromnode.findLinksInto().first();
          var fromctr = fromport.getDocumentPoint(go.Spot.Center);
          var far = fromctr.copy();
          far.x += (parentlink !== null && parentlink.fromSpot.equals(go.Spot.MiddleLeft)) ? -99999 / 2 : 99999 / 2;
          far.y += (fromctr.y < p1.y) ? 99999 : -99999;
          var p0 = this.getLinkPointFromPoint(fromnode, fromport, fromctr, far, true);
          this.setPoint(0, p0);
          var dx = Math.abs(p1.y - p0.y) / 2;
          if (parentlink !== null && parentlink.fromSpot.equals(go.Spot.MiddleLeft)) dx = -dx;
          this.insertPoint(1, new go.Point(p0.x + dx, p1.y));
        }
      }
    }
    return result;
  }
}