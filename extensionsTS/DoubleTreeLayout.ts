'use strict';
/*
*  Copyright (C) 1998-2019 by Northwoods Software Corporation. All Rights Reserved.
*/

/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/

import * as go from '../release/go';

/**
 * Perform two TreeLayouts, one going rightwards and one going leftwards.
 * The choice of direction is determined by the mandatory predicate {@link #directionFunction},
 * which is called on each child Node of the root Node.
 *
 * You can also set {@link #vertical} to true if you want the DoubleTreeLayout to
 * perform TreeLayouts both downwards and upwards.
 *
 * At the current time this only handles graphs for which there is a single root node --
 * i.e. where there is only one Node for which {@link Node#findTreeParentNode} returns null.
 *
 * If you want to experiment with this extension, try the <a href="../../samples/doubleTree.html">Double Tree</a> sample.
 * @category Layout Extension
 */
export class DoubleTreeLayout extends go.Layout {
  private _vertical: boolean = false;
  private _directionFunction: ((node: go.Node) => boolean) = function(node: go.Node): boolean { return true; };
  private _bottomRightOptions: Partial<go.TreeLayout> | null = null;
  private _topLeftOptions: Partial<go.TreeLayout> | null = null;

  /**
  * When false, the layout should grow towards the left and towards the right;
  * when true, the layout show grow upwards and downwards.
  * The default value is false.
  */
  get vertical(): boolean { return this._vertical; }
  set vertical(value: boolean) {
    if (typeof value !== "boolean") throw new Error("new value for DoubleTreeLayout.vertical must be a boolean value.");
    if (this._vertical !== value) {
      this._vertical = value;
      this.invalidateLayout();
    }
  }

  /**
  * This function is called on each child node of the root node
  * in order to determine whether the subtree starting from that child node
  * will grow towards larger coordinates or towards smaller ones.
  * The value must be a function and must not be null.
  * It must return true if {@link #isPositiveDirection} should return true; otherwise it should return false.
  */
  get directionFunction(): ((node: go.Node) => boolean) { return this._directionFunction; }
  set directionFunction(value: ((node: go.Node) => boolean)) {
    if (typeof value !== "function") {
      throw new Error("new value for DoubleTreeLayout.directionFunction must be a function taking a node data object and returning a boolean.");
    }
    if (this._directionFunction !== value) {
      this._directionFunction = value;
      this.invalidateLayout();
    }
  }

  /**
   * Gets or sets the options to be applied to a {@link TreeLayout}.
   * By default this is null -- no properties are set on the TreeLayout
   * other than the {@link TreeLayout#angle}, depending on {@link #vertical} and
   * the result of calling {@link #directionFunction}.
   */
  get bottomRightOptions(): Partial<go.TreeLayout> | null { return this._bottomRightOptions; }
  set bottomRightOptions(value: Partial<go.TreeLayout> | null) {
    if (this._bottomRightOptions !== value) {
      this._bottomRightOptions = value;
      this.invalidateLayout();
    }
  }

  /**
   * Gets or sets the options to be applied to a {@link TreeLayout}.
   * By default this is null -- no properties are set on the TreeLayout
   * other than the {@link TreeLayout#angle}, depending on {@link #vertical} and
   * the result of calling {@link #directionFunction}.
   */
  get topLeftOptions(): Partial<go.TreeLayout> | null { return this._topLeftOptions; }
  set topLeftOptions(value: Partial<go.TreeLayout> | null) {
    if (this._topLeftOptions !== value) {
      this._topLeftOptions = value;
      this.invalidateLayout();
    }
  }

  /**
  * @ignore
  * Copies properties to a cloned Layout.
  */
  protected cloneProtected(copy: this): void {
    super.cloneProtected(copy);
    copy._vertical = this._vertical;
    copy._directionFunction = this._directionFunction;
    copy._bottomRightOptions = this._bottomRightOptions;
    copy._topLeftOptions = this._topLeftOptions;
  }

  /**
   * Perform two {@link TreeLayout}s by splitting the collection of Parts
   * into two separate subsets but sharing only a single root Node.
   * @param coll
   */
  public doLayout(coll: (go.Diagram | go.Group | go.Iterable<go.Part>)): void {
    const coll2: go.Iterable<go.Part> = this.collectParts(coll);
    const diagram = this.diagram;
    if (diagram !== null) diagram.startTransaction("Double Tree Layout");

    // split the nodes and links into two Sets, depending on direction
    const leftParts = new go.Set<go.Part>();
    const rightParts = new go.Set<go.Part>();
    this.separatePartsForLayout(coll2, leftParts, rightParts);
    // but the ROOT node will be in both collections

    // create and perform two TreeLayouts, one in each direction,
    // without moving the ROOT node, on the different subsets of nodes and links
    const layout1 = new go.TreeLayout();
    layout1.angle = this.vertical ? 270 : 180;
    layout1.arrangement = go.TreeLayout.ArrangementFixedRoots;
    layout1.setsPortSpot = false;

    const layout2 = new go.TreeLayout();
    layout2.angle = this.vertical ? 90 : 0;
    layout2.arrangement = go.TreeLayout.ArrangementFixedRoots;
    layout2.setsPortSpot = false;

    layout1.doLayout(leftParts);
    layout2.doLayout(rightParts);

    if (diagram !== null) diagram.commitTransaction("Double Tree Layout");
  }

  /**
   * This just returns an instance of {@link TreeLayout}.
   * The caller will set the {@link TreeLayout#angle}.
   * @param {boolean} positive true for growth downward or rightward
   * @return {TreeLayout}
   */
  protected createTreeLayout(positive: boolean): go.TreeLayout {
    const lay = new go.TreeLayout();
    let opts = this.topLeftOptions;
    if (positive) opts = this.bottomRightOptions;
    if (opts) for (const p in opts) { (<any>lay)[p] = (<any>opts)[p]; }
    return lay;
  }

  /**
   * This is called by {@link #doLayout} to split the collection of Nodes and Links into two Sets,
   * one for the subtrees growing towards the left or upwards, and one for the subtrees
   * growing towards the right or downwards.
   */
  protected separatePartsForLayout(coll: go.Iterable<go.Part>, leftParts: go.Set<go.Part>, rightParts: go.Set<go.Part>): void {
    let root = null;
    const it = coll.iterator;
    while (it.next() && root === null) {
      const node = it.value;
      if (node instanceof go.Node && node.findTreeParentNode() === null) root = node;
    }
    if (root === null) return;  //??? no root? give up!

    //??? This does not handle multiple roots.
    // the ROOT node is shared by both subtrees
    leftParts.add(root);
    rightParts.add(root);
    const lay = this;
    // look at all of the immediate children of the ROOT node
    root.findTreeChildrenNodes().each(function(child) {
        // in what direction is this child growing?
        const bottomright = lay.isPositiveDirection(child);
        const parts = bottomright ? rightParts : leftParts;
        // add the whole subtree starting with this child node
        parts.addAll(child.findTreeParts());
        // and also add the link from the ROOT node to this child node
        const plink = child.findTreeParentLink();
        if (plink !== null) parts.add(plink);
      });
  }

  /**
   * This predicate is called on each child node of the root node,
   * and only on immediate children of the root.
   * It should return true if this child node is the root of a subtree that should grow
   * rightwards or downwards, or false otherwise.
   * @param {Node} child
   * @returns {boolean} true if grows towards right or towards bottom; false otherwise
   */
  protected isPositiveDirection(child: go.Node): boolean {
    const f = this.directionFunction;
    if (!f) throw new Error("No DoubleTreeLayout.directionFunction supplied on the layout");
    return f(child);
  }
}
