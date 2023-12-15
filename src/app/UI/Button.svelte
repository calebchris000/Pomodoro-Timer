<script lang="ts">
  export let text = "I need a break";
  import { store } from "../store";
  export let className: string = "";
  export let style: string = "";

  $: cto = $store.theme.active.cto;
  $: textColor = $store.theme.selected === "dark" ? "white" : "black";
</script>

<button
  style="background-color: {cto}; color: {textColor}; {style}"
  on:click|stopPropagation
  class="w-fit px-16 p-4 block mx-auto rounded-lg font-semibold text-lg {className}"
>
  {text}
</button>
