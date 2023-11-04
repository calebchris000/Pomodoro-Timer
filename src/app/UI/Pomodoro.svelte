<script lang="ts">
  import Home from "./Home.svelte";

  import Navigation from "./Navigation.svelte";
  import { store } from "../store";
  import Setting from "./Settings/Setting.svelte";
  import { Timer as TimerLogic } from "../Logic/Timer";
  import type { TimerInterface } from "../Logic/Timer";
  import Splash from "./Splash.svelte";
  import { onMount } from "svelte";
  $: primary = $store.theme.primary;
  $: currentPage = $store.currentPage;
  let timeFromStore = $store.timer.time;
  let breakTime = $store.timer.break;

  let timerInterface: TimerInterface = { minutes: 0, seconds: 0, fullSeconds: 0 };

  let timer = new TimerLogic((c: any) => {
    timerInterface = c;
  });

  $: $store.timer.runningTimer.minutes = timerInterface.minutes;
  $: $store.timer.runningTimer.seconds = timerInterface.seconds;

  let signal: string;
  store.subscribe((defaults) => {
    signal = defaults.timer.signal;
  });
  $: {
    switch (signal) {
      case "ongoing":
        timer.set(timeFromStore.minutes, timeFromStore.seconds);
        timer.start();
        break;
      case "pause":
        timer.pause();
        break;
      case "break":
        timer.set(breakTime.minutes, breakTime.seconds);
        timer.start();
        break;
      case "resume":
        timer.start();
        break;
      case "reset":
        timer.set(timeFromStore.minutes, timeFromStore.seconds);
        $store.timer.runningTimer = { minutes: timeFromStore.minutes, seconds: timeFromStore.seconds };
        break;
    }
  }

  function startBreakTime() {
    timer.set(breakTime.minutes, breakTime.seconds);
    timer.start();
  }
  $: {
    if (timerInterface.fullSeconds === 0 && $store.timer.signal === "ongoing") {
      store.update((defaults) => {
        defaults.timer.signal = "break";
        return defaults;
      });
      startBreakTime();
    }
  }

  timer.set(timeFromStore.minutes, timeFromStore.seconds);

    setTimeout(() => {
      $store.currentPage = "home";
    }, 3000);
</script>

<section style="background-color: {primary};" class="w-full h-[100vh] fixed overflow-y-scroll flex flex-col gap-8 app">
  <Navigation />

  {#if currentPage === "splash"}
  <Splash />
  {:else if currentPage === "home"}
  <Home />
  {:else if currentPage === 'settings'}
  <Setting />
  {/if}
</section>

<svelte:head>
  <title>{currentPage === "home" ? "Home" : "Settings"}</title>
</svelte:head>

<style>
  .app {
    font-family: "Poppins", sans-serif;
  }

  :root {
    user-select: none;
  }
</style>
