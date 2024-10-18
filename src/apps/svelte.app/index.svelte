<script lang="ts">
  let text: string = "Count";
  let count: number = 3;
</script>

<div>{text}: {count}</div>
<button on:click={() => count++}>+</button>
<button on:click={() => count--}>-</button>
<input bind:value={text} />
