<script lang="ts">
const text = "Count";
const count = 3;
</script>

<div>{text}: {count}</div>
<button on:click={() => count++}>+</button>
<button on:click={() => count--}>-</button>
<input bind:value={text} />
