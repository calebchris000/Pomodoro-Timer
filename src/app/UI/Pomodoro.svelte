<script lang="ts">
  import Home from "./Home.svelte";

  import Navigation from "./Navigation.svelte";
  import { store } from "../store";
  import Setting from "./Settings/Setting.svelte";
  $: primary = $store.theme.primary;
  $: currentPage = $store.currentPage;

  
  // $: console.log(currentPage);
</script>

<section style="background-color: {primary};" class="w-full h-[100vh] fixed overflow-y-scroll flex flex-col gap-8 app">
  <Navigation />

  {#if currentPage === "home"}
    <Home />
  {:else if currentPage === "settings"}
    <Setting />
  {/if}
</section>

<svelte:head>
  <title>{currentPage === 'home' ? 'Home' : 'Settings'}</title>
</svelte:head>

<style>
  .app {
    font-family: "Poppins", sans-serif;
  }

  :root {
    user-select: none
  }
</style>
