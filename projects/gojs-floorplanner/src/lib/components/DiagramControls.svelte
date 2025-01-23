<script lang="ts">
  import type { Floorplan } from '$lib/gojs/Floorplan';

  interface Props {
    floorplan: Floorplan | null;
  }
  let { floorplan = null }: Props = $props();

  let current: HTMLButtonElement | null = null;

  let picked = $state('select');
  $effect(() => {
    if (floorplan === null) return;
    if (picked === 'select') floorplan.disableWallBuilding();
    if (picked === 'walls') floorplan.enableWallBuilding();
  });
</script>

<div>Picked: {picked}</div>

<div class="select-none">
  <div>
    <input id="select" name="tool" bind:group={picked} type="radio" value="select" />
    <label for="select">Select</label>
  </div>
  <div>
    <input id="walls" name="tool" bind:group={picked} type="radio" value="walls" />
    <label for="walls">Build Walls</label>
  </div>
</div>
