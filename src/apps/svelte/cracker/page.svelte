<script lang="ts">
  import { Attacker, sleep } from "./attackers";
  import "~/tailwind.css";

  let totalCalcs = $state(0);
  let attacker = new Attacker();
  let foundMessage = $state<string | null>(null);
  let peekMessage = $state<string | null>(null);
  let hash: string = $state("");

  function reset() {
    totalCalcs = 0;
    running = false;
    foundMessage = null;
    peekMessage = null;
  }

  let running: boolean = $state(false);
  async function run() {
    reset();
    running = true;
    while (running) {
      const res = await attacker.iterate("string eq", hash, totalCalcs, 10000);
      totalCalcs += res.used;
      if (res.ok) {
        foundMessage = res.text;
        running = false;
        return;
      }
      peekMessage = res.peek;
      await sleep(100);
    }
  }
</script>

<p>
  <input type="text" bind:value={hash} />
  <button class="daisy-btn daisy-btn-primary" onclick={run} disabled={running}
    >Start</button
  >
  <button
    class="daisy-btn"
    class:daisy-btn-ghosty={!running}
    class:daisy-btn-secondary={running}
    disabled={!running}
    onclick={() => reset()}
  >
    Cancel
  </button>
</p>

<p>
  {#if foundMessage === null}
    checking messages... calculated {totalCalcs} so far
    {#if peekMessage}
      current target: <span class="font-mono">{peekMessage}</span>
    {/if}
  {:else}
    Found: <span class="text-xl font-mono">{foundMessage}</span>
    Total calculation: {totalCalcs}
  {/if}
</p>
