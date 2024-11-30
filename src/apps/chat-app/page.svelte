<script lang="ts">
  import { fade } from "svelte/transition";
  import App from "./App.svelte";
  import Login from "./login.svelte";
  import { logged_in_as } from "./stores.svelte";
  import { toasts } from "./stores.svelte";
  $inspect(toasts.value);
</script>

{#if logged_in_as.value}
  <App user={logged_in_as.value} />
{:else}
  <Login />
{/if}

<!-- ALLOW TAILWIND TO RECOGNIZE DYNAMIC ALERT-{} CLASS, DO NOT DELETE THIS ELEMENT -->
<div class="alert-success alert-info alert-warning alert-error" hidden></div>

<div role="alert" class="daisy-toast daisy-toast-start daisy-toast-bottom">
  {#each toasts.value as toast (toast.id)}
    <!-- TODO: animate this up down -->
    <div
      out:fade={{ duration: 150 }}
      in:fade={{ duration: 150 }}
      class="alert alert-{toast.kind}"
    >
      <span>{toast.message}</span>
    </div>
  {/each}
</div>

<style>
</style>
