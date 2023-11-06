<script lang="ts">
  import { store } from "./../../store";
  import Break from "./CustomTime/Break.svelte";
  import Current from "./CustomTime/Current.svelte";
  import TimeButtons from "./TimeButtons.svelte";
  $: primary = $store.theme.primary;
  let selected: string = $store.settings.selectedTimeOption;
  let breakSelected: string = $store.settings.selectedBreakOption;
  function handleButtonClicked(event: CustomEvent) {
    selected = event.detail.text;
    $store.settings.selectedTimeOption = event.detail.text
    let value = event.detail.value;
    $store.timer.time = { minutes: value.minutes, seconds: value.seconds };
    $store.timer.runningTimer = { minutes: value.minutes, seconds: value.seconds };
  }

  function handleBreakTimeSelect(event: CustomEvent) {
    breakSelected = event.detail.text;
    console.log(event.detail.value)
    let value = event.detail.value
    $store.settings.selectedBreakOption = event.detail.text
    $store.timer.break = {minutes: value.minutes, seconds: value.seconds}
  }

  $: Times = $store.settings.Times;
  $: BreakTimes = $store.settings.BreakTimes;

  let openModal: boolean = false;
  let openBreakModal: boolean = false;
</script>

<section style="background-color: {primary};" class="w-full h-[100vh] flex flex-col items-center gap-8 app">
  <div class="flex flex-col items-center gap-8">
    <p class="font-semibold mt-20 text-center">Select how long you would like to work for</p>
    <div class="grid gap-4 max-w-[100%]">
      {#each Times as time}
        <TimeButtons type="current" text={time.text} value={{ minutes: time.minutes, seconds: time.seconds }} {selected} on:clicked={handleButtonClicked} />
      {/each}

      <button on:click={() => (openModal = true)} class="custom-time rounded-full text-sm font-semibold bg-white p-2 w-full"> Set your own time </button>
      <Current on:clicked={(e) => (openModal = e.detail)} {openModal} />
    </div>
  </div>

  <div class="flex flex-col items-center gap-8">
    <p class="font-semibold mt-10 text-center">Select how long you would like to rest</p>
    <div class="grid gap-4 max-w-[100%]">
      {#each BreakTimes as breakTime}
        <TimeButtons
          type="break"
          value={{ minutes: breakTime.minutes, seconds: breakTime.seconds }}
          selected={breakSelected}
          text={breakTime.text}
          on:clicked={handleBreakTimeSelect}
        />
      {/each}
      <button on:click={() => openBreakModal = true} class="custom-time rounded-full text-sm font-semibold bg-white p-2 w-full"> Set your own time </button>
      <Break on:clicked={(e) => (openBreakModal = e.detail)} {openBreakModal} />
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
