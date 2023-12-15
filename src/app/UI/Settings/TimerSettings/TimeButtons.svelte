<script lang="ts">
  export let text = "10 minutes";
  export let selected: any = { text: "", value: {} };
  import { createEventDispatcher } from "svelte";
  import Icon from "@iconify/svelte";
  import { store } from "$src/app/store";
  const dispatch = createEventDispatcher();
  export let value = { minutes: 0, seconds: 0 };
  export let index: number = 0
  export let type = "current";
  export let deleteMode:boolean = false
  $: secondary = $store.theme.active.secondary;
  $: cto = $store.theme.active.cto;
  

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

  function handleRemoveTimer() {
    console.log(type, index)
    store.update(defaults => {
      const path = type === "current" ? "Times" : "BreakTimes"
      const times = defaults.settings[path]
      let filtered = times.filter(time => times.indexOf(time) !== index)
      defaults.settings[path] = filtered
      return defaults
    })
  }
  $: textColor = $store.theme.selected === "dark" && text === selected ? "white" : "black";
  $: bgColor = text === selected ? secondary : cto
</script>

<button id={`${index}`} on:click={handleDispatch} style="background-color: {bgColor}; color: {textColor}" class="rounded-full overflow-hidden relative text-sm font-semibold bg-white p-2 w-32">
 {#if deleteMode}

 <button class="absolute top-0 bottom-0 right-0" on:click|stopPropagation={handleRemoveTimer} >
   <Icon class="bg-red-500 w-5 h-full text-white" icon="basil:cross-solid"/>
 </button>
 {/if}
  {text}
</button>
