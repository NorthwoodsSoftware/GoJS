<script lang="ts">
  let { selection } = $props();
  let objData = $derived.by(() => {
    return selection ? Object.entries(selection.data) : [];
  });
</script>

<div class="flex h-full flex-col">
  <div class="border-b border-[#6cc35b] px-1 font-mono text-xs">Selected Node Information</div>

  <div class="mx-2">
    <div class="my-2">
      {selection && (selection.data.text || selection.data.name || selection.data.category)}
    </div>
    <div class="mx-2 font-mono text-sm">
      {#each [...objData] as [key, value]}
        <div>{key}: {value}</div>
      {/each}
    </div>
  </div>
</div>
