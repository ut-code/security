<script lang="ts">
  let count = 0;
  let input = "Count: ";
  console.log("rendering");
</script>

<div>
  {input}
  {count}
</div>
<button type="button" on:click={() => count++}>+</button>
<button type="button" on:click={() => count--}>-</button>
<div>
  <input bind:value={input} />
</div>
