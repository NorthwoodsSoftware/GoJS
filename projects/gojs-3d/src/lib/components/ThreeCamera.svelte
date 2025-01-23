<script lang="ts">
  import type { NodeData } from '$lib/types';
  import go from 'gojs';
  import { onMount } from 'svelte';
  import * as THREE from 'three';
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

  interface Props {
    model?: go.GraphLinksModel;
    selection: go.Part | null;
  }

  const selectionColor = 'red';

  let { model, selection }: Props = $props();

  let canvasElement: HTMLCanvasElement;
  let outerDiv: HTMLDivElement;
  let renderer: THREE.WebGLRenderer;
  let controls: OrbitControls;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xcccccc);
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 2000);
  const dirLight1 = new THREE.DirectionalLight(0xffffff, 3);
  dirLight1.position.set(1, 1, 1);
  scene.add(dirLight1);
  const dirLight2 = new THREE.DirectionalLight(0x002288, 3);
  dirLight2.position.set(-1, -1, -1);
  scene.add(dirLight2);
  const ambientLight = new THREE.AmbientLight(0x555555);
  scene.add(ambientLight);
  camera.position.set(-150, -500, 300);
  // This GoJS demo treats the Z axis as vertical (z up)
  // This is not the default in ThreeJS, so we need to change it:
  camera.up = new THREE.Vector3(0, 0, 1);

  let currentSelectedObject: go.Part | null = null;

  function resizeCanvasToDisplaySize() {
    const width = outerDiv.clientWidth;
    const height = outerDiv.clientHeight;
    // adjust displayBuffer size to match
    if (canvasElement.width !== width || canvasElement.height !== height) {
      // you must pass false here or three.js fights the browser
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
  }

  function animate() {
    resizeCanvasToDisplaySize();
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  function createScene(el: HTMLCanvasElement) {
    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });
    controls = new OrbitControls(camera, renderer.domElement);

    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 100;
    controls.maxPolarAngle = Math.PI / 2;
    controls.target = new THREE.Vector3(200, 0, 0);

    controls.update();
    animate();
  }

  function sizeCube(n: NodeData, cube: THREE.Object3D) {
    cube.position.set(
      n.loc[0] + n.size[0] / 2,
      -n.loc[1] - n.size[1] / 2,
      -n.loc[2] + n.size[2] / 2
    );
  }

  function addObject(n: NodeData) {
    const isSelected = currentSelectedObject?.key === n.key;
    const geometry = new THREE.BoxGeometry(n.size[0], n.size[1], n.size[2]);
    const material = new THREE.MeshLambertMaterial({
      color: isSelected ? selectionColor : n.color,
      emissive: new THREE.Color(isSelected ? selectionColor : n.color),
      emissiveIntensity: 0.5
    });
    const cube = new THREE.Mesh(geometry, material);
    sizeCube(n, cube);
    cube.name = n.key;
    scene.add(cube);
  }

  onMount(() => {
    createScene(canvasElement);
    if (model) {
      for (const n of model.nodeDataArray) {
        addObject(n as NodeData);
      }

      const listenProps = new Set(['loc', 'size', 'nodeDataArray']);
      model.addChangedListener((e) => {
        const prop = e.propertyName as string;
        const data = e.object as NodeData;
        if (!listenProps.has(prop) || !data) return;

        if (prop === 'nodeDataArray') {
          if (e.oldValue === null && e.newValue) {
            addObject(e.newValue as NodeData); // add node
          } else if (e.oldValue && e.newValue === null) {
            const obj = scene.getObjectByName(e.oldValue.key);
            if (!obj) return;
            scene.remove(obj); // delete node
          }
          return;
        }

        const obj = scene.getObjectByName(data.key);
        if (!obj) return;
        switch (prop) {
          case 'loc':
            sizeCube(data, obj);
            break;
          case 'size':
            scene.remove(obj);
            addObject(data);
        }
      });
    }

    function updateColorByKey(key: string, color: string) {
      const obj = scene.getObjectByName(key) as THREE.Mesh;
      if (!obj) return;
      const material = obj.material as THREE.MeshLambertMaterial;
      material.color.set(color);
      material.emissive.set(color);
      material.needsUpdate = true;
    }

    // Update selection to red
    $effect(() => {
      if (currentSelectedObject?.key === selection?.key) return;
      if (selection) {
        updateColorByKey(selection.key as string, selectionColor);
      }
      // old object
      if (currentSelectedObject) {
        updateColorByKey(currentSelectedObject.key as string, currentSelectedObject.data.color);
      }
      currentSelectedObject = selection;
      animate();
    });
  });
</script>

<div class="h-full w-full leading-[0rem]" bind:this={outerDiv}>
  <canvas bind:this={canvasElement}></canvas>
</div>
