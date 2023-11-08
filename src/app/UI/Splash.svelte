<script lang="ts">
  import { store } from "../store";
  import background from "$lib/images/splash_background.jpg";
  import Icon from "@iconify/svelte";
  $: primary = $store.theme.primary;
  $: secondary = $store.theme.secondary;
  $: cto = $store.theme.cto;
</script>

<section style="background-color: {secondary}; " class="fixed w-[100vw] h-[100vh] z-50">
  <div class="flex flex-col items-center justify-center relative top-60">
    <p style="color: black" class="text-4xl font-semibold relative}">Pomodoro <span class="font-bold">PRO</span></p>
    <Icon style='color: black' class="text-7xl" icon="icon-park-outline:tomato" />
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
