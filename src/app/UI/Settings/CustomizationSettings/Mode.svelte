<script lang="ts">
  import { store } from "$src/app/store";

  export let title: string = "Light";
  export let src: string = "";
  export let titleStyle: string = ""
  export let imgStyle: string = ""
  $: selected = $store.theme.selected

  function handleSelected() {
    const lower = title.toLowerCase() as "light" | "dark" | "custom"
    store.update(defaults => {
        defaults.theme.selected = lower;
        return defaults
    })
  }

</script>

<button type="button" on:click={handleSelected} class="w-full h-20 rounded-md relative overflow-hidden flex items-center">
  <img src="{src}" alt="" class="scale-[1] w-full absolute {imgStyle}"/>
  <p class="z-[99] relative font-semibold px-2 text-xl {titleStyle}">
    {title}
  </p>
  {#if selected === title.toLowerCase()}
    <p class="absolute top-0 right-0 bg-green-600 font-medium px-2 rounded-tl-md rounded-bl-md text-white">Using</p>
  {/if}
</button>
