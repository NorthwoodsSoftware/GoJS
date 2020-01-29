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

import * as go from '../release/go.js';

/**
 * A custom {@link TreeLayout} that requires a "Split" node and a "Merge" node, by category.
 * The "Split" node should be the root of a tree-like structure if one excludes links to the "Merge" node.
 * This will position the "Merge" node to line up with the "Split" node.
 *
 * Assume there is a pair of nodes that "Split" and "Merge",
 * along with any number of nodes extending in a tree-structure from the "Split" node.
 * You can set all of the TreeLayout properties that you like,
 * except that for simplicity this code just works for angle === 0 or angle === 90.
 *
 * If you want to experiment with this extension, try the <a href="../../extensionsTS/Parallel.html">Parallel Layout</a> sample.
 * @category Layout Extension
 */
export class ParallelLayout extends go.TreeLayout {
  private _splitNode: go.Node | null = null;
  private _mergeNode: go.Node | null = null;

  /**
   * Constructs a ParallelLayout and sets the following properties:
   *   - {@link #isRealtime} = false
   *   - {@link #alignment} = {@link TreeLayout.AlignmentCenterChildren}
   *   - {@link #compaction} = {@link TreeLayout.CompactionNone}
   *   - {@link #alternateAlignment} = {@link TreeLayout.AlignmentCenterChildren}
   *   - {@link #alternateCompaction} = {@link TreeLayout.CompactionNone}
   */
  constructor() {
    super();
    this.isRealtime = false;
    this.alignment = go.TreeLayout.AlignmentCenterChildren;
    this.compaction = go.TreeLayout.CompactionNone;
    this.alternateAlignment = go.TreeLayout.AlignmentCenterChildren;
    this.alternateCompaction = go.TreeLayout.CompactionNone;
  }

  /**
   * This read-only property returns the node that the tree will extend from.
   */
  get splitNode(): go.Node | null { return this._splitNode; }

  /**
   * This read-only property returns the node that the tree will converge at.
   */
  get mergeNode(): go.Node | null { return this._mergeNode; }

  /**
   * Create and initialize a {@link LayoutNetwork} with the given nodes and links.
   * This override finds the split and merge nodes and sets the focus of any {@link Group}s.
   * @param {Iterable.<Part>} coll a collection of {@link Part}s.
   * @return {LayoutNetwork}
   */
  public makeNetwork(coll: go.Iterable<go.Part>): go.LayoutNetwork {
    const net = super.makeNetwork(coll);
    this._splitNode = null;
    this._mergeNode = null;
    // look for and remember the one "Split" node and the one "Merge" node
    for (const it = net.vertexes.iterator; it.next(); ) {
      const v = it.value;
      if (v.node === null) continue;
      // handle asymmetric Groups, where the Placeholder is not centered
      if (v.node instanceof go.Group && v.node.isSubGraphExpanded && v.node.placeholder !== null) {
        v.focus = v.node.placeholder.getDocumentPoint(go.Spot.Center).subtract(v.node.position);
      }
      if (v.node.category === 'Split') {
        if (this._splitNode) throw new Error('Split node already exists in ' + this + ' -- existing: ' + this._splitNode + ' new: ' + v.node);
        this._splitNode = v.node;
      } else if (v.node.category === 'Merge') {
        if (this._mergeNode) throw new Error('Merge node already exists in ' + this + ' -- existing: ' + this._mergeNode + ' new: ' + v.node);
        this._mergeNode = v.node;
      }
    }
    if (this._splitNode || this._mergeNode) {
      if (!this._splitNode) throw new Error('Missing Split node in ' + this);
      if (!this._mergeNode) throw new Error('Missing Merge node in ' + this);
    }
    // don't lay out the Merge node
    if (this._mergeNode) net.deleteNode(this._mergeNode);
    return net;
  }

  /**
   * Assigns a position for the merge node once the other nodes have been committed.
   */
  public commitNodes(): void {
    super.commitNodes();
    if (this.network === null || this._splitNode === null) return;
    const mergeNode = this._mergeNode;
    if (!mergeNode) return;
    const splitVertex = this.network.findVertex(this._splitNode) as go.TreeVertex;
    if (!splitVertex) return;
    // line up the "Merge" node to the center of the "Split" node
    if (this.angle === 0) {
      mergeNode.position = new go.Point(splitVertex.x + splitVertex.subtreeSize.width + this.layerSpacing,
        splitVertex.centerY - mergeNode.actualBounds.height / 2);
    } else if (this.angle === 90) {
      mergeNode.position = new go.Point(splitVertex.centerX - mergeNode.actualBounds.width / 2,
        splitVertex.y + splitVertex.subtreeSize.height + this.layerSpacing);
    }
  }

  /**
   * Finds links into the merge node and adjusts spots and maybe points.
   */
  public commitLinks(): void {
    super.commitLinks();
    const mergeNode = this._mergeNode;
    if (mergeNode) {
      for (const it = mergeNode.findLinksInto(); it.next(); ) {
        const link = it.value;
        if (this.angle === 0) {
          link.fromSpot = go.Spot.Right;
          link.toSpot = go.Spot.Left;
        } else if (this.angle === 90) {
          link.fromSpot = go.Spot.Bottom;
          link.toSpot = go.Spot.Top;
        }
        if (!link.isOrthogonal) continue;
        // have all of the links coming into the "Merge" node have segments
        // that share a common X (or if angle==90, Y) coordinate
        link.updateRoute();
        if (link.pointsCount >= 6) {
          const pts = link.points.copy();
          const p2 = pts.elt(pts.length - 4);
          const p3 = pts.elt(pts.length - 3);
          if (this.angle === 0) {
            const x = mergeNode.position.x - this.layerSpacing / 2;
            pts.setElt(pts.length - 4, new go.Point(x, p2.y));
            pts.setElt(pts.length - 3, new go.Point(x, p3.y));
          } else if (this.angle === 90) {
            const y = mergeNode.position.y - this.layerSpacing / 2;
            pts.setElt(pts.length - 4, new go.Point(p2.x, y));
            pts.setElt(pts.length - 3, new go.Point(p3.x, y));
          }
          link.points = pts;
        }
      }
    }
  }
}
