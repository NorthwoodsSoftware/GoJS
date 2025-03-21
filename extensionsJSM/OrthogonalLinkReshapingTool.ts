/*
 *  Copyright 1998-2025 by Northwoods Software Corporation. All Rights Reserved.
 */

/*
 * This is an extension and not part of the main GoJS library.
 * The source code for this is at extensionsJSM/OrthogonalLinkReshapingTool.ts.
 * Note that the API for this class may change with any version, even point releases.
 * If you intend to use an extension in production, you should copy the code to your own source directory.
 * Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
 * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
 */

import * as go from 'gojs';

/**
 * The OrthogonalLinkReshapingTool class lets a user drag a tool handle along the link segment, which will move the whole segment.
 *
 * If you want to experiment with this extension, try the <a href="../../samples/OrthogonalLinkReshaping.html">Orthogonal Link Reshaping</a> sample.
 * @category Tool Extension
 */
export class OrthogonalLinkReshapingTool extends go.LinkReshapingTool {
  private _alreadyAddedPoint: boolean = false;
  private _wasEnabled: boolean = false;

  /**
   * Constructs an OrthogonalLinkReshapingTool and sets the name for the tool.
   */
  constructor(init?: Partial<OrthogonalLinkReshapingTool>) {
    super();
    this.name = 'OrthogonalLinkReshaping';
    this._alreadyAddedPoint = false;
    if (init) Object.assign(this, init);
  }

  /**
   * @hidden @internal
   * For orthogonal, straight links, create the handles and set reshaping behavior.
   */
  override makeAdornment(pathshape: go.Shape): go.Adornment | null {
    const link = pathshape.part as go.Link;

    // add all normal handles first
    const adornment = super.makeAdornment(pathshape);

    // add long reshaping handles for orthogonal, straight links
    if (
      link !== null &&
      adornment !== null &&
      link.isOrthogonal &&
      link.curve !== go.Curve.Bezier
    ) {
      const firstindex = link.firstPickIndex + (link.resegmentable ? 0 : 1);
      const lastindex = link.lastPickIndex - (link.resegmentable ? 0 : 1);
      for (let i = firstindex; i < lastindex; i++) {
        this.makeSegmentDragHandle(link, adornment, i);
      }
    }
    return adornment;
  }

  override doActivate(): void {
    const router = this.diagram.findRouter('AvoidsNodes');
    if (router) {
      this._wasEnabled = router.isEnabled;
      router.isEnabled = false;
    }
    super.doActivate();
  }

  /**
   * This stops the current reshaping operation and updates any link handles.
   */
  override doDeactivate(): void {
    this._alreadyAddedPoint = false;
    const router = this.diagram.findRouter('AvoidsNodes');
    if (router) {
      router.isEnabled = this._wasEnabled;
    }
    // when we finish, recreate adornment to ensure proper reshaping behavior/cursor
    const link = this.adornedLink;
    if (link !== null && link.isOrthogonal && link.curve !== go.Curve.Bezier) {
      const pathshape = link.path;
      if (pathshape !== null) {
        const adornment = this.makeAdornment(pathshape);
        if (adornment !== null) {
          link.addAdornment(this.name, adornment);
          adornment.location = link.position;
        }
      }
    }
    super.doDeactivate();
  }

  /**
   * Change the route of the {@link adornedLink} by moving the segment corresponding to the current
   * {@link handle} to be at the given {@link go.Point}.
   */
  override reshape(newpt: go.Point): void {
    const link = this.adornedLink;

    // identify if the handle being dragged is a segment dragging handle
    if (
      link !== null &&
      link.isOrthogonal &&
      link.curve !== go.Curve.Bezier &&
      this.handle !== null &&
      this.handle.toMaxLinks === 999
    ) {
      link.startRoute();
      let index = this.handle.segmentIndex; // for these handles, firstPickIndex <= index < lastPickIndex
      if (!this._alreadyAddedPoint && link.resegmentable) {
        // only change the number of points if Link.resegmentable
        this._alreadyAddedPoint = true;
        if (index === link.firstPickIndex) {
          link.insertPoint(index, link.getPoint(index).copy());
          index++;
          this.handle.segmentIndex = index;
        } else if (index === link.lastPickIndex - 1) {
          link.insertPoint(index, link.getPoint(index).copy());
          if (index - 1 === link.firstPickIndex + 1) this.handle.segmentIndex = index - 1;
        }
      }
      const behavior = this.getReshapingBehavior(this.handle);
      if (behavior === go.ReshapingBehavior.Vertical) {
        // move segment vertically
        link.setPointAt(index, link.getPoint(index - 1).x, newpt.y);
        link.setPointAt(index + 1, link.getPoint(index + 2).x, newpt.y);
      } else if (behavior === go.ReshapingBehavior.Horizontal) {
        // move segment horizontally
        link.setPointAt(index, newpt.x, link.getPoint(index - 1).y);
        link.setPointAt(index + 1, newpt.x, link.getPoint(index + 2).y);
      }
      link.commitRoute();
    } else {
      super.reshape(newpt);
    }
  }

  /**
   * Create the segment dragging handles.
   * There are two parts: one invisible handle that spans the segment, and a visible handle at the middle of the segment.
   * These are inserted at the front of the adornment such that the normal handles have priority.
   */
  makeSegmentDragHandle(link: go.Link, adornment: go.Adornment, index: number): void {
    if (adornment === null) return;
    const a = link.getPoint(index);
    let b = link.getPoint(index + 1);
    const seglength = Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
    // determine segment orientation
    let orient = '';
    if (this.isApprox(a.x, b.x) && this.isApprox(a.y, b.y)) {
      b = link.getPoint(index - 1);
      if (this.isApprox(a.x, b.x)) {
        orient = 'vertical';
      } else if (this.isApprox(a.y, b.y)) {
        orient = 'horizontal';
      }
    } else {
      if (this.isApprox(a.x, b.x)) {
        orient = 'vertical';
      } else if (this.isApprox(a.y, b.y)) {
        orient = 'horizontal';
      }
    }

    // make an invisible handle along the whole segment
    const h = new go.Shape();
    h.strokeWidth = 6;
    h.opacity = 0;
    h.segmentOrientation = go.Orientation.Along;
    h.segmentIndex = index;
    h.segmentFraction = 0.5;
    h.toMaxLinks = 999; // set this unsused property to easily identify that we have a segment dragging handle
    if (orient === 'horizontal') {
      this.setReshapingBehavior(h, go.ReshapingBehavior.Vertical);
      h.cursor = 'n-resize';
    } else {
      this.setReshapingBehavior(h, go.ReshapingBehavior.Horizontal);
      h.cursor = 'w-resize';
    }
    h.geometryString = 'M 0 0 L ' + seglength + ' 0';
    adornment.insertAt(0, h);
  }

  /**
   * Compare two numbers to ensure they are almost equal.
   * Used in this class for comparing coordinates of Points.
   */
  isApprox(x: number, y: number): boolean {
    const d = x - y;
    return d < 0.5 && d > -0.5;
  }
}
