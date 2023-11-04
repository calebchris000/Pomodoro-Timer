<script lang="ts">
  export let text = "10 minutes";
  export let selected: string = "";
  import { createEventDispatcher } from "svelte";
  import { store } from "../../store";
  const dispatch = createEventDispatcher();
  export let value: number = 10;
  export let type = "current";
  $: cto = $store.theme.cto;

  function handleDispatch() {
    dispatch("clicked", text);
  }

  $: {
    if (text === selected && type === "current") {
      $store.timer.time.minutes = value;
      $store.settings.selectedMinute = text;
    } else if (text === selected && type === "break") {
      $store.timer.break.minutes = value;
      $store.settings.selectedBreakMinute = text;
    }
  }
</script>

<button on:click={handleDispatch} style="background-color: {text === selected ? cto : 'white'}" class="rounded-full text-sm font-semibold bg-white p-2 w-32">
  {text}
</button>
