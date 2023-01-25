/*
*  Copyright (C) 1998-2023 by Northwoods Software Corporation. All Rights Reserved.
*/

// These are the definitions for all of the predefined arrowheads.
// You do not need to load this file in order to use arrowheads.

// Typical custom definition:
//   go.Shape.defineArrowheadGeometry("Zigzag", "M0,4 L1,8 3,0 5,8 7,0 8,4");

// Typical usage in a link template:
//   myDiagram.linkTemplate =
//     $(go.Link,
//       $(go.Shape),
//       $(go.Shape, { toArrow: "Zigzag" })
//     );

import * as go from '../release/go.js';

go.Shape.defineArrowheadGeometry('Standard', 'F1 m 0,0 l 8,4 -8,4 2,-4 z');
go.Shape.defineArrowheadGeometry('Backward', 'F1 m 8,0 l -2,4 2,4 -8,-4 z');
go.Shape.defineArrowheadGeometry('Triangle', 'F1 m 0,0 l 8,4.62 -8,4.62 z');
go.Shape.defineArrowheadGeometry('BackwardTriangle', 'F1 m 8,4 l 0,4 -8,-4 8,-4 0,4 z');
go.Shape.defineArrowheadGeometry('Boomerang', 'F1 m 0,0 l 8,4 -8,4 4,-4 -4,-4 z');
go.Shape.defineArrowheadGeometry('BackwardBoomerang', 'F1 m 8,0 l -8,4 8,4 -4,-4 4,-4 z');
go.Shape.defineArrowheadGeometry('SidewaysV', 'm 0,0 l 8,4 -8,4 0,-1 6,-3 -6,-3 0,-1 z');
go.Shape.defineArrowheadGeometry('BackwardV', 'm 8,0 l -8,4 8,4 0,-1 -6,-3 6,-3 0,-1 z');

go.Shape.defineArrowheadGeometry('OpenTriangle', 'm 0,0 l 8,4 -8,4');
go.Shape.defineArrowheadGeometry('BackwardOpenTriangle', 'm 8,0 l -8,4 8,4');
go.Shape.defineArrowheadGeometry('OpenTriangleLine', 'm 0,0 l 8,4 -8,4 m 8.5,0 l 0,-8');
go.Shape.defineArrowheadGeometry('BackwardOpenTriangleLine', 'm 8,0 l  -8,4 8,4 m -8.5,0 l 0,-8');

go.Shape.defineArrowheadGeometry('OpenTriangleTop', 'm 0,0 l 8,4 m 0,4');
go.Shape.defineArrowheadGeometry('BackwardOpenTriangleTop', 'm 8,0 l -8,4 m 0,4');
go.Shape.defineArrowheadGeometry('OpenTriangleBottom', 'm 0,8 l 8,-4');
go.Shape.defineArrowheadGeometry('BackwardOpenTriangleBottom', 'm 0,4 l 8,4');

go.Shape.defineArrowheadGeometry('HalfTriangleTop', 'F1 m 0,0 l 0,4 8,0 z m 0,8');
go.Shape.defineArrowheadGeometry('BackwardHalfTriangleTop', 'F1 m 8,0 l 0,4 -8,0 z m 0,8');
go.Shape.defineArrowheadGeometry('HalfTriangleBottom', 'F1 m 0,4 l 0,4 8,-4 z');
go.Shape.defineArrowheadGeometry('BackwardHalfTriangleBottom', 'F1 m 8,4 l 0,4 -8,-4 z');

go.Shape.defineArrowheadGeometry('ForwardSemiCircle', 'm 4,0 b 270 180 0 4 4');
go.Shape.defineArrowheadGeometry('BackwardSemiCircle', 'm 4,8 b 90 180 0 -4 4');

go.Shape.defineArrowheadGeometry('Feather', 'm 0,0 l 3,4 -3,4');
go.Shape.defineArrowheadGeometry('BackwardFeather', 'm 3,0 l -3,4 3,4');
go.Shape.defineArrowheadGeometry('DoubleFeathers', 'm 0,0 l 3,4 -3,4 m 3,-8 l 3,4 -3,4');
go.Shape.defineArrowheadGeometry('BackwardDoubleFeathers', 'm 3,0 l -3,4 3,4 m 3,-8 l -3,4 3,4');
go.Shape.defineArrowheadGeometry('TripleFeathers', 'm 0,0 l 3,4 -3,4 m 3,-8 l 3,4 -3,4 m 3,-8 l 3,4 -3,4');
go.Shape.defineArrowheadGeometry('BackwardTripleFeathers', 'm 3,0 l -3,4 3,4 m 3,-8 l -3,4 3,4 m 3,-8 l -3,4 3,4');

go.Shape.defineArrowheadGeometry('ForwardSlash', 'm 0,8 l 5,-8');
go.Shape.defineArrowheadGeometry('BackSlash', 'm 0,0 l 5,8');
go.Shape.defineArrowheadGeometry('DoubleForwardSlash', 'm 0,8 l 4,-8 m -2,8 l 4,-8');
go.Shape.defineArrowheadGeometry('DoubleBackSlash', 'm 0,0 l 4,8 m -2,-8 l 4,8');
go.Shape.defineArrowheadGeometry('TripleForwardSlash', 'm 0,8 l 4,-8 m -2,8 l 4,-8 m -2,8 l 4,-8');
go.Shape.defineArrowheadGeometry('TripleBackSlash', 'm 0,0 l 4,8 m -2,-8 l 4,8 m -2,-8 l 4,8');

go.Shape.defineArrowheadGeometry('Fork', 'm 0,4 l 8,0 m -8,0 l 8,-4 m -8,4 l 8,4');
go.Shape.defineArrowheadGeometry('BackwardFork', 'm 8,4 l -8,0 m 8,0 l -8,-4 m 8,4 l -8,4');
go.Shape.defineArrowheadGeometry('LineFork', 'm 0,0 l 0,8 m 0,-4 l 8,0 m -8,0 l 8,-4 m -8,4 l 8,4');
go.Shape.defineArrowheadGeometry('BackwardLineFork', 'm 8,4 l -8,0 m 8,0 l -8,-4 m 8,4 l -8,4 m 8,-8 l 0,8');
go.Shape.defineArrowheadGeometry('CircleFork', 'F1 m 6,4 b 0 360 -3 0 3 z m 0,0 l 6,0 m -6,0 l 6,-4 m -6,4 l 6,4');
go.Shape.defineArrowheadGeometry('BackwardCircleFork', 'F1 m 0,4 l 6,0 m -6,-4 l 6,4 m -6,4 l 6,-4 m 6,0 b 0 360 -3 0 3');
go.Shape.defineArrowheadGeometry('CircleLineFork', 'F1 m 6,4 b 0 360 -3 0 3 z m 1,-4 l 0,8 m 0,-4 l 6,0 m -6,0 l 6,-4 m -6,4 l 6,4');
go.Shape.defineArrowheadGeometry('BackwardCircleLineFork', 'F1 m 0,4 l 6,0 m -6,-4 l 6,4 m -6,4 l 6,-4 m 0,-4 l 0,8 m 7,-4 b 0 360 -3 0 3');

go.Shape.defineArrowheadGeometry('Circle', 'F1 m 8,4 b 0 360 -4 0 4 z');
go.Shape.defineArrowheadGeometry('Block', 'F1 m 0,0 l 0,8 8,0 0,-8 z');
go.Shape.defineArrowheadGeometry('StretchedDiamond', 'F1 m 0,3 l 5,-3 5,3 -5,3 -5,-3 z');
go.Shape.defineArrowheadGeometry('Diamond', 'F1 m 0,4 l 4,-4 4,4 -4,4 -4,-4 z');
go.Shape.defineArrowheadGeometry('Chevron', 'F1 m 0,0 l 5,0 3,4 -3,4 -5,0 3,-4 -3,-4 z');
go.Shape.defineArrowheadGeometry('StretchedChevron', 'F1 m 0,0 l 8,0 3,4 -3,4 -8,0 3,-4 -3,-4 z');

go.Shape.defineArrowheadGeometry('NormalArrow', 'F1 m 0,2 l 4,0 0,-2 4,4 -4,4 0,-2 -4,0 z');
go.Shape.defineArrowheadGeometry('X', 'm 0,0 l 8,8 m 0,-8 l -8,8');
go.Shape.defineArrowheadGeometry('TailedNormalArrow', 'F1 m 0,0 l 2,0 1,2 3,0 0,-2 2,4 -2,4 0,-2 -3,0 -1,2 -2,0 1,-4 -1,-4 z');
go.Shape.defineArrowheadGeometry('DoubleTriangle', 'F1 m 0,0 l 4,4 -4,4 0,-8 z  m 4,0 l 4,4 -4,4 0,-8 z');
go.Shape.defineArrowheadGeometry('BigEndArrow', 'F1 m 0,0 l 5,2 0,-2 3,4 -3,4 0,-2 -5,2 0,-8 z');
go.Shape.defineArrowheadGeometry('ConcaveTailArrow', 'F1 m 0,2 h 4 v -2 l 4,4 -4,4 v -2 h -4 l 2,-2 -2,-2 z');
go.Shape.defineArrowheadGeometry('RoundedTriangle', 'F1 m 0,1 a 1,1 0 0 1 1,-1 l 7,3 a 0.5,1 0 0 1 0,2 l -7,3 a 1,1 0 0 1 -1,-1 l 0,-6 z');
go.Shape.defineArrowheadGeometry('SimpleArrow', 'F1 m 1,2 l -1,-2 2,0 1,2 -1,2 -2,0 1,-2 5,0 0,-2 2,2 -2,2 0,-2 z');
go.Shape.defineArrowheadGeometry('AccelerationArrow', 'F1 m 0,0 l 0,8 0.2,0 0,-8 -0.2,0 z m 2,0 l 0,8 1,0 0,-8 -1,0 z m 3,0 l 2,0 2,4 -2,4 -2,0 0,-8 z');
go.Shape.defineArrowheadGeometry('BoxArrow', 'F1 m 0,0 l 4,0 0,2 2,0 0,-2 2,4 -2,4 0,-2 -2,0 0,2 -4,0 0,-8 z');
go.Shape.defineArrowheadGeometry('TriangleLine', 'F1 m 8,4 l -8,-4 0,8 8,-4 z m 0.5,4 l 0,-8');

go.Shape.defineArrowheadGeometry('CircleEndedArrow', 'F1 m 10,4 l -2,-3 0,2 -2,0 0,2 2,0 0,2 2,-3 z m -4,0 b 0 360 -3 0 3 z');

go.Shape.defineArrowheadGeometry('DynamicWidthArrow', 'F1 m 0,3 l 2,0 2,-1 2,-2 2,4 -2,4 -2,-2 -2,-1 -2,0 0,-2 z');
go.Shape.defineArrowheadGeometry('EquilibriumArrow', 'm 0,3 l 8,0 -3,-3 m 3,5 l -8,0 3,3');
go.Shape.defineArrowheadGeometry('FastForward', 'F1 m 0,0 l 3.5,4 0,-4 3.5,4 0,-4 1,0 0,8 -1,0 0,-4 -3.5,4 0,-4 -3.5,4 0,-8 z');
go.Shape.defineArrowheadGeometry('Kite', 'F1 m 0,4 l 2,-4 6,4 -6,4 -2,-4 z');
go.Shape.defineArrowheadGeometry('HalfArrowTop', 'F1 m 0,0 l 4,4 4,0 -8,-4 z m 0,8');
go.Shape.defineArrowheadGeometry('HalfArrowBottom', 'F1 m 0,8 l 4,-4 4,0 -8,4 z');
go.Shape.defineArrowheadGeometry('OpposingDirectionDoubleArrow', 'F1 m 0,4 l 2,-4 0,2 4,0 0,-2 2,4 -2,4 0,-2 -4,0 0,2 -2,-4 z');
go.Shape.defineArrowheadGeometry('PartialDoubleTriangle', 'F1 m 0,0 4,3 0,-3 4,4 -4,4 0,-3 -4,3 0,-8 z');
go.Shape.defineArrowheadGeometry('LineCircle', 'F1 m 0,0 l 0,8 m 7 -4 b 0 360 -3 0 3 z');
go.Shape.defineArrowheadGeometry('DoubleLineCircle', 'F1 m 0,0 l 0,8 m 2,-8 l 0,8 m 7 -4 b 0 360 -3 0 3 z');
go.Shape.defineArrowheadGeometry('TripleLineCircle', 'F1 m 0,0 l 0,8 m 2,-8 l 0,8 m 2,-8 l 0,8 m 7 -4 b 0 360 -3 0 3 z');
go.Shape.defineArrowheadGeometry('CircleLine', 'F1 m 6 4 b 0 360 -3 0 3 z m 1,-4 l 0,8');
go.Shape.defineArrowheadGeometry('DiamondCircle', 'F1 m 8,4 l -4,4 -4,-4 4,-4 4,4 m 8,0 b 0 360 -4 0 4 z');
go.Shape.defineArrowheadGeometry('PlusCircle', 'F1 m 8,4 b 0 360 -4 0 4 l -8 0 z m -4 -4 l 0 8');
go.Shape.defineArrowheadGeometry('OpenRightTriangleTop', 'm 8,0 l 0,4 -8,0 m 0,4');
go.Shape.defineArrowheadGeometry('OpenRightTriangleBottom', 'm 8,8 l 0,-4 -8,0');
go.Shape.defineArrowheadGeometry('Line', 'm 0,0 l 0,8');
go.Shape.defineArrowheadGeometry('DoubleLine', 'm 0,0 l 0,8 m 2,0 l 0,-8');
go.Shape.defineArrowheadGeometry('TripleLine', 'm 0,0 l 0,8 m 2,0 l 0,-8 m 2,0 l 0,8');
go.Shape.defineArrowheadGeometry('PentagonArrow', 'F1 m 8,4 l -4,-4 -4,0 0,8 4,0 4,-4 z');
