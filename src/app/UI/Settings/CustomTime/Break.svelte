<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { store } from "$src/app/store";
  const dispatch = createEventDispatcher();
  import Modal from "./Modal.svelte";
  import KeyPad from "./KeyPad.svelte";
  export let openBreakModal: boolean = true;

  function handleClicked() {
    openBreakModal = false;
    dispatch("clicked", openBreakModal);
  }

  $: primary = $store.theme.active.primary;
  $: secondary = $store.theme.active.secondary;
  $: cto = $store.theme.active.cto;
  let timer = "0000";
  $: minutes = Number(timer.slice(0, 2));
  $: seconds = Number(timer.slice(2));
  $: formattedMinutes = String(minutes).length === 1 ? `0${minutes}` : minutes;
  $: formattedSeconds = String(seconds).length === 1 ? `0${seconds}` : seconds;

  function getKey(e: CustomEvent) {
    if (timer[0] !== "0" && e.detail !== "<") {
      return;
    }

    if (e.detail === "<") {
      timer = "0" + timer.substring(0, 3);
      return;
    }
    timer = String(timer.slice(1) + e.detail);
  }

  function setTimer() {
    let formattedText = seconds !== 0 ? `${minutes} min ${seconds} secs` : `${minutes} minutes`
    $store.settings.BreakTimes = [...$store.settings.BreakTimes, {minutes, seconds, text: formattedText}]
    openBreakModal = false
    dispatch('clicked', openBreakModal)
  }
</script>

<Modal on:clicked={handleClicked} openModal={openBreakModal}>
  <section
    style="background-color: {primary};"
    class="w-[70%] h-[80%] rounded-xl fixed flex flex-col gap-4 p-3 px-6 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
  >
    <p class="text-2xl text-center font-semibold">Set Timer</p>

    <section style="background-color: {secondary};" class="flex justify-between gap-5 p-5 px-7 rounded-lg w-full h-28 mt-8">
      <div style="background-color: {primary};" class="w-full flex items-center justify-center text-4xl font-semibold rounded-lg">
        {formattedMinutes}
      </div>
      <div style="background-color: {primary};" class="w-full flex items-center justify-center text-4xl font-semibold rounded-lg">
        {formattedSeconds}
      </div>
    </section>

    <KeyPad on:clicked={getKey} />
    <button on:click={setTimer} style="background-color: {cto};" class="w-full text-lg font-semibold rounded-lg p-2 py-3">Set Time</button>
  </section>
</Modal>
