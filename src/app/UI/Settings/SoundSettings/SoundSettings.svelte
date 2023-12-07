<script lang="ts">
  import { store } from "$src/app/store";
  import Icon from "@iconify/svelte";

  $: textColor = $store.theme.selected === "dark" ? "white" : "black";
  $: primary = $store.theme.active.primary;

  function handleBack() {
    $store.currentPage = 'settings'
  }
</script>

<section
  style="background-color: {primary}; "
  class="fixed w-[100vw] h-[100vh] z-[600]"
>
<nav class="w-full py-3 flex px-3 items-center gap-2 relative z-[500]">
    <button style="color: {textColor};" on:click={handleBack} type="button" class="font-medium">
      <Icon icon="pepicons-pop:arrow-left" class="text-3xl" />
    </button>
    <p style="color: {textColor}" class="text-xl font-semibold text-black">Sound</p>
  </nav>
 <p style="color: {textColor}">The sound setting's page</p>
</section>
