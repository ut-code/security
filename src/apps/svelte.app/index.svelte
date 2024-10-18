<script lang="ts">
  let text = "Count";
  let count = 3;
</script>

<div>{text}: {count}</div>
<button on:click={() => count++}>+</button>
<button on:click={() => count--}>-</button>
<input bind:value={text} />
