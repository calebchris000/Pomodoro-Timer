<script lang="ts">
  import { store } from "./../../store";
  import TimeButtons from "./TimeButtons.svelte";
  $: primary = $store.theme.primary;
  let selected: string = $store.settings.selectedMinute;
  let breakSelected: string = $store.settings.selectedBreakMinute;
  function handleButtonClicked(event: CustomEvent) {
    selected = event.detail;
  }

  function handleBreakTimeSelect(event: CustomEvent) {
    breakSelected = event.detail;
  }

  console.log('mounted')
</script>

<section style="background-color: {primary};" class="w-full h-[100vh] flex flex-col items-center gap-8 app">
  <div class="flex flex-col items-center gap-8">
    <p class="font-semibold mt-20 text-center">Select how long you would like to work for</p>
    <div class="grid gap-4 max-w-[100%]">
      <TimeButtons value={10} {selected} on:clicked={handleButtonClicked} />
      <TimeButtons value={15} {selected} text={"15 minutes"} on:clicked={handleButtonClicked} />
      <TimeButtons value={25} {selected} text={"25 minutes"} on:clicked={handleButtonClicked} />
      <TimeButtons value={40} {selected} text={"40 minutes"} on:clicked={handleButtonClicked} />

      <button class="custom-time rounded-full text-sm font-semibold bg-white p-2 w-full"> Set your own time </button>
    </div>
  </div>

  <div class="flex flex-col items-center gap-8">
    <p class="font-semibold mt-10 text-center">Select how long you would like to rest</p>
    <div class="grid gap-4 max-w-[100%]">
      <TimeButtons type="break" value={5} selected={breakSelected} text="5 minutes" on:clicked={handleBreakTimeSelect} />
      <TimeButtons type="break" value={10} selected={breakSelected} text={"10 minutes"} on:clicked={handleBreakTimeSelect} />
      <TimeButtons type="break" value={15} selected={breakSelected} text={"15 minutes"} on:clicked={handleBreakTimeSelect} />
      <TimeButtons type="break" value={20} selected={breakSelected} text={"20 minutes"} on:clicked={handleBreakTimeSelect} />

      <button class="custom-time rounded-full text-sm font-semibold bg-white p-2 w-full"> Set your own time </button>
    </div>
  </div>
</section>

<svelte:head>
    <title>Settings</title>
</svelte:head>

<style>
  .custom-time {
    grid-column: 1 / -1;
  }
  @media (max-width: 374px) {
    .grid {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
    }
  }

  @media (min-width: 375px) {
    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
