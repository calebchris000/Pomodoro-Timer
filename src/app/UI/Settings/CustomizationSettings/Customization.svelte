<script lang="ts">
  import { store } from "$src/app/store";
  import Icon from "@iconify/svelte";

    $: primary = $store.theme.primary
    $: secondary = $store.theme.secondary
</script>

<section style="background-color: {secondary}; " class="fixed w-[100vw] h-[100vh] z-[600]">
    <nav class="w-full py-3 flex px-3 items-center gap-2 relative z-[500]">
        <button type="button" class="font-medium">
            <Icon icon="pepicons-pop:arrow-left" class="text-3xl"/>
        </button>
        <p class="text-xl font-semibold text-black">App Theme</p>
    </nav>
</section>