<script lang="ts">
  import Button from "./Button.svelte";
  import Timer from "./Timer.svelte";
  import TipCard from "./TipCard.svelte";
  import { store } from "../store";
  $: primary = $store.theme.primary;
  $: timerSignal = $store.timer.signal;

  let startButton: string = "Begin!";
  // let endButton: string = "End this session";
  function sendBeginSignal() {
    let signal = $store.timer.signal;
    switch (signal) {
      case "pause":
        sendResumeSignal();
        break;
      case "ongoing":
        sendBreakSignal();
        break;
      default:
        $store.timer.signal = "ongoing";
        break;
    }
  }

  function sendBreakSignal() {
    let signal = $store.timer.signal;

    if (signal !== "break") {
      $store.timer.signal = "break";

      return;
    }
  }

  function sendResumeSignal() {
    let signal = $store.timer.signal;

    if (signal === "pause") {
      $store.timer.signal = "resume";
      return;
    }
  }

  function sendStopSignal() {
    if ($store.timer.signal === "reset") {
      return;
    }
    $store.timer.signal = "reset";
  }

  $: {
    switch (timerSignal) {
      case "ongoing":
        startButton = "I need a break";
        break;
      case "resume":
        startButton = "I need a break";
        break;
      case "pause":
        startButton = "Shall we continue?";
        break;
      case "break":
        startButton = "Resume Work";
        break;
      default:
        startButton = "Start Early";
        break;
    }
  }
</script>

<section class="mx-6 flex flex-col gap-5">
  <Timer />
  <TipCard />

  <section class="mt-5 flex flex-col gap-4">
    <Button on:click={sendBeginSignal} text={startButton} />
    <Button on:click={sendStopSignal} text="End this session" className="bg-[rgba(0,0,0,0)!important] border-2 px-8 py-3 border-black" />
  </section>
</section>
