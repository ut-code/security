<script lang="ts">
  import Avatar from "~/icons/Avatar.svelte";
  import Key from "~/icons/Key.svelte";
  import { login } from "./data";
  import { logged_in_as, pushToast } from "./stores.svelte";
  let name: string = $state("");
  let password: string = $state("");
  async function onsubmit(e: SubmitEvent) {
    e.preventDefault();
    const u = login(name, password);
    if (!u) {
      pushToast("Couldn't log in...", "error", 2000);
      return;
    }
    pushToast(`Welcome back, ${u.name}`, "success", 4000);
    logged_in_as.value = u;
  }
</script>

<main>
  <form class="space-y-2">
    <label class="daisy-input daisy-input-bordered flex items-center gap-2">
      <Avatar />
      <input
        type="text"
        bind:value={name}
        class="grow"
        placeholder="Username"
        required
      />
    </label>
    <label class="daisy-input daisy-input-bordered flex items-center gap-2">
      <Key />
      <input
        bind:value={password}
        type="password"
        class="grow"
        placeholder="Password"
        required
      />
    </label>
    <button {onsubmit} type="submit" class="daisy-btn daisy-btn-primary w-full">
      Log In
    </button>
  </form>
</main>

<style>
  :global(body) {
    height: 100%;
  }
  main {
    flex: 1 1 auto;
    align-content: center;
    height: 100%;
  }
  form {
    width: fit-content;
    height: 200px;
    margin: 0px auto;
  }
</style>
