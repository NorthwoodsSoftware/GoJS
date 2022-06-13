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

import * as go from '../release/go.js';
import { Quadtree } from './Quadtree.js';

/**
 * @hidden @internal
 * Used to represent the perimeter of the currently packed
 * shape when packing rectangles. Segments are always assumed
 * to be either horizontal or vertical, and store whether or
 * not their first point is concave (this makes sense in the
 * context of representing a perimeter, as the next segment
 * will always be connected to the last).
 */
class Segment {
  public x1: number;
  public y1: number;
  public x2: number;
  public y2: number;
  public p1Concave: boolean;
  public isHorizontal: boolean; // if the segment is not horizontal, it is assumed to be vertical

  /**
   * @hidden @internal
   * Constructs a new Segment. Segments are assumed to be either
   * horizontal or vertical, and the given coordinates should
   * reflect that.
   * @param x1 the x coordinate of the first point
   * @param y1 the y coordinate of the first point
   * @param x2 the x coordinate of the second point
   * @param y2 the y coordinate of the second point
   * @param p1Concave whether or not the first point is concave
   */
  constructor(x1: number, y1: number, x2: number, y2: number, p1Concave: boolean) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.p1Concave = p1Concave;
    this.isHorizontal = Math.abs(y2 - y1) < 1e-7;
  }
}

/**
 * @hidden @internal
 * Defines the possible orientations that two adjacent
 * horizontal/vertical segments can form.
 */
enum Orientation {
  NE,
  NW,
  SW,
  SE
}

/**
 * @hidden @internal
 * Structure for storing possible placements when packing
 * rectangles. Fits have a cost associated with them (lower
 * cost placements are preferred), and can be placed relative
 * to either one or two segments. If the fit is only placed
 * relative to one segment, s2 will be undefined. Fits placed
 * relative to multiple segments will hereafter be referred to
 * as "skip fits".
 */
class Fit {
  public bounds: go.Rect;
  public cost: number;
  public s1: ListNode<Segment>;
  public s2: ListNode<Segment> | undefined;

  /**
   * @hidden @internal
   * Constructs a new Fit.
   * @param bounds the boundaries of the placement, including defined x and y coordinates
   * @param cost the cost of the placement, lower cost fits will be preferred
   * @param s1 the segment that the placement was made relative to
   * @param s2 the second segment that the placement was made relative to, if the fit is a skip fit
   */
  constructor(bounds: go.Rect, cost: number, s1: ListNode<Segment>, s2?: ListNode<Segment>) {
    this.bounds = bounds;
    this.cost = cost;
    this.s1 = s1;
    this.s2 = s2;
  }
}


/**
 * Custom layout which attempts to pack nodes as close together as possible
 * without overlap.  Each node is assumed to be either rectangular or
 * circular (dictated by the {@link #hasCircularNodes} property). This layout
 * supports packing nodes into either a rectangle or an ellipse, with the
 * shape determined by the packShape property and the aspect ratio determined
 * by either the aspectRatio property or the specified width and height
 * (depending on the packMode).
 *
 * Nodes with 0 width or height cannot be packed, so they are treated by this
 * layout as having a width or height of 0.1 instead.
 * @category Layout Extension
 */
export class PackedLayout extends go.Layout {
  /**
   * Gets or sets the shape that nodes will be packed into. Valid values are
   * {@link PackedLayout.Elliptical}, {@link PackedLayout.Rectangular}, and
   * {@link PackedLayout.Spiral}.
   *
   * In {@link PackedLayout.Spiral} mode, nodes are not packed into a particular
   * shape, but rather packed consecutively one after another in a spiral fashion.
   * The {@link #aspectRatio} property is ignored in this mode, and
   * the {@link #size} property (if provided) is expected to be square.
   * If it is not square, the largest dimension given will be used. This mode
   * currently only works with circular nodes, so setting it cause the assume that
   * layout to assume that {@link #hasCircularNodes} is true.
   *
   * Note that this property sets only the shape, not the aspect ratio. The aspect
   * ratio of this shape is determined by either {@link #aspectRatio}
   * or {@link #size}, depending on the {@link #packMode}.
   *
   * When the {@link #packMode} is {@link PackedLayout.Fit} or
   * {@link PackedLayout.ExpandToFit} and this property is set to true, the
   * layout will attempt to make the diameter of the enclosing circle of the
   * layout approximately equal to the greater dimension of the given
   * {@link #size} property.
   *
   * The default value is {@link PackedLayout.Elliptical}.
   */
  get packShape(): number { return this._packShape; }
  set packShape(value: number) {
    if (this._packShape !== value && (value === PackedLayout.Elliptical || value === PackedLayout.Rectangular || value === PackedLayout.Spiral)) {
      this._packShape = value;
      this.invalidateLayout();
    }
  }

  /**
   * Gets or sets the mode that the layout will use to determine its size. Valid values
   * are {@link PackedLayout.AspectOnly}, {@link PackedLayout.Fit}, and {@link PackedLayout.ExpandToFit}.
   *
   * The default value is {@link PackedLayout.AspectOnly}. In this mode, the layout will simply
   * grow as needed, attempting to keep the aspect ratio defined by {@link #aspectRatio}.
   */
  get packMode(): number { return this._packMode; }
  set packMode(value: number) {
    if (value === PackedLayout.AspectOnly || value === PackedLayout.Fit || value === PackedLayout.ExpandToFit) {
      this._packMode = value;
      this.invalidateLayout();
    }
  }

  /**
   * Gets or sets the method by which nodes will be sorted before being packed. To change
   * the order, see {@link #sortOrder}.
   *
   * The default value is {@link PackedLayout.None}, in which nodes will not be sorted at all.
   */
  get sortMode(): number { return this._sortMode; }
  set sortMode(value: number) {
    if (value === PackedLayout.None || value === PackedLayout.MaxSide || value === PackedLayout.Area) {
      this._sortMode = value;
      this.invalidateLayout();
    }
  }

  /**
   * Gets or sets the order that nodes will be sorted in before being packed. To change
   * the sort method, see {@link #sortMode}.
   *
   * The default value is {@link PackedLayout.Descending}
   */
  get sortOrder(): number { return this._sortOrder; }
  set sortOrder(value: number) {
    if (value === PackedLayout.Descending || value === PackedLayout.Ascending) {
      this._sortOrder = value;
      this.invalidateLayout();
    }
  }

  /**
   * Gets or sets the comparison function used for sorting nodes.
   *
   * By default, the comparison function is set according to the values of {@link #sortMode}
   * and {@link #sortOrder}.
   *
   * Whether this comparison function is used is determined by the value of {@link #sortMode}.
   * Any value except {@link PackedLayout.None} will result in the comparison function being used.
   * ```js
   *   $(PackedLayout,
   *     {
   *       sortMode: PackedLayout.Area,
   *       comparer: function(na, nb) {
   *         var na = na.data;
   *         var nb = nb.data;
   *         if (da.someProperty < db.someProperty) return -1;
   *         if (da.someProperty > db.someProperty) return 1;
   *         return 0;
   *       }
   *     }
   *   )
   * ```
   */
  get comparer(): ((a: go.Node, b: go.Node) => number) | undefined { return this._comparer; }
  set comparer(value: ((a: go.Node, b: go.Node) => number) | undefined) {
    if (typeof value === 'function') {
      this._comparer = value;
    }
  }

  /**
   * Gets or sets the aspect ratio for the shape that nodes will be packed into.
   * The provided aspect ratio should be a nonzero postive number.
   *
   * Note that this only applies if the {@link #packMode} is
   * {@link PackedLayout.AspectOnly}. Otherwise, the {@link #size}
   * will determine the aspect ratio of the packed shape.
   *
   * The default value is 1.
   */
  get aspectRatio(): number { return this._aspectRatio; }
  set aspectRatio(value: number) {
    if (this.isNumeric(value) && isFinite(value) && value > 0) {
      this._aspectRatio = value;
      this.invalidateLayout();
    }
  }

  /**
   * Gets or sets the size for the shape that nodes will be packed into.
   * To fill the viewport, set a size with a width and height of NaN. Size
   * values of 0 are considered for layout purposes to instead be 1.
   *
   * If the width and height are set to NaN (to fill the viewport), but this
   * layout has no diagram associated with it, the default value of size will
   * be used instead.
   *
   * Note that this only applies if the {@link #packMode} is
   * {@link PackedLayout.Fit} or {@link PackedLayout.ExpandToFit}.
   *
   * The default value is 500x500.
   */
  get size(): go.Size { return this._size; }
  set size(value: go.Size) {
    // check if both width and height are NaN, as per https://stackoverflow.com/a/16988441
    if (value.width !== value.width && value.height !== value.height) {
      this._size = value;
      this._fillViewport = true;
      this.invalidateLayout();
    } else if (this.isNumeric(value.width) && isFinite(value.width) && value.width >= 0
        && this.isNumeric(value.height) && isFinite(value.height) && value.height >= 0) {
      this._size = value;
      this.invalidateLayout();
    }
  }

  /**
   * Gets or sets the spacing between nodes. This value can be set to any
   * real number (a negative spacing will compress nodes together, and a
   * positive spacing will leave space between them).
   *
   * Note that the spacing value is only respected in the {@link PackedLayout.Fit}
   * {@link #packMode} if it does not cause the layout to grow outside
   * of the specified bounds. In the {@link PackedLayout.ExpandToFit}
   * {@link #packMode}, this property does not do anything.
   *
   * The default value is 0.
   */
  get spacing(): number { return this._spacing; }
  set spacing(value: number) {
    if (this.isNumeric(value) && isFinite(value)) {
      this._spacing = value;
      this.invalidateLayout();
    }
  }

  /**
   * Gets or sets whether or not to assume that nodes are circular. This changes
   * the packing algorithm to one that is much more efficient for circular nodes.
   *
   * As this algorithm expects circles, it is assumed that if this property is set
   * to true that the given nodes will all have the same height and width. All
   * calculations are done using the width of the given nodes, so unexpected results
   * may occur if the height differs from the width.
   *
   * The default value is false.
   */
  get hasCircularNodes(): boolean { return this._hasCircularNodes; }
  set hasCircularNodes(value: boolean) {
    if (typeof(value) === typeof(true) && value !== this._hasCircularNodes) {
      this._hasCircularNodes = value;
      this.invalidateLayout();
    }
  }

  /**
   * This read-only property is the effective spacing calculated after {@link PackedLayout#doLayout}.
   *
   * If the {@link #packMode} is {@link PackedLayout.AspectOnly}, this will simply be the
   * {@link #spacing} property. However, in the {@link PackedLayout.Fit} and
   * {@link PackedLayout.ExpandToFit} modes, this property will include the forced spacing added by
   * the modes themselves.
   *
   * Note that this property will only return a valid value after a layout has been performed. Before
   * then, its behavior is undefined.
   */
  get actualSpacing(): number { return this.spacing + this._fixedSizeModeSpacing; }

  /**
   * This read-only property returns the actual rectangular bounds occupied by the packed nodes.
   * This property does not take into account any kind of spacing around the packed nodes.
   *
   * Note that this property will only return a valid value after a layout has been performed. Before
   * then, its behavior is undefined.
   */
  get actualBounds(): go.Rect { return this._actualBounds; }

  /**
   * This read-only property returns the smallest enclosing circle around the packed nodes. It makes
   * use of the {@link #hasCircularNodes} property to determine whether or not to make
   * enclosing circle calculations for rectangles or for circles. This property does not take into
   * account any kind of spacing around the packed nodes. The enclosing circle calculation is
   * performed the first time this property is retrieved, and then cached to prevent slow accesses
   * in the future.
   *
   * Note that this property will only return a valid value after a layout has been performed. Before
   * then, its behavior is undefined.
   *
   * This property is included as it may be useful for some data visualizations.
   */
  get enclosingCircle(): go.Rect {
    if (this._enclosingCircle === null) {
      if (this.hasCircularNodes || this.packShape === PackedLayout.Spiral) { // remember, spiral mode assumes hasCircularNodes
        const circles = new Array<Circle>(this._nodeBounds.length);
        for (let i = 0; i < circles.length; i++) {
          const bounds = this._nodeBounds[i];
          const r = bounds.width / 2;
          circles[i] = new Circle(bounds.x + r, bounds.y + r, r);
        }
        this._enclosingCircle = enclose(circles);
      } else {
        const points = new Array<go.Point>(); // TODO: make this work with segments, not the whole nodeboudns list
        let segment = this._segments.start;
        if (segment !== null) {
          do {
            points.push(new go.Point(segment.data.x1, segment.data.y1));
            segment = segment.next;
          } while (segment !== this._segments.start);
        }
        this._enclosingCircle = enclose(points);
      }
    }

    return this._enclosingCircle;
  }

  /**
   * Gets or sets whether or not to use the {@link Layout#arrangementOrigin}
   * property when placing nodes.
   *
   * The default value is true.
   */
  get arrangesToOrigin(): boolean { return this._arrangesToOrigin; }
  set arrangesToOrigin(value: boolean) {
    if (typeof(value) === typeof(true) && value !== this._arrangesToOrigin) {
      this._arrangesToOrigin = value;
      this.invalidateLayout();
    }
  }


  /********************** Configuration constants **********************/

  // These values determine the shape of the final layout
  /**
   * This value for {@link #packShape} causes nodes to be packed
   * into an ellipse.
   *
   * The aspect ratio of this ellipse is determined by either
   * {@link #aspectRatio} or {@link #size}.
   * @constant
   */
  public static readonly Elliptical = 0;
  /**
   * Causes nodes to be packed into a rectangle; this value is used for
   * {@link #packShape}.
   *
   * The aspect ratio of this rectangle is determined by either
   * {@link #aspectRatio} or {@link #size}.
   * @constant
   */
  public static readonly Rectangular = 1;
  /**
   * Causes nodes to be packed into a spiral shape; this value is used
   * for {@link #packShape}.
   *
   * The {@link #aspectRatio} property is ignored in this mode, the
   * {@link #size} is expected to be square, and {@link #hasCircularNodes}
   * will be assumed 'true'. Please see {@link #packShape} for more details.
   */
  public static readonly Spiral = 2;

  // These values determine the size of the layout
  /**
   * Nodes will be packed using the {@link #aspectRatio} property, with
   * no size considerations; this value is used for {@link #packMode}.
   *
   * The {@link #spacing} property will be respected in this mode.
   * @constant
   */
  public static readonly AspectOnly = 10;
  /**
   * Nodes will be compressed if necessary (using negative spacing) to fit the given
   * {@link #size}. However, if the {@link #size} is bigger
   * than the packed shape (with 0 spacing), it will not expand to fit it. This value
   * is used for {@link #packMode}.
   *
   * The {@link #spacing} property will be respected in this mode, but only
   * if it does not cause the layout to grow larger than the {@link #size}.
   * @constant
   */
  public static readonly Fit = 11;
  /**
   * Nodes will be either compressed or spaced evenly to fit the given
   * {@link #size}; this value is used for {@link #packMode}.
   *
   * The {@link #spacing} property will not be respected in this mode, and
   * will not do anything if set.
   * @constant
   */
  public static readonly ExpandToFit = 12;

  // These values specify an optional method by which to sort nodes before packing
  /**
   * Nodes will not be sorted before packing; this value is used for {@link #sortMode}.
   * @constant
   */
  public static readonly None = 20;
  /**
   * Nodes will be sorted by their maximum side length before packing; this value is
   * used for {@link #sortMode}.
   * @constant
   */
  public static readonly MaxSide = 21;
  /**
   * Nodes will be sorted by their area; this value is used for {@link #sortMode}.
   * @constant
   */
  public static readonly Area = 22;

  // These values specify the order that nodes will be sorted, if applicable
  /**
   * Nodes will be sorted in descending order; this value is used for {@link #sortOrder}.
   *
   * Does nothing if {@link #sortMode} is set to {@link PackedLayout.None}.
   * @constant
   */
  public static readonly Descending = 30;
  /**
   * Nodes will be sorted in ascending order; this value is used for {@link #sortOrder}.
   *
   * Does nothing if {@link #sortMode} is set to {@link PackedLayout.None}.
   * @constant
   */
  public static readonly Ascending = 31;


  // configuration defaults
  /** @hidden @internal */ private _packShape = PackedLayout.Elliptical;
  /** @hidden @internal */ private _packMode = PackedLayout.AspectOnly;
  /** @hidden @internal */ private _sortMode = PackedLayout.None;
  /** @hidden @internal */ private _sortOrder = PackedLayout.Descending;
  /** @hidden @internal */ private _comparer: ((a: go.Node, b: go.Node) => number) | undefined = undefined;
  /** @hidden @internal */ private _aspectRatio: number = 1;
  /** @hidden @internal */ private _size: go.Size = new go.Size(500, 500);
  /** @hidden @internal */ private _defaultSize: go.Size = this._size.copy();
  /** @hidden @internal */ private _fillViewport: boolean = false; // true if size is (NaN, NaN)
  /** @hidden @internal */ private _spacing: number = 0;
  /** @hidden @internal */ private _hasCircularNodes: boolean = false;
  /** @hidden @internal */ private _arrangesToOrigin: boolean = true;

  /**
   * @hidden @internal
   * The forced spacing value applied in the {@link PackedLayout.Fit}
   * and {@link PackedLayout.ExpandToFit} modes.
   */
  private _fixedSizeModeSpacing: number = 0;

  /**
   * @hidden @internal
   * The actual target aspect ratio, set from either {@link #aspectRatio}
   * or from the {@link #size}, depending on the {@link #packMode}.
   */
  private _eAspectRatio: number = this._aspectRatio;

  // layout state
  /** @hidden @internal */ private _center = new go.Point();
  /** @hidden @internal */ private _bounds = new go.Rect();
  /** @hidden @internal */ private _actualBounds = new go.Rect();
  /** @hidden @internal */ private _enclosingCircle: go.Rect | null = null;
  /** @hidden @internal */ private _minXSegment: Segment | null = null;
  /** @hidden @internal */ private _minYSegment: Segment | null = null;
  /** @hidden @internal */ private _maxXSegment: Segment | null = null;
  /** @hidden @internal */ private _maxYSegment: Segment | null = null;
  /** @hidden @internal */ private _tree = new Quadtree<Segment>();

  // saved node bounds and segment list to use to calculate enclosing circle in the enclosingCircle getter
  /** @hidden @internal */ private _nodeBounds: Array<go.Rect> = [];
  /** @hidden @internal */ private _segments: CircularDoublyLinkedList<Segment> = new CircularDoublyLinkedList<Segment>();


  /**
   * Performs the PackedLayout.
   * @this {PackedLayout}
   * @param {Diagram|Group|Iterable.<Part>} coll A {@link Diagram} or a {@link Group} or a collection of {@link Part}s.
   */
  public doLayout(coll: go.Diagram | go.Group | go.Iterable<go.Part>) {
    const diagram = this.diagram;
    if (diagram !== null) diagram.startTransaction('Layout');
    this._bounds = new go.Rect();
    this._enclosingCircle = null;

    // push all nodes in parts iterator to an array for easy sorting
    const it = this.collectParts(coll).iterator;
    const nodes: Array<go.Node> = [];
    let averageSize = 0;
    let maxSize = 0;
    while (it.next()) {
      const node = it.value;
      if (node instanceof go.Node) {
        nodes.push(node);
        averageSize += node.actualBounds.width + node.actualBounds.height;
        if (node.actualBounds.width > maxSize) {
          maxSize = node.actualBounds.width;
        } else if (node.actualBounds.height > maxSize) {
          maxSize = node.actualBounds.height;
        }
      }
    }
    averageSize = averageSize / (nodes.length * 2);
    if (averageSize < 1) {
      averageSize = 1;
    }

    this.arrangementOrigin = this.initialOrigin(this.arrangementOrigin);

    if (this.sortMode !== PackedLayout.None) {
      if (!this.comparer) {
        const sortOrder = this.sortOrder;
        const sortMode = this.sortMode;
        this.comparer = (a: go.Node, b: go.Node): number => {
          const sortVal = sortOrder === PackedLayout.Ascending ? 1 : -1;
          if (sortMode === PackedLayout.MaxSide) {
            const aMax = Math.max(a.actualBounds.width, a.actualBounds.height);
            const bMax = Math.max(b.actualBounds.width, b.actualBounds.height);
            if (aMax > bMax) {
              return sortVal;
            } else if (bMax > aMax) {
              return -sortVal;
            }
            return 0;
          } else if (sortMode === PackedLayout.Area) {
            const area1 = a.actualBounds.width * a.actualBounds.height;
            const area2 = b.actualBounds.width * b.actualBounds.height;
            if (area1 > area2) {
              return sortVal;
            } else if (area2 > area1) {
              return -sortVal;
            }
            return 0;
          }
          return 0;
        };
      }
      nodes.sort(this.comparer);
    }

    let targetWidth = this.size.width !== 0 ? this.size.width : 1;
    let targetHeight = this.size.height !== 0 ? this.size.height : 1;
    if (this._fillViewport && this.diagram !== null) {
      targetWidth = this.diagram.viewportBounds.width !== 0 ? this.diagram.viewportBounds.width : 1;
      targetHeight = this.diagram.viewportBounds.height !== 0 ? this.diagram.viewportBounds.height : 1;
    } else if (this._fillViewport) {
      targetWidth = this._defaultSize.width !== 0 ? this._defaultSize.width : 1;
      targetHeight = this._defaultSize.height !== 0 ? this._defaultSize.height : 1;
    }

    // set the target aspect ratio using the given bounds if necessary
    if (this.packMode === PackedLayout.Fit || this.packMode === PackedLayout.ExpandToFit) {
      this._eAspectRatio = targetWidth / targetHeight;
    } else {
      this._eAspectRatio = this.aspectRatio;
    }

    let fits = this.hasCircularNodes || this.packShape === PackedLayout.Spiral ? this.fitCircles(nodes) : this.fitRects(nodes);

    // in the Fit and ExpandToFit modes, we need to run the packing another time to figure out what the correct
    // _fixedModeSpacing should be. Then the layout is run a final time with the correct spacing.
    if (this.packMode === PackedLayout.Fit || this.packMode === PackedLayout.ExpandToFit) {
      const bounds0 = this._bounds.copy();
      this._bounds = new go.Rect();
      this._fixedSizeModeSpacing = Math.floor(averageSize);
      fits = this.hasCircularNodes || this.packShape === PackedLayout.Spiral ? this.fitCircles(nodes) : this.fitRects(nodes);

      if ((this.hasCircularNodes || this.packShape === PackedLayout.Spiral) && this.packShape === PackedLayout.Spiral) {
        const targetDiameter = Math.max(targetWidth, targetHeight);
        const oldDiameter = targetDiameter === targetWidth ? bounds0.width : bounds0.height;
        const newDiameter = targetDiameter === targetWidth ? this._bounds.width : this._bounds.height;

        const diff = (newDiameter - oldDiameter) / this._fixedSizeModeSpacing;

        this._fixedSizeModeSpacing = (targetDiameter - oldDiameter) / diff;
      } else {
        const dx = (this._bounds.width - bounds0.width) / this._fixedSizeModeSpacing;
        const dy = (this._bounds.height - bounds0.height) / this._fixedSizeModeSpacing;
        const paddingX = (targetWidth - bounds0.width) / dx;
        const paddingY = (targetHeight - bounds0.height) / dy;

        this._fixedSizeModeSpacing = Math.abs(paddingX) > Math.abs(paddingY) ? paddingX : paddingY;
      }


      if (this.packMode === PackedLayout.Fit) {
        // make sure that the spacing is not positive in this mode
        this._fixedSizeModeSpacing = Math.min(this._fixedSizeModeSpacing, 0);
      }
      if (this._fixedSizeModeSpacing === Infinity) {
        this._fixedSizeModeSpacing = -maxSize;
      }

      this._bounds = new go.Rect();
      fits = this.hasCircularNodes || this.packShape === PackedLayout.Spiral ? this.fitCircles(nodes) : this.fitRects(nodes);
    }

    // move the nodes and calculate the actualBounds property
    if (this.arrangesToOrigin) {
      this._actualBounds = new go.Rect(this.arrangementOrigin.x, this.arrangementOrigin.y, 0, 0);
    }
    const nodeBounds = new Array<go.Rect>(nodes.length);
    for (let i = 0; i < nodes.length; i++) {
      const fit = fits[i];
      const node = nodes[i];
      if (this.arrangesToOrigin) {
        // translate coordinates to respect this.arrangementOrigin
        // this.arrangementOrigin should be the top left corner of the bounding box around the layout
        fit.x = fit.x - this._bounds.x + this.arrangementOrigin.x;
        fit.y = fit.y - this._bounds.y + this.arrangementOrigin.y;
      }
      node.moveTo(fit.x, fit.y);
      nodeBounds[i] = node.actualBounds;
      this._actualBounds.unionRect(node.actualBounds);
    }
    this._nodeBounds = nodeBounds; // save node bounds in case we want to calculate the smallest enclosing circle later

    // can be overriden to change layout behavior, doesn't do anything by default
    this.commitLayout();

    if (diagram !== null) diagram.commitTransaction('Layout');

    this.isValidLayout = true;
  }

  /**
   * This method is called at the end of {@link #doLayout}, but
   * before the layout transaction is committed. It can be overriden and
   * used to customize layout behavior. By default, the method does nothing.
   * @expose
   * @this {PackedLayout}
   */
  public commitLayout(): void {}

  /**
   * @hidden @internal
   * Runs a circle packing algorithm on the given array of nodes. The
   * algorithm used is a slightly modified version of the one proposed
   * by Wang et al. in "Visualization of large hierarchical data by
   * circle packing", 2006.
   * @this {PackedLayout}
   * @param nodes the array of Nodes to pack
   * @return {Array<Rect>} an array of positioned rectangles corresponding to the nodes argument
   */
  private fitCircles(nodes: Array<go.Node>): Array<go.Rect> {
    function place(a: go.Rect, b: go.Rect, c: go.Rect): go.Rect {
      const ax = a.centerX;
      const ay = a.centerY;
      let da = (b.width + c.width) / 2;
      let db = (a.width + c.width) / 2;
      const dx = b.centerX - ax;
      const dy = b.centerY - ay;
      const dc = dx * dx + dy * dy;
        if (dc) {
          const x = 0.5 + ((db *= db) - (da *= da)) / (2 * dc);
          const y = Math.sqrt(Math.max(0, 2 * da * (db + dc) - (db -= dc) * db - da * da)) / (2 * dc);
          c.x = (ax + x * dx + y * dy) - (c.width / 2);
          c.y = (ay + x * dy - y * dx) - (c.height / 2);
        } else {
          c.x = ax + db;
          c.y = ay;
        }
      return c;
    }

    function intersects(a: go.Rect, b: go.Rect): boolean {
      const ar = a.height / 2;
      const br = b.height / 2;
      const dist = Math.sqrt(a.center.distanceSquaredPoint(b.center));
      const difference = dist - (ar + br);
      return difference < -0.0000001;
    }

    const aspect = this._eAspectRatio;
    const shape = this.packShape;
    const placementCost = this.placementCost;
    function score(n: ListNode<go.Rect>) {
      const a = n.data;
      const b = n.next.data;
      const ar = a.width / 2;
      const br = b.width / 2;
      const ab = ar + br;
      const dx = (a.centerX * br + b.centerX * ar) / ab;
      const dy = (a.centerY * br + b.centerY * ar) / ab * aspect;
      return shape === PackedLayout.Elliptical ? dx * dx + dy * dy : Math.max(dx * dx, dy * dy);
    }


    const sideSpacing = (this.spacing + this._fixedSizeModeSpacing) / 2;
    const fits: Array<go.Rect> = [];
    const frontChain = new CircularDoublyLinkedList<go.Rect>();

    if (!nodes.length) return fits;

    let r1: go.Rect = nodes[0].actualBounds.copy().inflate(sideSpacing, sideSpacing);
    r1.setTo(0, 0, r1.width === 0 ? 0.1 : r1.width, r1.height === 0 ? 0.1 : r1.height);
    fits.push(r1.setTo(0, 0, r1.width, r1.height));
    this._bounds.unionRect(r1);
    if (nodes.length < 2) return fits;

    let r2: go.Rect = nodes[1].actualBounds.copy().inflate(sideSpacing, sideSpacing);
    r2.setTo(0, 0, r2.width === 0 ? 0.1 : r2.width, r2.height === 0 ? 0.1 : r2.height);
    fits.push(r2.setTo(-r2.width, r1.centerY - r2.width / 2, r2.width, r2.height));
    this._bounds.unionRect(r2);
    if (nodes.length < 3) return fits;

    let r3: go.Rect = nodes[2].actualBounds.copy().inflate(sideSpacing, sideSpacing);
    r3.setTo(0, 0, r3.width === 0 ? 0.1 : r3.width, r3.height === 0 ? 0.1 : r3.height);
    fits.push(place(r2, r1, r3));
    this._bounds.unionRect(r3);


    let n2: ListNode<go.Rect> = frontChain.push(r2);
    let n3: ListNode<go.Rect> = frontChain.push(r3);
    let n1: ListNode<go.Rect> = frontChain.push(r1);

    pack: for (let i = 3; i < nodes.length; i++) {
      r3 = nodes[i].actualBounds.copy().inflate(sideSpacing, sideSpacing);
      r3.setTo(0, 0, r3.width === 0 ? 0.1 : r3.width, r3.height === 0 ? 0.1 : r3.height);
      place(n1.data, n2.data, r3);

      let j = n2.next;
      let k = n1.prev;
      let sj = n2.data.width / 2;
      let sk = n1.data.width / 2;
      do {
        if (sj <= sk) {
          if (intersects(j.data, r3)) {
            n2 = frontChain.removeBetween(n1, j), i--;
            continue pack;
          }
          sj += j.data.width / 2, j = j.next;
        } else {
          if (intersects(k.data, r3)) {
            frontChain.removeBetween(k, n2);
            n1 = k, i--;
            continue pack;
          }
          sk += k.data.width / 2, k = k.prev;
        }
      } while (j !== k.next);

      fits.push(r3);
      this._bounds.unionRect(r3);

      n2 = n3 = frontChain.insertAfter(r3, n1);

      if (this.packShape !== PackedLayout.Spiral) {
        let aa = score(n1);
        while ((n3 = n3.next) !== n2) {
          const ca = score(n3);
          if (ca < aa) {
            n1 = n3, aa = ca;
          }
        }
        n2 = n1.next;
      }

    }

    return fits;
  }

  /**
   * @hidden @internal
   * Runs a rectangle packing algorithm on the given array of nodes.
   * The algorithm presented is original, and operates by maintaining
   * a representation (with segments) of the perimeter of the already
   * packed shape. The perimeter of segments is stored in both a linked
   * list (for ordered iteration) and a quadtree (for fast intersection
   * detection). Similar to the circle packing algorithm presented
   * above, this is a greedy algorithm.
   *
   * For each node, a large list of possible placements is created,
   * each one relative to a segment on the perimeter. These placements
   * are sorted according to a cost function, and then the lowest cost
   * placement with no intersections is picked. The perimeter
   * representation is then updated according to the new placement.
   *
   * However, in addition to placements made relative to a single segment
   * on the perimeter, the algorithm also attempts to make placements
   * between two nonsequential segments ("skip fits"), closing gaps in the
   * packed shape. If a placement made in this way has no intersections
   * and a lower cost than any of the original placements, it is picked
   * instead. This step occurs simultaneously to checking intersections on
   * the original placement list.
   *
   * Intersections for new placements are checked only against the current
   * perimeter of segments, rather than the entire packed shape.
   * Additionally, before the quadtree is queried at all, a few closely
   * surrounding segments to the placement are checked in case an
   * intersection can be found more quickly. The combination of these two
   * strategies enables intersection checking to take place extremely
   * quickly, when it would normally be the slowest part of the entire
   * algorithm.
   *
   * @this {PackedLayout}
   * @param nodes the array of Nodes to pack
   * @return {Array<Rect>} an array of positioned rectangles corresponding to the nodes argument
   */
  private fitRects(nodes: Array<go.Node>): Array<go.Rect> {
    const sideSpacing = (this.spacing + this._fixedSizeModeSpacing) / 2;
    const fits: Array<go.Rect> = [];
    const segments = new CircularDoublyLinkedList<Segment>();

    // reset layout state
    this._tree.clear();
    this._minXSegment = null;
    this._maxXSegment = null;
    this._minYSegment = null;
    this._maxYSegment = null;

    if (nodes.length < 1) {
      return fits;
    }

    // place first node at 0, 0
    const bounds0 = nodes[0].actualBounds;
    fits.push(new go.Rect(sideSpacing, sideSpacing, bounds0.width, bounds0.height));
    fits[0].inflate(sideSpacing, sideSpacing);
    fits[0].setTo(0, 0, fits[0].width === 0 ? 0.1 : fits[0].width, fits[0].height === 0 ? 0.1 : fits[0].height);
    this._bounds.unionRect(fits[0]);
    this._center = fits[0].center;

    const s1 = new Segment(0, 0, fits[0].width, 0, false);
    const s2 = new Segment(fits[0].width, 0, fits[0].width, fits[0].height, false);
    const s3 = new Segment(fits[0].width, fits[0].height, 0, fits[0].height, false);
    const s4 = new Segment(0, fits[0].height, 0, 0, false);
    this._tree.add(s1, this.rectFromSegment(s1));
    this._tree.add(s2, this.rectFromSegment(s2));
    this._tree.add(s3, this.rectFromSegment(s3));
    this._tree.add(s4, this.rectFromSegment(s4));
    segments.push(s1, s2, s3, s4);
    this.fixMissingMinMaxSegments(true);

    for (let i = 1; i < nodes.length; i++) {
      const node = nodes[i];
      const bounds = node.actualBounds.copy().inflate(sideSpacing, sideSpacing);
      bounds.setTo(0, 0, bounds.width === 0 ? 0.1 : bounds.width, bounds.height === 0 ? 0.1 : bounds.height);
      const possibleFits = new Array<Fit>(segments.length);
      let j = 0;
      let s = segments.start as ListNode<Segment>;
      do {

        // make sure segment is perfectly straight (fixing some floating point error)
        const sdata = s.data;
        sdata.x1 = s.prev.data.x2;
        sdata.y1 = s.prev.data.y2;
        if (sdata.isHorizontal) {
          sdata.y2 = sdata.y1;
        } else {
          sdata.x2 = sdata.x1;
        }

        const fitBounds = this.getBestFitRect(s, bounds.width, bounds.height);
        const cost = this.placementCost(fitBounds);
        possibleFits[j] = new Fit(fitBounds, cost, s);

        s = s.next;
        j++;
      } while (s !== segments.start);

      possibleFits.sort((a, b) => {
        return a.cost - b.cost;
      });

      /* scales the cost of skip fits. a number below
       * one makes skip fits more likely to appear,
       * which is preferable because they are more
       * aesthetically pleasing and reduce the total
       * number of segments.
       */
      const skipFitScaleFactor = 0.98;

      let bestFit: Fit | null = null;
      let onlyCheckSkipFits = false;
      for (const fit of possibleFits) {
        if (bestFit && bestFit.cost <= fit.cost) {
          onlyCheckSkipFits = true;
        }

        let hasIntersections = true; // set initially to true to make skip fit checking work when onlyCheckSkipFits = true
        if (!onlyCheckSkipFits) {
          hasIntersections = this.fastFitHasIntersections(fit) || this.fitHasIntersections(fit);
          if (!hasIntersections) {
            bestFit = fit;
            continue;
          }
        }

        // check skip fits
        if (hasIntersections && !fit.s1.data.p1Concave && (fit.s1.next.data.p1Concave || fit.s1.next.next.data.p1Concave)) {
          let [nextSegment, usePreviousSegment] = this.findNextOrientedSegment(fit, fit.s1.next);
          let nextSegmentTouchesFit = false;
          while (hasIntersections && nextSegment !== null) {
            fit.bounds = this.rectAgainstMultiSegment(fit.s1, nextSegment, bounds.width, bounds.height);
            hasIntersections = this.fastFitHasIntersections(fit) || this.fitHasIntersections(fit);
            nextSegmentTouchesFit = this.segmentIsOnFitPerimeter(nextSegment.data, fit.bounds);

            if (hasIntersections || !nextSegmentTouchesFit) {
              [nextSegment, usePreviousSegment] = this.findNextOrientedSegment(fit, nextSegment);
            }
          }

          if (!hasIntersections && nextSegment !== null && nextSegmentTouchesFit) {
            fit.cost = this.placementCost(fit.bounds) * skipFitScaleFactor;
            if (bestFit === null || fit.cost <= bestFit.cost) {
              bestFit = fit;
              bestFit.s2 = nextSegment;
              if (usePreviousSegment) {
                bestFit.s1 = bestFit.s1.prev;
              }
            }
          }
        }
      }

      if (bestFit !== null) {
        this.updateSegments(bestFit, segments);

        fits.push(bestFit.bounds);
        this._bounds.unionRect(bestFit.bounds);
      }

    }

    // save segments in case we want to calculate the enclosing circle later
    this._segments = segments;

    return fits;
  }

  /**
   * @hidden @internal
   * Attempts to find a segment which can be used to create a new skip fit
   * between fit.s1 and the found segment. A number of conditions are checked
   * before returning a segment, ensuring that if the skip fit *does* intersect
   * with the already packed shape, it will do so along the perimeter (so that it
   * can be detected with only knowledge about the perimeter). Multiple oriented
   * segments can be found for a given fit, so this function starts searching at
   * the segment after the given lastSegment parameter.
   *
   * Oriented segments can be oriented with either fit.s1, or fit.s1.prev. The
   * second return value (usePreviousSegment) indicates which the found segment is.
   *
   * @this {PackedLayout}
   * @param fit the fit to search for a new segment for
   * @param lastSegment the last segment found.
   */
  private findNextOrientedSegment(fit: Fit, lastSegment: ListNode<Segment>): [ListNode<Segment> | null, boolean] {
    lastSegment = lastSegment.next;
    const orientation = this.segmentOrientation(fit.s1.prev.data, fit.s1.data);
    const targetOrientation = (orientation + 1) % 4;

    while (!this.segmentIsMinOrMax(lastSegment.data)) {
      const usePreviousSegment = lastSegment.data.isHorizontal === fit.s1.data.isHorizontal;

      let lastOrientation: Orientation;
      if (usePreviousSegment) {
        lastOrientation = this.segmentOrientation(lastSegment.data, lastSegment.next.data);
        if (lastSegment.next.data.p1Concave) {
          lastOrientation = (lastOrientation + 1) % 4;
        }
      } else {
        lastOrientation = this.segmentOrientation(lastSegment.prev.data, lastSegment.data);
        if (lastSegment.data.p1Concave) {
          lastOrientation = (lastOrientation + 1) % 4;
        }
      }
      const validLastOrientation = lastOrientation === targetOrientation;

      const exceededPrimaryDimension = fit.s1.data.isHorizontal ?
        Math.abs(lastSegment.data.y1 - fit.s1.data.y1) + 1e-7 > fit.bounds.height :
        Math.abs(lastSegment.data.x1 - fit.s1.data.x1) + 1e-7 > fit.bounds.width;

      let validCornerPlacement: boolean;
      let exceededSecondaryDimension: boolean;
      switch (orientation) {
        case Orientation.NE:
          validCornerPlacement = fit.s1.data.x1 < lastSegment.data.x1;
          exceededSecondaryDimension = usePreviousSegment ? fit.s1.data.y1 - fit.bounds.height >= lastSegment.data.y1 : fit.s1.data.y2 + fit.bounds.height <= lastSegment.data.y1;
          break;
        case Orientation.NW:
          validCornerPlacement = fit.s1.data.y1 > lastSegment.data.y1;
          exceededSecondaryDimension = usePreviousSegment ? fit.s1.data.x1 - fit.bounds.width >= lastSegment.data.x1 : fit.s1.data.x2 + fit.bounds.width <= lastSegment.data.x1;
          break;
        case Orientation.SW:
          validCornerPlacement = fit.s1.data.x1 > lastSegment.data.x1;
          exceededSecondaryDimension = usePreviousSegment ? fit.s1.data.y1 + fit.bounds.height <= lastSegment.data.y1 : fit.s1.data.y2 - fit.bounds.height >= lastSegment.data.y1;
          break;
        case Orientation.SE:
          validCornerPlacement = fit.s1.data.y1 < lastSegment.data.y1;
          exceededSecondaryDimension = usePreviousSegment ? fit.s1.data.x1 + fit.bounds.width <= lastSegment.data.x1 : fit.s1.data.x2 - fit.bounds.width >= lastSegment.data.x1;
          break;
        default:
          throw new Error('Unknown orientation ' + orientation);
      }

      if (!exceededPrimaryDimension && !exceededSecondaryDimension && validCornerPlacement && validLastOrientation) {
        return [lastSegment, usePreviousSegment];
      }

      lastSegment = lastSegment.next;
    }

    return [null, false];
  }

  /**
   * @hidden @internal
   * Returns the orientation of two adjacent segments. s2
   * is assumed to start at the end of s1.
   * @this {PackedLayout}
   * @param s1 the first segment
   * @param s2 the second segment
   */
  private segmentOrientation(s1: Segment, s2: Segment): Orientation {
    if (s1.isHorizontal) {
      if (s1.x1 < s2.x1) {
        return s2.p1Concave ? Orientation.SE : Orientation.NE;
      } else {
        return s2.p1Concave ? Orientation.NW : Orientation.SW;
      }
    } else {
      if (s1.y1 < s2.y1) {
        return s2.p1Concave ? Orientation.SW : Orientation.SE;
      } else {
        return s2.p1Concave ? Orientation.NE : Orientation.NW;
      }
    }
  }

  /**
   * @hidden @internal
   * Fits a rectangle between two segments (used for skip fits). This is an operation
   * related more to corners than segments, so fit.s1 should always be supplied for
   * segment a (even if usePreviousSegment was true in the return value for
   * {@link #findNextOrientedSegment}).
   *
   * @this {PackedLayout}
   * @param a the first segment to fit between, should always be fit.s1
   * @param b the second segment to fit between, found with {@link #findNextOrientedSegment}
   * @param width the width of the rectangle, should be fit.width
   * @param height the height of the rectangle, should be fit.height
   */
  private rectAgainstMultiSegment(a: ListNode<Segment>, b: ListNode<Segment>, width: number, height: number): go.Rect {
    switch (this.segmentOrientation(a.prev.data, a.data)) {
      case Orientation.NE:
        if (a.data.y1 > b.data.y2) {
          return new go.Rect(b.data.x1 - width, a.data.y1 - height, width, height);
        } else {
          return new go.Rect(a.data.x1, b.data.y1 - height, width, height);
        }
      case Orientation.NW:
        if (a.data.x1 > b.data.x2) {
          return new go.Rect(a.data.x1 - width, b.data.y1, width, height);
        } else {
          return new go.Rect(b.data.x1 - width, a.data.y1 - height, width, height);
        }
      case Orientation.SW:
        if (a.data.y1 < b.data.y2) {
          return new go.Rect(b.data.x1, a.data.y1, width, height);
        } else {
          return new go.Rect(a.data.x1 - width, b.data.y1, width, height);
        }
      case Orientation.SE:
        if (a.data.x1 < b.data.x2) {
          return new go.Rect(a.data.x1, b.data.y1 - height, width, height);
        } else {
          return new go.Rect(b.data.x1, a.data.y1, width, height);
        }
    }

  }

  /**
   * @hidden @internal
   * Gets the rectangle placed against the given segment with the lowest
   * placement cost. Rectangles can be placed against a segment either at
   * the top/left side, the bottom/right side, or at the center coordinate
   * of the entire packed shape (if the segment goes through either the x
   * or y coordinate of the center).
   * @this {PackedLayout}
   * @param s the segment to place against
   * @param width the width of the fit, fit.width
   * @param height the height of the fit, fit.height
   */
  private getBestFitRect(s: ListNode<Segment>, width: number, height: number): go.Rect {
    let x1 = s.data.x1;
    let y1 = s.data.y1;
    let x2 = s.data.x2;
    let y2 = s.data.y2;
    let dir = this.segmentOrientation(s.prev.data, s.data);
    if (s.data.p1Concave) {
      dir = (dir + 3) % 4;
    }

    const coordIsX = dir === Orientation.NW || dir === Orientation.SE;
    if (dir === Orientation.NE) {
      y2 -= height;
    } else if (dir === Orientation.SE) {
      x1 -= width;
    } else if (dir === Orientation.SW) {
      x1 -= width;
      y1 -= height;
      x2 -= width;
    } else if (dir === Orientation.NW) {
      y1 -= height;
      x2 -= width;
      y2 -= height;
    }

    const r = new go.Rect(x1, y1, width, height);
    const cost1 = this.placementCost(r);
    const cost2 = this.placementCost(r.setTo(x2, y2, width, height));
    let cost3 = Infinity;
    if (coordIsX && (this._center.x - (x1 + width / 2)) * (this._center.x - (x2 + width / 2 )) < 0) {
      cost3 = this.placementCost(r.setTo(this._center.x - width / 2, y1, width, height));
    } else if (!coordIsX && (this._center.y - (y1 + height / 2)) * (this._center.y - (y2 + height / 2)) < 0) {
      cost3 = this.placementCost(r.setTo(x1, this._center.y - height / 2, width, height));
    }

    return cost3 < cost2 && cost3 < cost1 ? r
     : (cost2 < cost1 ? r.setTo(x2, y2, width, height)
      : r.setTo(x1, y1, width, height));

  }

  /**
   * @hidden @internal
   * Checks if a segment is on the perimeter of the given fit bounds.
   * Also returns true if the segment is within the rect, but that
   * shouldn't matter for any of the cases where this function is used.
   * @this {PackedLayout}
   * @param s the segment to test
   * @param bounds the fit bounds
   */
  private segmentIsOnFitPerimeter(s: Segment, bounds: go.Rect) {
    const xCoordinatesTogether = this.numberIsBetween(s.x1, bounds.left, bounds.right)
      || this.numberIsBetween(s.x2, bounds.left, bounds.right)
      || this.numberIsBetween(bounds.left, s.x1, s.x2)
      || this.numberIsBetween(bounds.right, s.x1, s.x2);
    const yCoordinatesTogether = this.numberIsBetween(s.y1, bounds.top, bounds.bottom)
      || this.numberIsBetween(s.y2, bounds.top, bounds.bottom)
      || this.numberIsBetween(bounds.top, s.y1, s.y2)
      || this.numberIsBetween(bounds.bottom, s.y1, s.y2);
    return (s.isHorizontal && (this.approxEqual(s.y1, bounds.top) || this.approxEqual(s.y1, bounds.bottom)) && xCoordinatesTogether)
      || (!s.isHorizontal && (this.approxEqual(s.x1, bounds.left) || this.approxEqual(s.x1, bounds.right)) && yCoordinatesTogether);
  }

  /**
   * @hidden @internal
   * Checks if a point is on the perimeter of the given fit bounds.
   * Also returns true if the point is within the rect, but that
   * shouldn't matter for any of the cases where this function is used.
   * @this {PackedLayout}
   * @param x the x coordinate of the point to test
   * @param y the y coordinate of the point to test
   * @param bounds the fit bounds
   */
  private pointIsOnFitPerimeter(x: number, y: number, bounds: go.Rect): boolean {
    return (x >= bounds.left - 1e-7 && x <= bounds.right + 1e-7 && y >= bounds.top - 1e-7 && y <= bounds.bottom + 1e-7);
  }

  /**
   * @hidden @internal
   * Checks if a point is on the corner of the given fit bounds.
   * @this {PackedLayout}
   * @param x the x coordinate of the point to test
   * @param y the y coordinate of the point to test
   * @param bounds the fit bounds
   */
  private pointIsFitCorner(x: number, y: number, bounds: go.Rect) {
    return (this.approxEqual(x, bounds.left) && this.approxEqual(y, bounds.top)) ||
           (this.approxEqual(x, bounds.right) && this.approxEqual(y, bounds.top)) ||
           (this.approxEqual(x, bounds.left) && this.approxEqual(y, bounds.bottom)) ||
           (this.approxEqual(x, bounds.right) && this.approxEqual(y, bounds.bottom));
  }

  /**
   * @hidden @internal
   * Updates the representation of the perimeter of segments after
   * a new placement is made. This modifies the given segments list,
   * as well as the quadtree class variable {@link #_tree}.
   * Also updates the minimum/maximum segments if they have changed as
   * a result of the new placement.
   * @this {PackedLayout}
   * @param fit the fit to add
   * @param segments the list of segments to update
   */
  private updateSegments(fit: Fit, segments: CircularDoublyLinkedList<Segment>): void {
    let s0 = fit.s1;
    while (this.pointIsOnFitPerimeter(s0.data.x1, s0.data.y1, fit.bounds)) {
      s0 = s0.prev;
    }
    if (!this.segmentIsMinOrMax(s0.data) || !this.segmentIsMinOrMax(s0.prev.data)) {
      let sTest = s0.prev.prev; // test for conflicting segments
      let sFound: ListNode<Segment> | null = null;
      let minMaxCount = 0;
      while (minMaxCount < 2) {
        if (this.segmentIsOnFitPerimeter(sTest.data, fit.bounds)) {
          sFound = sTest;
        }
        sTest = sTest.prev;
        if (this.segmentIsMinOrMax(sTest.next.data)) {
          minMaxCount++;
        }
      }
      if (sFound !== null) {
        while (this.pointIsOnFitPerimeter(sFound.data.x1, sFound.data.y1, fit.bounds)) {
          sFound = sFound.prev;
        }
        this.removeBetween(segments, sFound, s0);
        s0 = sFound;
      }
    }

    let nextConvexCornerOrientation: Orientation;
    let lastConvexCornerOrientation: Orientation;

    let testOrientation = this.segmentOrientation(s0.prev.data, s0.data);
    if (s0.data.p1Concave) {
      testOrientation = (testOrientation + 3) % 4;
    }
    let [cornerX, cornerY] = this.cornerFromRect(testOrientation, fit.bounds);
    const extended0 = this.approxEqual(cornerX, s0.data.x2) && this.approxEqual(cornerY, s0.data.y2);
    let shortened0Precond: boolean;
    let [cornerX2, cornerY2] = this.cornerFromRect((testOrientation + 1) % 4, fit.bounds);
    if (s0.data.isHorizontal) {
      shortened0Precond = this.numberIsBetween(cornerX2, s0.data.x1, s0.data.x2) && this.approxEqual(cornerY2, s0.data.y1);
    } else {
      shortened0Precond = this.numberIsBetween(cornerY2, s0.data.y1, s0.data.y2) && this.approxEqual(cornerX2, s0.data.x1);
    }
    const shortened0 = !extended0 && this.pointIsFitCorner(s0.data.x2, s0.data.y2, fit.bounds)
                        || !this.pointIsOnFitPerimeter(s0.data.x2, s0.data.y2, fit.bounds)
                        || (this.pointIsOnFitPerimeter(s0.data.x2, s0.data.y2, fit.bounds)
                        && !this.pointIsOnFitPerimeter(s0.data.x1, s0.data.y1, fit.bounds)
                        && shortened0Precond);
    if (extended0) {
      // extend s0
      [s0.data.x2, s0.data.y2] = this.cornerFromRect((testOrientation + 3) % 4, fit.bounds);
      this._tree.setTo(s0.data, this.rectFromSegment(s0.data));
      nextConvexCornerOrientation = (testOrientation + 3) % 4;
      this.updateMinMaxSegments(s0.data);
    } else {
      if (shortened0) {
        [s0.data.x2, s0.data.y2] = this.cornerFromRect((testOrientation + 1) % 4, fit.bounds);
        this._tree.setTo(s0.data, this.rectFromSegment(s0.data));
      }
      const newSegment = new Segment(s0.data.x2, s0.data.y2, cornerX, cornerY, true);
      s0 = segments.insertAfter(newSegment, s0);
      this._tree.add(newSegment, this.rectFromSegment(newSegment));
      nextConvexCornerOrientation = testOrientation;
      this.updateMinMaxSegments(newSegment);
    }

    let sNext = fit.s2 ? fit.s2 : s0;
    while (this.pointIsOnFitPerimeter(sNext.data.x2, sNext.data.y2, fit.bounds)) {
      sNext = sNext.next;
    }
    if (!this.segmentIsMinOrMax(sNext.data) || !this.segmentIsMinOrMax(sNext.next.data)) {
      let sTest = sNext.next.next; // test for conflicting segments
      let sFound: ListNode<Segment> | null = null;
      let minMaxCount = 0;
      while (minMaxCount < 2) {
        if (this.segmentIsOnFitPerimeter(sTest.data, fit.bounds)) {
          sFound = sTest;
        }
        sTest = sTest.next;
        if (this.segmentIsMinOrMax(sTest.prev.data)) {
          minMaxCount++;
        }
      }
      if (sFound !== null) {
        sNext = sFound;
        while (this.pointIsOnFitPerimeter(sNext.data.x2, sNext.data.y2, fit.bounds)) {
          sNext = sNext.next;
        }
      }
    }

    testOrientation = this.segmentOrientation(sNext.data, sNext.next.data);
    if (sNext.data.p1Concave) {
      testOrientation = (testOrientation + 2) % 4;
    }
    if (sNext.next.data.p1Concave) {
      testOrientation = (testOrientation + 1) % 4;
    }
    [cornerX2, cornerY2] = this.cornerFromRect((testOrientation + 3) % 4, fit.bounds);
    if (sNext.data.isHorizontal && this.numberIsBetween(cornerX2, sNext.data.x1, sNext.data.x2) && this.approxEqual(cornerY2, sNext.data.y1)
    || (!sNext.data.isHorizontal && this.numberIsBetween(cornerY2, sNext.data.y1, sNext.data.y2) && this.approxEqual(cornerX2, sNext.data.x1))
    || (sNext.data.isHorizontal && this.numberIsBetween(fit.bounds.left, sNext.data.x1, sNext.data.x2) && this.numberIsBetween(fit.bounds.right, sNext.data.x1, sNext.data.x2)
        && (this.approxEqual(fit.bounds.top, sNext.data.y1) || this.approxEqual(fit.bounds.bottom, sNext.data.y1)))
    || (!sNext.data.isHorizontal && this.numberIsBetween(fit.bounds.top, sNext.data.y1, sNext.data.y2) && this.numberIsBetween(fit.bounds.bottom, sNext.data.y1, sNext.data.y2)
        && (this.approxEqual(fit.bounds.left, sNext.data.x1) || this.approxEqual(fit.bounds.right, sNext.data.x1)))) {
      sNext = sNext.next;
      testOrientation = this.segmentOrientation(sNext.data, sNext.next.data);
      if (sNext.data.p1Concave) {
        testOrientation = (testOrientation + 2) % 4;
      }
      if (sNext.next.data.p1Concave) {
        testOrientation = (testOrientation + 1) % 4;
      }
    }

    this.removeBetween(segments, s0, sNext);

    [cornerX, cornerY] = this.cornerFromRect(testOrientation, fit.bounds);

    if (this.approxEqual(cornerX, sNext.data.x1) && this.approxEqual(cornerY, sNext.data.y1)) {
      // extend sNext
      if (s0.data.isHorizontal === sNext.data.isHorizontal && (s0.data.isHorizontal ? this.approxEqual(s0.data.y1, sNext.data.y1) : this.approxEqual(s0.data.x1, sNext.data.x1))) {
        s0.data.x2 = sNext.data.x2;
        s0.data.y2 = sNext.data.y2;
        this.removeSegmentFromLayoutState(sNext);
        segments.remove(sNext);
        this._tree.setTo(s0.data, this.rectFromSegment(s0.data));
        lastConvexCornerOrientation = nextConvexCornerOrientation; // no additional segments need to be added
        this.updateMinMaxSegments(s0.data);
      } else {
        [sNext.data.x1, sNext.data.y1] = this.cornerFromRect((testOrientation + 1) % 4, fit.bounds);
        this._tree.setTo(sNext.data, this.rectFromSegment(sNext.data));
        lastConvexCornerOrientation = (testOrientation + 1) % 4;
        this.updateMinMaxSegments(sNext.data);
      }
    } else if (extended0 && (s0.data.isHorizontal ?
                            this.approxEqual(s0.data.y1, sNext.data.y1) && this.numberIsBetween(sNext.data.x1, s0.data.x1, s0.data.x2) :
                            this.approxEqual(s0.data.x1, sNext.data.x1)  && this.numberIsBetween(sNext.data.y1, s0.data.y1, s0.data.y2))) {
      if (s0.data.isHorizontal) {
        s0.data.x2 = sNext.data.x1;
      } else {
        s0.data.y2 = sNext.data.y1;
      }
      this._tree.setTo(s0.data, this.rectFromSegment(s0.data));
      lastConvexCornerOrientation = nextConvexCornerOrientation;
      sNext.data.p1Concave = true;
      this.updateMinMaxSegments(s0.data);
    } else if (!this.pointIsFitCorner(sNext.data.x1, sNext.data.y1, fit.bounds)) {
      // add concave segment
      const newSegment = new Segment(cornerX, cornerY, sNext.data.x1, sNext.data.y1, false);
      if (this.pointIsOnFitPerimeter(sNext.data.x1, sNext.data.y1, fit.bounds)) {
        sNext.data.p1Concave = true;
      } else {
        newSegment.p1Concave = true;
      }
      if (this.approxEqual(sNext.prev.data.x1, cornerX) && this.approxEqual(sNext.prev.data.y1, cornerY) && newSegment.isHorizontal === sNext.prev.data.isHorizontal) {
        sNext.prev.data.x2 = sNext.data.x1;
        sNext.prev.data.y2 = sNext.data.y1;
        this._tree.setTo(sNext.prev.data, this.rectFromSegment(sNext.prev.data));
        lastConvexCornerOrientation = nextConvexCornerOrientation;
      } else {
        segments.insertAfter(newSegment, sNext.prev);
        this._tree.add(newSegment, this.rectFromSegment(newSegment));
        lastConvexCornerOrientation = testOrientation;
        this.updateMinMaxSegments(newSegment);
      }
    } else { // if (this.pointIsOnFitPerimeter(sNext.data.x1, sNext.data.y1, fit.bounds))
      // shorten existing segment
      [sNext.data.x1, sNext.data.y1] = this.cornerFromRect((testOrientation + 3) % 4, fit.bounds);
      sNext.data.p1Concave = true;
      this._tree.setTo(sNext.data, this.rectFromSegment(sNext.data));
      lastConvexCornerOrientation = (testOrientation + 3) % 4;
    }

    while (nextConvexCornerOrientation !== lastConvexCornerOrientation) {
      [cornerX, cornerY] = this.cornerFromRect((nextConvexCornerOrientation + 3) % 4, fit.bounds);
      const newSegment = new Segment(s0.data.x2, s0.data.y2, cornerX, cornerY, false);
      s0 = segments.insertAfter(newSegment, s0);
      this._tree.add(newSegment, this.rectFromSegment(newSegment));
      nextConvexCornerOrientation = (nextConvexCornerOrientation + 3) % 4;
      this.updateMinMaxSegments(newSegment);
    }

    this.fixMissingMinMaxSegments();
  }

  /**
   * @hidden @internal
   * Finds the new minimum and maximum segments in the packed shape if
   * any of them have been deleted. To do this quickly, the quadtree
   * is used.
   * @this{PackedLayout}
   * @param force whether or not to force an update based on the quadtree even if none of the segments were deleted
   */
  private fixMissingMinMaxSegments(force = false) {
    if (!this._minXSegment || !this._maxXSegment || !this._minYSegment || !this._maxYSegment || force) {
      [this._minXSegment, this._maxXSegment, this._minYSegment, this._maxYSegment] = this._tree.findExtremeObjects();
    }
  }

  /**
   * @hidden @internal
   * Updates the minimum or maximum segments with a new segment if that
   * segment is a new minimum or maximum.
   * @this {PackedLayout}
   * @param s the new segment to test
   */
  private updateMinMaxSegments(s: Segment) {
    const centerX = (s.x1 + s.x2) / 2;
    const centerY = (s.y1 + s.y2) / 2;
    if (this._minXSegment && centerX < (this._minXSegment.x1 + this._minXSegment.x2) / 2) {
      this._minXSegment = s;
    }
    if (this._minYSegment && centerY < (this._minYSegment.y1 + this._minYSegment.y2) / 2) {
      this._minYSegment = s;
    }
    if (this._maxXSegment && centerX > (this._maxXSegment.x1 + this._maxXSegment.x2) / 2) {
      this._maxXSegment = s;
    }
    if (this._maxYSegment && centerY > (this._maxYSegment.y1 + this._maxYSegment.y2) / 2) {
      this._maxYSegment = s;
    }
  }

  /**
   * @hidden @internal
   * Gets the x and y coordinates of a corner of a given rectangle.
   * @this {PackedLayout}
   * @param orientation the orientation of the corner to get
   * @param bounds the bounds of the rectangle to get the corner from
   */
  private cornerFromRect(orientation: Orientation, bounds: go.Rect): [number, number] {
    let x = bounds.x;
    let y = bounds.y;
    if (orientation === Orientation.NE || orientation === Orientation.SE) {
      x = bounds.right;
    }
    if (orientation === Orientation.SW || orientation === Orientation.SE) {
      y = bounds.bottom;
    }
    return [x, y];
  }

  /**
   * @hidden @internal
   * Gets a rectangle representing the bounds of a given segment.
   * Used to supply bounds of segments to the quadtree.
   * @this {PackedLayout}
   * @param segment the segment to get a rectangle for
   */
  private rectFromSegment(segment: Segment): go.Rect {
    if (this.approxEqual(segment.x1, segment.x2)) {
      return new go.Rect(segment.x1, Math.min(segment.y1, segment.y2), 0, Math.abs(segment.y1 - segment.y2));
    }
    return new go.Rect(Math.min(segment.x1, segment.x2), segment.y1, Math.abs(segment.x1 - segment.x2), 0);
  }

  /**
   * @hidden @internal
   * Tests if a number is in between two other numbers, with included
   * allowance for some floating point error with the supplied values.
   * The order of the given boundaries does not matter.
   * @this {PackedLayout}
   * @param n the number to test
   * @param b1 the first boundary
   * @param b2 the second boundary
   */
  private numberIsBetween(n: number, b1: number, b2: number) {
    const tmp = b1;
    b1 = Math.min(b1, b2);
    b2 = Math.max(tmp, b2);
    return n + 1e-7 >= b1 && n - 1e-7 <= b2;
  }

  /**
   * @hidden @internal
   * Tests whether or not a given segment is a minimum or maximum segment.
   * @this {PackedLayout}
   * @param s the segment to test
   */
  private segmentIsMinOrMax(s: Segment): boolean {
    return s === this._minXSegment || s === this._minYSegment || s === this._maxXSegment || s === this._maxYSegment;
  }

  /**
   * @hidden @internal
   * Removes a segment from the layout state. This includes removing it
   * from the quadtree, as well as setting the corresponding minimum or
   * maximum segment to null if the given segment is a minimum or
   * maximum.
   * @this {PackedLayout}
   * @param s the segment to remove
   */
  private removeSegmentFromLayoutState(s: ListNode<Segment>) {
    if (s.data === this._minXSegment) {
      this._minXSegment = null;
    }
    if (s.data === this._maxXSegment) {
      this._maxXSegment = null;
    }
    if (s.data === this._minYSegment) {
      this._minYSegment = null;
    }
    if (s.data === this._maxYSegment) {
      this._maxYSegment = null;
    }

    this._tree.remove(s.data);
  }

  /**
   * @hidden @internal
   * Removes all segments between the two given segments (exclusive).
   * This includes removing them from the layout state, as well as
   * the given segment list.
   * @this {PackedLayout}
   * @param segments the full list of segments
   * @param s1 the first segment
   * @param s2 the second segment
   */
  private removeBetween(segments: CircularDoublyLinkedList<Segment>, s1: ListNode<Segment>, s2: ListNode<Segment>) {
    if (s1 === s2)  return;
    let last = s1.next;
    let count = 0;
    while (last !== s2) {
      if (last === segments.start) {
        segments.start = s2;
      }

      this.removeSegmentFromLayoutState(last);

      count++;
      last = last.next;
    }
    s1.next = s2;
    s2.prev = s1;
    segments.length -= count;
  }

  /**
   * @hidden @internal
   * Calculates the cost of a given fit placement, depending on the
   * {@link #packShape} and {@link #_eAspectRatio}.
   * @this {PackedLayout}
   * @param fit the fit to calculate the cost of
   */
  private placementCost(fit: go.Rect): number {
    if (this.packShape === PackedLayout.Rectangular) {
      if (this._bounds.containsRect(fit)) {
        return 0;
      }
      return Math.max(Math.abs(this._center.x - fit.center.x), Math.abs(this._center.y - fit.center.y) * this._eAspectRatio);
    } else { // if (this.packShape === PackedLayout.Elliptical)
      return Math.pow((fit.center.x - this._center.x) / this._eAspectRatio, 2) + Math.pow(fit.center.y - this._center.y, 2);
    }
  }

  /**
   * @hidden @internal
   * Uses the quadtree to determine if the given fit has any
   * intersections anywhere along the perimeter.
   * @this {PackedLayout}
   * @param fit the fit to check
   */
  private fitHasIntersections(fit: Fit) {
    return this._tree.intersecting(fit.bounds).length > 0;
  }

  /**
   * @hidden @internal
   * Checks if a few nearby segments intersect with the given fit,
   * producing faster interesection detection than a complete check
   * with the quadtree in many cases. However, since it doesn't check
   * the entire perimeter, this function is susceptible to false
   * negatives and should only be used with a more comprehensive check.
   * @this {PackedLayout}
   * @param fit the fit to check
   */
  private fastFitHasIntersections(fit: Fit): boolean {
    let sNext = fit.s1.next;
    let sPrev = fit.s1.prev;
    for (let i = 0; i < 2; i++) {
      if (this.segmentIntersectsRect(sNext.data, fit.bounds)) {
        return true;
      }
      if (this.segmentIntersectsRect(sPrev.data, fit.bounds)) {
        return true;
      }
      sNext = sNext.next;
      sPrev = sPrev.prev;
    }
    return false;
  }

  /**
   * @hidden @internal
   * Checks whether or not a segment intersects with a given rect.
   * Used for {@link #fastFitHasIntersections}.
   * @this {PackedLayout}
   * @param s the segment to test
   * @param r the rectangle to test
   */
  private segmentIntersectsRect(s: Segment, r: go.Rect): boolean {
    const left = Math.min(s.x1, s.x2);
    const right = Math.max(s.x1, s.x2);
    const top = Math.min(s.y1, s.y2);
    const bottom = Math.min(s.y1, s.y2);
    return !(left + 1e-7 >= r.right || right - 1e-7 <= r.left || top + 1e-7 >= r.bottom || bottom - 1e-7 <= r.top);
  }

  /**
   * @hidden @internal
   * Checks if two numbers are approximately equal, used for
   * eliminating mistakes caused by floating point error.
   * @this {PackedLayout}
   * @param x the first number
   * @param y the second number
   */
  private approxEqual(x: number, y: number): boolean {
    return Math.abs(x - y) < 1e-7;
  }

  /**
   * @hidden @internal
   * Checks if a value is a number, used for parameter validation
   * @this {PackedLayout}
   * @param value the value to check
   */
  private isNumeric(value: number): boolean {
    return !isNaN(Number(value.toString()));
  }

  /**
   * @hidden @internal
   * Copies properties to a cloned Layout.
   * @this {PackedLayout}
   * @param {?} copy
   */
  public cloneProtected(copy: this): void {
    copy._packShape = this._packShape;
    copy._packMode = this._packMode;
    copy._sortMode = this._sortMode;
    copy._sortOrder = this._sortOrder;
    copy._comparer = this._comparer;
    copy._aspectRatio = this._aspectRatio;
    copy._size = this._size;
    copy._spacing = this._spacing;
    copy._hasCircularNodes = this._hasCircularNodes;
    copy._arrangesToOrigin = this._arrangesToOrigin;
  }

}


/**
 * @hidden @internal
 * Class for a node in a {{@link CircularDoublyLinkedList}.
 * Stores a pointer to the previous and next node.
 */
class ListNode<T> {
  public data: T;
  public prev: ListNode<T>;
  public next: ListNode<T>;

  constructor(data: T, prev?: ListNode<T>, next?: ListNode<T>) {
    this.data = data;
    this.prev = prev !== undefined ? prev : this;
    this.next = next !== undefined ? next : this;
  }
}

/**
 * @hidden @internal
 * A Circular doubly linked list, used by {@link PackedLayout} to
 * efficiently store {@link Segment}s with fast insertion and
 * deletion time.
 */
class CircularDoublyLinkedList<T> {

  /**
   * The start of the list, null when the list is empty.
   */
  public start: ListNode<T> | null = null;
  /**
   * The length of the list.
   */
  public length = 0;

  /**
   * Constructs a new list with an optional list of values
   * @param vals values to create the list with
   */
  constructor(...vals: Array<T>) {
    if (vals.length > 0) {
      this.push(...vals);
    }
  }

  /**
   * Inserts the given value directly after the given node
   * @this {CircularDoublyLinkedList}
   * @param val the value to insert
   * @param node the node to insert after
   * @return {ListNode<T>} the new node
   */
  public insertAfter(val: T, node: ListNode<T> | null): ListNode<T> {
    if (node === null) {
      const newnode = new ListNode<T>(val);
      newnode.prev = newnode;
      newnode.next = newnode;
      this.length = 1;
      return this.start = newnode;
    }
    const tmp = node.next;
    node.next = new ListNode<T>(val, node, tmp);
    tmp.prev = node.next;
    this.length++;
    return node.next;
  }

  /**
   * Inserts the given value or values at the end of the list
   * @this {CircularDoublyLinkedList}
   * @param vals the value(s) to insert
   * @return {ListNode<T>} the node for the last value inserted (a list of values is inserted sequentially)
   */
  public push(...vals: Array<T>): ListNode<T> {
    if (vals.length === 0) {
      throw new Error('You must push at least one element!');
    }
    const sp = this.start !== null ? this.start.prev : null;
    let last = this.insertAfter(vals[0], sp);
    for (let i = 1; i < vals.length; i++) {
      last = this.insertAfter(vals[i], last);
    }
    return last;
  }

  /**
   * Removes the given node from the list
   * @this {CircularDoublyLinkedList}
   * @param node the node to remove
   */
  public remove(node: ListNode<T>): void {
    this.length--;
    if (this.length) {
      node.prev.next = node.next;
      node.next.prev = node.prev;
      if (node === this.start) {
        this.start = node.next;
      }
    } else {
      this.start = null;
    }
  }

  /**
   * Removes all nodes between the given start and end point (exclusive).
   * Returns the given end node.
   * @this {CircularDoublyLinkedList}
   * @param start node to start removing after
   * @param end node to stop removing at
   * @return {ListNode<T>} the end node
   */
  public removeBetween(start: ListNode<T>, end: ListNode<T>): ListNode<T> {
    if (start !== end) {
      let last = start.next;
      let count = 0;
      while (last !== end) {
        if (last === this.start) {
          this.start = end;
        }
        count++;
        last = last.next;
      }
      start.next = end;
      end.prev = start;
      this.length -= count;
      return end;
    }
    return start;
  }

}

/**
 * The following is a BSD-licensed implementation of the
 * Matousek-Sharir-Welzl algorithm for finding the smallest
 * enclosing circle around a given set of circles. The
 * original algorithm was adapted to support enclosing points
 * by assuming that the radius of a point is 0.
 */

/**
 * Copyright 2010-2016 Mike Bostock
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * * Neither the name of the author nor the names of contributors may be used to
 *   endorse or promote products derived from this software without specific prior
 *   written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @hidden @internal
 * Represents a circle for the purposes of the smallest-enclosing
 * circle algorithm. The x and y values represent the center of
 * the circle.
 */
class Circle extends go.Point {
  public r: number;
  constructor(x: number, y: number, r: number) {
    super(x, y);
    this.r = r;
  }
}

/**
 * @hidden @internal
 * @param circles array of circles of points to find the enclosing circle for
 */
function enclose(circles: Array<Circle | go.Point>): go.Rect {
  let i = 0;
  const n = (circles = shuffle(circles.slice())).length;
  let B = new Array<Circle | go.Point>();
  let p: Circle | go.Point;
  let e: Circle | null = null;

  while (i < n) {
    p = circles[i];
    if (e !== null && enclosesWeak(e, p)) ++i;
    else e = encloseBasis(B = extendBasis(B, p)), i = 0;
  }

  if (e !== null) {
    return circleToRect(e);
  } else { // this will never happen, but needs to be here for strict TypeScript compilation
    throw new Error('Assertion error');
  }
}

/**
 * @hidden @internal
 * Converts a Circle to a go.Rect object
 * @param c the Circle to convert
 */
function circleToRect(c: Circle): go.Rect {
  return new go.Rect(c.x - c.r, c.y - c.r, c.r * 2, c.r * 2);
}

/**
 * @hidden @internal
 */
function extendBasis(B: Array<Circle | go.Point>, p: Circle | go.Point): Array<Circle | go.Point> {
  if (enclosesWeakAll(p, B)) return [p];

  // If we get here then B must have at least one element.
  for (let i = 0; i < B.length; ++i) {
    if (enclosesNot(p, B[i])
        && enclosesWeakAll(encloseBasis2(B[i], p), B)) {
      return [B[i], p];
    }
  }

  // If we get here then B must have at least two elements.
  for (let i = 0; i < B.length - 1; ++i) {
    for (let j = i + 1; j < B.length; ++j) {
      if (enclosesNot(encloseBasis2(B[i], B[j]), p)
          && enclosesNot(encloseBasis2(B[i], p), B[j])
          && enclosesNot(encloseBasis2(B[j], p), B[i])
          && enclosesWeakAll(encloseBasis3(B[i], B[j], p), B)) {
        return [B[i], B[j], p];
      }
    }
  }

  // If we get here then something is very wrong.
  throw new Error('Assertion error');
}

/**
 * @hidden @internal
 */
function enclosesNot(a: Circle | go.Point, b: Circle | go.Point): boolean {
  const ar = a instanceof Circle ? a.r : 0;
  const br = b instanceof Circle ? b.r : 0;
  const dr = ar - br;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return dr < 0 || dr * dr < dx * dx + dy * dy;
}

/**
 * @hidden @internal
 */
function enclosesWeak(a: Circle | go.Point, b: Circle | go.Point): boolean {
  const ar = a instanceof Circle ? a.r : 0;
  const br = b instanceof Circle ? b.r : 0;
  const dr = ar - br + 1e-6;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return dr > 0 && dr * dr > dx * dx + dy * dy;
}

/**
 * @hidden @internal
 */
function enclosesWeakAll(a: Circle | go.Point, B: Array<Circle | go.Point>): boolean {
  for (let i = 0; i < B.length; ++i) {
    if (!enclosesWeak(a, B[i])) {
      return false;
    }
  }
  return true;
}

/**
 * @hidden @internal
 */
function encloseBasis(B: Array<Circle | go.Point>): Circle {
  switch (B.length) {
    case 2: return encloseBasis2(B[0], B[1]);
    case 3: return encloseBasis3(B[0], B[1], B[2]);
    default: return encloseBasis1(B[0]); // case 1
  }
}

/**
 * @hidden @internal
 */
function encloseBasis1(a: Circle | go.Point): Circle {
  const ar = a instanceof Circle ? a.r : 0;
  return new Circle(a.x, a.y, ar);
}

/**
 * @hidden @internal
 */
function encloseBasis2(a: Circle | go.Point, b: Circle | go.Point): Circle {
  const ar = a instanceof Circle ? a.r : 0;
  const br = b instanceof Circle ? b.r : 0;
  const x1 = a.x;
  const y1 = a.y;
  const r1 = ar;
  const x2 = b.x;
  const y2 = b.y;
  const r2 = br;
  const x21 = x2 - x1;
  const y21 = y2 - y1;
  const r21 = r2 - r1;
  const l = Math.sqrt(x21 * x21 + y21 * y21);
  return new Circle(
    (x1 + x2 + x21 / l * r21) / 2,
    (y1 + y2 + y21 / l * r21) / 2,
    (l + r1 + r2) / 2
  );
}

/**
 * @hidden @internal
 */
function encloseBasis3(a: Circle | go.Point, b: Circle | go.Point, c: Circle | go.Point): Circle {
  const ar = a instanceof Circle ? a.r : 0;
  const br = b instanceof Circle ? b.r : 0;
  const cr = c instanceof Circle ? c.r : 0;
  const x1 = a.x;
  const y1 = a.y;
  const r1 = ar;
  const x2 = b.x;
  const y2 = b.y;
  const r2 = br;
  const x3 = c.x;
  const y3 = c.y;
  const r3 = cr;
  const a2 = x1 - x2;
  const a3 = x1 - x3;
  const b2 = y1 - y2;
  const b3 = y1 - y3;
  const c2 = r2 - r1;
  const c3 = r3 - r1;
  const d1 = x1 * x1 + y1 * y1 - r1 * r1;
  const d2 = d1 - x2 * x2 - y2 * y2 + r2 * r2;
  const d3 = d1 - x3 * x3 - y3 * y3 + r3 * r3;
  const ab = a3 * b2 - a2 * b3;
  const xa = (b2 * d3 - b3 * d2) / (ab * 2) - x1;
  const xb = (b3 * c2 - b2 * c3) / ab;
  const ya = (a3 * d2 - a2 * d3) / (ab * 2) - y1;
  const yb = (a2 * c3 - a3 * c2) / ab;
  const A = xb * xb + yb * yb - 1;
  const B = 2 * (r1 + xa * xb + ya * yb);
  const C = xa * xa + ya * ya - r1 * r1;
  const r = -(A ? (B + Math.sqrt(B * B - 4 * A * C)) / (2 * A) : C / B);
  return new Circle(
    x1 + xa + xb * r,
    y1 + ya + yb * r,
    r
  );
}

/**
 * @hidden @internal
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a: Array<any>): Array<any> {
    let j: any;
    let x: any;
    let i: any;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
