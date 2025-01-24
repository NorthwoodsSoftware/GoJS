<!--
  This component is intended to work without knowledge of the Floorplan class
-->
<script lang="ts">
  let { selection } = $props();
  let objData = $derived.by(() => {
    return selection ? Object.entries(selection.data) : [];
  });

  const inspectableDataForCategories: { [index: string]: string[] } = {
    '': ['showLabel', 'key', 'color', 'shape', 'text', 'width', 'height', 'notes', 'loc'],
    Window: ['notes'],
    Door: ['length', 'swing', 'notes'],
    Room: ['name', 'area'],
    Wall: ['notes', 'thickness'],
    DimensionLink: ['key']
  };

  let objDataSubset = $derived.by(() => {
    if (!selection) return [];
    const category = selection.data.category || '';
    let categories = inspectableDataForCategories[category];
    if (!categories) categories = ['key'];
    const newMap = new Map();
    for (const key of categories) {
      if (selection.data[key] !== undefined) {
        newMap.set(key, selection.data[key]);
      }
    }
    return newMap;
  });
</script>

<div class="flex h-full flex-col">
  <div class="border-b border-[#6cc35b] px-1 font-mono text-xs">Selected Node Information</div>

  <div class="mx-2">
    <div class="my-2">
      {selection && (selection.data.text || selection.data.name || selection.data.category)}
    </div>
    <div class="mx-2 font-mono text-sm">
      {#each [...objDataSubset] as [key, value]}
        <div>{key}: {value}</div>
      {/each}
    </div>
  </div>
</div>
