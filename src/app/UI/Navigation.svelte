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
</script>

<nav class="w-full py-3 flex px-3 items-center justify-between">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <p on:click={gotoHome} class="text-2xl font-semibold text-black">Workaid</p>

  <div class="flex items-center gap-2">
    <p class="text-lg mb-[0.1rem] font-medium text-center">Options</p>

    <button on:click={gotoSettings}>
        <Icon class="text-2xl" icon="material-symbols:more-vert" />

    </button>
  </div>
</nav>
