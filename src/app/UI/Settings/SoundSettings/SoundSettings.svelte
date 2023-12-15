<script lang="ts">
  import { store } from "$src/app/store";
  import Icon from "@iconify/svelte";
  import SelectSound from "./SelectSound.svelte";

  $: textColor = $store.theme.selected === "dark" ? "white" : "black";
  $: borderColor = $store.theme.selected === "dark" ? "white" : "none";
  $: primary = $store.theme.active.primary;
  $: secondary = $store.theme.active.secondary;
  $: cto = $store.theme.active.cto;
  $: checked = $store.sound.quickVolume;

  function handleBack() {
    $store.currentPage = "settings";
  }

  $: selectedVolume = "medium";
  function handleQuickVolume(e: any) {
    selectedVolume = e.target.id;

    switch (selectedVolume) {
      case "low":
        $store.sound.volume = 0.1;
        break;
      case "medium":
        $store.sound.volume = 0.5;
        break;
      case "high":
        $store.sound.volume = 1;
        break;
    }
  }

  function handleRangeVolume(e: any) {
    const converted = Number(e.target.value) / 100;
    $store.sound.volume = converted;
  }

  $: SoundCollection = $store.sound.collectionPath;

  function handleSoundSelect(path: string) {
    $store.sound.activeSound = path;
  }

  function handleToggleQuickVolume(e: any) {
    $store.sound.quickVolume = e.target.checked
  }
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

  <div class="mt-5">
    <p style="color: {textColor};" class="font-semibold mt-5 text-center">
      Volume
    </p>

    <div
      style="color: {textColor}"
      class="flex items-center justify-between mt-5 gap-3 relative"
    >
      {#if checked}
        <button
          id="low"
          style="{selectedVolume === 'low'
            ? `background-color: ${cto}!important; color: black!important;`
            : `background-color: ${'rgba(0,0,0,0)'}; color: white`}; background-color: {secondary}; border: 1px solid {borderColor}; color: {textColor}"
          on:click={handleQuickVolume}
          class="w-full rounded-xl font-semibold h-10"
          type="button">Low</button
        >
        <button
          id="medium"
          style="{selectedVolume === 'medium'
            ? `background-color: ${cto}!important; color: black!important;`
            : `background-color: ${'rgba(0,0,0,0)'}; color: white`}; background-color: {secondary}; border: 1px solid {borderColor}; color: {textColor}"
          on:click={handleQuickVolume}
          class="font-semibold w-full rounded-xl h-10"
          type="button">Medium</button
        >
        <button
          id="high"
          style="{selectedVolume === 'high'
            ? `background-color: ${cto}!important; color: black!important;`
            : `background-color: ${'rgba(0,0,0,0)'}; color: white`}; background-color: {secondary}; border: 1px solid {borderColor}; color: {textColor}"
          on:click={handleQuickVolume}
          class="font-semibold w-full rounded-xl h-10"
          type="button">High</button
        >
      {:else}
        <p class="font-medium">Sound Volume</p>
        <input on:input={handleRangeVolume} type="range" name="" id="" />
      {/if}

      <div class="absolute top-14 flex items-center gap-2">
        <label class="font-medium" for="">Quick Volume</label>
        <input on:change={handleToggleQuickVolume} class=" scale-125" type="checkbox" bind:checked />
      </div>
    </div>

    <div class="mt-32">
      <p style="color: {textColor};" class="font-semibold text-center">
        Ambient Sound
      </p>

      <div class="flex flex-col gap-2 my-5">
        {#each SoundCollection as sound, index}
          <button
            on:click={() => handleSoundSelect(sound.path)}
            class="font-medium rounded-xl w-full text-left flex items-center gap-5"
            type="button"
            id={String(index)}
          >
            <p>{sound.title}</p>
            {#if $store.sound.activeSound === sound.path}
              <Icon icon="gg:check-o" class="scale-105 text-green-700" />
            {/if}
          </button>
        {/each}
      </div>
    </div>
  </div>
</section>
