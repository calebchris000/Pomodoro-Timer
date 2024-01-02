<script lang="ts">
  import { store } from "../store";
  import background from "$lib/images/splash_background.jpg";
  import Icon from "@iconify/svelte";
  $: primary = $store.theme.active.primary;
  $: secondary = $store.theme.active.secondary;
  $: cto = $store.theme.active.cto;
  $: textColor = $store.theme.selected === "dark" ? "white" : "black";

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
</script>

<section style="background-color: {primary}; " class="fixed w-[100vw] h-[100vh] z-[1000]">
  <div class="flex flex-col items-center justify-center relative top-60">
    <p style="color: {textColor}" class="text-4xl font-semibold relative}">Pomodoro <span class="font-bold">PRO</span></p>
    <Icon style='color: {textColor}' class="text-7xl" icon="icon-park-outline:tomato" />
  </div>
</section>

<style>
  section::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0.8;
    /* z-index: -1; */

  }
</style>
