<script lang="ts">
  import NodeInfo from './NodeInfo.svelte';
  import Overview from './Overview.svelte';
  import Palette from './Palette.svelte';
  let { selection = null, observedDiagram = null } = $props();
</script>

<div class="flex h-full w-64 flex-col justify-center">
  <div class="my-1 h-full border border-fp-green">
    <Palette />
  </div>
  <div class="my-1 h-full border border-fp-green">
    <NodeInfo {selection} />
  </div>
  <div class="my-1 h-96 border border-fp-green">
    <Overview {observedDiagram} />
  </div>
</div>
