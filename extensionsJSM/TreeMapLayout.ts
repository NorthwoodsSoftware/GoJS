/*
 *  Copyright 1998-2025 by Northwoods Software Corporation. All Rights Reserved.
 */

/*
 * This is an extension and not part of the main GoJS library.
 * The source code for this is at extensionsJSM/TreeMapLayout.ts.
 * Note that the API for this class may change with any version, even point releases.
 * If you intend to use an extension in production, you should copy the code to your own source directory.
 * Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
 * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
 */

import * as go from 'gojs';

/**
 * This enumeration is used to determine the algorithm for placing nodes in {@link TreeMapLayout}.
 * 
 * Note: this enumeration is only exists in extensionsJSM, not in extensions.
 * @since 3.0
 * @category Layout Extension
 */
export enum TreeMapPlacement {
  /**
   * Places nodes to maximize the aspect ratio of each node being close to the chosen aspect ratio.
   * This placement does not maintain node order.
   *
   * The {@link TreeMapLayout.aspectRatio} property determines what aspect ratio to prioritize.
   * The starting orientation is determined by {@link TreeMapLayout.isTopLevelHorizontal}.
   * Layer orientation is determined by {@link TreeMapLayout.alternatingOrientation}.
   */
  AspectRatio = 0,
  /**
   * Places nodes by equally splitting space for each node on one axis. Alternates what axis nodes are placed on at each level.
   * Maintains placement of nodes near each other.
   *
   * The starting orientation is determined by {@link TreeMapLayout.isTopLevelHorizontal}.
   */
  SliceAndDice = 1,
  /**
   * Places nodes maintaining node order by placing remaining nodes around a chosen pivot.
   * Pivot can be selected by {@link TreeMapLayout.treeMapOrderedPivot}.
   * Choses orientation based on available width and height.
   * Sections under 5 nodes will be placed according to {@link TreeMapLayout.treeMapOrderedStoppingLayout}
   */
  Ordered = 2,
}

/**
 * This enumeration is used to determine the pivot node in {@link TreeMapPlacement.Ordered} layouts.
 * 
 * Note: this enumeration is only exists in extensionsJSM, not in extensions.
 * @since 3.0
 * @category Layout Extension
 */
export enum TreeMapOrderedPivot {
  /**
   * Selects the largest node as the pivot node.
   */
  Size = 0,
  /**
   * Selects a pivot node which best splits the remaining nodes in half by total size.
   */
  SplitSize = 1,
  /**
   * Chooses the middle node as the pivot node.
   */
  Middle = 2,
}

/**
 * This enumeration is used to determine the stopping layout in {@link TreeMapPlacement.Ordered} layouts.
 * This layout is used once a section has 4 or less nodes.
 * 
 * Note: this enumeration is only exists in extensionsJSM, not in extensions.
 * @since 3.0
 * @category Layout Extension
 */
export enum TreeMapOrderedStoppingLayout {
  /**
   * Makes a conical spiral of the remaining nodes.
   */
  Conical = 0,
  /**
   * Places remaining nodes in a line along the longer remaining axis.
   */
  Line = 1,
}

/**
 * A custom {@link go.Layout} that lays out hierarchical data using nested rectangles.
 *
 * If you want to experiment with this extension, try the <a href="../../samples/TreeMap.html">TreeMap Layout</a> sample.
 * @category Layout Extension
 */
export class TreeMapLayout extends go.Layout {
  private _isTopLevelHorizontal: boolean;
  private _alternatingOrientation: boolean;
  private _equalSpacing: boolean;
  private _aspectRatio: number;
  private _layerSpacing: number;
  private _size: go.Size;
  private _treeMapPlacement: TreeMapPlacement;
  private _treeMapOrderedPivot: TreeMapOrderedPivot;
  private _treeMapOrderedStoppingLayout: TreeMapOrderedStoppingLayout;

  constructor(init?: Partial<TreeMapLayout>) {
    super();
    this._isTopLevelHorizontal = true;
    this._alternatingOrientation = false;
    this._equalSpacing = false;
    this._aspectRatio = 2.5;
    this._layerSpacing = 10;
    this._size = new go.Size(NaN, NaN);
    this._treeMapPlacement = TreeMapPlacement.AspectRatio;
    this._treeMapOrderedPivot = TreeMapOrderedPivot.Size;
    this._treeMapOrderedStoppingLayout = TreeMapOrderedStoppingLayout.Conical;
    if (init) Object.assign(this, init);
  }

  /**
   * Gets or sets whether top level parts are laid out horizontally.
   * 
   * Default is true.
   */
  get isTopLevelHorizontal(): boolean {
    return this._isTopLevelHorizontal;
  }
  set isTopLevelHorizontal(val: boolean) {
    val = !!val;
    if (this._isTopLevelHorizontal !== val) {
      this._isTopLevelHorizontal = val;
      this.invalidateLayout();
    }
  }

  /**
   * Gets or sets whether each layers orientation is determined by its parents.
   * This only applies if {@link TreeMapPlacement} is {@link TreeMapPlacement.AspectRatio}
   * If true each layer will alternate, if not the orientation will be determined by whether width
   * or height is larger.
   * 
   * Default is false.
   */
  get alternatingOrientation(): boolean {
    return this._alternatingOrientation;
  }
  set alternatingOrientation(val: boolean) {
    val = !!val;
    if (this._alternatingOrientation !== val) {
      this._alternatingOrientation = val;
      this.invalidateLayout();
    }
  }  

  /**
   * Gets or sets whether each layers spacing is multiplied by the layer its on.
   * 
   * Default is false.
   */
  get equalSpacing(): boolean {
    return this._equalSpacing;
  }
  set equalSpacing(val: boolean) {
    val = !!val;
    if (this._equalSpacing !== val) {
      this._equalSpacing = val;
      this.invalidateLayout();
    }
  }  


  /**
   * Gets or sets the prioritized aspect ratio for nodes.
   * 
   * This only applies if {@link TreeMapPlacement} is {@link TreeMapPlacement.AspectRatio}.
   * Default is 2.5.
   */
  get aspectRatio(): number {
    return this._aspectRatio;
  }
  set aspectRatio(value: number) {
    if (this.aspectRatio !== value && this.isNumeric(value) && value > 0) {
      this._aspectRatio = value;
      this.invalidateLayout();
    }
  }

  /**
   * Gets or sets the spacing factor for each layer
   * 
   * Default is 10.
   */
  get layerSpacing(): number {
    return this._layerSpacing;
  }
  set layerSpacing(value: number) {
    if (this.layerSpacing !== value && this.isNumeric(value) && value > 0) {
      this._layerSpacing = value;
      this.invalidateLayout();
    }
  }


  /**
   * Gets or sets the size for the layout to fill. Values of NaN fill the viewport in
   * the given direction.
   * 
   * The default value is NaN x NaN, which fills the full viewport.
   */
  get size(): go.Size {
    return this._size;
  }
  set size(value: go.Size) {
    // check if both width and height are NaN, as per https://stackoverflow.com/a/16988441
    if (
      ((this.isNumeric(value.width) && value.width >= 0) || value.width !== value.width) &&
      ((this.isNumeric(value.height) && value.height >= 0) || value.height !== value.height)
    ) {
      this._size = value;
      this.invalidateLayout();
    }
  }

  /**
   * Gets or sets the method by which nodes will be placed.
   * Valid values are {@link TreeMapPlacement} values.
   *
   * The default value is {@link TreeMapPlacement.AspectRatio}.
   */
  get treeMapPlacement(): TreeMapPlacement {
    return this._treeMapPlacement;
  }
  set treeMapPlacement(value: TreeMapPlacement) {
    if (this.treeMapPlacement !== value &&
        (value === TreeMapPlacement.SliceAndDice || value === TreeMapPlacement.Ordered || value === TreeMapPlacement.AspectRatio)) {
      this._treeMapPlacement = value;
      this.invalidateLayout();
    }
  }

  /**
   * Gets or sets the method by which the pivot node is chosen.
   * Valid values are {@link TreeMapOrderedPivot} values.
   *
   * The default value is {@link TreeMapOrderedPivot.Size}.
   */
  get treeMapOrderedPivot(): TreeMapOrderedPivot {
    return this._treeMapOrderedPivot;
  }
  set treeMapOrderedPivot(value: TreeMapOrderedPivot) {
    if (this.treeMapOrderedPivot !== value &&
        (value === TreeMapOrderedPivot.Size || value === TreeMapOrderedPivot.Middle || value === TreeMapOrderedPivot.SplitSize)) {
      this._treeMapOrderedPivot = value;
      this.invalidateLayout();
    }
  }

  /**
   * Gets or sets the method by which nodes will be placed when there are less than 4 in 
   * an Ordered placement.
   * Valid values are {@link TreeMapOrderedStoppingLayout} values.
   *
   * The default value is {@link TreeMapOrderedStoppingLayout.Conical}.
   */
  get treeMapOrderedStoppingLayout(): TreeMapOrderedStoppingLayout {
    return this._treeMapOrderedStoppingLayout;
  }
  set treeMapOrderedStoppingLayout(value: TreeMapOrderedStoppingLayout) {
    if (this.treeMapOrderedStoppingLayout !== value &&
        (value === TreeMapOrderedStoppingLayout.Conical || value === TreeMapOrderedStoppingLayout.Line )) {
      this._treeMapOrderedStoppingLayout= value;
      this.invalidateLayout();
    }
  }

  /**
   * Copies properties to a cloned Layout.
   */
  override cloneProtected(copy: this): void {
    super.cloneProtected(copy);
    copy._isTopLevelHorizontal = this._isTopLevelHorizontal;
    copy._alternatingOrientation = this._alternatingOrientation;
    copy._aspectRatio = this._aspectRatio;
    copy._treeMapPlacement = this._treeMapPlacement;
    copy._treeMapOrderedStoppingLayout = this._treeMapOrderedStoppingLayout;
    copy._treeMapOrderedPivot = this._treeMapOrderedPivot;
    copy._size = this._size;
    copy._equalSpacing = this._equalSpacing;
    copy._layerSpacing = this._layerSpacing;
  }

  /**
   * This method actually positions all of the nodes by determining total area and then recursively tiling nodes from the top-level down.
   * @param coll - A {@link go.Diagram} or a {@link go.Group} or a collection of {@link go.Part}s.
   */
  override doLayout(coll: go.Diagram | go.Group | go.Iterable<go.Part>): void {
    if (!(coll instanceof go.Diagram)) throw new Error('TreeMapLayout only works as the Diagram.layout');
    const diagram = coll;
    this.computeTotals(diagram); // make sure data.total has been computed for every node
    // figure out how large an area to cover;
    this.arrangementOrigin = this.initialOrigin(this.arrangementOrigin);
    const x = this.arrangementOrigin.x;
    const y = this.arrangementOrigin.y;
    // checks whether to use given sizes or to use the viewport determined by size being NaN
    let w = 0;
    let h = 0;
    if (isNaN(this.size.width)) {
      w = diagram.viewportBounds.width;
      if (isNaN(w)) w = 1000;
    } else {
      w = this.size.width;
    }
    if (isNaN(this.size.height)) {
      h = diagram.viewportBounds.height;
      if (isNaN(h)) h = 1000;
    } else {
      h = this.size.height;
    }
    if (h === 0 || w === 0) { // If size is set to 0 all of the nodes will be 0 sized
        diagram.nodes.each((n) => {
            n.desiredSize = new go.Size(0, 0);
        })
        return;
    }
    // collect all top-level nodes, and sum their totals
    const tops: Array<go.Part> = [];
    let total = 0;
    diagram.nodes.each((n) => {
      if (n.isTopLevel) {
        tops.push(n);
        total += n.data.total;
      }
    });
    // kicks out if there are no nodes
    if (tops.length < 1) return;
    // picks the chosen layout based on treeMapPlacement
    if (this._treeMapPlacement === TreeMapPlacement.SliceAndDice) {
      this.layoutSliceAndDice(tops, total, this.isTopLevelHorizontal, x, y, w, h, 1);
    } else if (this._treeMapPlacement === TreeMapPlacement.AspectRatio) {
      // sorts the nodes size for aspectRatio layout
      tops.sort((a, b) => b.data.total - a.data.total);
      this.layoutAspectRatio(tops, total, this.isTopLevelHorizontal, x, y, w, h, 1);
    } else if (this._treeMapPlacement === TreeMapPlacement.Ordered) {
      this.layoutOrdered(tops, total, x, y, w, h, 1);
    }
  }

  /**
   * @hidden @internal
   */
  layoutAspectRatio(
    nodes: Array<go.Part>,
    total: number,
    horiz: boolean,
    x: number,
    y: number,
    w: number,
    h: number,
    l: number
  ): void {
    const aspectRatio = this.aspectRatio;
    const convertFactor = Math.sqrt((w * h) / total);
    // conversion factor between "total" value and size of layout

    let placeableNodes: Array<go.Part> = [];
    let placeableTotal: number = 0;
    let placeableFactor: number = Number.MAX_SAFE_INTEGER;

    // check whether or place vertically or horizontally
    // important note placing "horizontally" will cause nodes to be place vertically on the edge as they are horizontally placed with the rest of the nodes
    if (this.alternatingOrientation? horiz : (w > h)) {
      let placeableWidth: number = 0;
      // goes through each node to add them to the array
      while (nodes.length > 0) {
        let node: go.Part = nodes[0];
        let newTotal = placeableTotal + node.data.total;
        let nodesWidth = newTotal / (h / convertFactor);
        let nodesRatio = nodesWidth * nodesWidth / node.data.total;
        // gets the next largest node and checks if adding it will get the aspect ratio closer or farther
        if (Math.abs(aspectRatio - nodesRatio) < placeableFactor) {
          placeableFactor = Math.abs(aspectRatio - nodesRatio);
          placeableTotal = newTotal;
          placeableWidth = nodesWidth;
          placeableNodes.push(nodes.shift()!);
        } else {
          // once the closest to the ratio has been achieved it breaks and recursive calls to place the rest
          break;
        }
      }
      let py = y;
      // places all the selected nodes into a stack on the left
      placeableNodes.forEach((node: go.Part) => {
        this.layoutNode(horiz, node, x, py, placeableWidth * convertFactor, (node.data.total / placeableWidth) * convertFactor, l);
        py += (node.data.total / placeableWidth) * convertFactor;
      });
      // if any nodes are left they are placed into the remaining area
      if (nodes.length > 0) {
        this.layoutAspectRatio(nodes, total - placeableTotal, !horiz, x + (placeableWidth * convertFactor), y, w - (placeableWidth * convertFactor), h, l);
      }
    } else {
      let placeableHeight: number = 0;
      // goes through each node to add them to the array
      while (nodes.length > 0) {
        let node: go.Part = nodes[0];
        let newTotal = placeableTotal + node.data.total;
        let nodesHeight = newTotal / (w / convertFactor);
        let nodesRatio = (node.data.total / nodesHeight) / nodesHeight;
        // gets the next largest node and checks if adding it will get the aspect ratio closer or farther
        if (Math.abs(aspectRatio - nodesRatio) < placeableFactor) {
          placeableFactor = Math.abs(aspectRatio - nodesRatio);
          placeableTotal = newTotal;
          placeableHeight = nodesHeight;
          placeableNodes.push(nodes.shift()!);
        } else {
          break;
        }
      }
      let px = x;
      // places the selected nodes in a row at the top
      placeableNodes.forEach((node: go.Part) => {
        this.layoutNode(horiz, node, px, y, (node.data.total / placeableHeight) * convertFactor, placeableHeight * convertFactor, l);
        px += (node.data.total / placeableHeight) * convertFactor;
      });
      // if any nodes are left they are placed into the remaining area
      if (nodes.length > 0) {
        this.layoutAspectRatio(nodes, total - placeableTotal, !horiz, x, y + (placeableHeight * convertFactor), w, h - (placeableHeight * convertFactor), l);
      }
    }
  }

  /**
   * @hidden @internal
   */
  layoutOrdered(
    nodes: Array<go.Part>,
    total: number,
    x: number,
    y: number,
    w: number,
    h: number,
    l: number
  ): void {
    // if there are less than 5 nodes they are placed into the set end placement
    if (nodes.length < 5) {
      if (this.treeMapOrderedStoppingLayout === TreeMapOrderedStoppingLayout.Conical) {
        this.layoutConical(nodes, total, x, y, w, h, l);
      } else if  (this.treeMapOrderedStoppingLayout === TreeMapOrderedStoppingLayout.Line) {
        this.layoutLine(nodes, total, x, y, w, h, l);
      }
    } else {
      let pivotNode: go.Part;
      // based on selected method the pivot node is calculated
      if (this.treeMapOrderedPivot === TreeMapOrderedPivot.Middle) {
        // finds the node in the middle
        pivotNode = nodes[Math.floor(nodes.length / 2)]
      } else if (this.treeMapOrderedPivot === TreeMapOrderedPivot.Size) {
        // finds the node with the largest total
        let largestSize = 0;
        nodes.forEach(node => {
          if (node.data.total > largestSize) {
            pivotNode = node;
            largestSize = node.data.total;
          }
        });
      } else if (this.treeMapOrderedPivot === TreeMapOrderedPivot.SplitSize) {
        // starts totalling from the left and right to find the node which best splits the list in half
        let li = 0;
        let ri = nodes.length - 1;
        let lt = nodes[li].data.total;
        let rt = nodes[ri].data.total;
        while (ri - li > 2) {
          if (lt < rt) {
            li++;
            lt += nodes[li].data.total;
          } else {
            ri--;
            rt += nodes[ri].data.total;
          }
        }
        pivotNode = nodes[li + 1];
      }
      
      // gets the index of the pivot node
      pivotNode = pivotNode!;
      let pivotIndex = nodes.findIndex((x) => {
        return (x === pivotNode);
      });
      
      // divides up remaining nodes into L1 (before pivot) and L3 (after pivot)
      let L1: Array<go.Part> = nodes.slice(0, pivotIndex);
      let L2: Array<go.Part> = [];
      let L3: Array<go.Part> = nodes.slice(pivotIndex + 1);

      // calculates total value of L2 which would allow pivot node to be square
      let targetTotal = (((Math.sqrt((pivotNode.data.total / total) * (w * h))) * h) / (w * h)) * total;
      let currentTotal = pivotNode.data.total;

      // checks and attempts to add nodes from the start of L3 to L2 to get as close to calculated total as possible
      while (L3.length > 0) {
        const node = L3[0];
        if (Math.abs(targetTotal - currentTotal) > Math.abs(targetTotal - (currentTotal + node.data.total))) {
          L2.push(L3.shift()!);
          currentTotal += node.data.total;
        } else {
          break;
        }
      }

      // calculate total for each list of nodes
      let L1Total = L1.reduce((total, node) => total + parseInt(node.data.total), 0);
      let L2Total = currentTotal - pivotNode.data.total;
      let L3Total = L3.reduce((total, node) => total + parseInt(node.data.total), 0);

      if (w > h) {
        let px = x;
        // if there are nodes in L1 there are placed on the left
        if (L1.length > 0) {
          this.layoutOrdered(L1, L1Total, px, y, w * (L1Total / total), h, l);
        }
        px += w * (L1Total / total);
        // pivot node is placed at the top of the middle section
        this.layoutNode(true, pivotNode, px, y, w * (currentTotal / total), h * (pivotNode.data.total / currentTotal), l);
        // L2 fills up rest of middle section
        if (L2.length > 0) {
          this.layoutOrdered(L2, L2Total, px, y + h * (pivotNode.data.total / currentTotal), w * (currentTotal / total), h * (L2Total / currentTotal), l);
        }
        px += w * (currentTotal / total);
        // L3 takes of rest of the space on the right
        if (L3.length > 0) {
          this.layoutOrdered(L3, L3Total, px, y, w * (L3Total / total), h, l);
        }
      } else {
        let py = y;
        // nodes in L1 are placed at the top
        if (L1.length > 0) {
          this.layoutOrdered(L1, L1Total, x, py, w, h * (L1Total / total), l);
        }
        py += h * (L1Total / total);
        // pivot node is placed on the left of the middle row
        this.layoutNode(true, pivotNode, x, py, w * (pivotNode.data.total / currentTotal), h * (currentTotal / total), l);
        if (L2.length > 0) {
          this.layoutOrdered(L2, L2Total, x + w * (pivotNode.data.total / currentTotal), py, w * (L2Total / currentTotal), h * (currentTotal / total), l);
        }
        py += h * (currentTotal / total);
        // L3 fills up rest of space at the bottom
        if (L3.length > 0) {
          this.layoutOrdered(L3, L3Total, x, py, w, h * (L3Total / total), l);
        }
      }
    }
  }

  /**
   * @hidden @internal
   */
  layoutSliceAndDice(
    nodes: Array<go.Part>,
    total: number,
    horiz: boolean,
    x: number,
    y: number,
    w: number,
    h: number,
    l: number
  ): void {
    let gx = x;
    let gy = y;
    const lay = this;
    // goes through and places nodes in a line giving them area based on their fraction of total of their parent
    nodes.forEach((part) => {
      const tot = part.data.total;
      if (horiz) {
        const pw = (w * tot) / total;
        lay.layoutNode(!horiz, part, gx, gy, pw, h, l);
        gx += pw;
      } else {
        const ph = (h * tot) / total;
        lay.layoutNode(!horiz, part, gx, gy, w, ph, l);
        gy += ph;
      }
    });
  }

  /**
   * @hidden @internal
   */
  layoutNode(
    horiz: boolean,
    part: go.Part,
    x: number,
    y: number,
    w: number,
    h: number,
    l: number
  ): void {
    const spacing = (this.equalSpacing)? this.layerSpacing : this.layerSpacing / (l * 2);
    // places node on diagram and sets nodes size
    part.moveTo(x + spacing, y + spacing);
    part.desiredSize = new go.Size(Math.max(w - spacing * 2, 1), Math.max(h - spacing * 2, 1));
    
    // if part is a group and has children they are placed
    if (part instanceof go.Group) {
      const g = part;
      // gets total and collects list of children
      const total = g.data.total;
      const children: Array<go.Part> = [];
      g.memberParts.each((p) => {
          children.push(p);
      });
      // if there aren't are children returns
      if (children.length < 1) return;

      // places them based on selected placement
      if (this._treeMapPlacement === TreeMapPlacement.SliceAndDice) {
          this.layoutSliceAndDice(children, total, horiz, x + spacing, y + spacing, Math.max(w - spacing * 2, 1),  Math.max(h - spacing * 2, 1), l + 1);
      } else if (this._treeMapPlacement === TreeMapPlacement.AspectRatio) {
          // sorts children by size for aspect ratio placement
          children.sort((a, b) => b.data.total - a.data.total);
          this.layoutAspectRatio(children, total, horiz, x + spacing, y + spacing, Math.max(w - spacing * 2, 1),  Math.max(h - spacing * 2, 1), l + 1);
      } else if (this._treeMapPlacement === TreeMapPlacement.Ordered) {
        this.layoutOrdered(children, total, x + spacing, y + spacing, Math.max(w - spacing * 2, 1),  Math.max(h - spacing * 2, 1), l + 1);
      } 
    }
  }

  /**
   * @hidden @internal
   */
  layoutConical(
    nodes: Array<go.Part>,
    total: number,
    x: number,
    y: number,
    w: number,
    h: number,
    l: number
  ): void {
    let horiz = true;
    // goes through letting every node take up the full length of the axis
    nodes.forEach((node: go.Part) => {
      if (horiz) {
        this.layoutNode(true, node, x, y, w * (node.data.total / total), h, l);
        x += w * (node.data.total / total);
        w -= w * (node.data.total / total);
        total -= node.data.total;
      } else {
        this.layoutNode(true, node, x, y, w, h * (node.data.total / total), l);
        y += h * (node.data.total / total);
        h -= h * (node.data.total / total);
        total -= node.data.total;
      }
      horiz = !horiz;
    });
  }

  /**
   * @hidden @internal
   */
  layoutLine(
    nodes: Array<go.Part>,
    total: number,
    x: number,
    y: number,
    w: number,
    h: number,
    l: number
  ): void {
    let horiz = w > h;
    // splits remaining space into a row or column of remaining nodes
    nodes.forEach((node: go.Part) => {
      if (horiz) {
        this.layoutNode(true, node, x, y, w * (node.data.total / total), h, l);
        x += w * (node.data.total / total);
      } else {
        this.layoutNode(true, node, x, y, w, h * (node.data.total / total), l);
        y += h * (node.data.total / total);
      }
    });
  }

  /**
   * Compute the `data.total` for each node in the Diagram, with a {@link go.Group}'s being a sum of its members.
   */
  computeTotals(diagram: go.Diagram): void {
    if (!diagram.nodes.all((g: go.Node) => !(g instanceof go.Group) || g.data.total >= 0)) {
      let groups = new Set<go.Group>();
      diagram.nodes.each((n: go.Node) => {
        if (n instanceof go.Group) {
          // collect all groups
          groups.add(n);
        } else {
          // regular nodes just have their total == size
          n.data.total = n.data.size;
        }
      });
      // keep looking for groups whose total can be computed, until all groups have been processed
      while (groups.size > 0) {
        const grps = new Set<go.Group>();
        groups.forEach((g: go.Group) => {
          // for a group all of whose member nodes have an initialized data.total,
          if (g.memberParts.all((m) => !(m instanceof go.Group) || m.data.total >= 0)) {
            // compute the group's total as the sum of the sizes of all of the member nodes
            g.data.total = 0;
            g.memberParts.each((m) => {
              if (m instanceof go.Node) g.data.total += m.data.total;
            });
          } else {
            // remember for the next iteration
            grps.add(g);
          }
        });
        groups = grps;
      }
    }
  }

  /**
   * @hidden @internal
   * Checks if a value is a number, used for parameter validation
   * @param value - the value to check
   */
  private isNumeric(value: number): boolean {
    return typeof value === 'number' && !isNaN(value) && isFinite(value);
  }
}
