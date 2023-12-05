<script lang="ts">
  import { store } from "$src/app/store";
  import Icon from "@iconify/svelte";
  $: primary = $store.theme.primary;
  $: secondary = $store.theme.secondary;
  $: cto = $store.theme.cto;

  function goToTimer() {
    $store.currentPage = "TimerSettings"
  }
</script>

<section
  style="background-color: {primary};"
  class="w-full h-[100vh] flex flex-col gap-8 app z-[999] border-2 border-red-500 fixed"
>
  <h2 class="w-full p-4 font-semibold text-2xl">Settings</h2>

  <div class="w-full px-4 flex flex-col gap-5">
    <button on:click={goToTimer} type="button" class="w-full text-left font-medium text-lg flex items-center gap-1"><Icon class="text-xl" icon="ph:clock-bold"/> Timer</button>
    <button type="button" class="w-full text-left font-medium text-lg flex items-center gap-1"><Icon class="text-xl" icon="mdi:art"/>Customization</button>
  </div>
</section>
