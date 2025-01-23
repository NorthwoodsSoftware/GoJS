<script lang="ts">
  import go from 'gojs';
  import Diagram from './Diagram.svelte';
  import ThreeCamera from './ThreeCamera.svelte';
  interface Props {
    selection: go.Part | null;
  }

  let { selection = $bindable() }: Props = $props();

  const myModel = new go.GraphLinksModel([
    { loc: [0, 0, 0], size: [80, 60, 200], color: '#b3eed6' },
    { loc: [200, 0, 0], size: [60, 60, 60], color: '#f6a498' },
    { loc: [0, 100, 0], size: [30, 30, 30], color: '#cbfdea' },
    { loc: [50, 100, 0], size: [30, 30, 30], color: '#86dcd2' },
    { loc: [100, 100, 0], size: [30, 30, 30], color: '#a1d9d9' },
    { loc: [150, 100, 0], size: [30, 30, 30], color: '#83a2a4' },
    { loc: [200, 100, 0], size: [30, 30, 30], color: '#c4aa97' },
    { loc: [100, 200, 0], size: [130, 50, 40], color: '#f2e1be' }
  ]);
</script>

<div class="grid h-full w-full grid-cols-2 grid-rows-2 gap-1">
  <!-- camera -->
  <ThreeCamera model={myModel} {selection} />
  <!-- top x/y -->
  <Diagram axis1={'X'} axis2={'Y'} model={myModel} bind:selection />
  <!-- front y/z -->
  <Diagram axis1={'Y'} axis2={'Z'} model={myModel} bind:selection />
  <!-- side x/z -->
  <Diagram axis1={'X'} axis2={'Z'} model={myModel} bind:selection />
</div>
