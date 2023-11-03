<script lang="ts">
  export let text = "I need a break";
  export let className: string = ''
</script>

<button class={`bg-[#e37107] w-fit px-16 p-4 block mx-auto rounded-lg font-semibold text-lg ${className}`}>
  {text}
</button>
