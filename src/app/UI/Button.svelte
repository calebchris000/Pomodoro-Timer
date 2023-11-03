<script lang="ts">
  export let text = "I need a break";
  import { store } from "../store";
  export let className: string = ''

  $: cto = $store.theme.cto;

</script>

<button class="bg-[{cto}] w-fit px-16 p-4 block mx-auto rounded-lg font-semibold text-lg {className}">
  {text}
</button>
