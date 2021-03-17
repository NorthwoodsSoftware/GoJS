/*
*  Copyright (C) 1998-2021 by Northwoods Software Corporation. All Rights Reserved.
*/
/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/
import * as go from '../release/go-module.js';
/**
 * This {@link Layout} positions non-Link Parts into a table according to the values of
 * {@link GraphObject#row}, {@link GraphObject#column}, {@link GraphObject#rowSpan}, {@link GraphObject#columnSpan},
 * {@link GraphObject#alignment}, {@link GraphObject#stretch}.
 * If the value of GraphObject.stretch is not {@link GraphObject.None}, the Part will be sized
 * according to the available space in the cell(s).
 *
 * You can specify constraints for whole rows or columns by calling
 * {@link #getRowDefinition} or {@link #getColumnDefinition} and setting one of the following properties:
 * {@link RowColumnDefinition#alignment}, {@link RowColumnDefinition#height}, {@link RowColumnDefinition#width},
 * {@link RowColumnDefinition#maximum}, {@link RowColumnDefinition#minimum}, {@link RowColumnDefinition#stretch}.
 *
 * The {@link #defaultAlignment} and {@link #defaultStretch} properties apply to all parts if not specified
 * on the individual Part or in the corresponding row or column definition.
 *
 * At the current time, there is no support for separator lines
 * ({@link RowColumnDefinition#separatorStroke}, {@link RowColumnDefinition#separatorStrokeWidth},
 * and {@link RowColumnDefinition#separatorDashArray} properties)
 * nor background ({@link RowColumnDefinition#background} and {@link RowColumnDefinition#coversSeparators} properties).
 * There is no support for {@link RowColumnDefinition#sizing}, either.
 *
 * If you want to experiment with this extension, try the <a href="../../extensionsTS/Table.html">Table Layout</a> sample.
 * @category Layout Extension
 */
export class TableLayout extends go.Layout {
    constructor() {
        super(...arguments);
        this._defaultAlignment = go.Spot.Default;
        this._defaultStretch = go.GraphObject.Default;
        this._rowDefs = [];
        this._colDefs = [];
    }
    /**
     * Gets or sets the alignment to use by default for Parts in rows (vertically) and in columns (horizontally).
     *
     * The default value is {@link Spot.Default}.
     * Setting this property does not raise any events.
     */
    get defaultAlignment() { return this._defaultAlignment; }
    set defaultAlignment(val) { this._defaultAlignment = val; }
    /**
     * Gets or sets whether Parts should be stretched in rows (vertically) and in columns (horizontally).
     *
     * The default value is {@link GraphObject.Default}.
     * Setting this property does not raise any events.
     */
    get defaultStretch() { return this._defaultStretch; }
    set defaultStretch(val) { this._defaultStretch = val; }
    /**
     * This read-only property returns the number of rows in this TableLayout.
     * This value is only valid after the layout has been performed.
     */
    get rowCount() { return this._rowDefs.length; }
    /**
     * This read-only property returns the number of columns in this TableLayout.
     * This value is only valid after the layout has been performed.
     */
    get columnCount() { return this._colDefs.length; }
    /**
     * Copies properties to a cloned Layout.
     */
    cloneProtected(copy) {
        super.cloneProtected(copy);
        copy._defaultAlignment = this._defaultAlignment;
        copy._defaultStretch = this._defaultStretch;
        for (let i = 0; i < this._rowDefs.length; i++) {
            const def = this._rowDefs[i];
            copy._rowDefs.push(def !== undefined ? def.copy() : def);
        }
        for (let i = 0; i < this._colDefs.length; i++) {
            const def = this._colDefs[i];
            copy._colDefs.push(def !== undefined ? def.copy() : def);
        }
    }
    /**
     * Gets the {@link RowColumnDefinition} for a particular row in this TableLayout.
     * If you ask for the definition of a row at or beyond the {@link #rowCount},
     * it will automatically create one and return it.
     * @param {number} idx the non-negative zero-based integer row index.
     * @return {RowColumnDefinition}
     */
    getRowDefinition(idx) {
        if (idx < 0)
            throw new Error('Row index must be non-negative, not: ' + idx);
        idx = Math.round(idx);
        const defs = this._rowDefs;
        let d = defs[idx];
        if (d === undefined) {
            d = new go.RowColumnDefinition();
            // .panel remains null
            d.isRow = true;
            d.index = idx;
            defs[idx] = d;
        }
        return d;
    }
    /**
     * Returns the row at a given y-coordinate in document coordinates.
     * This information is only valid when this layout has been performed and {@link Layout#isValidLayout} is true.
     *
     * If the point is above row 0, this method returns -1.
     * If the point below the last row, this returns the last row + 1.
     * @param {number} y
     * @return {number} a zero-based integer
     * @see {@link #findColumnForDocumentX}
     */
    findRowForDocumentY(y) {
        y -= this.arrangementOrigin.y;
        if (y < 0)
            return -1;
        let total = 0.0;
        const it = this._rowDefs;
        const l = it.length;
        for (let i = 0; i < l; i++) {
            const def = it[i];
            if (def === undefined)
                continue;
            total += def.total;
            if (y < total) {
                return i;
            }
        }
        return l;
    }
    /**
     * Gets the {@link RowColumnDefinition} for a particular column in this TableLayout.
     * If you ask for the definition of a column at or beyond the {@link #columnCount},
     * it will automatically create one and return it.
     * @param {number} idx the non-negative zero-based integer column index.
     * @return {RowColumnDefinition}
     */
    getColumnDefinition(idx) {
        if (idx < 0)
            throw new Error('Column index must be non-negative, not: ' + idx);
        idx = Math.round(idx);
        const defs = this._colDefs;
        let d = defs[idx];
        if (d === undefined) {
            d = new go.RowColumnDefinition();
            // .panel remains null
            d.isRow = false;
            d.index = idx;
            defs[idx] = d;
        }
        return d;
    }
    /**
     * Returns the cell at a given x-coordinate in document coordinates.
     * This information is only valid when this layout has been performed and {@link Layout#isValidLayout} is true.
     *
     * If the point is to left of the column 0, this method returns -1.
     * If the point to to the right of the last column, this returns the last column + 1.
     * @param {number} x
     * @return {number} a zero-based integer
     * @see {@link #findRowForDocumentY}
     */
    findColumnForDocumentX(x) {
        x -= this.arrangementOrigin.x;
        if (x < 0)
            return -1;
        let total = 0.0;
        const it = this._colDefs;
        const l = it.length;
        for (let i = 0; i < l; i++) {
            const def = it[i];
            if (def === undefined)
                continue;
            total += def.total;
            if (x < total) {
                return i;
            }
        }
        return l;
    }
    /**
     * @hidden @internal
     * Only ever called from TableLayout's measure and arrange
     */
    getEffectiveTableStretch(child, row, col) {
        const effectivestretch = child.stretch;
        if (effectivestretch !== go.GraphObject.Default)
            return effectivestretch;
        // which directions are we stretching?
        // undefined = default
        let horizontal;
        let vertical;
        switch (row.stretch) {
            case go.GraphObject.Default:
            case go.GraphObject.Horizontal: break;
            case go.GraphObject.Vertical:
                vertical = true;
                break;
            case go.GraphObject.Fill:
                vertical = true;
                break;
        }
        switch (col.stretch) {
            case go.GraphObject.Default:
            case go.GraphObject.Vertical: break;
            case go.GraphObject.Horizontal:
                horizontal = true;
                break;
            case go.GraphObject.Fill:
                horizontal = true;
                break;
        }
        const str = this.defaultStretch;
        if (horizontal === undefined && (str === go.GraphObject.Horizontal || str === go.GraphObject.Fill)) {
            horizontal = true;
        }
        else {
            horizontal = false;
        }
        if (vertical === undefined && (str === go.GraphObject.Vertical || str === go.GraphObject.Fill)) {
            vertical = true;
        }
        else {
            vertical = false;
        }
        if (horizontal === true && vertical === true)
            return go.GraphObject.Fill;
        if (horizontal === true)
            return go.GraphObject.Horizontal;
        if (vertical === true)
            return go.GraphObject.Vertical;
        return go.GraphObject.None; // Everything else is none by default
    }
    /**
     * This method performs the measuring and arranging of the table, assiging positions to each part.
     * @param {Iterable.<Part>} coll A collection of {@link Part}s.
     */
    doLayout(coll) {
        this.arrangementOrigin = this.initialOrigin(this.arrangementOrigin);
        // put all eligible Parts that are not Links into an Array
        const parts = new go.List();
        this.collectParts(coll).each((p) => {
            if (!(p instanceof go.Link)) {
                parts.add(p);
            }
        });
        if (this.diagram !== null) {
            this.diagram.startTransaction('TableLayout');
            const union = new go.Size();
            // this calls .beforeMeasure(parts, rowcol)
            const rowcol = this.measureTable(Infinity, Infinity, parts, union, 0, 0);
            this.arrangeTable(parts, union, rowcol);
            this.afterArrange(parts, rowcol);
            this.diagram.commitTransaction('TableLayout');
        }
    }
    /**
     * Override this method in order to perform some operations before measuring.
     * By default this method does nothing.
     * @expose
     */
    beforeMeasure(parts, rowcol) { }
    /**
     * Override this method in order to perform some operations after arranging.
     * By default this method does nothing.
     * @expose
     */
    afterArrange(parts, rowcol) { }
    /**
     * @hidden @internal
     */
    measureTable(width, height, children, union, minw, minh) {
        let l = children.length;
        // Make the array that holds [rows][cols] of the table
        const rowcol = []; // saved (so no temp array) starts as an array of rows, will end up [row][col][cell]
        for (let i = 0; i < l; i++) {
            const child = children.elt(i);
            if (!rowcol[child.row]) {
                rowcol[child.row] = []; // make new column for this row
            }
            if (!rowcol[child.row][child.column]) {
                rowcol[child.row][child.column] = []; // new list for this cell
            }
            rowcol[child.row][child.column].push(child); // push child into right cell
        }
        this.beforeMeasure(children, rowcol);
        // Reset the row/col definitions because the ones from last measure are irrelevant
        const resetCols = []; // keep track of which columns we've already reset
        // Objects that span multiple columns and
        const spanners = [];
        const nosize = [];
        // These hashes are used to tally the number of rows and columns that do not have a size
        const nosizeCols = { count: 0 };
        const nosizeRows = { count: 0 };
        let colleft = width;
        let rowleft = height;
        let defs = this._rowDefs;
        l = defs.length;
        for (let i = 0; i < l; i++) {
            const def = defs[i];
            if (def !== undefined)
                def.actual = 0;
        }
        defs = this._colDefs;
        l = defs.length;
        for (let i = 0; i < l; i++) {
            const def = defs[i];
            if (def !== undefined)
                def.actual = 0;
        }
        let lrow = rowcol.length; // number of rows
        let lcol = 0;
        for (let i = 0; i < lrow; i++) {
            if (!rowcol[i])
                continue;
            lcol = Math.max(lcol, rowcol[i].length); // column length in this row
        }
        // Go through each cell (first pass)
        let amt = 0.0;
        lrow = rowcol.length; // number of rows
        for (let i = 0; i < lrow; i++) {
            if (!rowcol[i])
                continue;
            lcol = rowcol[i].length; // column length in this row
            const rowHerald = this.getRowDefinition(i);
            rowHerald.measured = 0; // Reset rows (only on first pass)
            for (let j = 0; j < lcol; j++) {
                // foreach column j in row i...
                if (!rowcol[i][j])
                    continue;
                const colHerald = this.getColumnDefinition(j);
                if (resetCols[j] === undefined) { // make sure we only reset these once
                    colHerald.measured = 0;
                    resetCols[j] = true;
                }
                const cell = rowcol[i][j];
                const len = cell.length;
                for (let k = 0; k < len; k++) {
                    // foreach element in cell, measure
                    const child = cell[k];
                    // Skip children that span more than one row or column or do not have a set size
                    const spanner = (child.rowSpan > 1 || child.columnSpan > 1);
                    if (spanner) {
                        spanners.push(child);
                        // We used to not measure spanners twice, but now we do
                        // The reason is that there may be a row whose size
                        // is dictated by an object with columnSpan 2+ and vice versa
                        // continue;
                    }
                    const marg = child.margin;
                    const margw = marg.right + marg.left;
                    const margh = marg.top + marg.bottom;
                    const stretch = this.getEffectiveTableStretch(child, rowHerald, colHerald);
                    const dsize = child.resizeObject.desiredSize;
                    const realwidth = !(isNaN(dsize.width));
                    const realheight = !(isNaN(dsize.height));
                    const realsize = realwidth && realheight;
                    if (!spanner && stretch !== go.GraphObject.None && !realsize) {
                        if (nosizeCols[j] === undefined && (stretch === go.GraphObject.Fill || stretch === go.GraphObject.Horizontal)) {
                            nosizeCols[j] = -1;
                            nosizeCols.count++;
                        }
                        if (nosizeRows[i] === undefined && (stretch === go.GraphObject.Fill || stretch === go.GraphObject.Vertical)) {
                            nosizeRows[i] = -1;
                            nosizeRows.count++;
                        }
                        nosize.push(child);
                    }
                    if (stretch !== go.GraphObject.None) {
                        const unrestrictedSize = new go.Size(NaN, NaN);
                        // if (stretch !== go.GraphObject.Horizontal) unrestrictedSize.height = rowHerald.minimum;
                        // if (stretch !== go.GraphObject.Vertical) unrestrictedSize.width = colHerald.minimum;
                        // ??? allow resizing during measure phase
                        child.resizeObject.desiredSize = unrestrictedSize;
                        child.ensureBounds();
                    }
                    const m = this.getLayoutBounds(child);
                    const mwidth = Math.max(m.width + margw, 0);
                    const mheight = Math.max(m.height + margh, 0);
                    //  Make sure the heralds have the right layout size
                    //    the row/column should use the largest measured size of any
                    //    GraphObject contained, constrained by mins and maxes
                    if (child.rowSpan === 1 && (realheight || stretch === go.GraphObject.None || stretch === go.GraphObject.Horizontal)) {
                        const def = this.getRowDefinition(i);
                        amt = Math.max(mheight - def.actual, 0);
                        if (amt > rowleft)
                            amt = rowleft;
                        def.measured = def.measured + amt;
                        def.actual = def.actual + amt;
                        rowleft = Math.max(rowleft - amt, 0);
                    }
                    if (child.columnSpan === 1 && (realwidth || stretch === go.GraphObject.None || stretch === go.GraphObject.Vertical)) {
                        const def = this.getColumnDefinition(j);
                        amt = Math.max(mwidth - def.actual, 0);
                        if (amt > colleft)
                            amt = colleft;
                        def.measured = def.measured + amt;
                        def.actual = def.actual + amt;
                        colleft = Math.max(colleft - amt, 0);
                    }
                } // end cell
            } // end col
        } // end row
        // For objects of no desired size we allocate what is left as we go,
        // or else what is already in the column
        let totalColWidth = 0.0;
        let totalRowHeight = 0.0;
        l = this.columnCount;
        for (let i = 0; i < l; i++) {
            if (this._colDefs[i] === undefined)
                continue;
            totalColWidth += this.getColumnDefinition(i).measured;
        }
        l = this.rowCount;
        for (let i = 0; i < l; i++) {
            if (this._rowDefs[i] === undefined)
                continue;
            totalRowHeight += this.getRowDefinition(i).measured;
        }
        colleft = Math.max(width - totalColWidth, 0);
        rowleft = Math.max(height - totalRowHeight, 0);
        const originalrowleft = rowleft;
        const originalcolleft = colleft;
        // Determine column sizes for the yet-to-be-sized columns
        l = nosize.length;
        for (let i = 0; i < l; i++) {
            const child = nosize[i];
            const rowHerald = this.getRowDefinition(child.row);
            const colHerald = this.getColumnDefinition(child.column);
            // We want to gather the largest difference between desired and expected col/row sizes
            const mb = this.getLayoutBounds(child);
            const marg = child.margin;
            const margw = marg.right + marg.left;
            const margh = marg.top + marg.bottom;
            if (colHerald.measured === 0 && nosizeCols[child.column] !== undefined) {
                nosizeCols[child.column] = Math.max(mb.width + margw, nosizeCols[child.column]);
            }
            else {
                nosizeCols[child.column] = null; // obey the column herald
            }
            if (rowHerald.measured === 0 && nosizeRows[child.row] !== undefined) {
                nosizeRows[child.row] = Math.max(mb.height + margh, nosizeRows[child.row]);
            }
            else {
                nosizeRows[child.row] = null; // obey the row herald
            }
        }
        // we now have the size that all these columns prefer to be
        // we also have the amount left over
        let desiredRowTotal = 0.0;
        let desiredColTotal = 0.0;
        for (const i in nosizeRows) {
            if (i !== 'count')
                desiredRowTotal += nosizeRows[i];
        }
        for (const i in nosizeCols) {
            if (i !== 'count')
                desiredColTotal += nosizeCols[i];
        }
        const allowedSize = new go.Size(); // used in stretch and span loops
        // Deal with objects that have a stretch
        for (let i = 0; i < l; i++) {
            const child = nosize[i];
            const rowHerald = this.getRowDefinition(child.row);
            const colHerald = this.getColumnDefinition(child.column);
            let w = 0.0;
            if (isFinite(colHerald.width)) {
                w = colHerald.width;
            }
            else {
                if (isFinite(colleft) && nosizeCols[child.column] !== null) {
                    if (desiredColTotal === 0)
                        w = colHerald.actual + colleft;
                    else
                        w = /*colHerald.actual +*/ ((nosizeCols[child.column] / desiredColTotal) * originalcolleft);
                }
                else {
                    // Only use colHerald.actual if it was nonzero before this loop
                    if (nosizeCols[child.column] !== null)
                        w = colleft;
                    else
                        w = colHerald.actual || colleft;
                    // w = nosizeCols[child.column] || colleft; // Older, less correct way
                }
                w = Math.max(0, w - colHerald.computeEffectiveSpacing());
            }
            let h = 0.0;
            if (isFinite(rowHerald.height)) {
                h = rowHerald.height;
            }
            else {
                if (isFinite(rowleft) && nosizeRows[child.row] !== null) {
                    if (desiredRowTotal === 0)
                        h = rowHerald.actual + rowleft;
                    else
                        h = /*rowHerald.actual +*/ ((nosizeRows[child.row] / desiredRowTotal) * originalrowleft);
                }
                else {
                    // Only use rowHerald.actual if it was nonzero before this loop
                    if (nosizeRows[child.row] !== null)
                        h = rowleft;
                    else
                        h = rowHerald.actual || rowleft;
                    // h = nosizeRows[child.row] || rowleft; // Older, less correct way
                }
                h = Math.max(0, h - rowHerald.computeEffectiveSpacing());
            }
            allowedSize.setTo(Math.max(colHerald.minimum, Math.min(w, colHerald.maximum)), Math.max(rowHerald.minimum, Math.min(h, rowHerald.maximum)));
            // Which way do we care about fill:
            const stretch = this.getEffectiveTableStretch(child, rowHerald, colHerald);
            // This used to set allowedSize height/width to Infinity,
            // but we can only set it to the current row/column space, plus rowleft/colleft values, at most.
            switch (stretch) {
                case go.GraphObject.Horizontal: // H stretch means it can be as large as its wants vertically
                    allowedSize.height = Math.max(allowedSize.height, rowHerald.actual + rowleft);
                    break;
                case go.GraphObject.Vertical: // vice versa
                    allowedSize.width = Math.max(allowedSize.width, colHerald.actual + colleft);
                    break;
            }
            const marg = child.margin;
            const margw = marg.right + marg.left;
            const margh = marg.top + marg.bottom;
            const m = this.getLayoutBounds(child);
            let mwidth = Math.max(m.width + margw, 0);
            let mheight = Math.max(m.height + margh, 0);
            if (isFinite(colleft))
                mwidth = Math.min(mwidth, allowedSize.width);
            if (isFinite(rowleft))
                mheight = Math.min(mheight, allowedSize.height);
            let oldAmount = 0.0;
            oldAmount = rowHerald.actual;
            rowHerald.actual = Math.max(rowHerald.actual, mheight);
            rowHerald.measured = Math.max(rowHerald.measured, mheight);
            amt = rowHerald.actual - oldAmount;
            rowleft = Math.max(rowleft - amt, 0);
            oldAmount = colHerald.actual;
            colHerald.actual = Math.max(colHerald.actual, mwidth);
            colHerald.measured = Math.max(colHerald.measured, mwidth);
            amt = colHerald.actual - oldAmount;
            colleft = Math.max(colleft - amt, 0);
        } // end no fixed size objects
        // Go through each object that spans multiple rows or columns
        const additionalSpan = new go.Size();
        const actualSizeRows = [];
        const actualSizeColumns = [];
        l = spanners.length;
        if (l !== 0) {
            // record the actual sizes of every row/column before measuring spanners
            // because they will change during the loop and we want to use their 'before' values
            for (let i = 0; i < lrow; i++) {
                if (!rowcol[i])
                    continue;
                lcol = rowcol[i].length; // column length in this row
                const rowHerald = this.getRowDefinition(i);
                actualSizeRows[i] = rowHerald.actual;
                for (let j = 0; j < lcol; j++) {
                    // foreach column j in row i...
                    if (!rowcol[i][j])
                        continue;
                    const colHerald = this.getColumnDefinition(j);
                    actualSizeColumns[j] = colHerald.actual;
                }
            }
        }
        for (let i = 0; i < l; i++) {
            const child = spanners[i];
            const rowHerald = this.getRowDefinition(child.row);
            const colHerald = this.getColumnDefinition(child.column);
            // If there's a set column width/height we don't care about the given width/height
            allowedSize.setTo(Math.max(colHerald.minimum, Math.min(width, colHerald.maximum)), Math.max(rowHerald.minimum, Math.min(height, rowHerald.maximum)));
            // If it is a spanner and has a fill:
            const stretch = this.getEffectiveTableStretch(child, rowHerald, colHerald);
            switch (stretch) {
                case go.GraphObject.Fill:
                    if (actualSizeColumns[colHerald.index] !== 0)
                        allowedSize.width = Math.min(allowedSize.width, actualSizeColumns[colHerald.index]);
                    if (actualSizeRows[rowHerald.index] !== 0)
                        allowedSize.height = Math.min(allowedSize.height, actualSizeRows[rowHerald.index]);
                    break;
                case go.GraphObject.Horizontal:
                    if (actualSizeColumns[colHerald.index] !== 0)
                        allowedSize.width = Math.min(allowedSize.width, actualSizeColumns[colHerald.index]);
                    break;
                case go.GraphObject.Vertical:
                    if (actualSizeRows[rowHerald.index] !== 0)
                        allowedSize.height = Math.min(allowedSize.height, actualSizeRows[rowHerald.index]);
                    break;
            }
            // If there's a set column width/height we don't care about any of the above:
            if (isFinite(colHerald.width))
                allowedSize.width = colHerald.width;
            if (isFinite(rowHerald.height))
                allowedSize.height = rowHerald.height;
            // take into account rowSpan and columnSpan
            let def = this.getRowDefinition(child.row);
            additionalSpan.setTo(0, 0);
            for (let n = 1; n < child.rowSpan; n++) {
                if (child.row + n >= this.rowCount)
                    break; // if the row exists at all
                def = this.getRowDefinition(child.row + n);
                amt = 0;
                if (stretch === go.GraphObject.Fill || stretch === go.GraphObject.Vertical) {
                    amt = Math.max(def.minimum, (actualSizeRows[child.row + n] === 0) ? def.maximum : Math.min(actualSizeRows[child.row + n], def.maximum));
                }
                else {
                    amt = Math.max(def.minimum, isNaN(def.height) ? def.maximum : Math.min(def.height, def.maximum));
                }
                additionalSpan.height += amt;
            }
            for (let n = 1; n < child.columnSpan; n++) {
                if (child.column + n >= this.columnCount)
                    break; // if the col exists at all
                def = this.getColumnDefinition(child.column + n);
                amt = 0;
                if (stretch === go.GraphObject.Fill || stretch === go.GraphObject.Horizontal) {
                    amt = Math.max(def.minimum, (actualSizeColumns[child.column + n] === 0) ? def.maximum : Math.min(actualSizeColumns[child.column + n], def.maximum));
                }
                else {
                    amt = Math.max(def.minimum, isNaN(def.width) ? def.maximum : Math.min(def.width, def.maximum));
                }
                additionalSpan.width += amt;
            }
            allowedSize.width += additionalSpan.width;
            allowedSize.height += additionalSpan.height;
            const marg = child.margin;
            const margw = marg.right + marg.left;
            const margh = marg.top + marg.bottom;
            const m = this.getLayoutBounds(child);
            const mwidth = Math.max(m.width + margw, 0);
            const mheight = Math.max(m.height + margh, 0);
            let totalRow = 0.0;
            for (let n = 0; n < child.rowSpan; n++) {
                if (child.row + n >= this.rowCount)
                    break; // if the row exists at all
                def = this.getRowDefinition(child.row + n);
                totalRow += def.total || 0;
            }
            // def is the last row definition
            if (totalRow < mheight) {
                let roomLeft = mheight - totalRow;
                while (roomLeft > 0) { // Add the extra to the first row that allows us to
                    const act = def.actual || 0;
                    if (isNaN(def.height) && def.maximum > act) {
                        def.actual = Math.min(def.maximum, act + roomLeft);
                        if (def.actual !== act)
                            roomLeft -= def.actual - act;
                    }
                    if (def.index - 1 === -1)
                        break;
                    def = this.getRowDefinition(def.index - 1);
                }
            }
            let totalCol = 0.0;
            for (let n = 0; n < child.columnSpan; n++) {
                if (child.column + n >= this.columnCount)
                    break; // if the col exists at all
                def = this.getColumnDefinition(child.column + n);
                totalCol += def.total || 0;
            }
            // def is the last col definition
            if (totalCol < mwidth) {
                let roomLeft = mwidth - totalCol;
                while (roomLeft > 0) { // Add the extra to the first row that allows us to
                    const act = def.actual || 0;
                    if (isNaN(def.width) && def.maximum > act) {
                        def.actual = Math.min(def.maximum, act + roomLeft);
                        if (def.actual !== act)
                            roomLeft -= def.actual - act;
                    }
                    if (def.index - 1 === -1)
                        break;
                    def = this.getColumnDefinition(def.index - 1);
                }
            }
        } // end spanning objects
        l = this.columnCount;
        for (let i = 0; i < l; i++) {
            if (this._colDefs[i] === undefined)
                continue;
            const def = this.getColumnDefinition(i);
            def.position = union.width;
            if (def.actual !== 0) {
                union.width += def.actual;
                union.width += def.computeEffectiveSpacing();
            }
        }
        l = this.rowCount;
        for (let i = 0; i < l; i++) {
            if (this._rowDefs[i] === undefined)
                continue;
            const def = this.getRowDefinition(i);
            def.position = union.height;
            if (def.actual !== 0) {
                union.height += def.actual;
                union.height += def.computeEffectiveSpacing();
            }
        }
        // save these for arrange (destroy them or not? Possibly needed for drawing spacers)
        return rowcol;
    } // end measureTable
    /**
     * @hidden @internal
     */
    arrangeTable(children, union, rowcol) {
        const l = children.length;
        const originx = this.arrangementOrigin.x;
        const originy = this.arrangementOrigin.y;
        let x = 0.0;
        let y = 0.0;
        const lrow = rowcol.length; // number of rows
        let lcol = 0;
        for (let i = 0; i < lrow; i++) {
            if (!rowcol[i])
                continue;
            lcol = Math.max(lcol, rowcol[i].length); // column length in this row
        }
        const additionalSpan = new go.Size();
        // Find cell space and arrange objects:
        for (let i = 0; i < lrow; i++) {
            if (!rowcol[i])
                continue;
            lcol = rowcol[i].length; // column length in this row
            const rowHerald = this.getRowDefinition(i);
            y = originy + rowHerald.position + rowHerald.computeEffectiveSpacingTop();
            for (let j = 0; j < lcol; j++) {
                // foreach column j in row i...
                if (!rowcol[i][j])
                    continue;
                const colHerald = this.getColumnDefinition(j);
                x = originx + colHerald.position + colHerald.computeEffectiveSpacingTop();
                const cell = rowcol[i][j];
                const len = cell.length;
                for (let k = 0; k < len; k++) {
                    // foreach element in cell
                    const child = cell[k];
                    // add to layoutWidth/Height any additional span
                    additionalSpan.setTo(0, 0);
                    for (let n = 1; n < child.rowSpan; n++) {
                        // if the row exists at all
                        if (i + n >= this.rowCount)
                            break;
                        const rh = this.getRowDefinition(i + n);
                        additionalSpan.height += rh.total;
                    }
                    for (let n = 1; n < child.columnSpan; n++) {
                        // if the col exists at all
                        if (j + n >= this.columnCount)
                            break;
                        const ch = this.getColumnDefinition(j + n);
                        additionalSpan.width += ch.total;
                    }
                    // Construct containing rect (cell):
                    // total width and height of the cell that an object could possibly be created in
                    const colwidth = colHerald.actual + additionalSpan.width;
                    const rowheight = rowHerald.actual + additionalSpan.height;
                    // construct a rect that represents the total cell size allowed for this object
                    const ar = new go.Rect();
                    ar.x = x;
                    ar.y = y;
                    ar.width = colwidth;
                    ar.height = rowheight;
                    // Also keep them for clip values
                    const cellx = x;
                    const celly = y;
                    let cellw = colwidth;
                    let cellh = rowheight;
                    // Ending rows/col might have actual spaces that are larger than the remaining space
                    // Modify them for clipping regions
                    if (x + colwidth > union.width)
                        cellw = Math.max(union.width - x, 0);
                    if (y + rowheight > union.height)
                        cellh = Math.max(union.height - y, 0);
                    // Construct alignment:
                    let align = child.alignment;
                    let alignx = 0.0;
                    let aligny = 0.0;
                    let alignoffsetX = 0.0;
                    let alignoffsetY = 0.0;
                    if (align.isDefault()) {
                        align = this.defaultAlignment;
                        if (!align.isSpot())
                            align = go.Spot.Center;
                        alignx = align.x;
                        aligny = align.y;
                        alignoffsetX = align.offsetX;
                        alignoffsetY = align.offsetY;
                        const ca = colHerald.alignment;
                        const ra = rowHerald.alignment;
                        if (ca.isSpot()) {
                            alignx = ca.x;
                            alignoffsetX = ca.offsetX;
                        }
                        if (ra.isSpot()) {
                            aligny = ra.y;
                            alignoffsetY = ra.offsetY;
                        }
                    }
                    else {
                        alignx = align.x;
                        aligny = align.y;
                        alignoffsetX = align.offsetX;
                        alignoffsetY = align.offsetY;
                    }
                    // same as if (!align.isSpot()) align = go.Spot.Center;
                    if (isNaN(alignx) || isNaN(aligny)) {
                        alignx = 0.5;
                        aligny = 0.5;
                        alignoffsetX = 0;
                        alignoffsetY = 0;
                    }
                    let width = 0.0;
                    let height = 0.0;
                    const marg = child.margin;
                    const margw = marg.left + marg.right;
                    const margh = marg.top + marg.bottom;
                    const stretch = this.getEffectiveTableStretch(child, rowHerald, colHerald);
                    if ( /* isNaN(child.resizeObject.desiredSize.width) && */(stretch === go.GraphObject.Fill || stretch === go.GraphObject.Horizontal)) {
                        width = Math.max(colwidth - margw, 0);
                    }
                    else {
                        width = this.getLayoutBounds(child).width;
                    }
                    if ( /* isNaN(child.resizeObject.desiredSize.height) && */(stretch === go.GraphObject.Fill || stretch === go.GraphObject.Vertical)) {
                        height = Math.max(rowheight - margh, 0);
                    }
                    else {
                        height = this.getLayoutBounds(child).height;
                    }
                    // min and max override any stretch values
                    const max = child.maxSize;
                    const min = child.minSize;
                    width = Math.min(max.width, width);
                    height = Math.min(max.height, height);
                    width = Math.max(min.width, width);
                    height = Math.max(min.height, height);
                    const widthmarg = width + margw;
                    const heightmarg = height + margh;
                    ar.x += (ar.width * alignx) - (widthmarg * alignx) + alignoffsetX + marg.left;
                    ar.y += (ar.height * aligny) - (heightmarg * aligny) + alignoffsetY + marg.top;
                    child.moveTo(ar.x, ar.y);
                    if (stretch !== go.GraphObject.None) {
                        child.resizeObject.desiredSize = new go.Size(width, height);
                    }
                } // end cell
            } // end col
        } // end row
    } // end arrangeTable
} // end TableLayout class
