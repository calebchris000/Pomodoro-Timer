<script lang="ts">
  export let text = "10 minutes";
  export let selected: any = { text: "", value: {} };
  import { createEventDispatcher } from "svelte";
  import { store } from "../../store";
  const dispatch = createEventDispatcher();
  export let value = { minutes: 0, seconds: 0 };
  export let type = "current";
  $: cto = $store.theme.cto;

  function handleDispatch() {
    dispatch("clicked", { text, value });
  }


  $: {
    if (text === selected.text) {
      if (type === "current") {
        store.update((defaults) => {
          defaults.timer.time = { minutes: value.minutes, seconds: value.seconds };
          defaults.timer.runningTimer = { minutes: value.minutes, seconds: value.seconds };
          return defaults;
        });
      } else if (type === "break") {
        store.update((defaults) => {
          defaults.timer.break = { minutes: value.minutes, seconds: value.seconds };
          defaults.timer.runningTimer = { minutes: value.minutes, seconds: value.seconds };
          return defaults;
        });
      }
    }
  }
</script>

<button on:click={handleDispatch} style="background-color: {text === selected ? cto : 'white'}" class="rounded-full text-sm font-semibold bg-white p-2 w-32">
  {text}
</button>
