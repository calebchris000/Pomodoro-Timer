<script lang="ts">
  import Button from "../UI/Button.svelte";
  import Navigation from "../UI/Navigation.svelte";
  import Timer from "../UI/Timer.svelte";
  import TipCard from "../UI/TipCard.svelte";
</script>

<section class="bg-[#ffdbb9] w-full h-[100vh] flex flex-col gap-8 app">
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
