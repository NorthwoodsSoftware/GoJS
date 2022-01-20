/*
* Copyright (C) 1998-2022 by Northwoods Software Corporation
* All Rights Reserved.
*
* Floorplanner Constants
*/

// The diagram model data for the default floorplanner
DEFAULT_MODEL_DATA = {
	"class": "go.GraphLinksModel",
	"modelData": { "units": "centimeters", "unitsAbbreviation": "cm", "unitsConversionFactor": 2, "gridSize": 10, "wallThickness": 5, "preferences": { "showWallGuidelines": true, "showWallLengths": true, "showWallAngles": true, "showOnlySmallWallAngles": true, "showGrid": true, "gridSnap": true } },
	"nodeDataArray": [
		{ "key": "wall", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": -430, "y": 240 }, "endpoint": { "class": "go.Point", "x": -430, "y": -240 }, "thickness": 10, "isGroup": true, "notes": "" },
		{ "key": "wall3", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": -430, "y": -240 }, "endpoint": { "class": "go.Point", "x": 260, "y": -240 }, "thickness": 10, "isGroup": true, "notes": "" },
		{ "key": "wall4", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": 260, "y": -240 }, "endpoint": { "class": "go.Point", "x": 260, "y": 240 }, "thickness": 5, "isGroup": true, "notes": "" },
		{ "key": "wall5", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": 260, "y": 140 }, "endpoint": { "class": "go.Point", "x": 550, "y": 140 }, "thickness": 5, "isGroup": true, "notes": "" },
		{ "key": "wall6", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": 260, "y": 240 }, "endpoint": { "class": "go.Point", "x": 390, "y": 240 }, "thickness": 5, "isGroup": true, "notes": "" },
		{ "key": "wall7", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": 550, "y": 140 }, "endpoint": { "class": "go.Point", "x": 550, "y": 400 }, "thickness": 5, "isGroup": true, "notes": "" },
		{ "key": "wall8", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": 390, "y": 240 }, "endpoint": { "class": "go.Point", "x": 390, "y": 400 }, "thickness": 5, "isGroup": true, "notes": "" },
		{ "key": "wall9", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": 390, "y": 400 }, "endpoint": { "class": "go.Point", "x": 550, "y": 400 }, "thickness": 5, "isGroup": true, "notes": "" },
		{ "key": "staircase", "color": "#ffffff", "stroke": "#000000", "caption": "Staircase", "type": "Staircase", "geo": "F1 M0 0 L 0 100 250 100 250 0 0 0 M25 100 L 25 0 M 50 100 L 50 0 M 75 100 L 75 0 M 100 100 L 100 0 M 125 100 L 125 0 M 150 100 L 150 0 M 175 100 L 175 0 M 200 100 L 200 0 M 225 100 L 225 0", "width": 125, "height": 50, "notes": "", "loc": "430 330", "angle": 270 },
		{ "key": "staircase2", "color": "#ffffff", "stroke": "#000000", "caption": "Staircase", "type": "Staircase", "geo": "F1 M0 0 L 0 100 250 100 250 0 0 0 M25 100 L 25 0 M 50 100 L 50 0 M 75 100 L 75 0 M 100 100 L 100 0 M 125 100 L 125 0 M 150 100 L 150 0 M 175 100 L 175 0 M 200 100 L 200 0 M 225 100 L 225 0", "width": 125, "height": 50, "notes": "", "loc": "500 330", "angle": 270 },
		{ "key": "wall10", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": -230, "y": -130 }, "endpoint": { "class": "go.Point", "x": 70, "y": -130 }, "thickness": 5, "isGroup": true, "notes": "" },
		{ "key": "wall11", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": 70, "y": -130 }, "endpoint": { "class": "go.Point", "x": 130, "y": -70 }, "thickness": 5, "isGroup": true, "notes": "" },
		{ "key": "wall12", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": 130, "y": -70 }, "endpoint": { "class": "go.Point", "x": 130, "y": 40 }, "thickness": 5, "isGroup": true, "notes": "" },
		{ "key": "wall13", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": 130, "y": 40 }, "endpoint": { "class": "go.Point", "x": 70, "y": 100 }, "thickness": 5, "isGroup": true, "notes": "" },
		{ "key": "wall14", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": 70, "y": 100 }, "endpoint": { "class": "go.Point", "x": -230, "y": 100 }, "thickness": 5, "isGroup": true, "notes": "" },
		{ "key": "wall15", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": -230, "y": -130 }, "endpoint": { "class": "go.Point", "x": -290, "y": -70 }, "thickness": 5, "isGroup": true, "notes": "" },
		{ "key": "wall16", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": -290, "y": -70 }, "endpoint": { "class": "go.Point", "x": -290, "y": 40 }, "thickness": 5, "isGroup": true, "notes": "" },
		{ "key": "wall17", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": -290, "y": 40 }, "endpoint": { "class": "go.Point", "x": -230, "y": 100 }, "thickness": 5, "isGroup": true, "notes": "" },
		{ "key": "door", "category": "DoorNode", "color": "rgba(0, 0, 0, 0)", "caption": "Door", "type": "Door", "length": 56, "doorOpeningHeight": 5, "swing": "left", "notes": "", "loc": "260 188.20000076293945", "group": "wall4", "angle": 90 },
		{ "key": "diningTable", "color": "#704332", "stroke": "#8FBCCD", "caption": "Dining Table", "type": "Dining Table", "geo": "F1 M 0 0 L 0 100 200 100 200 0 0 0 M 25 0 L 25 -10 75 -10 75 0 M 125 0 L 125 -10 175 -10 175 0 M 200 25 L 210 25 210 75 200 75 M 125 100 L 125 110 L 175 110 L 175 100 M 25 100 L 25 110 75 110 75 100 M 0 75 -10 75 -10 25 0 25", "width": 205, "height": 70.5, "notes": "", "loc": "-80 -20" },
		{ "key": "wall18", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": 550, "y": -240 }, "endpoint": { "class": "go.Point", "x": 550, "y": 140 }, "thickness": 5, "isGroup": true, "notes": "" },
		{ "key": "wall19", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": 260, "y": -240 }, "endpoint": { "class": "go.Point", "x": 310, "y": -310 }, "thickness": 5, "isGroup": true, "notes": "" },
		{ "key": "wall20", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": 310, "y": -310 }, "endpoint": { "class": "go.Point", "x": 500, "y": -310 }, "thickness": 5, "isGroup": true, "notes": "" },
		{ "key": "wall21", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": 500, "y": -310 }, "endpoint": { "class": "go.Point", "x": 550, "y": -240 }, "thickness": 5, "isGroup": true, "notes": "" },
		{ "key": "door2", "category": "DoorNode", "color": "rgba(0, 0, 0, 0)", "caption": "Door", "type": "Door", "length": 40, "doorOpeningHeight": 5, "swing": "left", "notes": "", "loc": "-290 5.200000762939453", "group": "wall16", "angle": 90 },
		{ "category": "WindowNode", "key": "window", "color": "white", "caption": "Window", "type": "Window", "shape": "Rectangle", "height": 5, "length": 230, "notes": "", "loc": "-80.80000019073492 -130.00000000000006", "group": "wall10" },
		{ "category": "WindowNode", "key": "window2", "color": "white", "caption": "Window", "type": "Window", "shape": "Rectangle", "height": 5, "length": 230, "notes": "", "loc": "-80.80000019073492 100.00000000000003", "group": "wall14", "angle": 180 },
		{ "category": "WindowNode", "key": "window3", "color": "white", "caption": "Window", "type": "Window", "shape": "Rectangle", "height": 10, "length": 60, "notes": "", "loc": "-400 -240", "group": "wall3" },
		{ "category": "WindowNode", "key": "window32", "color": "white", "caption": "Window", "type": "Window", "shape": "Rectangle", "height": 10, "length": 60, "notes": "", "loc": "-234.80000019073486 -240", "group": "wall3" },
		{ "category": "WindowNode", "key": "window4", "color": "white", "caption": "Window", "type": "Window", "shape": "Rectangle", "height": 10, "length": 60, "notes": "", "loc": "-89.80000019073486 -240", "group": "wall3" },
		{ "category": "WindowNode", "key": "window5", "color": "white", "caption": "Window", "type": "Window", "shape": "Rectangle", "height": 10, "length": 60, "notes": "", "loc": "80.19999980926514 -240", "group": "wall3" },
		{ "category": "WindowNode", "key": "window6", "color": "white", "caption": "Window", "type": "Window", "shape": "Rectangle", "height": 10, "length": 60, "notes": "", "loc": "201.19999980926514 -240", "group": "wall3" },
		{ "category": "WindowNode", "key": "window7", "color": "white", "caption": "Window", "type": "Window", "shape": "Rectangle", "height": 10, "length": 175, "notes": "", "loc": "-430 -152.5", "group": "wall", "angle": 90 },
		{ "category": "WindowNode", "key": "window8", "color": "white", "caption": "Window", "type": "Window", "shape": "Rectangle", "height": 10, "length": 233, "notes": "", "loc": "-430 123.49999999999999", "group": "wall", "angle": 270 },
		{ "key": "wall32", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": -430, "y": 240 }, "endpoint": { "class": "go.Point", "x": 260, "y": 240 }, "thickness": 10, "isGroup": true, "notes": "" },
		{ "category": "WindowNode", "key": "window33", "color": "white", "caption": "Window", "type": "Window", "shape": "Rectangle", "height": 10, "length": 60, "notes": "", "loc": "-400 240", "group": "wall32" },
		{ "category": "WindowNode", "key": "window322", "color": "white", "caption": "Window", "type": "Window", "shape": "Rectangle", "height": 10, "length": 60, "notes": "", "loc": "-234.80000019073486 240", "group": "wall32" },
		{ "category": "WindowNode", "key": "window42", "color": "white", "caption": "Window", "type": "Window", "shape": "Rectangle", "height": 10, "length": 60, "notes": "", "loc": "-89.80000019073486 240", "group": "wall32" },
		{ "category": "WindowNode", "key": "window52", "color": "white", "caption": "Window", "type": "Window", "shape": "Rectangle", "height": 10, "length": 60, "notes": "", "loc": "80.19999980926514 240", "group": "wall32" },
		{ "category": "WindowNode", "key": "window62", "color": "white", "caption": "Window", "type": "Window", "shape": "Rectangle", "height": 10, "length": 60, "notes": "", "loc": "201.19999980926514 240", "group": "wall32" },
		{ "key": "wall2", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": 260, "y": 0 }, "endpoint": { "class": "go.Point", "x": 380, "y": 0 }, "thickness": 5, "isGroup": true, "notes": "" },
		{ "key": "door5", "category": "DoorNode", "color": "rgba(0, 0, 0, 0)", "caption": "Door", "type": "Door", "length": 40, "doorOpeningHeight": 5, "swing": "right", "notes": "", "loc": "-290 -34.79999923706055", "angle": 90, "group": "wall16" },
		{ "key": "door52", "category": "DoorNode", "color": "rgba(0, 0, 0, 0)", "caption": "Door", "type": "Door", "length": 40, "doorOpeningHeight": 5, "swing": "left", "notes": "", "loc": "130 -37.79999923706055", "angle": 270, "group": "wall12" },
		{ "key": "door22", "category": "DoorNode", "color": "rgba(0, 0, 0, 0)", "caption": "Door", "type": "Door", "length": 40, "doorOpeningHeight": 5, "swing": "right", "notes": "", "loc": "130 2.200000762939453", "group": "wall12", "angle": 270 },
		{ "key": "sink", "color": "#c0c0c0", "stroke": "#3F3F3F", "caption": "Sink", "type": "Sink", "geo": "F1 M0 0 L40 0 40 40 0 40 0 0z M5 7.5 L18.5 7.5 M 21.5 7.5 L35 7.5 35 35 5 35 5 7.5 M 15 21.25 A 5 5 180 1 0 15 21.24 M23 3.75 A 3 3 180 1 1 23 3.74 M21.5 6.25 L 21.5 12.5 18.5 12.5 18.5 6.25 M15 3.75 A 1 1 180 1 1 15 3.74 M 10 4.25 L 10 3.25 13 3.25 M 13 4.25 L 10 4.25 M27 3.75 A 1 1 180 1 1 27 3.74 M 26.85 3.25 L 30 3.25 30 4.25 M 26.85 4.25 L 30 4.25", "width": 27, "height": 27, "notes": "", "loc": "361.5 110", "angle": 180, "group": -52 },
		{ "key": "shower", "color": "#b9cece", "stroke": "#463131", "caption": "Shower/Tub", "type": "Shower/Tub", "geo": "F1 M0 0 L40 0 40 60 0 60 0 0 M35 15 L35 55 5 55 5 15 Q5 5 20 5 Q35 5 35 15 M22.5 20 A2.5 2.5 180 1 1 22.5 19.99", "width": 57, "height": 109, "notes": "", "loc": "296 67", "group": -52 },
		{ "key": "toilet", "color": "#f7f9e3", "stroke": "#08061C", "caption": "Toilet", "type": "Toilet", "geo": "F1 M0 0 L25 0 25 10 0 10 0 0 M20 10 L20 15 5 15 5 10 20 10 M5 15 Q0 15 0 25 Q0 40 12.5 40 Q25 40 25 25 Q25 15 20 15", "width": 25, "height": 35, "notes": "", "loc": "350 30", "group": -52 },
		{ "key": "wall22", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": 380, "y": 0 }, "endpoint": { "class": "go.Point", "x": 380, "y": 140 }, "thickness": 5, "isGroup": true, "notes": "" },
		{ "key": "door3", "category": "DoorNode", "color": "rgba(0, 0, 0, 0)", "caption": "Door", "type": "Door", "length": 36, "doorOpeningHeight": 5, "swing": "left", "notes": "", "loc": "380 65.20000076293945", "group": "wall22", "angle": 270 },
		{ "key": "wall23", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": 430, "y": 0 }, "endpoint": { "class": "go.Point", "x": 550, "y": 0 }, "thickness": 5, "isGroup": true, "notes": "" },
		{ "key": "wall24", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": 430, "y": 0 }, "endpoint": { "class": "go.Point", "x": 430, "y": 140 }, "thickness": 5, "isGroup": true, "notes": "" },
		{ "isGroup": true, "key": -52, "caption": "Group", "notes": "" },
		{ "isGroup": true, "key": -53, "caption": "Group", "notes": "" },
		{ "key": "shower2", "color": "#b9cece", "stroke": "#463131", "caption": "Shower/Tub", "type": "Shower/Tub", "geo": "F1 M0 0 L40 0 40 60 0 60 0 0 M35 15 L35 55 5 55 5 15 Q5 5 20 5 Q35 5 35 15 M22.5 20 A2.5 2.5 180 1 1 22.5 19.99", "width": 57, "height": 109, "notes": "", "loc": "510 70", "group": -53 },
		{ "key": "toilet2", "color": "#f7f9e3", "stroke": "#08061C", "caption": "Toilet", "type": "Toilet", "geo": "F1 M0 0 L25 0 25 10 0 10 0 0 M20 10 L20 15 5 15 5 10 20 10 M5 15 Q0 15 0 25 Q0 40 12.5 40 Q25 40 25 25 Q25 15 20 15", "width": 25, "height": 35, "notes": "", "loc": "460 30", "group": -53 },
		{ "key": "sink2", "color": "#c0c0c0", "stroke": "#3F3F3F", "caption": "Sink", "type": "Sink", "geo": "F1 M0 0 L40 0 40 40 0 40 0 0z M5 7.5 L18.5 7.5 M 21.5 7.5 L35 7.5 35 35 5 35 5 7.5 M 15 21.25 A 5 5 180 1 0 15 21.24 M23 3.75 A 3 3 180 1 1 23 3.74 M21.5 6.25 L 21.5 12.5 18.5 12.5 18.5 6.25 M15 3.75 A 1 1 180 1 1 15 3.74 M 10 4.25 L 10 3.25 13 3.25 M 13 4.25 L 10 4.25 M27 3.75 A 1 1 180 1 1 27 3.74 M 26.85 3.25 L 30 3.25 30 4.25 M 26.85 4.25 L 30 4.25", "width": 27, "height": 27, "notes": "", "loc": "460 112", "angle": 180, "group": -53 },
		{ "key": "door32", "category": "DoorNode", "color": "rgba(0, 0, 0, 0)", "caption": "Door", "type": "Door", "length": 36, "doorOpeningHeight": 5, "swing": "left", "notes": "", "loc": "430 69.20000076293945", "group": "wall24", "angle": 90 },
		{ "key": "sofaMedium", "color": "#c6a8c5", "stroke": "#39573A", "caption": "Sofa", "type": "Sofa", "geo": "F1 M0 0 L80 0 80 40 0 40 0 0 M10 35 L10 10 M0 0 Q8 0 10 10 M0 40 Q40 15 80 40 M70 10 Q72 0 80 0 M70 10 L70 35", "height": 45, "width": 90, "notes": "", "loc": "320 -40" },
		{ "key": "sofaMedium2", "color": "#c6a8c5", "stroke": "#39573A", "caption": "Sofa", "type": "Sofa", "geo": "F1 M0 0 L80 0 80 40 0 40 0 0 M10 35 L10 10 M0 0 Q8 0 10 10 M0 40 Q40 15 80 40 M70 10 Q72 0 80 0 M70 10 L70 35", "height": 45, "width": 90, "notes": "", "loc": "490 -40" },
		{ "key": "roundTable", "color": "#dadada", "stroke": "#252525", "caption": "Round Table", "type": "Round Table", "shape": "Ellipse", "width": 61, "height": 61, "notes": "", "loc": "410 -170", "group": -74 },
		{ "category": "MultiPurposeNode", "key": "MultiPurposeNode", "caption": "Multi Purpose Node", "color": "#ffffff", "stroke": "#000000", "name": "Writable Node", "type": "Writable Node", "shape": "Rectangle", "text": "Fridge", "width": 55, "height": 40, "notes": "", "loc": "342.5 -287.5" },
		{ "key": "doubleSink", "color": "#d9d9d9", "stroke": "#262626", "caption": "Double Sink", "type": "Double Sink", "geo": "F1 M0 0 L75 0 75 40 0 40 0 0 M5 7.5 L35 7.5 35 35 5 35 5 7.5 M44 7.5 L70 7.5 70 35 40 35 40 9 M15 21.25 A5 5 180 1 0 15 21.24 M50 21.25 A 5 5 180 1 0 50 21.24 M40.5 3.75 A3 3 180 1 1 40.5 3.74 M40.5 3.75 L50.5 13.75 47.5 16.5 37.5 6.75 M32.5 3.75 A 1 1 180 1 1 32.5 3.74 M 27.5 4.25 L 27.5 3.25 30.5 3.25 M 30.5 4.25 L 27.5 4.25 M44.5 3.75 A 1 1 180 1 1 44.5 3.74 M 44.35 3.25 L 47.5 3.25 47.5 4.25 M 44.35 4.25 L 47.5 4.25", "height": 27, "width": 52, "notes": "", "loc": "510 -260", "angle": 53.07333893129521 },
		{ "category": "WindowNode", "key": "window9", "color": "white", "caption": "Window", "type": "Window", "shape": "Rectangle", "height": 5, "length": 60, "notes": "", "loc": "284.9054049801182 -274.8675669721655", "group": "wall19", "angle": 305.5376777919744 },
		{ "category": "WindowNode", "key": "window10", "color": "white", "caption": "Window", "type": "Window", "shape": "Rectangle", "height": 5, "length": 60, "notes": "", "loc": "522.9324327288447 -277.8945941796174", "group": "wall21", "angle": 234.46232220802563 },
		{ "category": "MultiPurposeNode", "key": "MultiPurposeNode3", "caption": "Multi Purpose Node", "color": "#f7f9e3", "stroke": "#08061C", "name": "Writable Node", "type": "Writable Node", "shape": "Rectangle", "text": "Fridge", "width": 55, "height": 40, "notes": "", "loc": "342.5 -287.5" },
		{ "category": "MultiPurposeNode", "key": "MultiPurposeNode32", "caption": "Multi Purpose Node", "color": "#f7f9e3", "stroke": "#08061C", "name": "Writable Node", "type": "Writable Node", "shape": "Rectangle", "text": "Counter", "width": 55, "height": 40, "notes": "", "loc": "395 -287" },
		{ "category": "WindowNode", "key": "window11", "color": "white", "caption": "Window", "type": "Window", "shape": "Rectangle", "height": 5, "length": 60, "notes": "", "loc": "397.19999980926514 -310", "group": "wall20" },
		{ "key": "door4", "category": "DoorNode", "color": "rgba(0, 0, 0, 0)", "caption": "Door", "type": "Door", "length": 56, "doorOpeningHeight": 5, "swing": "left", "notes": "", "loc": "260 -179.79999923706055", "group": "wall4", "angle": 90 },
		{ "key": "stove", "color": "#f7f9e3", "stroke": "#08061C", "caption": "Stove", "type": "Stove", "geo": "F1 M 0 0 L 0 100 100 100 100 0 0 0 M 30 15 A 15 15 180 1 0 30.01 15 M 70 15 A 15 15 180 1 0 70.01 15M 30 55 A 15 15 180 1 0 30.01 55 M 70 55 A 15 15 180 1 0 70.01 55", "width": 55, "height": 40, "notes": "", "loc": "450.22782650708155 -288" },
		{ "key": "armChair", "color": "#c0c0c0", "stroke": "#3F3F3F", "caption": "Arm Chair", "type": "Arm Chair", "geo": "F1 M0 0 L40 0 40 40 0 40 0 0 M10 30 L10 10 M0 0 Q8 0 10 10 M0 40 Q20 15 40 40 M30 10 Q32 0 40 0 M30 10 L30 30", "width": 32.865, "height": 32, "notes": "", "loc": "410 -120", "group": -74 },
		{ "key": "armChair2", "color": "#c0c0c0", "stroke": "#3F3F3F", "caption": "Arm Chair", "type": "Arm Chair", "geo": "F1 M0 0 L40 0 40 40 0 40 0 0 M10 30 L10 10 M0 0 Q8 0 10 10 M0 40 Q20 15 40 40 M30 10 Q32 0 40 0 M30 10 L30 30", "width": 32.865, "height": 32, "notes": "", "loc": "460 -170", "angle": 270, "group": -74 },
		{ "key": "armChair22", "color": "#c0c0c0", "stroke": "#3F3F3F", "caption": "Arm Chair", "type": "Arm Chair", "geo": "F1 M0 0 L40 0 40 40 0 40 0 0 M10 30 L10 10 M0 0 Q8 0 10 10 M0 40 Q20 15 40 40 M30 10 Q32 0 40 0 M30 10 L30 30", "width": 32.865, "height": 32, "notes": "", "loc": "410 -220", "angle": 180, "group": -74 },
		{ "key": "armChair222", "color": "#c0c0c0", "stroke": "#3F3F3F", "caption": "Arm Chair", "type": "Arm Chair", "geo": "F1 M0 0 L40 0 40 40 0 40 0 0 M10 30 L10 10 M0 0 Q8 0 10 10 M0 40 Q20 15 40 40 M30 10 Q32 0 40 0 M30 10 L30 30", "width": 32.865, "height": 32, "notes": "", "loc": "360 -170", "angle": 90, "group": -74 },
		{ "isGroup": true, "key": -74, "caption": "Group", "notes": "" },
		{ "key": "wall25", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": -300, "y": -240 }, "endpoint": { "class": "go.Point", "x": -300, "y": -180 }, "thickness": 5, "isGroup": true, "notes": "" },
		{ "key": "wall252", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": -160, "y": -240 }, "endpoint": { "class": "go.Point", "x": -160, "y": -180 }, "thickness": 5, "isGroup": true, "notes": "" },
		{ "key": "wall2522", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": 0, "y": -240 }, "endpoint": { "class": "go.Point", "x": 0, "y": -180 }, "thickness": 5, "isGroup": true, "notes": "" },
		{ "key": "wall25222", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": 140, "y": -240 }, "endpoint": { "class": "go.Point", "x": 140, "y": -180 }, "thickness": 5, "isGroup": true, "notes": "" },
		{ "key": "wall253", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": -300, "y": 180 }, "endpoint": { "class": "go.Point", "x": -300, "y": 240 }, "thickness": 5, "isGroup": true, "notes": "" },
		{ "key": "wall2523", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": -160, "y": 180 }, "endpoint": { "class": "go.Point", "x": -160, "y": 240 }, "thickness": 5, "isGroup": true, "notes": "" },
		{ "key": "wall25223", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": 0, "y": 180 }, "endpoint": { "class": "go.Point", "x": 0, "y": 240 }, "thickness": 5, "isGroup": true, "notes": "" },
		{ "key": "wall252222", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": 140, "y": 180 }, "endpoint": { "class": "go.Point", "x": 140, "y": 240 }, "thickness": 5, "isGroup": true, "notes": "" },
		{ "key": "armChair3", "color": "#e1ddd0", "stroke": "#1E222F", "caption": "Arm Chair", "type": "Arm Chair", "geo": "F1 M0 0 L40 0 40 40 0 40 0 0 M10 30 L10 10 M0 0 Q8 0 10 10 M0 40 Q20 15 40 40 M30 10 Q32 0 40 0 M30 10 L30 30", "width": 29, "height": 27, "notes": "", "loc": "-231.93243243243245 -192.5" },
		{ "category": "MultiPurposeNode", "key": "MultiPurposeNode2", "caption": "Multi Purpose Node", "color": "#e1ddd0", "stroke": "#1E222F", "name": "Writable Node", "type": "Writable Node", "shape": "Rectangle", "text": "Desk", "width": 116, "height": 14, "notes": "", "loc": "-232 -220" },
		{ "category": "MultiPurposeNode", "key": "MultiPurposeNode25", "caption": "Multi Purpose Node", "color": "#e1ddd0", "stroke": "#1E222F", "name": "Writable Node", "type": "Writable Node", "shape": "Rectangle", "text": "Desk", "width": 116, "height": 14, "notes": "", "loc": "-230 221" },
		{ "key": "armChair35", "color": "#e1ddd0", "stroke": "#1E222F", "caption": "Arm Chair", "type": "Arm Chair", "geo": "F1 M0 0 L40 0 40 40 0 40 0 0 M10 30 L10 10 M0 0 Q8 0 10 10 M0 40 Q20 15 40 40 M30 10 Q32 0 40 0 M30 10 L30 30", "width": 29, "height": 27, "notes": "", "loc": "-230 190", "angle": 180 },
		{ "key": "armChair352", "color": "#e1ddd0", "stroke": "#1E222F", "caption": "Arm Chair", "type": "Arm Chair", "geo": "F1 M0 0 L40 0 40 40 0 40 0 0 M10 30 L10 10 M0 0 Q8 0 10 10 M0 40 Q20 15 40 40 M30 10 Q32 0 40 0 M30 10 L30 30", "width": 29, "height": 27, "notes": "", "loc": "-80 190", "angle": 180 },
		{ "category": "MultiPurposeNode", "key": "MultiPurposeNode252", "caption": "Multi Purpose Node", "color": "#e1ddd0", "stroke": "#1E222F", "name": "Writable Node", "type": "Writable Node", "shape": "Rectangle", "text": "Desk", "width": 116, "height": 14, "notes": "", "loc": "-80 220" },
		{ "key": "armChair353", "color": "#e1ddd0", "stroke": "#1E222F", "caption": "Arm Chair", "type": "Arm Chair", "geo": "F1 M0 0 L40 0 40 40 0 40 0 0 M10 30 L10 10 M0 0 Q8 0 10 10 M0 40 Q20 15 40 40 M30 10 Q32 0 40 0 M30 10 L30 30", "width": 29, "height": 27, "notes": "", "loc": "70 190", "angle": 180 },
		{ "category": "MultiPurposeNode", "key": "MultiPurposeNode253", "caption": "Multi Purpose Node", "color": "#e1ddd0", "stroke": "#1E222F", "name": "Writable Node", "type": "Writable Node", "shape": "Rectangle", "text": "Desk", "width": 116, "height": 14, "notes": "", "loc": "70 220" },
		{ "key": "armChair3532", "color": "#e1ddd0", "stroke": "#1E222F", "caption": "Arm Chair", "type": "Arm Chair", "geo": "F1 M0 0 L40 0 40 40 0 40 0 0 M10 30 L10 10 M0 0 Q8 0 10 10 M0 40 Q20 15 40 40 M30 10 Q32 0 40 0 M30 10 L30 30", "width": 29, "height": 27, "notes": "", "loc": "200 190", "angle": 180 },
		{ "category": "MultiPurposeNode", "key": "MultiPurposeNode2532", "caption": "Multi Purpose Node", "color": "#e1ddd0", "stroke": "#1E222F", "name": "Writable Node", "type": "Writable Node", "shape": "Rectangle", "text": "Desk", "width": 116, "height": 14, "notes": "", "loc": "200 220" },
		{ "key": "armChair32", "color": "#e1ddd0", "stroke": "#1E222F", "caption": "Arm Chair", "type": "Arm Chair", "geo": "F1 M0 0 L40 0 40 40 0 40 0 0 M10 30 L10 10 M0 0 Q8 0 10 10 M0 40 Q20 15 40 40 M30 10 Q32 0 40 0 M30 10 L30 30", "width": 29, "height": 27, "notes": "", "loc": "-80 -190" },
		{ "category": "MultiPurposeNode", "key": "MultiPurposeNode22", "caption": "Multi Purpose Node", "color": "#e1ddd0", "stroke": "#1E222F", "name": "Writable Node", "type": "Writable Node", "shape": "Rectangle", "text": "Desk", "width": 116, "height": 14, "notes": "", "loc": "-80 -220" },
		{ "category": "MultiPurposeNode", "key": "MultiPurposeNode222", "caption": "Multi Purpose Node", "color": "#e1ddd0", "stroke": "#1E222F", "name": "Writable Node", "type": "Writable Node", "shape": "Rectangle", "text": "Desk", "width": 116, "height": 14, "notes": "", "loc": "70 -220" },
		{ "key": "armChair322", "color": "#e1ddd0", "stroke": "#1E222F", "caption": "Arm Chair", "type": "Arm Chair", "geo": "F1 M0 0 L40 0 40 40 0 40 0 0 M10 30 L10 10 M0 0 Q8 0 10 10 M0 40 Q20 15 40 40 M30 10 Q32 0 40 0 M30 10 L30 30", "width": 29, "height": 27, "notes": "", "loc": "70 -190" },
		{ "key": "armChair3222", "color": "#e1ddd0", "stroke": "#1E222F", "caption": "Arm Chair", "type": "Arm Chair", "geo": "F1 M0 0 L40 0 40 40 0 40 0 0 M10 30 L10 10 M0 0 Q8 0 10 10 M0 40 Q20 15 40 40 M30 10 Q32 0 40 0 M30 10 L30 30", "width": 29, "height": 27, "notes": "", "loc": "200 -190" },
		{ "category": "MultiPurposeNode", "key": "MultiPurposeNode2222", "caption": "Multi Purpose Node", "color": "#e1ddd0", "stroke": "#1E222F", "name": "Writable Node", "type": "Writable Node", "shape": "Rectangle", "text": "Desk", "width": 116, "height": 14, "notes": "", "loc": "200 -220" },
		{ "key": "sofaMedium3", "color": "#b9fde0", "stroke": "#46021F", "caption": "Sofa", "type": "Sofa", "geo": "F1 M0 0 L80 0 80 40 0 40 0 0 M10 35 L10 10 M0 0 Q8 0 10 10 M0 40 Q40 15 80 40 M70 10 Q72 0 80 0 M70 10 L70 35", "height": 27, "width": 90, "notes": "", "loc": "-410 -30", "angle": 90 },
		{ "key": "sofaMedium32", "color": "#b9fde0", "stroke": "#46021F", "caption": "Sofa", "type": "Sofa", "geo": "F1 M0 0 L80 0 80 40 0 40 0 0 M10 35 L10 10 M0 0 Q8 0 10 10 M0 40 Q40 15 80 40 M70 10 Q72 0 80 0 M70 10 L70 35", "height": 27, "width": 90, "notes": "", "loc": "240 -20", "angle": 270 },
		{ "category": "MultiPurposeNode", "key": "MultiPurposeNode4", "caption": "Multi Purpose Node", "color": "#d6b196", "stroke": "#294E69", "name": "Writable Node", "type": "Writable Node", "shape": "Rectangle", "text": "Desk", "width": 60, "height": 23, "notes": "", "loc": "-381.1676743184333 -190.94449856461264", "angle": 137.27258112448646 },
		{ "key": "wall26", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": -300, "y": -180 }, "endpoint": { "class": "go.Point", "x": -380, "y": -100 }, "thickness": 5, "isGroup": true, "notes": "" },
		{ "key": "wall27", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": -380, "y": -100 }, "endpoint": { "class": "go.Point", "x": -430, "y": -100 }, "thickness": 5, "isGroup": true, "notes": "" },
		{ "key": "wall28", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": -300, "y": 180 }, "endpoint": { "class": "go.Point", "x": -380, "y": 100 }, "thickness": 5, "isGroup": true, "notes": "" },
		{ "key": "wall29", "category": "WallGroup", "caption": "Wall", "type": "Wall", "startpoint": { "class": "go.Point", "x": -380, "y": 100 }, "endpoint": { "class": "go.Point", "x": -430, "y": 100 }, "thickness": 5, "isGroup": true, "notes": "" },
		{ "key": "armChair4", "color": "#d6b196", "stroke": "#294E69", "caption": "Arm Chair", "type": "Arm Chair", "geo": "F1 M0 0 L40 0 40 40 0 40 0 0 M10 30 L10 10 M0 0 Q8 0 10 10 M0 40 Q20 15 40 40 M30 10 Q32 0 40 0 M30 10 L30 30", "width": 21, "height": 21, "notes": "", "loc": "-400 -210", "angle": 135 },
		{ "key": "roundTable2", "color": "#d6dfc8", "stroke": "#292037", "caption": "Plant", "type": "Round Table", "shape": "Ellipse", "width": 21, "height": 21, "notes": "", "loc": "-402.5 -116.5", "text": "Plant" },
		{ "key": "armChair42", "color": "#d6b196", "stroke": "#294E69", "caption": "Arm Chair", "type": "Arm Chair", "geo": "F1 M0 0 L40 0 40 40 0 40 0 0 M10 30 L10 10 M0 0 Q8 0 10 10 M0 40 Q20 15 40 40 M30 10 Q32 0 40 0 M30 10 L30 30", "width": 21, "height": 21, "notes": "", "loc": "-400 210", "angle": 45 },
		{ "category": "MultiPurposeNode", "key": "MultiPurposeNode42", "caption": "Multi Purpose Node", "color": "#d6b196", "stroke": "#294E69", "name": "Writable Node", "type": "Writable Node", "shape": "Rectangle", "text": "Desk", "width": 60, "height": 23, "notes": "", "loc": "-380 190", "angle": 47.002533598871146 },
		{ "key": "roundTable22", "color": "#d6dfc8", "stroke": "#292037", "caption": "Plant", "type": "Round Table", "shape": "Ellipse", "width": 21, "height": 21, "notes": "", "loc": "-400 120", "text": "Plant" },
		{ "key": "roundTable222", "color": "#d6dfc8", "stroke": "#292037", "caption": "Plant", "type": "Round Table", "shape": "Ellipse", "width": 21, "height": 21, "notes": "", "loc": "-320 200", "text": "Plant" },
		{ "key": "door6", "category": "DoorNode", "color": "rgba(0, 0, 0, 0)", "caption": "Door", "type": "Door", "length": 40, "doorOpeningHeight": 5, "swing": "left", "notes": "", "loc": "-334.00000047683716 -145.99999952316284", "group": "wall26", "angle": 315 },
		{ "key": "door7", "category": "DoorNode", "color": "rgba(0, 0, 0, 0)", "caption": "Door", "type": "Door", "length": 40, "doorOpeningHeight": 5, "swing": "left", "notes": "", "loc": "-343.7999997138977 136.2000002861023", "group": "wall28", "angle": 225 }
	],
	"linkDataArray": []
};

// UI Interaction state object for FlooplaUI
GUI_STATE = {
	menuButtons: {
		selectionInfoWindowButtonId: "selectionInfoWindowButton",
		palettesWindowButtonId: "myPaletteWindowButton",
		overviewWindowButtonId: "myOverviewWindowButton",
		optionsWindowButtonId: "optionsWindowButton",
		statisticsWindowButtonId: "statisticsWindowButton"
	},
	windows: {
		diagramHelpDiv: {
			id: "diagramHelpDiv"
		},
		selectionInfoWindow: {
			id: "selectionInfoWindow",
			textDivId: "selectionInfoTextDiv",
			handleId: "selectionInfoWindowHandle",
			colorPickerId: "colorPicker",
			heightLabelId: "heightLabel",
			heightInputId: "heightInput",
			widthInputId: "widthInput",
			nodeGroupInfoId: "nodeGroupInfo",
			nameInputId: "nameInput",
			notesTextareaId: "notesTextarea"
		},
		palettesWindow: {
			id: "myPaletteWindow",
			furnitureSearchInputId: "furnitureSearchBar",
			furniturePaletteId: "furniturePaletteDiv"
		},
		overviewWindow: {
			id: "myOverviewWindow"
		},
		optionsWindow: {
			id: "optionsWindow",
			gridSizeInputId: "gridSizeInput",
			unitsConversionFactorInputId: "unitsConversionFactorInput",
			unitsFormId: "unitsForm",
			unitsFormName: "units",
			checkboxes: {
				showGridCheckboxId: "showGridCheckbox",
				gridSnapCheckboxId: "gridSnapCheckbox",
				wallGuidelinesCheckboxId: "wallGuidelinesCheckbox",
				wallLengthsCheckboxId: "wallLengthsCheckbox",
				wallAnglesCheckboxId: "wallAnglesCheckbox",
				smallWallAnglesCheckboxId: "smallWallAnglesCheckbox"
			},
		},
		statisticsWindow: {
			id: "statisticsWindow",
			textDivId: "statisticsWindowTextDiv",
			numsTableId: "numsTable",
			totalsTableId: "totalsTable"
		}
	},
	scaleDisplayId: "scaleDisplay",
	setBehaviorClass: "setBehavior",
	wallThicknessInputId: "wallThicknessInput",
	wallThicknessBoxId: "wallThicknessBox",
	unitsBoxClass: "unitsBox",
	unitsInputClass: "unitsInput"
};

// Filesystem state object for FloorplanFilesystem
FILESYSTEM_UI_STATE = {
	openWindowId: "openDocument",
	removeWindowId: "removeDocument",
	currentFileId: "currentFile",
	filesToRemoveListId: "filesToRemove",
	filesToOpenListId: "filesToOpen"
};

// Node Data Array for Furniture Palette
FURNITURE_NODE_DATA_ARRAY = [
	{
		category: "MultiPurposeNode",
		key: "MultiPurposeNode",
		caption: "Multi Purpose Node",
		color: "#ffffff",
		stroke: '#000000',
		name: "Writable Node",
		type: "Writable Node",
		shape: "Rectangle",
		text: "Write here",
		width: 60,
		height: 60,
		notes: ""
	},
	{
		key: "roundTable",
		color: "#ffffff",
		stroke: '#000000',
		caption: "Round Table",
		type: "Round Table",
		shape: "Ellipse",
		width: 61,
		height: 61,
		notes: ""
	},
	{
		key: "armChair",
		color: "#ffffff",
		stroke: '#000000',
		caption: "Arm Chair",
		type: "Arm Chair",
		geo: "F1 M0 0 L40 0 40 40 0 40 0 0 M10 30 L10 10 M0 0 Q8 0 10 10 M0 40 Q20 15 40 40 M30 10 Q32 0 40 0 M30 10 L30 30",
		width: 45,
		height: 45,
		notes: ""
	},
	{
		key: "sofaMedium",
		color: "#ffffff",
		stroke: "#000000",
		caption: "Sofa",
		type: "Sofa",
		geo: "F1 M0 0 L80 0 80 40 0 40 0 0 M10 35 L10 10 M0 0 Q8 0 10 10 M0 40 Q40 15 80 40 M70 10 Q72 0 80 0 M70 10 L70 35",
		height: 45,
		width: 90,
		notes: ""
	},
	{
		key: "sink",
		color: "#ffffff",
		stroke: '#000000',
		caption: "Sink",
		type: "Sink",
		geo: "F1 M0 0 L40 0 40 40 0 40 0 0z M5 7.5 L18.5 7.5 M 21.5 7.5 L35 7.5 35 35 5 35 5 7.5 M 15 21.25 A 5 5 180 1 0 15 21.24 M23 3.75 A 3 3 180 1 1 23 3.74 M21.5 6.25 L 21.5 12.5 18.5 12.5 18.5 6.25 M15 3.75 A 1 1 180 1 1 15 3.74 M 10 4.25 L 10 3.25 13 3.25 M 13 4.25 L 10 4.25 M27 3.75 A 1 1 180 1 1 27 3.74 M 26.85 3.25 L 30 3.25 30 4.25 M 26.85 4.25 L 30 4.25",
		width: 27,
		height: 27,
		notes: ""
	},
	{
		key: "doubleSink",
		color: "#ffffff",
		stroke: '#000000',
		caption: "Double Sink",
		type: "Double Sink",
		geo: "F1 M0 0 L75 0 75 40 0 40 0 0 M5 7.5 L35 7.5 35 35 5 35 5 7.5 M44 7.5 L70 7.5 70 35 40 35 40 9 M15 21.25 A5 5 180 1 0 15 21.24 M50 21.25 A 5 5 180 1 0 50 21.24 M40.5 3.75 A3 3 180 1 1 40.5 3.74 M40.5 3.75 L50.5 13.75 47.5 16.5 37.5 6.75 M32.5 3.75 A 1 1 180 1 1 32.5 3.74 M 27.5 4.25 L 27.5 3.25 30.5 3.25 M 30.5 4.25 L 27.5 4.25 M44.5 3.75 A 1 1 180 1 1 44.5 3.74 M 44.35 3.25 L 47.5 3.25 47.5 4.25 M 44.35 4.25 L 47.5 4.25",
		height: 27,
		width: 52,
		notes: ""
	},
	{
		key: "toilet",
		color: "#ffffff",
		stroke: '#000000',
		caption: "Toilet",
		type: "Toilet",
		geo: "F1 M0 0 L25 0 25 10 0 10 0 0 M20 10 L20 15 5 15 5 10 20 10 M5 15 Q0 15 0 25 Q0 40 12.5 40 Q25 40 25 25 Q25 15 20 15",
		width: 25,
		height: 35,
		notes: ""
	},
	{
		key: "shower",
		color: "#ffffff",
		stroke: '#000000',
		caption: "Shower/Tub",
		type: "Shower/Tub",
		geo: "F1 M0 0 L40 0 40 60 0 60 0 0 M35 15 L35 55 5 55 5 15 Q5 5 20 5 Q35 5 35 15 M22.5 20 A2.5 2.5 180 1 1 22.5 19.99",
		width: 45,
		height: 75,
		notes: ""
	},
	{
		key: "bed",
		color: "#ffffff",
		stroke: '#000000',
		caption: "Bed",
		type: "Bed",
		geo: "F1 M0 0 L40 0 40 60 0 60 0 0 M 7.5 2.5 L32.5 2.5 32.5 17.5 7.5 17.5 7.5 2.5 M0 20 L40 20 M0 25 L40 25",
		width: 76.2,
		height: 101.6,
		notes: ""
	},
	{
		key: "staircase",
		color: "#ffffff",
		stroke: '#000000',
		caption: "Staircase",
		type: "Staircase",
		geo: "F1 M0 0 L 0 100 250 100 250 0 0 0 M25 100 L 25 0 M 50 100 L 50 0 M 75 100 L 75 0 M 100 100 L 100 0 M 125 100 L 125 0 M 150 100 L 150 0 M 175 100 L 175 0 M 200 100 L 200 0 M 225 100 L 225 0",
		width: 125,
		height: 50,
		notes: ""
	},
	{
		key: "stove",
		color: "#ffffff",
		stroke: '#000000',
		caption: "Stove",
		type: "Stove",
		geo: "F1 M 0 0 L 0 100 100 100 100 0 0 0 M 30 15 A 15 15 180 1 0 30.01 15 M 70 15 A 15 15 180 1 0 70.01 15"
			+ "M 30 55 A 15 15 180 1 0 30.01 55 M 70 55 A 15 15 180 1 0 70.01 55",
		width: 75,
		height: 75,
		notes: ""
	},
	{
		key: "diningTable",
		color: "#ffffff",
		stroke: '#000000',
		caption: "Dining Table",
		type: "Dining Table",
		geo: "F1 M 0 0 L 0 100 200 100 200 0 0 0 M 25 0 L 25 -10 75 -10 75 0 M 125 0 L 125 -10 175 -10 175 0 M 200 25 L 210 25 210 75 200 75 M 125 100 L 125 110 L 175 110 L 175 100 M 25 100 L 25 110 75 110 75 100 M 0 75 -10 75 -10 25 0 25",
		width: 125,
		height: 62.5,
		notes: ""
	}
];

// Node Data Array for Wall Parts Palette
WALLPARTS_NODE_DATA_ARRAY = [
	{
		category: "PaletteWallNode",
		key: "wall",
		caption: "Wall",
		type: "Wall",
		color: "#000000",
		shape: "Rectangle",
		height: 10,
		length: 60,
		notes: "",
	},
	{
		category: "WindowNode",
		key: "window",
		color: "white",
		caption: "Window",
		type: "Window",
		shape: "Rectangle",
		height: 10,
		length: 60,
		notes: ""
	},
	{
		key: "door",
		category: "DoorNode",
		color: "rgba(0, 0, 0, 0)",
		caption: "Door",
		type: "Door",
		length: 40,
		doorOpeningHeight: 5,
		swing: "left",
		notes: ""
	}
];