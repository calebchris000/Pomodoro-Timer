<script lang="ts">
  import Icon from "@iconify/svelte";
  import { store } from "../store";
  let title = "This is your work time";
  let description = "Let's focus on getting things done.";
  import TimerBody from "./TimerBody.svelte";
  $: primary = $store.theme.primary;
  $: secondary = $store.theme.secondary;
  $: timerSignal = $store.timer.signal;

  $: {
    switch (timerSignal) {
      case "ongoing":
        title = "This is your work time";
        description = "Let's focus on getting things done.";
        break;
      case "pause":
        title = "Take your time";
        description = "But not too much 😀";
        break;
      case "resume":
        title = 'This is your work time'
        description = "Let's focus on getting things done.";
        break;
      case "reset":
        title = "Timer hasn't begun";
        description = "Let's be productive today.";
        break;
      case 'break':
        title = "You're on Break"
        description = 'Relax a little. You deserve it.'
        break;
    }
  }
</script>

<section style="background-color: {secondary};" class="tip-card-body rounded-xl py-4 flex gap-4 px-5 items-center">
  <div style="background-color: {primary};" class="w-14 h-14 flex items-center justify-center rounded-lg">
    <Icon icon="tabler:briefcase" class="w-10 h-10" />
  </div>

  <div>
    <h2 class="text-xl font-semibold">{title}</h2>
    <p class="text-sm font-medium">{description}</p>
  </div>
</section>

<style>
  .tip-card-body {
    box-shadow: 0 8px 5px #5e5e5e52;
  }
</style>
