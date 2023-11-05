<script lang="ts">
  import { store } from "$src/app/store";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher()
  export let number: number | string= 0;
  export let className: string = ""
  $: secondary = $store.theme.secondary;

  function handleClick() {
    dispatch('clicked', number)
  }
</script>

<button on:click={handleClick} style="background-color: {secondary};" class={`flex items-center justify-center rounded-md p-3 text-2xl font-medium ${className}`}>
  {number}
</button>
