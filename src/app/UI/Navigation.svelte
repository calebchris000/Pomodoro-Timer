<script lang="ts">
  import Icon from "@iconify/svelte";
  import { store } from "../store";
  function gotoSettings() {
    store.update((defaults) => {
      defaults.currentPage = "settings";
      return defaults;
    });
  }

  function gotoHome() {
    store.update((defaults) => {
      defaults.currentPage = "home";
      return defaults;
    });
  }

  function gotoAccount() {
    store.update(defaults => {
      defaults.currentPage = 'account'
      return defaults
    })
  }

  $: showOption = $store.showOption;

  $: secondary = $store.theme.active.secondary;
  $: primary = $store.theme.active.primary;
  $: textColor = $store.theme.selected === "dark" ? "white" : "black";
</script>

<nav
  class="w-full py-3 flex px-3 items-center justify-between relative z-[500]"
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <p
    style="color: {textColor}"
    on:click={gotoHome}
    class="text-2xl font-semibold text-black"
  >
    Workaid
  </p>

  <div class="flex items-center gap-2">
    <button
      style="color: {textColor}"
      class="z-[60]"
      on:click|stopPropagation={() => (showOption = !showOption)}
    >
      <Icon class="text-2xl" icon="material-symbols:more-vert" />
    </button>
    {#if showOption}
      <div style="background-color: {secondary};" class="absolute right-0 w-fit top-2 z-[100] flex flex-col bg-white">
        <button
          on:click={gotoSettings}
          style="color: {textColor}"
          type="button"
          class={`hover:text-white text-left font-semibold py-2 px-3 flex items-center gap-2`}
          ><Icon class="text-lg" icon="tdesign:setting" /> Settings</button
        >
        <button
          style="color: {textColor}"
          on:click={gotoAccount}
          type="button"
          class={`hover:text-white text-left font-semibold py-2 px-3 flex items-center gap-2`}
          ><Icon class="text-xl" icon="mdi:account-outline" /> Account</button
        >
      </div>
    {/if}
  </div>
</nav>
