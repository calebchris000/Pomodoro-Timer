<script lang="ts">
  import { store } from "$src/app/store";
  import Icon from "@iconify/svelte";
  import Break from "../CustomTime/Break.svelte";
  import Current from "../CustomTime/Current.svelte";
  import TimeButtons from "./TimeButtons.svelte";
  $: primary = $store.theme.active.primary;
  let selected: string = $store.settings.selectedTimeOption;
  let breakSelected: string = $store.settings.selectedBreakOption;
  function handleButtonClicked(event: CustomEvent) {
    selected = event.detail.text;
    $store.settings.selectedTimeOption = event.detail.text;
    let value = event.detail.value;
    $store.timer.time = { minutes: value.minutes, seconds: value.seconds };
    $store.timer.runningTimer = {
      minutes: value.minutes,
      seconds: value.seconds,
    };
  }

  function handleBreakTimeSelect(event: CustomEvent) {
    breakSelected = event.detail.text;
    let value = event.detail.value;
    $store.settings.selectedBreakOption = event.detail.text;
    $store.timer.break = { minutes: value.minutes, seconds: value.seconds };
  }
  let deleteModeCurrent: boolean = false;
  let deleteModeBreak: boolean = false;

  function handleDeleteTime(event: any) {
    if(event.target.id === "current") {
      deleteModeCurrent = !deleteModeCurrent
      if(deleteModeCurrent && deleteModeBreak) {
        deleteModeBreak = false
      }
    }
    else  if(event.target.id === "break"){
      deleteModeBreak = !deleteModeBreak
      if(deleteModeCurrent && deleteModeBreak) {
        deleteModeCurrent = false
      }
    }
  }

  function handleBack() {
    $store.currentPage = "settings";
  }

  $: Times = $store.settings.Times;
  $: BreakTimes = $store.settings.BreakTimes;
  $: secondary = $store.theme.active.secondary
  $: cto = $store.theme.active.cto
  let openModal: boolean = false;
  let openBreakModal: boolean = false;
  $: textColor = $store.theme.selected === "dark" ? "white" : "black";
  $: bgColor = $store.theme.selected === "dark" ? secondary : cto

</script>

<section
  style="background-color: {primary};"
  class="fixed w-[100vw] h-[100vh] z-[600] px-3 flex flex-col items-center gap-8 app"
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
  <div class="flex flex-col items-center gap-8">
    <p style="color: {textColor};" class="font-semibold mt-20 text-center">
      Select how long you would like to work for
    </p>
    <div class="grid gap-4 max-w-[100%]">
      {#each Times as time, index}
        <TimeButtons
          type="current"
          text={time.text}
          {index}
          value={{ minutes: time.minutes, seconds: time.seconds }}
          {selected}
          deleteMode={deleteModeCurrent}
          on:clicked={handleButtonClicked}
        />
      {/each}

      <div class=" flex items-center gap-2 w-full col-span-2">
        <button
        style="background: {bgColor}; color: {textColor}"
        on:click={() => (openModal = true)}
          class="custom-time rounded-full text-sm font-semibold bg-white p-2 w-full"
          >Custom timer</button
        >
        <button
          on:click={handleDeleteTime}
          id="current"
          style={`${deleteModeCurrent && "background: green; color: white"}`}
          class="rounded-full text-sm font-semibold bg-[#f87171] p-2 w-full"
          >{deleteModeCurrent ? "Cancel" : "Delete Times"}</button
        >
      </div>
      <Current on:clicked={(e) => (openModal = e.detail)} {openModal} />
    </div>
  </div>

  <div class="flex flex-col items-center gap-8">
    <p style="color: {textColor};" class="font-semibold mt-20 text-center">
    
      Select how long you would like to rest
    </p>
    <div class="grid gap-4 max-w-[100%]">
      {#each BreakTimes as breakTime, index}
        <TimeButtons
          type="break"
          value={{ minutes: breakTime.minutes, seconds: breakTime.seconds }}
          selected={breakSelected}
          text={breakTime.text}
          {index}
          deleteMode={deleteModeBreak}
          on:clicked={handleBreakTimeSelect}
        />
      {/each}
      <div class=" flex items-center gap-2 w-full col-span-2">
        <button
        style="background: {bgColor}; color: {textColor}"
          on:click={() => (openBreakModal = true)}
          class="custom-time rounded-full text-sm font-semibold bg-white p-2 w-full"
        >
          Custom Timer
        </button>
        <button
          on:click={handleDeleteTime}
          id="break"
          style={`${deleteModeBreak && "background: green; color: white"}`}
          class="rounded-full text-sm font-semibold bg-[#f87171] p-2 w-full"

          >{deleteModeBreak ? "Cancel" : "Delete Times"}</button
          >
  

        
      </div>
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
