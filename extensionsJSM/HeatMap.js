/*
 *  Copyright 1998-2026 by Northwoods Software Corporation. All Rights Reserved.
 */
/*
 * This is an extension and not part of the main GoJS library.
 * The source code for this is at extensionsJSM/HeatMap.ts.
 * Note that the API for this class may change with any version, even point releases.
 * If you intend to use an extension in production, you should copy the code to your own source directory.
 * Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
 * See the Extensions learn page (https://gojs.net/learn/extensions) for more information.
 */
import go from 'gojs';
/**
 * A class for drawing a heat map based on the "temperatures" of Parts.
 *
 * This class adds a heat map image in the "ViewportForeground" Layer
 * that is dynamically computed as the user scrolls or zooms or when
 * a transaction/undo/redo is finished.
 *
 * It also has a method, renderImageData, that renders a heat map for a given area of the document,
 * not just for the viewport, returning an ImageData.
 * @category Extension
 */
export class HeatMap {
    /**
     * Construct a HeatMap for a Diagram, optionally setting some properties.
     * @param diag if not supplied, the {@link diagram} will be null
     * @param init
     */
    constructor(diag, init) {
        this._diagram = null;
        this._heatMapPart = new go.Part({
            layerName: 'ViewportForeground',
            alignment: go.Spot.TopLeft,
            alignmentFocus: go.Spot.TopLeft
        }).add(new go.Picture({ name: 'IMG', element: document.createElement('canvas') }));
        this._colors =
            // this forms the default gradient; this could be improved
            [
                // EACH ENTRY MUST BE DIFFERENT FROM DIFFERENT FROM EACH OTHER
                [0xff, 0x45, 0x00, 200], // orangered
                [0xff, 0x55, 0x00, 200],
                [0xff, 0x65, 0x00, 200],
                [0xff, 0x75, 0x00, 200],
                [0xff, 0x85, 0x00, 190],
                [0xff, 0x95, 0x00, 190],
                [0xff, 0xa5, 0x00, 190], // orange
                [0xff, 0xb5, 0x00, 190],
                [0xff, 0xc5, 0x00, 180],
                [0xff, 0xd0, 0x00, 180],
                [0xff, 0xd5, 0x00, 180],
                [0xff, 0xe0, 0x00, 170],
                [0xff, 0xe5, 0x00, 170],
                [0xff, 0xf0, 0x00, 170],
                [0xff, 0xff, 0x00, 160], // yellow
                [0xa0, 0xff, 0x40, 150],
                [0x60, 0xff, 0x20, 140],
                [0x00, 0xff, 0x00, 130], // lime
                [0x00, 0xaf, 0x80, 110],
                [0x00, 0x4f, 0xc0, 90],
                [0x00, 0x4f, 0xff, 60], // blue
                [0x00, 0x4f, 0xff, 30],
                [0x00, 0x4f, 0xff, 5]
            ];
        this._updater = () => this.updateHeatMap();
        this._changer = (e) => {
            if (e.isTransactionFinished)
                this.updateHeatMap();
        };
        if (diag instanceof go.Diagram) {
            this.diagram = diag;
            if (init)
                Object.assign(this, init);
        }
        else if (typeof diag === 'object') {
            Object.assign(this, diag);
        }
    }
    // Gets or sets the Diagram that this HeatMap is working on.  The default is null.
    get diagram() {
        return this._diagram;
    }
    set diagram(value) {
        if (value !== this.diagram) {
            if (this.diagram !== null) {
                this.diagram.removeDiagramListener('ViewportBoundsChanged', this._updater);
                this.diagram.removeModelChangedListener(this._changer);
                this.diagram.remove(this.heatMapPart);
            }
            this._diagram = value;
            if (this.diagram !== null) {
                this.diagram.add(this.heatMapPart);
                this.diagram.addDiagramListener('ViewportBoundsChanged', this._updater);
                this.diagram.addModelChangedListener(this._changer);
                this.updateHeatMap();
            }
        }
    }
    // Gets the Part that must be in a Layer.isViewportAligned Layer that holds
    // the raster image showing the computed heat map.
    get heatMapPart() {
        return this._heatMapPart;
    }
    set heatMapPart(value) {
        if (value !== this.heatMapPart) {
            if (this.diagram !== null)
                this.diagram.remove(this.heatMapPart);
            this._heatMapPart = value;
            if (this.diagram !== null)
                this.diagram.add(this.heatMapPart);
        }
    }
    // Gets or sets the Array of Array of RGBA color numbers to use in forming gradients.
    // Each Array representing a color must be different than the ones before it or after it.
    get colors() {
        return this._colors;
    }
    set colors(value) {
        if (!Array.isArray(value) ||
            value.length < 2 ||
            !value.every((a) => Array.isArray(a) && a.length === 4 && a.every((n) => typeof n === 'number'))) {
            throw new Error('HeatMap.colors must be an Array of Array of four numbers, not: ' + value);
        }
        this._colors = value;
        this.updateHeatMap();
    }
    /**
     * Override this method to customize getting the value for how "hot" the given Part is.
     * Typically this is overridden to return some numeric property of the Part.data.
     * By default it returns one, the maximum, assuming the normalizeTemperature method does not scale the value.
     * @param part
     * @returns a number indicating the Part's temperature, where smaller values are cooler.
     * @see {@link normalizeTemperature}
     */
    getTemperature(part) {
        return 1;
    }
    /**
     * Override this method to shift and scale the given temperature to get a fraction between zero and one, inclusive.
     * A value of zero indicates that the given Part not participate in the heat map.
     * Values between zero and one select the starting color from the colors Array -- higher values get more colors.
     * By default it just returns the given value, making sure the value is between zero and one.
     * @param temp
     * @returns a fraction between zero and one, inclusive
     * @see {@link getTemperature}
     * @see {@link computeStartingColorIndex}
     */
    normalizeTemperature(temp) {
        if (temp < 0)
            return 0;
        if (temp > 1)
            return 1;
        return temp;
    }
    /**
     * Override this method to customize the computation of the starting index in the {@link colors} Array
     * given the fraction computed by normalizeTemperature.
     * The default behavior is a simple linear interpolation.
     * The value must be a valid index into the colors Array.
     * @param frac a number between zero and one, inclusive
     * @returns an index into {@link colors}
     * @see {@link normalizeTemperature}
     */
    computeStartingColorIndex(frac) {
        const len1 = this.colors.length - 1;
        let i = Math.round(len1 * (1 - frac));
        if (i < 0)
            return 0;
        if (i > len1)
            return len1;
        return i;
    }
    /**
     * Return an ImageData of the given SIZE in pixels for the given AREA in document coordinates.
     * @param area a Rect in document coordinates
     * @param size a Size in device-independent-pixel/viewport coordinates
     * @returns ImageData or null
     */
    renderImageData(area, size) {
        const diag = this.diagram;
        if (!diag)
            return null;
        if (area.width < 1 || area.height < 1)
            return null;
        const w = Math.round(size.width);
        const h = Math.round(size.height);
        const scale = Math.min(w / area.width, h / area.height);
        const canvas = document.createElement('canvas');
        return this._renderHeatMap(canvas, area, w, h, scale);
    }
    /**
     * Update the heatMapPart's raster image for the viewport.
     */
    updateHeatMap() {
        const diag = this.diagram;
        if (!diag)
            return;
        if (diag.animationManager.isAnimating)
            return;
        if (!this.heatMapPart.isVisible())
            return;
        const vb = diag.viewportBounds;
        const w = Math.round(vb.width * diag.scale);
        const h = Math.round(vb.height * diag.scale);
        const picture = this.heatMapPart.findObject('IMG');
        picture.width = vb.width;
        picture.height = vb.height;
        picture.scale = diag.scale;
        const canvas = picture.element;
        canvas.width = w;
        canvas.height = h;
        this._renderHeatMap(canvas, vb, w, h, diag.scale);
        picture.redraw();
    }
    // internal method that actually does the heat map computation and rendering
    _renderHeatMap(canvas, vb, w, h, sc) {
        const diag = this.diagram;
        if (!diag)
            return null;
        if (!vb.isReal())
            return null;
        const ctx = canvas.getContext('2d');
        let imgdata = ctx.createImageData(w, h);
        const d = imgdata.data;
        const len1 = this.colors.length - 1;
        let minColorIndex = Infinity;
        const parts = diag.findPartsIn(vb, true, false);
        parts.each((part) => {
            if (part instanceof go.Link)
                return;
            minColorIndex = Math.min(minColorIndex, this._renderPart(part, vb, w, h, sc, d));
        });
        parts.each((part) => {
            if (!(part instanceof go.Link))
                return;
            minColorIndex = Math.min(minColorIndex, this._renderLink(part, vb, w, h, sc, d));
        });
        if (minColorIndex >= len1)
            return imgdata;
        let copydata = null;
        for (let i = minColorIndex; i < len1; i++) {
            const a = this.colors[i];
            const b = this.colors[i + 1];
            if (copydata === null) {
                copydata = ctx.createImageData(w, h);
                copydata.data.set(imgdata.data);
            }
            this._stepHeatMap(w, h, imgdata, a[0], a[1], a[2], a[3], copydata, b[0], b[1], b[2], b[3]);
            const temp = imgdata;
            imgdata = copydata;
            copydata = temp;
            copydata.data.set(imgdata.data);
        }
        ctx.clearRect(0, 0, w, h);
        ctx.putImageData(imgdata, 0, 0);
        return imgdata;
    }
    _renderLink(part, vb, w, h, sc, d) {
        const frac = this.normalizeTemperature(this.getTemperature(part));
        if (frac <= 0)
            return Infinity;
        const startC = this.computeStartingColorIndex(frac);
        const SC = this.colors[startC];
        if (part.pointsCount < 2)
            return Infinity;
        const b = part.routeBounds.copy();
        if (!b.intersectsRect(vb))
            return Infinity;
        if (part.computeCurve() === go.Curve.Bezier) {
            for (let i = 0; i < part.pointsCount - 1; i += 3) {
                let p = part.getPoint(i);
                const p0x = Math.round((p.x - vb.x) * sc);
                const p0y = Math.round((p.y - vb.y) * sc);
                p = part.getPoint(i + 1);
                const p1x = Math.round((p.x - vb.x) * sc);
                const p1y = Math.round((p.y - vb.y) * sc);
                p = part.getPoint(i + 2);
                const p2x = Math.round((p.x - vb.x) * sc);
                const p2y = Math.round((p.y - vb.y) * sc);
                p = part.getPoint(i + 3);
                const p3x = Math.round((p.x - vb.x) * sc);
                const p3y = Math.round((p.y - vb.y) * sc);
                const pix = Math.abs(p0x - p1x) +
                    Math.abs(p1x - p2x) +
                    Math.abs(p2x - p3x) +
                    Math.abs(p0y - p1y) +
                    Math.abs(p1y - p2y) +
                    Math.abs(p2y - p3y);
                if (pix < 2)
                    continue;
                for (let t = 0; t <= 1; t += 1 / pix) {
                    const t1 = 1 - t;
                    let c0 = t1 * t1;
                    let c3 = t * t;
                    const c1 = 3 * c0 * t;
                    const c2 = 3 * t1 * c3;
                    c0 *= t1;
                    c3 *= t;
                    const px = Math.round(c0 * p0x + c1 * p1x + c2 * p2x + c3 * p3x);
                    if (px < 0 || px >= w)
                        continue;
                    const py = Math.round(c0 * p0y + c1 * p1y + c2 * p2y + c3 * p3y);
                    if (py < 0 || py >= h)
                        continue;
                    const k = 4 * (py * w + px);
                    if (k >= 0 && k < d.length && d[k + 3] === 0) {
                        d[k] = SC[0];
                        d[k + 1] = SC[1];
                        d[k + 2] = SC[2];
                        d[k + 3] = SC[3];
                    }
                }
            }
        }
        else {
            // assumes straight line segments -- ignore all labels and Link.corner and jump-overs
            let vp = part.getPoint(0).copy();
            vp.x = Math.round((vp.x - vb.x) * sc);
            vp.y = Math.round((vp.y - vb.y) * sc);
            for (let i = 1; i < part.pointsCount; i++) {
                const vq = part.getPoint(i).copy();
                vq.x = Math.round((vq.x - vb.x) * sc);
                vq.y = Math.round((vq.y - vb.y) * sc);
                if (vp.x === vq.x && vp.y === vq.y)
                    continue;
                // draw points along straight line of route (no curves here) from VP to VQ
                const m = Math.abs(vq.x - vp.x) > Math.abs(vq.y - vp.y) ? vq.x - vp.x : vq.y - vp.y;
                const am = Math.abs(m);
                const dx = (vq.x - vp.x) / am;
                const dy = (vq.y - vp.y) / am;
                for (let z = 0; z < am; z++) {
                    const x2 = Math.round(vp.x + z * dx);
                    if (x2 < 0 || x2 >= w)
                        continue;
                    const y2 = Math.round(vp.y + z * dy);
                    if (y2 < 0 || y2 >= h)
                        continue;
                    const k2 = 4 * (y2 * w + x2);
                    if (k2 >= 0 && k2 < d.length && d[k2 + 3] === 0) {
                        d[k2] = SC[0];
                        d[k2 + 1] = SC[1];
                        d[k2 + 2] = SC[2];
                        d[k2 + 3] = SC[3];
                    }
                }
                vp = vq;
            }
        }
        return startC;
    }
    _renderPart(part, vb, w, h, sc, d) {
        const frac = this.normalizeTemperature(this.getTemperature(part));
        if (frac <= 0)
            return Infinity;
        const startC = this.computeStartingColorIndex(frac);
        const SC = this.colors[startC];
        let obj = part.selectionObject;
        if (obj instanceof go.Panel &&
            (obj.type === go.Panel.Auto || obj.type === go.Panel.Spot)) {
            obj = obj.findMainElement();
        }
        if (!obj)
            return Infinity;
        const b = obj.getDocumentBounds().copy();
        if (!b.intersectsRect(vb))
            return Infinity;
        if (obj instanceof go.Shape &&
            (obj.figure === 'Ellipse' || obj.figure === 'Circle') &&
            obj.getDocumentAngle() === 0) {
            // convert to canvas coordinates
            const tlx = Math.round((b.x - vb.x) * sc);
            const tly = Math.round((b.y - vb.y) * sc);
            const brx = Math.round((b.right - vb.x) * sc);
            const bry = Math.round((b.bottom - vb.y) * sc);
            const rx = Math.round((brx - tlx) / 2);
            const ry = Math.round((bry - tly) / 2);
            const ox = tlx + rx;
            const oy = tly + ry;
            const ww = rx * rx;
            const hh = ry * ry;
            const wwhh = ww * hh;
            let x0 = rx;
            let dx = 0;
            for (let x = -rx; x <= rx; x++) {
                if (oy >= 0 && oy < h && ox + x >= 0 && ox + x < h) {
                    const k = 4 * (oy * w + (ox + x));
                    if (k >= 0 && k < d.length && d[k + 3] === 0) {
                        d[k] = SC[0];
                        d[k + 1] = SC[1];
                        d[k + 2] = SC[2];
                        d[k + 3] = SC[3];
                    }
                }
            }
            for (let y = 1; y <= ry; y++) {
                let x1 = x0 - (dx - 1);
                for (; x1 > 0; x1--) {
                    if (x1 * x1 * hh + y * y * ww < wwhh)
                        break;
                }
                dx = x0 - x1;
                x0 = x1;
                for (let x = -x0; x <= x0; x++) {
                    if (oy - y >= 0 && oy - y < h && ox + x >= 0 && ox + x < w) {
                        const km = 4 * ((oy - y) * w + (ox + x));
                        if (km >= 0 && km < d.length && d[km + 3] === 0) {
                            d[km] = SC[0];
                            d[km + 1] = SC[1];
                            d[km + 2] = SC[2];
                            d[km + 3] = SC[3];
                        }
                    }
                    if (oy + y >= 0 && oy + y < h && ox + x >= 0 && ox + x < w) {
                        const kp = 4 * ((oy + y) * w + (ox + x));
                        if (kp >= 0 && kp < d.length && d[kp + 3] === 0) {
                            d[kp] = SC[0];
                            d[kp + 1] = SC[1];
                            d[kp + 2] = SC[2];
                            d[kp + 3] = SC[3];
                        }
                    }
                }
            }
        }
        else {
            // assumes rectangular selectionObject
            let tl = new go.Point(b.x, b.y);
            tl.x = Math.round((tl.x - vb.x) * sc);
            tl.y = Math.round((tl.y - vb.y) * sc);
            let br = new go.Point(b.right, b.bottom);
            br.x = Math.round((br.x - vb.x) * sc);
            br.y = Math.round((br.y - vb.y) * sc);
            for (let j = tl.y; j <= br.y; j++) {
                if (j < 0 || j >= h)
                    continue;
                for (let i = tl.x; i <= br.x; i++) {
                    if (i < 0 || i >= w)
                        continue;
                    const k = 4 * (j * w + i);
                    if (k >= 0 && k < d.length && d[k + 3] === 0) {
                        d[k] = SC[0];
                        d[k + 1] = SC[1];
                        d[k + 2] = SC[2];
                        d[k + 3] = SC[3];
                    }
                }
            }
        }
        return startC;
    }
    // if an empty cell is next to a pRGBA cell, set it to nRGBA
    _stepHeatMap(w, h, imgdata, pr, pg, pb, pa, copydata, nr, ng, nb, na) {
        const d = imgdata.data;
        const c = copydata.data;
        // don't bother handling edge pixels
        for (let j = 1; j < h - 1; j++) {
            for (let i = 1; i < w - 1; i++) {
                const k = 4 * (j * w + i);
                if (d[k + 3] !== 0)
                    continue; // assume already set
                const w4 = 4 * w;
                if (d[k - w4] === pr &&
                    d[k - w4 + 1] === pg &&
                    d[k - w4 + 2] === pb &&
                    d[k - w4 + 3] === pa) {
                    c[k] = nr;
                    c[k + 1] = ng;
                    c[k + 2] = nb;
                    c[k + 3] = na;
                }
                else if (d[k + w4] === pr &&
                    d[k + w4 + 1] === pg &&
                    d[k + w4 + 2] === pb &&
                    d[k + w4 + 3] === pa) {
                    c[k] = nr;
                    c[k + 1] = ng;
                    c[k + 2] = nb;
                    c[k + 3] = na;
                }
                else if (d[k - 4] === pr &&
                    d[k - 4 + 1] === pg &&
                    d[k - 4 + 2] === pb &&
                    d[k - 4 + 3] === pa) {
                    c[k] = nr;
                    c[k + 1] = ng;
                    c[k + 2] = nb;
                    c[k + 3] = na;
                }
                else if (d[k + 4] === pr &&
                    d[k + 4 + 1] === pg &&
                    d[k + 4 + 2] === pb &&
                    d[k + 4 + 3] === pa) {
                    c[k] = nr;
                    c[k + 1] = ng;
                    c[k + 2] = nb;
                    c[k + 3] = na;
                }
            }
        }
    }
}
