<script lang="ts">
  import Button from "./Button.svelte";
  import Timer from "./Timer.svelte";
  import TipCard from "./TipCard.svelte";
  import { store } from "../store";
  $: timerSignal = $store.timer.signal;

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
        $store.timer.signal = "ongoing";
        break;
    }
  }

  function sendBreakSignal() {
    $store.timer.signal = "break";
  }

  function sendResumeSignal() {
    $store.timer.signal = "resume";
  }

  function sendStopSignal() {
    if ($store.timer.signal === "reset") {
      return;
    }
    $store.timer.signal = "reset";
    $store.timer.percentage = 100
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
        startButton = "Shall We Continue?";
        break;
      case "break":
        startButton = "Resume Work";
        break;
      default:
        startButton = "Begin Work";
        break;
    }
  }
</script>

<section class="mx-6 flex flex-col gap-5">
  <Timer />
  <TipCard />

  <section class="mt-5 flex flex-col gap-4">
    <Button on:click={sendInitialSignal} text={startButton} />
    <Button on:click={sendStopSignal} text="End this session" className="bg-[rgba(0,0,0,0)!important] border-2 px-8 py-3 border-black" />
  </section>
</section>
