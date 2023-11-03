<script lang="ts">
  import Home from "./Home.svelte";

  import Navigation from "./Navigation.svelte";
  import { store } from "../store";
  $: primary = $store.theme.primary;
  $: currentPage = $store.currentPage;
</script>

<section style="background-color: {primary};" class="w-full h-[100vh] flex flex-col gap-8 app">
  <Navigation />

  {#if currentPage === "home"}
    <Home />
  {/if}
</section>

<style>
  .app {
    font-family: "Poppins", sans-serif;
  }
</style>
