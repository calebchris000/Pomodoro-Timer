<script lang="ts">
  import { store } from "../store";

  $: secondary = $store.theme.secondary;
</script>

<section style="background-color: {secondary};" class="timer-body rounded-xl p-2 py-8 flex flex-col justify-center items-center gap-10">
  <slot />
</section>

<style>
  .timer-body {
    box-shadow: 0 8px 5px #5e5e5e52;
  }
</style>
