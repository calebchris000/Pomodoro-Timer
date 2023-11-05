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

let Times: any[] = [{text: '', value: 0, id: 0}]
let BreakTimes: any[] =  [{text: '', value: 0, id: 0}]
$: Times = $store.settings.Times
$: BreakTimes = $store.settings.BreakTimes
</script>

<section style="background-color: {primary};" class="w-full h-[100vh] flex flex-col items-center gap-8 app">
  <div class="flex flex-col items-center gap-8">
    <p class="font-semibold mt-20 text-center">Select how long you would like to work for</p>
    <div class="grid gap-4 max-w-[100%]">
      {#each Times as time (time.id)}
        <TimeButtons type="current" text={time.text} value={time.value} {selected} on:clicked={handleButtonClicked} />
      {/each}

      <button class="custom-time rounded-full text-sm font-semibold bg-white p-2 w-full"> Set your own time </button>
    </div>
  </div>

  <div class="flex flex-col items-center gap-8">
    <p class="font-semibold mt-10 text-center">Select how long you would like to rest</p>
    <div class="grid gap-4 max-w-[100%]">
      {#each BreakTimes as breakTime (breakTime.id)}
        <TimeButtons type="break" value={breakTime.value} selected={breakSelected} text={breakTime.text} on:clicked={handleBreakTimeSelect} />
      {/each}
      <button class="custom-time rounded-full text-sm font-semibold bg-white p-2 w-full"> Set your own time </button>
    </div>
  </div>
</section>

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
