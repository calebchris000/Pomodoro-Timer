<script lang="ts">
  import TimerBody from "./TimerBody.svelte";
  import { store } from "../store";

  let timerType: string = "Work Time";

  $: primary = $store.theme.primary;
  $: cto = $store.theme.cto;
</script>

<TimerBody>
  <h3 class="text-center text-2xl font-semibold">{timerType}</h3>

  <div
    style="background: radial-gradient(closest-side, {primary} 82%, transparent 80% 100%), conic-gradient({cto} 70%, white 0);"
    class="progress-bar w-[12rem] h-[12rem] bg-[{cto}] rounded-full flex flex-col items-center justify-center"
  >
    <p class="text-sm font-semibold">Time Left:</p>
    <h3 class="text-5xl font-semibold mb-5">12:00</h3>
  </div>
</TimerBody>
