<script lang="ts">
  import { store } from "$src/app/store";
  import Icon from "@iconify/svelte";
  $: primary = $store.theme.active.primary;
  $: secondary = $store.theme.active.secondary;
  $: cto = $store.theme.active.cto;

  function goToTimer() {
    $store.currentPage = "TimerSettings";
  }
  function gotoCustomization() {
    $store.currentPage = "CustomizationSetting";
  }

  function handleBack() {
    $store.currentPage = "home";
  }

  function gotoSound() {
    $store.currentPage = "sound";
  }
  $: textColor = $store.theme.selected === "dark" ? "white" : "black";
</script>

<section
  style="background-color: {primary};"
  class="w-full h-[100vh] flex flex-col gap-8 app z-[999] fixed"
>
  <h2
    style="color: {textColor};"
    class="w-full p-4 font-semibold text-2xl flex items-center gap-3"
  >
    <button
      style="color: {textColor};"
      on:click={handleBack}
      type="button"
      class="font-medium"
    >
      <Icon icon="pepicons-pop:arrow-left" class="text-3xl" />
    </button> Settings
  </h2>

  <div class="w-full px-4 flex flex-col gap-5">
    <button
      on:click={goToTimer}
      type="button"
      style="color: {textColor};"
      class="w-full text-left font-medium text-lg flex items-center gap-2"
      ><Icon class="text-xl" icon="ph:clock-bold" /> Timer</button
    >
    <button
      on:click={gotoCustomization}
      style="color: {textColor};"
      type="button"
      class="w-full text-left font-medium text-lg flex items-center gap-2"
      ><Icon class="text-xl" icon="mdi:art" />App Theme</button
    >

    <button
      on:click={gotoSound}
      style="color: {textColor};"
      type="button"
      class="w-full text-left font-medium text-lg flex items-center gap-2"
      ><Icon
        class="text-xl"
        icon="lets-icons:sound-fill"
      />Sound</button
    >
  </div>
</section>
