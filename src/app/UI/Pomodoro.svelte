<script lang="ts">
  import Button from "./Button.svelte";
  import Navigation from "./Navigation.svelte";
  import Timer from "./Timer.svelte";
  import TipCard from "./TipCard.svelte";
  import { store } from "../store";
  $: primary = $store.theme.primary
</script>

<section class="bg-[{primary}] w-full h-[100vh] flex flex-col gap-8 app">
  <Navigation />
  <section class="mx-6 flex flex-col gap-5">
    <Timer />
    <TipCard />

    <section class="mt-5 flex flex-col gap-4">
      <Button />
      <Button text="End this session" className="bg-transparent border-2 px-8 py-3 border-black"/>
    </section>
  </section>
</section>

<style>
  .app {
    font-family: "Poppins", sans-serif;
  }
</style>
