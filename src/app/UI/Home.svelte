<script lang="ts">
  import Button from "./Button.svelte";
  import Timer from "./Timer.svelte";
  import TipCard from "./TipCard.svelte";
  import { store } from "../store";
  $: primary = $store.theme.primary;
  $: timerSignal = $store.timer.signal;

  let startButton: string = "Begin!";
  let endButton: string = "End this session";
  function sendBeginSignal() {
    store.update((defaults) => {
      let signal = defaults.timer.signal;
      if (signal === "ongoing") {
        sendBreakSignal();
      } else {
        defaults.timer.signal = "ongoing";
      }
      return defaults;
    });
  }

  function sendBreakSignal() {
    store.update((defaults) => {
      let signal = defaults.timer.signal;
      if (signal !== "break") {
        defaults.timer.signal = "break";
      }
      return defaults;
    });
  }

  function sendStopSignal() {
    store.update((defaults) => {
      let signal = defaults.timer.signal;
      defaults.timer.signal = signal !== "reset" ? "reset" : signal;
      return defaults;
    });
  }

  $: {
    switch (timerSignal) {
      case "ongoing":
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
