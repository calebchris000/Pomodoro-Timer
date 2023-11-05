<script lang="ts">
  import Home from "./Home.svelte";
  import { timerInstance as timer, type timer as timerType } from "../Logic/TimerInstance";
  import Navigation from "./Navigation.svelte";
  import { store } from "../store";
  import Setting from "./Settings/Setting.svelte";
  import Splash from "./Splash.svelte";
  import { Splash as SplashScreenLogic } from "../Logic/Splash";
  import { SignalExecution } from "../Logic/SignalExecution";
  import { GotoBreak } from "../Logic/GotoBreak";
  $: signal = $store.timer.signal;
  $: primary = $store.theme.primary;
  $: currentPage = $store.currentPage;
  $: console.log(currentPage)
  let runningTimer: timerType;
  $: runningTimer = $store.timer.runningTimer;

  $: {
    signal, SignalExecution();
  }

  $: {
    signal, runningTimer, GotoBreak();
  }

  SplashScreenLogic();
</script>

<section style="background-color: {primary};" class="w-full h-[100vh] fixed overflow-y-scroll flex flex-col gap-8 app">
  <Navigation />

  {#if currentPage === "splash"}
    <Splash />
  {:else if currentPage === "home"}
    <Home />
  {:else if currentPage === "settings"}
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
