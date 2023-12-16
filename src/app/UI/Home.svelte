<script lang="ts">
  import Button from "./Button.svelte";
  import Timer from "./Timer.svelte";
  import TipCard from "./TipCard.svelte";
  import { store } from "../store";
  $: timerSignal = $store.timer.signal;
  $: activeSound = $store.sound.activeSound;

  $: soundStatus = $store.sound.status;
  $: paused = soundStatus === "paused";
  let time = 0;

  let startButton: string = "Begin!";
  function sendInitialSignal() {
    let signal = $store.timer.signal;
    switch (signal) {
      case "pause":
        sendResumeSignal();
        break;
      case "ongoing":
        sendBreakSignal();

        break;
      default:
        $store.sound.status = "playing";
        $store.timer.signal = "ongoing";
        break;
    }
  }

  function sendBreakSignal() {
    $store.timer.signal = "break";
  }

  function sendResumeSignal() {
    $store.timer.signal = "resume";
    $store.sound.status = paused ? "playing" : soundStatus;
  }

  function sendStopSignal() {
    if ($store.timer.signal === "reset") {
      return;
    }
    $store.timer.signal = "reset";
    $store.sound.status = "paused";
    $store.timer.percentage = 100;
  }

  $: status = $store.sound.status;

  function handleAudio(status: "inactive" | "playing" | "paused") {
    if ($store.sound.muted) {
      return;
    }
    store.update((defaults) => {
      defaults.sound.status = status;
      return defaults;
    });
    console.log($store.sound.status);
  }

  $: {
    switch (timerSignal) {
      case "ongoing":
        startButton = "I need a break";
        status !== "playing" && handleAudio("playing");
        break;
      case "resume":
        startButton = "I need a break";
        status !== "playing" && handleAudio("playing");
        break;
      case "pause":
        startButton = "Shall We Continue?";
        status !== "paused" && handleAudio("paused");
        break;
      case "break":
        startButton = "Resume Work";
        break;
      default:
        startButton = "Begin Work";
        break;
    }
  }
  $: volume = $store.sound.volume;
  $: secondary = $store.theme.active.secondary;
  $: textColor = $store.theme.selected === "dark" ? "white" : "black";
  $: cto = $store.theme.active.cto;
  $: bgColor = $store.theme.selected === "dark" ? secondary : cto;
</script>

<section class="mx-6 flex flex-col gap-5">
  <audio
    src={activeSound}
    bind:currentTime={time}
    bind:paused
    loop
    bind:volume
  />
  <Timer />
  <TipCard />

  <section class="mt-5 flex flex-col gap-4">
    <Button
      on:click={sendInitialSignal}
      style="color: {textColor}; background-color: {bgColor}"
      text={startButton}
    />
    <Button
      on:click={sendStopSignal}
      text="End this session"
      style="border-color: {textColor}"
      className="bg-[rgba(0,0,0,0)!important] border-2 px-8 py-3 border-black"
    />
  </section>
</section>

<svelte:head>
  <title>Pomodoro Timer</title>
</svelte:head>
