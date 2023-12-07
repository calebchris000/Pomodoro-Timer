<script lang="ts">
  import { store } from "$src/app/store";
  import Icon from "@iconify/svelte";
  import Mode from "./Mode.svelte";
  import light from "$lib/images/light_mode.png";
  import dark from "$lib/images/night_mode.png";

  $: selected = $store.theme.selected;
  $: primary = $store.theme.active.primary;

  $: {
    switch ($store.theme.selected) {
      case "light":
      store.update(defaults => {
        defaults.theme.active.primary = $store.theme.light.primary
        defaults.theme.active.secondary = $store.theme.light.secondary
        defaults.theme.active.cto = $store.theme.light.cto
        return defaults
      })
      break
      case "dark":
      store.update(defaults => {
        defaults.theme.active.primary = $store.theme.dark.primary
        defaults.theme.active.secondary = $store.theme.dark.secondary
        defaults.theme.active.cto = $store.theme.dark.cto
        return defaults
      })
      break

      case "custom":
        // $store.theme.active.primary = $store.theme.c.primary;
        // $store.theme.active.secondary = $store.theme.dark.secondary;
        // $store.theme.active.cto = $store.theme.dark.cto;
    }
  }
$: textColor = $store.theme.selected === "dark" ? "white" : "black"

function handleBack() {
    store.update(defaults => {
        defaults.currentPage = "settings"
        return defaults
    })
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
    <p style="color: {textColor}" class="text-xl font-semibold text-black">App Theme</p>
  </nav>

  <div class="flex items-center justify-between gap-5 p-3">
    <Mode src={light} title="Light" />
    <Mode
      titleStyle="text-white"
      imgStyle="transform scale-x-[-1]"
      src={dark}
      title="Dark"
    />
  </div>
</section>
