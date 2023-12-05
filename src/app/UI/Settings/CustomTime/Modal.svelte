<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let openModal: boolean = false;

  function handleClick() {
    openModal = false;
    dispatch("clicked", openModal);
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<section on:click|self={handleClick} style={openModal ? "display: block" : ""} class="fixed flex z-50 items-center justify-center inset-0 hidden">
  <slot></slot>
</section>

<style>
  section {
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
