/*
 * Copyright (c) 2011 The Chromium Authors. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *    * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *    * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *    * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var canvas = null;
var gl = null;
var glvao = null;
var start_time = null;

function main() {
    canvas = document.getElementById("webGL");
    window.webGLCanvas = canvas;

    //canvas = WebGLDebugUtils.makeLostContextSimulatingCanvas(canvas);

    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);

    //canvas.loseContextInNCalls(200000);// tell the simulator when to lose context.

	var ratio = window.devicePixelRatio ? window.devicePixelRatio : 1;
	canvas.width = 640 * ratio;
	canvas.height = 480 * ratio;
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl)
        return;

    setupVertexArrayObject(gl);
    glvao = gl.getExtension("OES_vertex_array_object");

    initGL();
}

function log(msg) {
    if (window.console && window.console.log) {
        console.log(msg);
    }
}

function handleContextLost(e) {
    log("handle context lost");
    e.preventDefault();
}

function handleContextRestored() {
    log("handle context restored");
    //canvas.loseContextInNCalls(200000);// tell the simulator when to lose context.
    initGL();
}

function initGL() {
    gl.clearColor(0., 0., 0., 1.);
    gl.clear(gl.COLOR_BUFFER_BIT);
    appInit();
    start_time = (new Date()).getTime();
    render();
}

function render() {
    appRender((new Date()).getTime() - start_time,
              canvas.width, canvas.height);
    if (myDiagram) myDiagram.redraw();
    window.requestAnimFrame(render, canvas);
}