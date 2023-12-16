<script lang="ts">
  import Home from "./Home.svelte";
  import {
    timerInstance as timer,
    type timer as timerType,
  } from "../Logic/TimerInstance";
  import Navigation from "./Navigation.svelte";
  import { store } from "../store";
  import Splash from "./Splash.svelte";
  import { Splash as SplashScreenLogic } from "../Logic/Splash";
  import { SignalExecution } from "../Logic/SignalExecution";
  import { GotoBreak } from "../Logic/GotoBreak";
  import GeneralSetting from "./Settings/GeneralSetting.svelte";
  import Customization from "./Settings/CustomizationSettings/Customization.svelte";
  import SoundSettings from "./Settings/SoundSettings/SoundSettings.svelte";
  import TimerSetting from "./Settings/TimerSettings/TimerSetting.svelte";
  import Account from "./Account/Account.svelte";
  $: signal = $store.timer.signal;
  $: primary = $store.theme.active.primary;
  $: currentPage = $store.currentPage;
  let runningTimer: timerType;
  $: runningTimer = $store.timer.runningTimer;

  $: {
    signal, SignalExecution();
  }

  $: {
    signal, runningTimer, GotoBreak();
  }

  SplashScreenLogic();

  function handleSectionClick(e: any) {
    store.update((defaults) => {
      defaults.showOption = false;
      return defaults;
    });
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="w-[100vw] h-[100vh] fixed z-50" on:click={handleSectionClick}>
  <section
    style="background-color: {primary};"
    class="w-full h-[100vh] fixed overflow-y-scroll flex flex-col gap-8 app"
  >
    <Navigation />

    {#if currentPage === "splash"}
      <Splash />
    {:else if currentPage === "home"}
      <Home />
    {:else if currentPage === "settings"}
      <GeneralSetting />
    {:else if currentPage === "TimerSettings"}
      <TimerSetting />
    {:else if currentPage === "CustomizationSetting"}
      <Customization />
    {:else if currentPage === "sound"}
      <SoundSettings />
    {:else if currentPage === "account"}
    <Account />
    {/if}
  </section>
</div>

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
