<script lang="ts">
  import Diagram from '$lib/components/Diagram.svelte';
  import DiagramControls from '$lib/components/DiagramControls.svelte';
  import LeftBar from '$lib/components/LeftBar.svelte';
  import type { Floorplan } from '$lib/gojs/Floorplan';

  // To pass to the NodeInfo component in the LeftBar
  let selection: go.Part | null = null;
  // To pass to the Overview in the LeftBar
  let myFloorplan: Floorplan | null = null;
</script>

<div class="bg-fp-beige mx-3 flex h-full flex-col">
  <h1>GoJS Floorplanner (in Svelte)</h1>

  <div class=" flex flex-1 flex-row">
    <div class="">
      <LeftBar {selection} observedDiagram={myFloorplan} />
    </div>

    <div class="border-fp-green relative my-1 ml-2 w-full border">
      <div class="absolute z-0 h-full w-full">
        <Diagram bind:selection bind:myFloorplan />
      </div>
      <div class="border-fp-green bg-fp-beige absolute left-2 top-2 rounded-md border p-2">
        <DiagramControls floorplan={myFloorplan} />
      </div>
    </div>
  </div>

  <div class="border-fp-green mb-3 border p-2">
    <p>
      This GoJS Floorplanner sample demonstrates the <a
        href="https://gojs.net/latest/index.html"
        target="_blank">GoJS</a
      > diagramming library used in a simple Svelte app. The demo contains:
    </p>
    <ul>
      <li>
        A custom Diagram class, called Floorplan, which attempts to determine rooms and compute
        their sizes based on the walls in the diagram.
      </li>
      <li>A Palette in a component to drag and drop furniture items onto the main Diagram.</li>
      <li>A Node Information box that updates based on the current selection</li>
      <li>
        An Overview in a component to view a mini-map of the Floorplan Diagram. This is chiefly to
        demonstrate passing the Diagram to another component.
      </li>
      <li>
        Several other customizations specific to floor planning:
        <ol>
          <li>A custom tool to build new wall nodes and another one to reshape them.</li>
          <li>Drag computation functions for window and doors, to keep them inside walls.</li>
          <li>Selection adornments to visualize the size of windows, doors, and walls.</li>
        </ol>
      </li>
    </ul>
    <p>
      Because of this sample's complexity, it is meant as a demonstration of several GoJS features
      and a demonstration of GoJS alongside Svelte, rather than a starting point for your own
      project. We are happy to help you begin a proof-of-concept for your own project, regardless of
      your needs. <a href="https://nwoods.com/support.html" target="_blank">Contact us</a> for more information.
    </p>
    <p>
      <a target="_blank" href="https://github.com/NorthwoodsSoftware/GoJS/tree/master/projects"
        >The GoJS-Floorplanner project source code can be found here.</a
      >
    </p>
    <p>
      <a href="https://gojs.net">gojs.net</a> -
      <a href="https://gojs.net/latest/samples/">see all GoJS samples</a>
    </p>
  </div>
</div>
