<script lang="ts">
  import Icon from "@iconify/svelte";
  import { store } from "../store";
  
  import TimerBody from "./TimerBody.svelte";
  $: primary = $store.theme.primary;
  $: secondary = $store.theme.secondary;
</script>

<section class="tip-card-body bg-[{secondary}] rounded-xl py-4 flex gap-4 px-5 items-center">
  <div class="w-14 h-14 bg-[{primary}] flex items-center justify-center rounded-lg">
    <Icon icon="tabler:briefcase" class="w-10 h-10" />
  </div>

  <div>
    <h2 class="text-xl font-semibold">This is your work time</h2>
    <p class="text-sm font-medium">Let's focus on getting things done.</p>
  </div>
</section>


<style>
    .tip-card-body {
        box-shadow: 0 8px 5px #5e5e5e52;
    }
</style>