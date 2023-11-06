<script lang="ts">
  import Icon from "@iconify/svelte";
import KeyPadButton from "./KeyPadButton.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher()
  function getClickedNumber(e: CustomEvent) {
    dispatch('clicked', e.detail)
  }
</script>

<section class="grid grid-cols-3 gap-3">
  <KeyPadButton on:clicked={getClickedNumber} number={1} />
  <KeyPadButton on:clicked={getClickedNumber} number={2} />
  <KeyPadButton on:clicked={getClickedNumber} number={3} />
  <KeyPadButton on:clicked={getClickedNumber} number={4} />
  <KeyPadButton on:clicked={getClickedNumber} number={5} />
  <KeyPadButton on:clicked={getClickedNumber} number={6} />
  <KeyPadButton on:clicked={getClickedNumber} number={7} />
  <KeyPadButton on:clicked={getClickedNumber} number={8} />
  <KeyPadButton on:clicked={getClickedNumber} number={9} />
  <KeyPadButton on:clicked={getClickedNumber} className=" col-[2/-2]" number={0} />
  <KeyPadButton on:clicked={getClickedNumber} className=" col-[3/-1]" number={"<"} />
</section>
<!-- mdi:backspace -->