<!--
 The Diagram component holds a Floorplan, which is a GoJS Diagram subclass
 custom for this Svelte app.

 This is meant as a demonstration
-->
<script lang="ts">
  import go from 'gojs';
  import { Floorplan } from '$lib/gojs/Floorplan';
  import { initialModel } from '$lib/gojs/model';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  let diagramDiv: HTMLDivElement;

  interface Props {
    myFloorplan: Floorplan | null;
    selection: go.Part | null;
  }

  // Bindable selection to pass up to the page, so it can pass it to the LeftBar
  let { selection = $bindable(), myFloorplan = $bindable() }: Props = $props();

  onMount(() => {
    go.Diagram.licenseKey =
      '2b8644e0b7634dc702d90676423d6bbc5cf07e34cf960ef6580013f4bf586944779be17805db8ad2c2ff46ac1a7d938a8f913c29904c0133e53481d546e6d5feb33323b5440a44dda21136c5ccaa2ca1ae2870e0d2b676a1de678dedef';
    myFloorplan = new Floorplan(diagramDiv, {
      'animationManager.isInitial': false,
      'undoManager.isEnabled': true,
      'layout.isInitial': false,
      'layout.isOngoing': false,
      ChangedSelection: (c) => {
        selection = (c.subject as go.List<go.Part>).first();
      }
    });
    // attached only for debug and demonstration:
    if (browser) (window as any).myFloorplan = myFloorplan;

    myFloorplan.grid = new go.Panel('Grid', {
      gridCellSize: new go.Size(
        myFloorplan.model.modelData.gridSize,
        myFloorplan.model.modelData.gridSize
      ),
      visible: true
    }).add(
      new go.Shape('LineH', { stroke: 'lightgray' }),
      new go.Shape('LineV', { stroke: 'lightgray' })
    );

    // listen if the model of the Floorplan changes
    // if so, there has been a load event, and we must update walls and rooms
    myFloorplan.addDiagramListener('InitialLayoutCompleted', function (e) {
      const fp = e.diagram as Floorplan;
      // update walls and rooms geometries
      for (const n of fp.nodes) {
        if (n.category === 'Wall') {
          fp.updateWall(n as go.Group);
        }
        if (n.category === 'Room') {
          fp.updateRoom(n);
        }
      }
    });

    myFloorplan.model = go.Model.fromJson(initialModel);
  });
</script>

<div class="h-full w-full p-[1px]">
  <div bind:this={diagramDiv} class="diagram h-full w-full select-none"></div>
</div>
