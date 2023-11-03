<script lang="ts">
  import TimerBody from "./TimerBody.svelte";


let timerType: string = 'Work Time'
</script>


<TimerBody>
    <h3 class="text-center text-2xl font-semibold">{timerType}</h3>

    <div class="progress-bar w-[12rem] h-[12rem] bg-[#e37107] rounded-full flex flex-col items-center justify-center">
        <p class="text-sm font-semibold">Time Left:</p>
        <h3 class="text-5xl font-semibold mb-5">12:00</h3>
    </div>
</TimerBody>


<style>
    .progress-bar {
        background: 
        radial-gradient(closest-side, #ffdbb9 82%, transparent 80% 100%),
        conic-gradient(#e37107 70%, white 0)
    }
</style>