<!--
  This component is intended to work without knowledge of the Floorplan class
-->
<script lang="ts">
  import { browser } from '$app/environment';
  import { nodeTemplateMap } from '$lib/gojs/templates/Nodes';
  import { TemplateColors, TemplateGeometries } from '$lib/gojs/templates/Shared';
  let {} = $props();
  import go from 'gojs';
  import { onMount } from 'svelte';
  let myPalette;
  let diagramDiv: HTMLDivElement;

  const paletteModel = [
    {
      key: 'generic',
      caption: 'Generic Object',
      type: 'Round Table',
      shape: 'Rectangle',
      color: TemplateColors.furn3,
      width: 64,
      height: 64,
      notes: ''
    },
    {
      key: 'roundTable',
      caption: 'Round Table',
      type: 'Round Table',
      shape: 'Ellipse',
      width: 61,
      height: 61,
      notes: ''
    },
    {
      key: 'armChair',
      caption: 'Arm Chair',
      type: 'Arm Chair',
      geo: TemplateGeometries.armChair,
      width: 45,
      height: 45,
      notes: ''
    },
    {
      key: 'sofaMedium',
      caption: 'Sofa',
      type: 'Sofa',
      geo: TemplateGeometries.sofaMedium,
      height: 45,
      width: 90,
      notes: ''
    },
    {
      key: 'sink',
      caption: 'Sink',
      type: 'Sink',
      geo: TemplateGeometries.sink,
      width: 27,
      height: 27,
      notes: ''
    },
    {
      key: 'doubleSink',
      caption: 'Double Sink',
      type: 'Double Sink',
      geo: TemplateGeometries.doubleSink,
      height: 27,
      width: 52,
      notes: ''
    },
    {
      key: 'toilet',
      caption: 'Toilet',
      type: 'Toilet',
      geo: TemplateGeometries.toilet,
      width: 25,
      height: 35,
      notes: ''
    },
    {
      key: 'shower',
      caption: 'Shower/Tub',
      type: 'Shower/Tub',
      geo: TemplateGeometries.shower,
      width: 45,
      height: 75,
      notes: ''
    },
    {
      key: 'bed',
      caption: 'Bed',
      type: 'Bed',
      geo: TemplateGeometries.bed,
      width: 76.2,
      height: 101.6,
      notes: ''
    },
    {
      key: 'stove',
      caption: 'Stove',
      type: 'Stove',
      geo: TemplateGeometries.stove,
      width: 75,
      height: 75,
      notes: ''
    },
    {
      key: 'diningTable',
      caption: 'Dining Table',
      type: 'Dining Table',
      geo: TemplateGeometries.diningTable,
      width: 125,
      height: 62.5,
      notes: ''
    }
  ];

  onMount(() => {
    go.Diagram.licenseKey =
      '2b8644e0b7634dc702d90676423d6bbc5cf07e34cf960ef6580013f4bf586944779be17805db8ad2c2ff46ac1a7d938a8f913c29904c0133e53481d546e6d5feb33323b5440a44dda21136c5ccaa2ca1ae2870e0d2b676a1de678dedef';
    myPalette = new go.Palette(diagramDiv, {
      // 'animationManager.isInitial': false
      scale: 0.65,
      nodeTemplateMap: nodeTemplateMap,
      model: new go.GraphLinksModel(paletteModel)
    });
    // attached only for debug and demonstration:
    if (browser) (window as any).myPalette = myPalette;
  });
</script>

<div class="flex h-full flex-col">
  <div class="border-b border-[#6cc35b] px-1 font-mono text-xs">Furniture Palette</div>
  <div class="w-full flex-1 flex-grow p-[1px]">
    <div class="h-full w-full" bind:this={diagramDiv}></div>
  </div>
</div>
