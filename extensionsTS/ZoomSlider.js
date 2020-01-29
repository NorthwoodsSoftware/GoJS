/*
*  Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved.
*/
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    * This is an extension and not part of the main GoJS library.
    * Note that the API for this class may change with any version, even point releases.
    * If you intend to use an extension in production, you should copy the code to your own source directory.
    * Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
    * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
    */
    var go = require("../release/go.js");
    /**
     * This class implements a zoom slider for GoJS diagrams.
     * The constructor takes two arguments:
     *   - `diagram` ***Diagram*** a reference to a GoJS Diagram
     *   - `options` ***Object*** an optional JS Object describing options for the slider
     *
     * Options:
     *   - `alignment` ***Spot*** see {@link #alignment}
     *   - `alignmentFocus` ***Spot*** see {@link #alignmentFocus}
     *   - `size` ***number*** see {@link #size}
     *   - `buttonSize` ***number*** see {@link #buttonSize}
     *   - `orientation` ***string*** see {@link #orientation}
     *   - `opacity` ***number*** see {@link #opacity}
     *
     * Example usage of ZoomSlider:
     * ```js
     * var zoomSlider = new ZoomSlider(myDiagram,
     *   {
     *     alignment: go.Spot.TopRight, alignmentFocus: go.Spot.TopRight,
     *     size: 150, buttonSize: 30, orientation: 'horizontal'
     *   });
     * ```
     *
     * This is the basic HTML Structure that the ZoomSlider creates as a sibling div of the diagram:
     * ```html
     * <div class="zoomSlider">
     *   <button id="zoomSliderOut" class="zoomButton">-</button>
     *   <div id="zoomSliderRangeCtn" class="zoomRangeContainer">
     *     <input id="zoomSliderRange" class="zoomRangeInput" type="range" min="-50" max="100">
     *   </div>
     *   <button id="zoomSliderIn" class="zoomButton">+</button>
     * </div>
     * ```
     *
     * <p class="box">
     * The diagram div's parent element should use `position: relative` to ensure the slider gets positioned properly.
     *
     * If you want to experiment with this extension, try the <a href="../../extensionsTS/ZoomSlider.html">Zoom Slider</a> sample.
     * @category Extension
     */
    var ZoomSlider = /** @class */ (function () {
        /**
         * Constructs a ZoomSlider and sets up properties based on the options provided.
         * Also sets up change listeners on the Diagram so the ZoomSlider stays up-to-date.
         * @param {Diagram} diagram a reference to a GoJS Diagram
         * @param {Object=} options an optional JS Object describing options for the slider
         */
        function ZoomSlider(diagram, options) {
            // Slider options defaults:
            this._size = 125;
            this._buttonSize = 25;
            this._alignment = go.Spot.BottomRight;
            this._alignmentFocus = go.Spot.BottomRight;
            this._orientation = 'vertical';
            this._opacity = .75;
            this._diagram = diagram;
            this._initialScale = diagram.scale;
            this._diagramDiv = diagram.div;
            this._sliderDiv = null;
            // Set properties based on options
            if (options !== undefined) {
                if (options.size !== undefined)
                    this._size = options.size;
                if (options.buttonSize !== undefined)
                    this._buttonSize = options.buttonSize;
                if (options.alignment !== undefined)
                    this._alignment = options.alignment;
                if (options.alignmentFocus !== undefined)
                    this._alignmentFocus = options.alignmentFocus;
                if (options.orientation !== undefined)
                    this._orientation = options.orientation;
                if (options.opacity !== undefined)
                    this._opacity = options.opacity;
            }
            // Prepare change listeners
            var self = this;
            this.updateOnViewportBoundsChanged = function (e) { self.scaleToValue(); };
            this.init();
        }
        Object.defineProperty(ZoomSlider.prototype, "diagram", {
            /**
             * This read-only property returns the diagram for which the slider is handling zoom.
             */
            get: function () { return this._diagram; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ZoomSlider.prototype, "size", {
            /**
             * Gets or sets the overall length, in pixels, that the slider will occupy.
             * The default value is 125.
             */
            get: function () { return this._size; },
            set: function (val) {
                var old = this._size;
                if (old !== val) {
                    this._size = val;
                    this.resize();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ZoomSlider.prototype, "buttonSize", {
            /**
             * Gets or sets the height/width of the buttons at each end of the slider.
             * The default value is 25.
             */
            get: function () { return this._buttonSize; },
            set: function (val) {
                var old = this._buttonSize;
                if (old !== val) {
                    this._buttonSize = val;
                    this.resize();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ZoomSlider.prototype, "alignment", {
            /**
             * Gets or sets the alignment Spot of this slider to determine where it should be placed relative to the diagram.
             * The default value is Spot.BottomRight.
             */
            get: function () { return this._alignment; },
            set: function (val) {
                var old = this._alignment;
                if (old !== val) {
                    this._alignment = val;
                    this.realign();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ZoomSlider.prototype, "alignmentFocus", {
            /**
             * Gets or sets the Spot on this slider to be used as the alignment point when placing it relative to the diagram.
             * The default value is Spot.BottomRight.
             */
            get: function () { return this._alignmentFocus; },
            set: function (val) {
                var old = this._alignmentFocus;
                if (old !== val) {
                    this._alignmentFocus = val;
                    this.realign();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ZoomSlider.prototype, "orientation", {
            /**
             * Gets or sets whether the slider is oriented vertically or horizontally.
             * Must be either "horizontal" or "vertical" and is case-sensitive.
             * The default value is `"vertical"`.
             */
            get: function () { return this._orientation; },
            set: function (val) {
                if (val !== 'horizontal' && val !== 'vertical') {
                    throw new Error('Orientation must be "horizontal" or "vertical"');
                }
                var old = this._orientation;
                if (old !== val) {
                    this._orientation = val;
                    this.resize(true);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ZoomSlider.prototype, "opacity", {
            /**
             * Gets or sets the opacity of the slider.
             * The default value is 0.75.
             */
            get: function () { return this._opacity; },
            set: function (val) {
                var old = this._opacity;
                if (old !== val) {
                    this._opacity = val;
                    if (this._sliderDiv !== null) {
                        this._sliderDiv.style.opacity = val.toString();
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @ignore
         * Initialize the slider.
         */
        ZoomSlider.prototype.init = function () {
            // Sets up the slider div and inner div's basic attributes and ids
            this.sliderDivSetup();
            this.resize(true);
            // Set up the runtime code
            this.sliderListenerSetup();
        };
        /**
         * @ignore
         * Create the necessary divs for the slider and add the slider as a sibling of the diagram.
         */
        ZoomSlider.prototype.sliderDivSetup = function () {
            this._sliderDiv = document.createElement('div');
            this._sliderDiv.className = 'zoomSlider';
            // Initialize buttons and range input
            var zoomOutBtn = document.createElement('button');
            zoomOutBtn.id = 'zoomSliderOut';
            zoomOutBtn.className = 'zoomButton';
            zoomOutBtn.innerHTML = '-';
            this._sliderDiv.appendChild(zoomOutBtn);
            var zoomRangeContainer = document.createElement('div');
            zoomRangeContainer.id = 'zoomSliderRangeCtn';
            zoomRangeContainer.className = 'zoomRangeContainer';
            this._sliderDiv.appendChild(zoomRangeContainer);
            var zoomRangeInput = document.createElement('input');
            zoomRangeInput.id = 'zoomSliderRange';
            zoomRangeInput.className = 'zoomRangeInput';
            zoomRangeInput.type = 'range';
            zoomRangeInput.min = '-50';
            zoomRangeInput.max = '100';
            zoomRangeContainer.appendChild(zoomRangeInput);
            var zoomInBtn = document.createElement('button');
            zoomInBtn.id = 'zoomSliderIn';
            zoomInBtn.className = 'zoomButton';
            zoomInBtn.innerHTML = '+';
            this._sliderDiv.appendChild(zoomInBtn);
            // Adds the slider as a sibling of the diagram
            // IMPORTANT: the diagram div's parent element should use position: relative
            if (this._diagramDiv !== null) {
                var diagramParent = this._diagramDiv.parentElement;
                if (diagramParent !== null) {
                    diagramParent.appendChild(this._sliderDiv);
                }
            }
        };
        /**
         * @ignore
         * Add listeners to the buttons and range input.
         * Add a diagram listener.
         */
        ZoomSlider.prototype.sliderListenerSetup = function () {
            var zoomOutBtn = document.getElementById('zoomSliderOut');
            var zoomInBtn = document.getElementById('zoomSliderIn');
            var zoomRangeInput = document.getElementById('zoomSliderRange');
            if (zoomOutBtn === null || zoomInBtn === null || zoomRangeInput === null)
                return;
            // Set up diagram listener so the slider can be kept in sync with the diagram's scale
            this.diagram.addDiagramListener('ViewportBoundsChanged', this.updateOnViewportBoundsChanged);
            // Set up event handlers for buttons and input range slider
            var self = this;
            zoomOutBtn.onclick = function () {
                zoomRangeInput.stepDown();
                self.valueToScale();
            };
            zoomInBtn.onclick = function () {
                zoomRangeInput.stepUp();
                self.valueToScale();
            };
            var valChanged = function () {
                self.valueToScale();
            };
            zoomRangeInput.oninput = valChanged;
            zoomRangeInput.onchange = valChanged;
        };
        /**
         * @ignore
         * Resize the slider.
         * @param {boolean=} reorient whether or not to reorient the slider/buttons
         */
        ZoomSlider.prototype.resize = function (reorient) {
            var sliderWidth = 0;
            var sliderHeight = 0;
            var zoomOutBtn = document.getElementById('zoomSliderOut');
            var zoomInBtn = document.getElementById('zoomSliderIn');
            var zoomRangeContainer = document.getElementById('zoomSliderRangeCtn');
            var zoomRangeInput = document.getElementById('zoomSliderRange');
            if (this._sliderDiv === null || zoomOutBtn === null || zoomInBtn === null ||
                zoomRangeContainer === null || zoomRangeInput === null)
                return;
            if (this.orientation === 'horizontal') {
                sliderWidth = this.size;
                sliderHeight = this.buttonSize;
                var rangeWidth = sliderWidth - sliderHeight * 2;
                zoomOutBtn.style.width = sliderHeight + 'px';
                zoomOutBtn.style.height = sliderHeight + 'px';
                zoomRangeContainer.style.width = rangeWidth + 'px';
                zoomRangeContainer.style.height = sliderHeight + 'px';
                zoomRangeInput.style.width = rangeWidth + 'px';
                zoomRangeInput.style.height = sliderHeight + 'px';
                zoomRangeInput.style.transformOrigin = '';
                zoomInBtn.style.width = sliderHeight + 'px';
                zoomInBtn.style.height = sliderHeight + 'px';
            }
            else {
                sliderHeight = this.size;
                sliderWidth = this.buttonSize;
                var rangeHeight = sliderHeight - sliderWidth * 2;
                zoomInBtn.style.width = sliderWidth + 'px';
                zoomInBtn.style.height = sliderWidth + 'px';
                zoomRangeContainer.style.width = sliderWidth + 'px';
                zoomRangeContainer.style.height = rangeHeight + 'px';
                zoomRangeInput.style.width = rangeHeight + 'px';
                zoomRangeInput.style.height = sliderWidth + 'px';
                zoomRangeInput.style.transformOrigin = rangeHeight / 2 + 'px ' + rangeHeight / 2 + 'px';
                zoomOutBtn.style.width = sliderWidth + 'px';
                zoomOutBtn.style.height = sliderWidth + 'px';
            }
            this._sliderDiv.style.width = sliderWidth + 'px';
            this._sliderDiv.style.height = sliderHeight + 'px';
            // Reorient the slider, if necessary
            if (reorient) {
                this.reorient();
            }
            // Realign based on new size
            this.realign();
        };
        /**
         * @ignore
         * Reorient the slider, changing the transform and the order of the buttons within the div.
         */
        ZoomSlider.prototype.reorient = function () {
            var zoomOutBtn = document.getElementById('zoomSliderOut');
            var zoomInBtn = document.getElementById('zoomSliderIn');
            var zoomRangeInput = document.getElementById('zoomSliderRange');
            if (this._sliderDiv === null || zoomOutBtn === null || zoomInBtn === null || zoomRangeInput === null)
                return;
            // Need to set the transform of the range input and move the buttons to the correct sides
            if (this.orientation === 'horizontal') {
                zoomRangeInput.style.transform = '';
                this._sliderDiv.insertBefore(zoomOutBtn, this._sliderDiv.firstChild);
                this._sliderDiv.appendChild(zoomInBtn);
            }
            else {
                zoomRangeInput.style.transform = 'rotate(-90deg)';
                this._sliderDiv.insertBefore(zoomInBtn, this._sliderDiv.firstChild);
                this._sliderDiv.appendChild(zoomOutBtn);
            }
        };
        /**
         * @ignore
         * Realigns to slider relative to the diagram.
         */
        ZoomSlider.prototype.realign = function () {
            if (this._diagramDiv === null || this._sliderDiv === null)
                return;
            var sliderWidth = 0;
            var sliderHeight = 0;
            if (this.orientation === 'horizontal') {
                sliderWidth = this.size;
                sliderHeight = this.buttonSize;
            }
            else {
                sliderHeight = this.size;
                sliderWidth = this.buttonSize;
            }
            // Finds the diagram and diagram's parent in the page
            var diagramParent = this._diagramDiv.parentElement;
            var diagramLoc = this._diagramDiv.getBoundingClientRect();
            if (diagramParent !== null) {
                var parentLoc = diagramParent.getBoundingClientRect();
                var top_1 = diagramLoc.top - parentLoc.top +
                    this.alignment.y * this._diagramDiv.clientHeight + this.alignment.offsetY -
                    this.alignmentFocus.y * sliderHeight + this.alignmentFocus.offsetY;
                var left = diagramLoc.left - parentLoc.left +
                    this.alignment.x * this._diagramDiv.clientWidth + this.alignment.offsetX -
                    this.alignmentFocus.x * sliderWidth + this.alignmentFocus.offsetX;
                this._sliderDiv.style.top = top_1 + 'px';
                this._sliderDiv.style.left = left + 'px';
            }
        };
        /**
         * @ignore
         * Update the value of the slider input to match the diagram's scale.
         */
        ZoomSlider.prototype.scaleToValue = function () {
            var slider = document.getElementById('zoomSliderRange');
            var diagram = this.diagram;
            var A = this._initialScale;
            var B = diagram.commandHandler.zoomFactor;
            var y1 = diagram.scale;
            slider.value = Math.round(Math.log(y1 / A) / Math.log(B)).toString();
        };
        /**
         * @ignore
         * Update the diagram's scale to match the value of the slider input.
         */
        ZoomSlider.prototype.valueToScale = function () {
            var slider = document.getElementById('zoomSliderRange');
            var diagram = this.diagram;
            var x = parseFloat(slider.value);
            var A = this._initialScale;
            var B = diagram.commandHandler.zoomFactor;
            diagram.scale = A * Math.pow(B, x);
        };
        /**
         * Remove the slider from the page.
         */
        ZoomSlider.prototype.remove = function () {
            // Remove the listener attached to diagram
            this.diagram.removeDiagramListener('ViewportBoundsChanged', this.updateOnViewportBoundsChanged);
            if (this._sliderDiv !== null) {
                this._sliderDiv.innerHTML = '';
                if (this._sliderDiv.parentElement) {
                    this._sliderDiv.parentElement.removeChild(this._sliderDiv);
                }
                this._sliderDiv = null;
            }
        };
        return ZoomSlider;
    }());
    exports.ZoomSlider = ZoomSlider;
});
