'use strict';
/*
*  Copyright (C) 1998-2022 by Northwoods Software Corporation. All Rights Reserved.
*/

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
 * @constructor
 * @class
 * @param {Diagram} diagram the Diagram which the slider zooms in/out
 * @param {Object} options the options for the slider
 */
function ZoomSlider(diagram, options) {
  this._diagram = diagram;
  this._initialScale = diagram.scale;
  this._diagramDiv = diagram.div;
  this._sliderDiv = null;

  // Options defaults:
  this._size = 125;
  this._buttonSize = 25;
  this._alignment = go.Spot.BottomRight;
  this._alignmentFocus = go.Spot.BottomRight;
  this._orientation = 'vertical';
  this._opacity = .75;

  // Set properties based on options
  if (options !== undefined) {
    if (options['size'] !== undefined) this._size = options['size'];
    if (options['buttonSize'] !== undefined) this._buttonSize = options['buttonSize'];
    if (options['alignment'] !== undefined) this._alignment = options['alignment'];
    if (options['alignmentFocus'] !== undefined) this._alignmentFocus = options['alignmentFocus'];
    if (options['orientation'] !== undefined) this._orientation = options['orientation'];
    if (options['opacity'] !== undefined) this._opacity = options['opacity'];
  }

  // Prepare change listeners
  var self = this;
  this.updateOnViewportBoundsChanged = function (e) { self.scaleToValue(); };

  this.init();
}

// Public properties

/**
 * This read-only property returns the diagram for which the slider is handling zoom.
 * @name ZoomSlider#diagram

 * @return {Diagram}
 */
Object.defineProperty(ZoomSlider.prototype, 'diagram', {
  get: function() { return this._diagram; }
});

/**
 * Gets or sets the overall length, in pixels, that the slider will occupy.
 * The default value is 125.
 * @name ZoomSlider#size

 * @return {number}
 */
Object.defineProperty(ZoomSlider.prototype, 'size', {
  get: function() { return this._size; },
  set: function(val) {
    var old = this._size;
    if (old !== val) {
      this._size = val;
      this.resize();
    }
  }
});

/**
 * Gets or sets the height/width of the buttons at each end of the slider.
 * The default value is 25.
 * @name ZoomSlider#buttonSize

 * @return {number}
 */
Object.defineProperty(ZoomSlider.prototype, 'buttonSize', {
  get: function() { return this._buttonSize; },
  set: function(val) {
    var old = this._buttonSize;
    if (old !== val) {
      this._buttonSize = val;
      this.resize();
    }
  }
});

/**
 * Gets or sets the alignment Spot of this slider to determine where it should be placed relative to the diagram.
 * The default value is Spot.BottomRight.
 * @name ZoomSlider#alignment

 * @return {Spot}
 */
Object.defineProperty(ZoomSlider.prototype, 'alignment', {
  get: function() { return this._alignment; },
  set: function(val) {
    var old = this._alignment;
    if (old !== val) {
      this._alignment = val;
      this.realign();
    }
  }
});

/**
 * Gets or sets the Spot on this slider to be used as the alignment point when placing it relative to the diagram.
 * The default value is Spot.BottomRight.
 * @name ZoomSlider#alignmentFocus

 * @return {Spot}
 */
Object.defineProperty(ZoomSlider.prototype, 'alignmentFocus', {
  get: function() { return this._alignmentFocus; },
  set: function(val) {
    var old = this._alignmentFocus;
    if (old !== val) {
      this._alignmentFocus = val;
      this.realign();
    }
  }
});

/**
 * Gets or sets whether the slider is oriented vertically or horizontally.
 * Must be either 'horizontal' or 'vertical' and is case-sensitive.
 * The default value is `'vertical'`.
 * @name ZoomSlider#orientation

 * @return {string}
 */
Object.defineProperty(ZoomSlider.prototype, 'orientation', {
  get: function() { return this._orientation; },
  set: function(val) {
    if (val !== 'horizontal' && val !== 'vertical') {
      throw new Error('Orientation must be "horizontal" or "vertical"');
    }
    var old = this._orientation;
    if (old !== val) {
      this._orientation = val;
      this.resize(true);
    }
  }
});

/**
 * Gets or sets the opacity of the slider.
 * The default value is 0.75.
 * @name ZoomSlider#opacity

 * @return {Spot}
 */
Object.defineProperty(ZoomSlider.prototype, 'opacity', {
  get: function() { return this._opacity; },
  set: function(val) {
    var old = this._opacity;
    if (old !== val) {
      this._opacity = val;
      this._sliderDiv.style.opacity = val;
    }
  }
});

/**
 * @ignore
 * Initialize the slider.
 * @this {ZoomSlider}
 */
ZoomSlider.prototype.init = function() {
  // Sets up the slider div and inner div's basic attributes and ids
  this.sliderDivSetup();
  this.resize(true);

  // Set up the runtime code
  this.sliderListenerSetup();
};

/**
 * @ignore
 * Create the necessary divs for the slider and add the slider as a sibling of the diagram.
 * @this {ZoomSlider}
 */
ZoomSlider.prototype.sliderDivSetup = function() {
  this._sliderDiv = document.createElement('div');
  this._sliderDiv.className = 'zoomSlider';

  // Initialize buttons and range input
  var zoomOutBtn = document.createElement('button');
  this.zoomSliderOut = zoomOutBtn;
  zoomOutBtn.className = 'zoomButton';
  zoomOutBtn.innerHTML = '-';
  this._sliderDiv.appendChild(zoomOutBtn);

  var zoomRangeContainer = document.createElement('div');
  this.zoomSliderRangeCtn = zoomRangeContainer;
  zoomRangeContainer.className = 'zoomRangeContainer';
  this._sliderDiv.appendChild(zoomRangeContainer);

  var zoomRangeInput = document.createElement('input');
  this.zoomSliderRange = zoomRangeInput;
  zoomRangeInput.className = 'zoomRangeInput';
  zoomRangeInput.type = 'range';
  zoomRangeInput.min = -50;
  zoomRangeInput.max = 100;
  zoomRangeContainer.appendChild(zoomRangeInput);

  var zoomInBtn = document.createElement('button');
  this.zoomSliderIn = zoomInBtn;
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
 * Add a diagram listener
 * @this {ZoomSlider}
 */
ZoomSlider.prototype.sliderListenerSetup = function() {
  var zoomOutBtn = this.zoomSliderOut;
  var zoomInBtn = this.zoomSliderIn;
  var zoomRangeInput = this.zoomSliderRange;

  if (zoomOutBtn === null || zoomInBtn === null || zoomRangeInput === null) return;

  // Set up diagram listener so the slider can be kept in sync with the diagram's scale
  this.diagram.addDiagramListener('ViewportBoundsChanged', this.updateOnViewportBoundsChanged);

  // Set up event handlers for buttons and input range slider
  var self = this;
  zoomOutBtn.onclick = function() {
    zoomRangeInput.stepDown();
    self.valueToScale();
  };

  zoomInBtn.onclick = function() {
    zoomRangeInput.stepUp();
    self.valueToScale();
  };

  var valChanged = function() {
    self.valueToScale();
  };
  zoomRangeInput.oninput = valChanged;
  zoomRangeInput.onchange = valChanged;
};

/**
 * @ignore
 * Resize the slider.
 * @this {ZoomSlider}
 * @param {boolean} reorient whether or not to reorient the slider/buttons
 */
ZoomSlider.prototype.resize = function(reorient) {
  var sliderWidth = 0;
  var sliderHeight = 0;

  var zoomOutBtn = this.zoomSliderOut;
  var zoomInBtn = this.zoomSliderIn;
  var zoomRangeContainer = this.zoomSliderRangeCtn;
  var zoomRangeInput = this.zoomSliderRange;

  if (this._sliderDiv === null || zoomOutBtn === null || zoomInBtn === null ||
    zoomRangeContainer === null || zoomRangeInput === null) return;

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
    zoomRangeInput.style.transformOrigin = null;

    zoomInBtn.style.width = sliderHeight + 'px';
    zoomInBtn.style.height = sliderHeight + 'px';
  } else {
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
}

/**
 * @ignore
 * Reorient the slider, changing the transform and the order of the buttons within the div.
 * @this {ZoomSlider}
 */
ZoomSlider.prototype.reorient = function() {
  var zoomOutBtn = this.zoomSliderOut;
  var zoomInBtn = this.zoomSliderIn;
  var zoomRangeInput = this.zoomSliderRange;

  if (this._sliderDiv === null || zoomOutBtn === null || zoomInBtn === null || zoomRangeInput === null) return;

  // Need to set the transform of the range input and move the buttons to the correct sides
  if (this.orientation === 'horizontal') {
    zoomRangeInput.style.transform = null;
    this._sliderDiv.insertBefore(zoomOutBtn, this._sliderDiv.firstChild);
    this._sliderDiv.appendChild(zoomInBtn);
  } else {
    zoomRangeInput.style.transform = 'rotate(-90deg)';
    this._sliderDiv.insertBefore(zoomInBtn, this._sliderDiv.firstChild);
    this._sliderDiv.appendChild(zoomOutBtn);
  }
}

/**
 * @ignore
 * Realigns to slider relative to the diagram.
 * @this {ZoomSlider}
 */
ZoomSlider.prototype.realign = function() {
  if (this._diagramDiv === null || this._sliderDiv === null) return;

  var sliderWidth = 0;
  var sliderHeight = 0;
  if (this.orientation === 'horizontal') {
    sliderWidth = this.size;
    sliderHeight = this.buttonSize;
  } else {
    sliderHeight = this.size;
    sliderWidth = this.buttonSize;
  }

  // Finds the diagram and diagram's parent in the page
  var diagramParent = this._diagramDiv.parentElement;
  var diagramLoc = this._diagramDiv.getBoundingClientRect();
  if (diagramParent !== null) {
    var parentLoc = diagramParent.getBoundingClientRect();

    var top = diagramLoc.top - parentLoc.top +
      this.alignment.y * this._diagramDiv.clientHeight + this.alignment.offsetY -
      this.alignmentFocus.y * sliderHeight + this.alignmentFocus.offsetY;

    var left = diagramLoc.left - parentLoc.left +
      this.alignment.x * this._diagramDiv.clientWidth + this.alignment.offsetX -
      this.alignmentFocus.x * sliderWidth + this.alignmentFocus.offsetX;

    this._sliderDiv.style.top = top + 'px';
    this._sliderDiv.style.left = left + 'px';
  }
}

/**
 * @ignore
 * Update the value of the slider input to match the diagram's scale.
 * @this {ZoomSlider}
 */
ZoomSlider.prototype.scaleToValue = function() {
  var slider = this.zoomSliderRange;
  var diagram = this.diagram;
  var A = this._initialScale;
  var B = diagram.commandHandler.zoomFactor;
  var y1 = diagram.scale;
  slider.value = Math.round(Math.log(y1/A) / Math.log(B)).toString();
}

/**
 * @ignore
 * Update the diagram's scale to match the value of the slider input.
 * @this {ZoomSlider}
 */
ZoomSlider.prototype.valueToScale = function() {
  var slider = this.zoomSliderRange;
  var diagram = this.diagram;
  var x = parseFloat(slider.value);
  var A = this._initialScale;
  var B = diagram.commandHandler.zoomFactor;
  diagram.scale = A * Math.pow(B, x);
}

/**
 * Remove the slider from the page.
 * @this {ZoomSlider}
 */
ZoomSlider.prototype.remove = function() {
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
