<!--
  This component is intended to work without knowledge
  of the Floorplan class

  It is passed a Diagram (that so happens to be the Floorplan)
  and updates its observed Diagram when this changes.
-->
<script lang="ts">
  import go from 'gojs';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  let { observedDiagram = null } = $props();
  let myOverview: go.Overview;
  let diagramDiv: HTMLDivElement;

  onMount(() => {
    go.Diagram.licenseKey =
      '2b8644e0b7634dc702d90676423d6bbc5cf07e34cf960ef6580013f4bf586944779be17805db8ad2c2ff46ac1a7d938a8f913c29904c0133e53481d546e6d5feb33323b5440a44dda21136c5ccaa2ca1ae2870e0d2b676a1de678dedef';
    myOverview = new go.Overview(diagramDiv, {
      contentAlignment: go.Spot.Center,
      // observed: observedDiagram
      drawsTemporaryLayers: false
    });
    myOverview.box.opacity = 0; // Disable visual overview box

    // We want Svelte to modify this value whenever it is set
    $effect(() => {
      myOverview.observed = observedDiagram;
    });

    // attached only for debug and demonstration:
    if (browser) (window as any).myOverview = myOverview;
  });
</script>

<div class="flex h-full flex-col">
  <div class="border-b border-[#6cc35b] px-1 font-mono text-xs">Overview</div>
  <div class="w-full flex-1 flex-grow" bind:this={diagramDiv}></div>
</div>
