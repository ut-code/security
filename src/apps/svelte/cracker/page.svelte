<script lang="ts">
  import * as attacker from "./attackers";
  import "~/tailwind.css";
  import type { HashKind } from "./checkers";
  import { sleep } from "./utils";
  const MAX_STEP_CALC = 10000;

  let totalCalcs = $state(0);
  let foundMessage = $state<string | null>(null);
  let peekMessage = $state<string | null>(null);
  let hash: string = $state("");
  let alg: HashKind = $state("sha256");
  let status: "ready" | "running" | "paused" | "done" = $state("ready");

  function reset() {
    totalCalcs = 0;
    foundMessage = null;
    peekMessage = null;
    status = "ready";
  }

  function pause() {
    status = "paused";
  }
  async function run() {
    status = "running";
    while (status === "running") {
      let then = performance.now();
      const steps = Math.floor(Math.random() * MAX_STEP_CALC) + 1;
      const res = await attacker.iterate(alg, hash, totalCalcs, steps);
      totalCalcs += res.used;
      if (res.ok) {
        foundMessage = res.text;
        status = "done";
        return;
      }
      peekMessage = res.peek;
      await sleep((performance.now() - then) / 3);
    }
  }
</script>

<p>
  <textarea
    class="textarea textarea-bordered w-[480px]"
    rows="3"
    bind:value={hash}
    onkeydown={() => reset()}
    onchange={() => reset()}
  ></textarea>
</p>
<p>
  {#if status === "ready"}
    <button class="daisy-btn daisy-btn-primary" onclick={run}> Start </button>
  {:else if status === "paused"}
    <button class="daisy-btn daisy-btn-primary" onclick={run}> Restart </button>
  {:else if status === "done"}
    <button
      class="daisy-btn daisy-btn-primary"
      onclick={() => {
        reset();
        run();
      }}
    >
      Run Again
    </button>
  {:else if status === "running"}
    <button class="daisy-btn daisy-btn-primary" disabled> Start </button>
  {/if}
  {#if status === "paused"}
    <button class="daisy-btn daisy-btn-error" onclick={() => reset()}>
      Reset
    </button>
  {:else}
    <button
      class="daisy-btn"
      class:daisy-btn-secondary={status === "running"}
      disabled={status !== "running"}
      onclick={() => pause()}
    >
      Pause
    </button>
  {/if}
</p>

<div>
  {#if status === "ready"}
    RDY
  {:else if status === "running"}
    <p>
      <span class="daisy-loading daisy-loading-ring daisy-loading-lg">
        checking messages...
      </span>
    </p>
    {#if peekMessage}
      <span class="font-mono">{peekMessage}</span>
    {/if}
    <p>
      calculated {totalCalcs} so far
    </p>
  {:else if status === "paused"}
    Paused.
  {:else if status === "done"}
    <p>
      Found: <span class="text-xl font-mono">{foundMessage}</span>
      Total calculation: {totalCalcs}
    </p>
  {/if}
</div>
