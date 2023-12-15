<script lang="ts">
  import { store } from "$src/app/store";
  import Icon from "@iconify/svelte";

  $: textColor = $store.theme.selected === "dark" ? "white" : "black";
  $: primary = $store.theme.active.primary;

  function handleBack() {
    $store.currentPage = "settings";
  }

  $: secondary = $store.theme.active.secondary;
  $: cto = $store.theme.active.cto;
  $: selectedVolume = "medium";
  function handleVolume(e: any) {
    selectedVolume = e.target.id;

    $store.sound.volume = selectedVolume as "low" | "medium" | "high";
  }
  $: console.log($store.sound.status)

</script>

<section
  style="background-color: {primary}; "
  class="fixed w-[100vw] h-[100vh] z-[600] px-3"
>
  <nav class="w-full py-3 flex items-center gap-2 relative z-[500]">
    <button
      style="color: {textColor};"
      on:click={handleBack}
      type="button"
      class="font-medium"
    >
      <Icon icon="pepicons-pop:arrow-left" class="text-3xl" />
    </button>
    <p style="color: {textColor}" class="text-xl font-semibold text-black">
      Sound
    </p>
  </nav>

  <div>
    <p style="color: {textColor};" class="font-semibold mt-5 text-center">
      Volume
    </p>

    <div
      style="color: {textColor}"
      class="flex items-center justify-between mt-5 gap-3"
    >
      <button
        id="low"
        style={selectedVolume === "low"
          ? `background-color: ${cto}; color: black; border-color: ${cto}`
          : `background-color: ${"rgba(0,0,0,0)"}; color: white`}
        on:click={handleVolume}
        class="border border-white w-full rounded-xl font-semibold h-10"
        type="button">Low</button
      >
      <button
        id="medium"
        style={selectedVolume === "medium"
          ? `background-color: ${cto}; color: black; border-color: ${cto}`
          : `background-color: ${"rgba(0,0,0,0)"}; color: white`}
        on:click={handleVolume}
        class="border border-white font-semibold w-full rounded-xl h-10"
        type="button">Medium</button
      >
      <button
        id="high"
        style={selectedVolume === "high"
          ? `background-color: ${cto}; color: black; border-color: ${cto}`
          : `background-color: ${"rgba(0,0,0,0)"}; color: white`}
        on:click={handleVolume}
        class="border border-white font-semibold w-full rounded-xl h-10"
        type="button">High</button
      >
    </div>

    <div>
      <p style="color: {textColor};" class="font-semibold mt-10 text-center">
        Ambient Sound
      </p>
    </div>
  </div>
</section>
