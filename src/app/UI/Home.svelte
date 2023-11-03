<script lang="ts">
  import Button from "./Button.svelte";
  import Timer from "./Timer.svelte";
  import TipCard from "./TipCard.svelte";
  import { store } from "../store";
  $: primary = $store.theme.primary;
  $: timerSignal = $store.timer.signal;

  function sendSignal() {
    store.update((defaults) => {
      defaults.timer.signal = "start";
      return defaults;
    });
  }
</script>

<section class="mx-6 flex flex-col gap-5">
  <Timer />
  <TipCard />

  <section class="mt-5 flex flex-col gap-4">
    <Button on:click={sendSignal} text="Begin!" />
    <Button text="End this session" className="bg-[rgba(0,0,0,0)!important] border-2 px-8 py-3 border-black" />
  </section>
</section>
