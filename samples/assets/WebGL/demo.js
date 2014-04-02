// San Angeles Observation OpenGL ES version example
// Copyright 2004-2005 Jetro Lauha
// Web: http://iki.fi/jetro/
// This source is free software; you can redistribute it and/or
// modify it under the terms of EITHER:
//   (1) The GNU Lesser General Public License as published by the Free
//       Software Foundation; either version 2.1 of the License, or (at
//       your option) any later version. The text of the GNU Lesser
//       General Public License is included with this source in the
//       file LICENSE-LGPL.txt.
//   (2) The BSD-style license that is included with this source in
//       the file LICENSE-BSD.txt.
//
// This source is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the files
// LICENSE-LGPL.txt and LICENSE-BSD.txt for more details.

// WebGL port by Kenneth Waters

var shapeParams = [
    // m  a     b     n1      n2     n3     m     a     b     n1     n2      n3   res1 res2 scale  (org.res1,res2)
    [10, 1,    2,    90,      1,   -45,    8,    1,    1,    -1,     1,  -0.4 ,   20,  30, 2], // 40, 60
    [10, 1,    2,    90,      1,   -45,    4,    1,    1,    10,     1,  -0.4 ,   20,  20, 4], // 40, 40
    [10, 1,    2,    60,      1,   -10,    4,    1,    1,    -1,    -2,  -0.4 ,   41,  41, 1], // 82, 82
    [ 6, 1,    1,    60,      1,   -70,    8,    1,    1,  0.4 ,     3,  0.25 ,   20,  20, 1], // 40, 40
    [ 4, 1,    1,    30,      1,    20,   12,    1,    1,  0.4 ,     3,  0.25 ,   10,  30, 1], // 20, 60
    [ 8, 1,    1,    30,      1,    -4,    8,    2,    1,    -1,     5,   0.5 ,   25,  26, 1], // 60, 60
    [13, 1,    1,    30,      1,    -4,   13,    1,    1,     1,     5,      1,   30,  30, 6], // 60, 60
    [10, 1, 1.1 , -0.5 ,   0.1 ,    70,   60,    1,    1,   -90,     0, -0.25 ,   20,  60, 8], // 60, 180
    [ 7, 1,    1,    20,  -0.3 , -3.5 ,    6,    1,    1,    -1,  4.5 ,   0.5 ,   10,  20, 4], // 60, 80
    [ 4, 1,    1,    10,     10,    10,    4,    1,    1,    10,    10,     10,   10,  20, 1], // 20, 40
    [ 4, 1,    1,     1,      1,     1,    4,    1,    1,     1,     1,      1,   10,  10, 2], // 10, 10
    [ 1, 1,    1,    38, -0.25 ,    19,    4,    1,    1,    10,    10,     10,   10,  15, 2], // 20, 40
    [ 2, 1,    1,  0.7 ,   0.3 ,  0.2 ,    3,    1,    1,   100,   100,    100,   10,  25, 2], // 20, 50
    [ 6, 1,    1,     1,      1,     1,    3,    1,    1,     1,     1,      1,   30,  30, 2], // 60, 60
    [ 3, 1,    1,     1,      1,     1,    6,    1,    1,     2,     1,      1,   10,  20, 2], // 20, 40
    [ 6, 1,    1,     6,   5.5 ,   100,    6,    1,    1,    25,    10,     10,   30,  20, 2], // 60, 40
    [ 3, 1,    1,  0.5 ,   1.7 ,  1.7 ,    2,    1,    1,    10,    10,     10,   20,  20, 2], // 40, 40
    [ 5, 1,    1,  0.1 ,   1.7 ,  1.7 ,    1,    1,    1,  0.3 ,  0.5 ,   0.5 ,   20,  20, 4], // 40, 40
    [ 2, 1,    1,     6,   5.5 ,   100,    6,    1,    1,     4,    10,     10,   10,  22, 1], // 40, 40
    [ 6, 1,    1,    -1,     70,  0.1 ,    9,    1, 0.5 ,   -98, 0.05 ,    -45,   20,  30, 4], // 60, 91
    [ 6, 1,    1,    -1,     90, -0.1 ,    7,    1,    1,    90,  1.3 ,     34,   13,  16, 1]  // 32, 60
];

var camTracks = [
    {src:[4500, 2700, 100, 70, -30], dest:[50, 50, -90, -100, 0], dist:20, len:1},
    {src:[ -1448, 4294, 25, 363, 0 ], dest:[ -136, 202, 125, -98, 100], dist:0, len:1},
    {src:[ 1437, 4930, 200, -275, -20 ], dest:[ 1684, 0, 0, 9, 0], dist:0, len:1},
    {src:[ 1800, 3609, 200, 0, 675 ], dest:[ 0, 0, 0, 300, 0], dist:0, len:1},
    {src:[ 923, 996, 50, 2336, -80 ], dest:[ 0, -20, -50, 0, 170], dist:0, len:1},
    {src:[ -1663, -43, 600, 2170, 0 ], dest:[ 20, 0, -600, 0, 100], dist:0, len:1},
    {src:[ 1049, -1420, 175, 2111, -17 ], dest:[ 0, 0, 0, -334, 0], dist:0, len:2},
    {src:[ 0, 0, 50, 300, 25 ], dest:[ 0, 0, 0, 300, 0], dist:70, len:2},
    {src:[ -473, -953, 3500, -353, -350 ], dest:[ 0, 0, -2800, 0, 0], dist:0, len:2},
    {src:[ 191, 1938, 35, 1139, -17 ], dest:[ 1205, -2909, 0, 0, 0], dist:0, len:2},
    {src:[ -1449, -2700, 150, 0, 0 ], dest:[ 0, 2000, 0, 0, 0], dist:0, len:2},
    {src:[ 5273, 4992, 650, 373, -50 ], dest:[ -4598, -3072, 0, 0, 0], dist:0, len:2},
    {src:[ 3223, -3282, 1075, -393, -25 ], dest:[ 1649, -1649, 0, 0, 0], dist:0, len:2}
];

var CAMTRACK_LEN = 5442;

var flatVertexSource = [
    "attribute vec3 pos;",
    "attribute vec4 colorIn;",
    "uniform mat4 mvp;",
    "varying vec4 color;",
    "void main() {",
    "  color = colorIn;",
    "  gl_Position = mvp * vec4(pos.xyz, 1.);",
    "}"
    ].join("\n");

var flatFragmentSource = [
    "precision mediump float;\n",
    "varying vec4 color;",
    "void main() {",
    "  gl_FragColor = vec4(color.rgb, 1.0);",
    "}"
    ].join("\n");

var litVertexSource = [
    "attribute vec3 pos;",
    "attribute vec3 normal;",
    "attribute vec4 colorIn;",
    "",
    "varying vec4 color;",
    "",
    "uniform mat4 mvp;",
    "uniform mat3 normalMatrix;",
    "uniform vec4 ambient;",
    "uniform float shininess;",
    "uniform vec3 light_0_direction;",
    "uniform vec4 light_0_diffuse;",
    "uniform vec4 light_0_specular;",
    "uniform vec3 light_1_direction;",
    "uniform vec4 light_1_diffuse;",
    "uniform vec3 light_2_direction;",
    "uniform vec4 light_2_diffuse;",
    "",
    "vec3 worldNormal;",
    "",
    "vec4 SpecularLight(vec3 direction,",
    "                   vec4 diffuseColor,",
    "                   vec4 specularColor) {",
    "  vec3 lightDir = normalize(direction);",
    "  float diffuse = max(0., dot(worldNormal, lightDir));",
    "  float specular = 0.;",
    "  if (diffuse > 0.) {",
    "    vec3 halfv = normalize(lightDir + vec3(0., 0., 1.));",
    "    specular = pow(max(0., dot(halfv, worldNormal)), shininess);",
    "  }",
    "  return diffuse * diffuseColor * colorIn + specular * specularColor;",
    "}",
    "",
    "vec4 DiffuseLight(vec3 direction, vec4 diffuseColor) {",
    "  vec3 lightDir = normalize(direction);",
    "  float diffuse = max(0., dot(worldNormal, lightDir));",
    "  return diffuse * diffuseColor * colorIn;",
    "}",
    "",
    "void main() {",
    "  worldNormal = normalize(normalMatrix * normal);",
    "",
    "  gl_Position = mvp * vec4(pos, 1.);",
    "",
    "  color = ambient * colorIn;",
    "  color += SpecularLight(light_0_direction, light_0_diffuse,",
    "                         light_0_specular);",
    "  color += DiffuseLight(light_1_direction, light_1_diffuse);",
    "  color += DiffuseLight(light_2_direction, light_2_diffuse);",
    "}",
    ].join("\n");

var fadeVertexSource = [
    "precision mediump float;\n",
    "attribute vec2 pos;",
    "",
    "varying vec4 color;",
    "",
    "uniform float minFade;",
    "",
    "void main() {",
    "  color = vec4(minFade, minFade, minFade, 1.);",
    "  gl_Position = vec4(pos, 0., 1.);",
    "}",
    ].join("\n");


// globals
var ground = null;
var fadeVBO = null;
var shapes = null;

var modelview = new Matrix4x4();
var projection = new Matrix4x4();
var mvp = new Matrix4x4();
var normalMatrix = Array(9);

var currentCamTrackStartTick = 0;
var nextCamTrackStartTick = 0;
var sTick = 0;
var currentCamTrack = 0;

var litShader = null;
var flatShader = null;
var fadeShader = null;

var random = {
    randomSeed: 0,

    seed: function(seed) {
        this.randomSeed = seed;
    },

    uInt: function() {
        this.randomSeed = (this.randomSeed * 0x343fd + 0x269ec3) & 0xffffffff;
        return (this.randomSeed >> 16) & 0xffff;
    }
};

function glslNameToJs(name) {
    return name.replace(/_(.)/g, function(_, p1) { return p1.toUpperCase(); });
}

function Shader(vertex, fragment) {
    this.program = gl.createProgram();

    var vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vertex);
    gl.compileShader(vs);

    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
        var infoLog = gl.getShaderInfoLog(vs);
        log("Error compiling vertex shader:" + infoLog);
    }

    gl.attachShader(this.program, vs);
    gl.deleteShader(vs);

    var fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fragment);
    gl.compileShader(fs);

    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
        var infoLog = gl.getShaderInfoLog(fs);
        log("Error compiling fragment shader:" + infoLog);
    }

    gl.attachShader(this.program, fs);
    gl.deleteShader(fs);

    gl.linkProgram(this.program);
    gl.useProgram(this.program);
    // log(gl.getProgramInfoLog(this.program));

    // find uniforms and attributes
    var re = /(uniform|attribute)\s+\S+\s+(\S+)\s*;/g;
    var match = null;
    while ((match = re.exec(vertex + '\n' + fragment)) != null) {
        var glslName = match[2];
        var jsName = glslNameToJs(glslName);
        var loc = -1;
        if (match[1] == "uniform") {
            this[jsName + "Loc"] = this.getUniform(glslName);
        } else if (match[1] == "attribute") {
            this[jsName + "Loc"] = this.getAttribute(glslName);
        }
        if (loc >= 0) {
            this[jsName + "Loc"] = loc;
        }
    }
}

Shader.prototype.bind = function() {
    gl.useProgram(this.program);

    if (this.mvpLoc != undefined) {
        // TODO(kwaters): hack
        mvp.loadIdentity();
        mvp.multiply(modelview);
        mvp.multiply(projection);
        gl.uniformMatrix4fv(this.mvpLoc, gl.FALSE, mvp.elements);
    }

    if (this.normalMatrixLoc !== undefined) {
        gl.uniformMatrix3fv(this.normalMatrixLoc, gl.FALSE, computeNormalMatrix(modelview, normalMatrix));
    }
};

Shader.prototype.getAttribute = function(name) {
    return gl.getAttribLocation(this.program, name);
};

Shader.prototype.getUniform = function(name) {
    return gl.getUniformLocation(this.program, name);
};

function GlObject(shader, vertices, colors, normals) {
    this.shader = shader;
    this.count =  (vertices.length / 3) | 0;
    this.vbo = gl.createBuffer();

    var vertexArray = new Float32Array(vertices);
    var colorArray = new Uint8Array(colors);
    this.vertexOffset = 0;
    this.colorOffset = vertexArray.byteLength;
    this.normalOffset = this.colorOffset + colorArray.byteLength;
    var sizeInBytes = this.normalOffset;
    var normalArray = null;
    if (normals != undefined) {
        normalArray = new Float32Array(normals);
        sizeInBytes += normalArray.byteLength;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    gl.bufferData(gl.ARRAY_BUFFER, sizeInBytes, gl.STATIC_DRAW);
    gl.bufferSubData(gl.ARRAY_BUFFER, this.vertexOffset, vertexArray);
    gl.bufferSubData(gl.ARRAY_BUFFER, this.colorOffset, colorArray);
    if (normals != undefined) {
        gl.bufferSubData(gl.ARRAY_BUFFER, this.normalOffset, normalArray);
    }
    
    this.vao = glvao.createVertexArrayOES();
    glvao.bindVertexArrayOES(this.vao);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    gl.vertexAttribPointer(this.shader.posLoc, 3, gl.FLOAT, false, 0,
                           this.vertexOffset);
    gl.enableVertexAttribArray(this.shader.posLoc);
    gl.vertexAttribPointer(this.shader.colorInLoc, 4, gl.UNSIGNED_BYTE, true, 0,
                           this.colorOffset);
    gl.enableVertexAttribArray(this.shader.colorInLoc);
    if (this.shader.normalLoc !== undefined) {
        gl.vertexAttribPointer(this.shader.normalLoc, 3, gl.FLOAT, false, 0,
                               this.normalOffset);
        gl.enableVertexAttribArray(this.shader.normalLoc);
    }
    
    glvao.bindVertexArrayOES(null);
}

GlObject.prototype.free = function() {
    glvao.deleteVertexArrayOES(this.vao);
    this.vao = null;
};

GlObject.prototype.draw = function() {
    this.shader.bind();

    glvao.bindVertexArrayOES(this.vao);

    gl.drawArrays(gl.TRIANGLES, 0, this.count);
};

function createGroundPlane(shader) {
    var scale = 4;
    var xBegin = -15, xEnd = 15;
    var yBegin = -15, yEnd = 15;

    var triangleCount = (yEnd - yBegin) * (xEnd - xBegin) * 2;
    var colors = [];
    var vertices = [];

    for (var y = yBegin; y < yEnd; ++y) {
        for (var x = xBegin; x < xEnd; ++x) {
            var color = (random.uInt() & 0x4f) + 81;

            for (var i = 0; i < 6; ++i) {
                colors.push(color, color, color, 0);
            }

            for (var a = 0; a < 6; ++a) {
                var xm = x + ((0x1c >> a) & 1);
                var ym = y + ((0x31 >> a) & 1);
                var m = Math.cos(xm * 2) * Math.sin(ym * 4) * 0.75;
                vertices.push(xm * scale + m, ym * scale + m, 0.);
            }
        }
    }

    return new GlObject(shader, vertices, colors);
}

function clamp(x) {
    return x < 0 ? 0 : (x > 255 ? 255 : (x | 0));
}

function vector3Sub(dest, v1, v2) {
    dest[0] = v1[0] - v2[0];
    dest[1] = v1[1] - v2[1];
    dest[2] = v1[2] - v2[2];
}

function superShapeMap(point, r1, r2, t, p) {
    point[0] = Math.cos(t) * Math.cos(p) / r1 / r2;
    point[1] = Math.sin(t) * Math.cos(p) / r1 / r2;
    point[2] = Math.sin(p) / r2;
}

function ssFunc(t, p) {
    return Math.pow(Math.pow(Math.abs(Math.cos(p[0] * t / 4)) / p[1], p[4]) +
                    Math.pow(Math.abs(Math.sin(p[0] * t / 4)) / p[2], p[5]),
                    1. / p[3]);
}

function createSuperShape(shader, params) {
    var resol1 = params[params.length - 3];
    var resol2 = params[params.length - 2];
    // latitude 0 to pi/2 for no mirrored bottom
    // (latitudeBegin==0 for -pi/2 to pi/2 originally)
    var latitudeBegin = (resol2 / 4) | 0;
    var latitudeEnd = (resol2 / 2) | 0;    // non-inclusive
    var longitudeCount = resol1;

    var vertices = [];
    var colors = [];
    var normals = [];

    var baseColor = Array(3);

    for (var i = 0; i < 3; ++i) {
        baseColor[i] = (random.uInt() % 155 + 100) / 255.;
    }

    var currentVertex = 0;
    for (var longitude = 0; longitude < longitudeCount; ++longitude) {
        for (var latitude = latitudeBegin; latitude < latitudeEnd; ++latitude) {
            var t1 = -Math.PI + longitude * 2 * Math.PI / resol1;
            var t2 = -Math.PI + (longitude + 1) * 2 * Math.PI / resol1;
            var p1 = -Math.PI / 2 + latitude * 2 * Math.PI / resol2;
            var p2 = -Math.PI / 2 + (latitude + 1) * 2 * Math.PI / resol2;

            var r0 = ssFunc(t1, params);
            var r1 = ssFunc(p1, params.slice(6, 12));
            var r2 = ssFunc(t2, params);
            var r3 = ssFunc(p2, params.slice(6, 12));

            if (r0 != 0 && r1 != 0 && r2 != 0 && r3 != 0) {
                var pa = Array(3), pb = Array(3), pc = Array(3), pd = Array(3);

                superShapeMap(pa, r0, r1, t1, p1);
                superShapeMap(pb, r2, r1, t2, p1);
                superShapeMap(pc, r2, r3, t2, p2);
                superShapeMap(pd, r0, r3, t1, p2);

                // kludge to set lower edge of the object to fixed level
                if (latitude == latitudeBegin + 1) {
                    pa[2] = pb[2] = 0;
                }

                var v1 = Array(3), v2 = Array(3), n = Array(3);
                vector3Sub(v1, pb, pa);
                vector3Sub(v2, pd, pa);

                // Calculate normal with cross product.
                n[0] = v1[1] * v2[2] - v1[2] * v2[1];
                n[1] = v1[2] * v2[0] - v1[0] * v2[2];
                n[2] = v1[0] * v2[1] - v1[1] * v2[0];

                /* Pre-normalization of the normals is disabled here because
                 * they will be normalized anyway later due to automatic
                 * normalization (NORMALIZE). It is enabled because the
                 * objects are scaled with scale.
                 */
                // Note we have to normalize by hand in the shader
                //
                var ca = pa[2] + 0.5;

                for (var i = 0; i < 6; ++i) {
                    normals.push(n[0], n[1], n[2]);
                }
                for (var i = 0; i < 6; ++i) {
                    colors.push(clamp(ca * baseColor[0] * 255));
                    colors.push(clamp(ca * baseColor[1] * 255));
                    colors.push(clamp(ca * baseColor[2] * 255));
                    colors.push(0);
                }

                vertices.push(pa[0], pa[1], pa[2]);
                vertices.push(pb[0], pb[1], pb[2]);
                vertices.push(pd[0], pd[1], pd[2]);
                vertices.push(pb[0], pb[1], pb[2]);
                vertices.push(pc[0], pc[1], pc[2]);
                vertices.push(pd[0], pd[1], pd[2]);
            }
        }
    }

    return new GlObject(shader, vertices, colors, normals);
}

function prepareFrame(width, height) {
    // Note: the viewport is automatically set up to cover the entire Canvas.
    gl.clearColor(.1, .2, .3, 1.);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

    projection.loadIdentity();
    projection.perspective(45, width / height, .5, 100);

    modelview.loadIdentity();
}

Matrix4x4.prototype.transform3 = function(v) {
    var e = this.elements;
    return [e[0] * v[0] + e[4] * v[1] + e[8] * v[2],
            e[1] * v[0] + e[5] * v[1] + e[9] * v[2],
            e[2] * v[0] + e[6] * v[1] + e[10] * v[2]];
};

function configureLightAndMaterial() {
    var light0Direction = modelview.transform3([-4., 1., 1.]);
    var light1Direction = modelview.transform3([1., -2., -1.]);
    var light2Direction = modelview.transform3([-1., 0., -4.]);

    litShader.bind();
    gl.uniform3f(litShader.light0DirectionLoc,
                 light0Direction[0],
                 light0Direction[1],
                 light0Direction[2]);
    gl.uniform3f(litShader.light1DirectionLoc,
                 light1Direction[0],
                 light1Direction[1],
                 light1Direction[2]);
    gl.uniform3f(litShader.light2DirectionLoc,
                 light2Direction[0],
                 light2Direction[1],
                 light2Direction[2]);
}

function drawModels(zScale) {
    var translationScale = 9;

    modelview.scale(1, 1, zScale);

    random.seed(9);

    for (var y = -5; y <= 5; ++y) {
        for (var x = -5; x <= 5; ++x) {
            var curShape = random.uInt() % shapeParams.length;
            var buildingScale = shapeParams[curShape][shapeParams[0].length - 1];

            modelview.push();
            modelview.translate(x * translationScale, y * translationScale, 0);

            var rv = random.uInt() % 360;

            // TODO(kwaters): bug in rotate
            // modelview.rotate(random.uInt() % 360, 0, 0, 1);
            modelview.rotate(-rv, 0, 0, 1);
            modelview.scale(buildingScale, buildingScale, buildingScale);

            shapes[curShape].draw();

            modelview.pop();
        }
    }

    var ship = shapes[shapes.length - 1];
    for (var x = -2; x <= 2; ++x) {
        var shipScale100 = translationScale * 500;
        var offs100 = x * shipScale100 + (sTick % shipScale100);
        var offs = 0.01 * offs100;

        modelview.push();
        modelview.translate(offs, -4., 2.);
        ship.draw();
        modelview.pop();

        modelview.push();
        modelview.translate(-4., offs, 4.);
        modelview.rotate(-90., 0., 0., 1.);
        ship.draw();
        modelview.pop();
    }

}

function computeNormalMatrix(matrix, normal) {
    var e = matrix.elements;

    var det = (e[0 * 4 + 0] * (e[1 * 4 + 1] * e[2 * 4 + 2] -
                               e[2 * 4 + 1] * e[1 * 4 + 2]) -
               e[0 * 4 + 1] * (e[1 * 4 + 0] * e[2 * 4 + 2] -
                               e[1 * 4 + 2] * e[2 * 4 + 0]) +
               e[0 * 4 + 2] * (e[1 * 4 + 0] * e[2 * 4 + 1] -
                               e[1 * 4 + 1] * e[2 * 4 + 0]));
    var invDet = 1. / det;

    normal[0 * 3 + 0] = invDet * (e[1 * 4 + 1] * e[2 * 4 + 2] -
                                  e[2 * 4 + 1] * e[1 * 4 + 2]);
    normal[1 * 3 + 0] = invDet * -(e[0 * 4 + 1] * e[2 * 4 + 2] -
                                   e[0 * 4 + 2] * e[2 * 4 + 1]);
    normal[2 * 3 + 0] = invDet * (e[0 * 4 + 1] * e[1 * 4 + 2] -
                                  e[0 * 4 + 2] * e[1 * 4 + 1]);
    normal[0 * 3 + 1] = invDet * -(e[1 * 4 + 0] * e[2 * 4 + 2] -
                                   e[1 * 4 + 2] * e[2 * 4 + 0]);
    normal[1 * 3 + 1] = invDet * (e[0 * 4 + 0] * e[2 * 4 + 2] -
                                  e[0 * 4 + 2] * e[2 * 4 + 0]);
    normal[2 * 3 + 1] = invDet * -(e[0 * 4 + 0] * e[1 * 4 + 2] -
                                   e[1 * 4 + 0] * e[0 * 4 + 2]);
    normal[0 * 3 + 2] = invDet * (e[1 * 4 + 0] * e[2 * 4 + 1] -
                                  e[2 * 4 + 0] * e[1 * 4 + 1]);
    normal[1 * 3 + 2] = invDet * -(e[0 * 4 + 0] * e[2 * 4 + 1] -
                                   e[2 * 4 + 0] * e[0 * 4 + 1]);
    normal[2 * 3 + 2] = invDet * (e[0 * 4 + 0] * e[1 * 4 + 1] -
                                  e[1 * 4 + 0] * e[0 * 4 + 1]);

    return normal;
}

/* Following gluLookAt implementation is adapted from the
 * Mesa 3D Graphics library. http://www.mesa3d.org
 */
Matrix4x4.prototype.lookAt = function(eyeX, eyeY, eyeZ,
                                      centerX, centerY, centerZ,
                                      upX, upY, upZ) {

    // log("lookAt");
    // log([eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ]);

    /* Z vector */
    var z = Array(3);
    z[0] = eyeX - centerX;
    z[1] = eyeY - centerY;
    z[2] = eyeZ - centerZ;
    var mag = Math.sqrt(z[0] * z[0] + z[1] * z[1] + z[2] * z[2]);
    if (mag) {
        z[0] /= mag;
        z[1] /= mag;
        z[2] /= mag;
    }

    /* Y vector */
    var y = Array(3);
    y[0] = upX;
    y[1] = upY;
    y[2] = upZ;

    /* X vector = Y cross Z */
    var x = Array(3);
    x[0] = y[1] * z[2] - y[2] * z[1];
    x[1] = -y[0] * z[2] + y[2] * z[0];
    x[2] = y[0] * z[1] - y[1] * z[0];

    /* Recompute Y = Z cross X */
    y[0] = z[1] * x[2] - z[2] * x[1];
    y[1] = -z[0] * x[2] + z[2] * x[0];
    y[2] = z[0] * x[1] - z[1] * x[0];

    /* mpichler, 19950515 */
    /* cross product gives area of parallelogram, which is < 1.0 for
     * non-perpendicular unit-length vectors; so normalize x, y here
     */

    mag = Math.sqrt(x[0] * x[0] + x[1] * x[1] + x[2] * x[2]);
    if (mag) {
        x[0] /= mag;
        x[1] /= mag;
        x[2] /= mag;
    }

    mag = Math.sqrt(y[0] * y[0] + y[1] * y[1] + y[2] * y[2]);
    if (mag) {
        y[0] /= mag;
        y[1] /= mag;
        y[2] /= mag;
    }

    var lookAt = new Matrix4x4();
    lookAt.elements[0 * 4 + 0] = x[0];
    lookAt.elements[1 * 4 + 0] = x[1];
    lookAt.elements[2 * 4 + 0] = x[2];
    lookAt.elements[3 * 4 + 0] = 0.;
    lookAt.elements[0 * 4 + 1] = y[0];
    lookAt.elements[1 * 4 + 1] = y[1];
    lookAt.elements[2 * 4 + 1] = y[2];
    lookAt.elements[3 * 4 + 1] = 0.;
    lookAt.elements[0 * 4 + 2] = z[0];
    lookAt.elements[1 * 4 + 2] = z[1];
    lookAt.elements[2 * 4 + 2] = z[2];
    lookAt.elements[3 * 4 + 2] = 0.;
    lookAt.elements[0 * 4 + 3] = 0.;
    lookAt.elements[1 * 4 + 3] = 0.;
    lookAt.elements[2 * 4 + 3] = 0.;
    lookAt.elements[3 * 4 + 3] = 1.;

    // log(lookAt.elements);

    lookAt = lookAt.multiply(this);
    this.elements = lookAt.elements;
    /*
      this.multiply(lookAt);
    */
    this.translate(-eyeX, -eyeY, -eyeZ);

    // log(this.elements);

    return this;
};

Matrix4x4.prototype.push = function() {
    this.stack = this.stack || [];
    this.stack.push(this.elements.slice());
};

Matrix4x4.prototype.pop = function() {
    this.elements = this.stack.pop();
};

function camTrack() {
    // log('camTrack');
    // log(sTick);

    nextCamTrackStartTick = currentCamTrackStartTick +
            camTracks[currentCamTrack].len * CAMTRACK_LEN;
    while (nextCamTrackStartTick <= sTick) {
        ++currentCamTrack;
        if (currentCamTrack >= camTracks.length) {
            currentCamTrack = 0;
        }
        currentCamTrackStartTick = nextCamTrackStartTick;
        nextCamTrackStartTick = currentCamTrackStartTick +
                camTracks[currentCamTrack].len * CAMTRACK_LEN;
        // log(currentCamTrack);
    }

    var cam = camTracks[currentCamTrack];
    var currentCamTick = sTick - currentCamTrackStartTick;
    var trackPos = currentCamTick / (CAMTRACK_LEN * cam.len);

    var lerp = Array(5);
    for (var a = 0; a < 5; ++a) {
        lerp[a] = 0.01 * (cam.src[a] + cam.dest[a] * trackPos);
    }

    var cX, cY, cZ, eX, eY, eZ;
    if (cam.dist) {
        var dist = cam.dist * 0.1;
        cX = lerp[0];
        cY = lerp[1];
        cZ = lerp[2];
        eX = cX - Math.cos(lerp[3]) * dist;
        eY = cY - Math.sin(lerp[3]) * dist;
        eZ = cZ - lerp[4];
    } else {
        eX = lerp[0];
        eY = lerp[1];
        eZ = lerp[2];
        cX = eX + Math.cos(lerp[3]);
        cY = eY + Math.sin(lerp[3]);
        cZ = eZ + lerp[4];
    }

    modelview.lookAt(eX, eY, eZ, cX, cY, cZ, 0, 0, 1);
}

function drawGroundPlane() {
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ZERO, gl.SRC_COLOR);

    ground.draw();

    gl.disable(gl.BLEND);
    gl.enable(gl.DEPTH_TEST);
}

function createFadeQuad() {
    var vertices = new Float32Array([
        -1., -1.,
        1., -1.,
        -1.,  1.,
        1., -1.,
        1.,  1.,
        -1.,  1.]);
    fadeVBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, fadeVBO);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
}

function drawFadeQuad() {
    if (fadeVBO == null) {
        createFadeQuad();
    }

    var beginFade = sTick - currentCamTrackStartTick;
    var endFade = nextCamTrackStartTick - sTick;
    var minFade = beginFade < endFade ? beginFade : endFade;

    if (minFade < 1024) {
        gl.disable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ZERO, gl.SRC_COLOR);
        fadeShader.bind();
        gl.uniform1f(fadeShader.minFadeLoc, minFade / 1024.);

        gl.bindBuffer(gl.ARRAY_BUFFER, fadeVBO);
        var vertexOffset = 0;
        gl.vertexAttribPointer(fadeShader.posLoc, 2, gl.FLOAT, false, 0, vertexOffset);
        gl.enableVertexAttribArray(fadeShader.posLoc);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        gl.disableVertexAttribArray(fadeShader.posLoc);

        gl.disable(gl.BLEND);
        gl.enable(gl.DEPTH_TEST);
    }
}

function appInit() {
    currentCamTrackStartTick = 0;
    nextCamTrackStartTick = 0;
    sTick = 0;
    currentCamTrack = 0;
    fadeVBO = null;

    gl.enable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);

    random.seed(15);

    flatShader = new Shader(flatVertexSource, flatFragmentSource);
    litShader = new Shader(litVertexSource, flatFragmentSource);
    fadeShader = new Shader(fadeVertexSource, flatFragmentSource);

    // bind non-changing lighting parameters
    litShader.bind();
    gl.uniform4f(litShader.ambientLoc, .2, .2, .2, 1.);
    gl.uniform4f(litShader.light0DiffuseLoc, 1., .4, 0, 1.);
    gl.uniform4f(litShader.light1DiffuseLoc, .07, .14, .35, 1.);
    gl.uniform4f(litShader.light2DiffuseLoc, .07, .17, .14, 1.);
    gl.uniform4f(litShader.light0SpecularLoc, 1., 1., 1., 1.);
    gl.uniform1f(litShader.shininessLoc, 60.);

    shapes = Array(shapeParams.length);
    for (var i = 0; i < shapes.length; ++i) {
        shapes[i] = createSuperShape(litShader, shapeParams[i])
                }
    ground = createGroundPlane(flatShader);
}

function appRender(tick, width, height) {
    // Actual tick value is "blurred" a little bit.
    sTick = (sTick + tick) >> 1;

    prepareFrame(width, height);

    camTrack();

    configureLightAndMaterial();

    modelview.push();
    drawModels(-1);
    modelview.pop();

    drawGroundPlane();

    drawModels(1);

    drawFadeQuad();
}
