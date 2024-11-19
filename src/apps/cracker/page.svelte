<script lang="ts">
  import * as attacker from "./attackers";
  import "~/tailwind.css";
  import type { HashKind } from "./checkers";
  import { sleep } from "./utils";

  let totalCalcs = $state(0);
  let foundMessage = $state<string | null>(null);
  let peekMessage = $state<string | null>(null);
  let hash: string = $state("");
  let alg: HashKind = $state("sha256");
  let status: "ready" | "running" | "paused" | "done" = $state("ready");
  const MAX_STEP_CALC = $derived(
    {
      sha256: 10000,
      bcrypt: 10,
      "string eq": 100_000_000,
    }[alg],
  );
  $effect(() => {
    alg;
    reset();
  });

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
      await sleep(performance.now() - then);
    }
  }
</script>

<center>
  <p>
    <textarea
      class="daisy-textarea daisy-textarea-bordered block w-[480px] resize-none"
      rows="3"
      bind:value={hash}
      onkeydown={() => reset()}
      onchange={() => reset()}
    ></textarea>
    <span>アルゴリズム:</span>
    <select
      name="alg"
      bind:value={alg}
      class="daisy-select daisy-select-bordered"
    >
      <option value="string eq">文字列比較</option>
      <option value="sha256">SHA256</option>
      <option value="bcrypt">bcrypt</option>
    </select>
  </p>
  <p>
    {#if status === "ready"}
      <button class="daisy-btn daisy-btn-primary" onclick={run}> Start </button>
    {:else if status === "paused"}
      <button class="daisy-btn daisy-btn-primary" onclick={run}>
        Restart
      </button>
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
      Ready
    {:else if status === "running"}
      <p>
        <span
          class="daisy-loading daisy-loading-ring daisy-loading-lg align-middle"
        >
        </span>
        {#if peekMessage}
          <span class="font-mono">{peekMessage}</span>
        {/if}
      </p>
      <p>
        calculated {totalCalcs} so far
      </p>
    {:else if status === "paused"}
      Paused.
    {:else if status === "done"}
      <p>
        <span class="font-mono text-xl">{foundMessage}</span>
      </p>
      <p>
        Total calculation: {totalCalcs}
      </p>
    {/if}
  </div>
</center>
