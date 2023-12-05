<script lang="ts">
  import Icon from "@iconify/svelte";
  import { store } from "../store";
  function gotoSettings() {
    store.update((defaults) => {
        defaults.currentPage = 'settings'
      return defaults;
    });
  }

  function gotoHome() {
    store.update((defaults) => {
        defaults.currentPage = 'home'
      return defaults;
    });

  }

$: showOption = $store.showOption 


</script>

<nav class="w-full py-3 flex px-3 items-center justify-between relative z-[500]">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <p on:click={gotoHome} class="text-2xl font-semibold text-black">Workaid</p>

  <div class="flex items-center gap-2">

    <button class="z-[60]" on:click|stopPropagation={() => showOption = !showOption}>
        <Icon class="text-2xl" icon="material-symbols:more-vert" />

    </button>
    {#if showOption}
    <div class="absolute right-0 w-fit top-2 flex flex-col bg-white">
      <p class="hover:bg-gray-300 font-semibold py-2 px-3">One Option</p>
      <p class="hover:bg-gray-300 font-semibold py-2 px-3">Another Option</p>
    </div>
    {/if}
  </div>
</nav>
