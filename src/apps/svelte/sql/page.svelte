<script lang="ts">
  import { onMount } from "svelte";
  import { init } from "./sql";

  type Mail = {
    subject: string;
    date: string;
    from: string;
    toType: string;
    to: string;
    sender: string;
    content: string;
  };
  type Success = {
    ok: true;
    mails: Mail[];
  };
  type Fail = {
    ok: false;
    error: string;
  };

  // WARNING: this never resolves without the onMount below.
  let search_result: Promise<Success | Fail> = $state(new Promise(() => {}));
  onMount(() => {
    search_result = search("");
  });

  let selected: "all" | "search" = $state("all");

  const sql = init();
  async function search(from: string): Promise<Success | Fail> {
    const query =
      from === ""
        ? "/services/sql/search"
        : `/services/sql/search?from=${from}`;
    selected = from === "" ? "all" : "search";
    try {
      const result = (await sql)(query);
      console.log(result);
      throw "todo";
      // return {
      //   ok: true,
      //   mails: result.map((row) => row.values),
      // };
    } catch (err) {
      return {
        ok: false,
        error: String(err),
      };
    }
  }

  let from = $state("");
</script>

{#snippet app()}
  <form
    class="search-bar-wrapper"
    onsubmit={(e) => {
      e.preventDefault();
      search_result = search(from);
    }}
  >
    <input
      id="from"
      class="search-bar"
      placeholder="差出人を入力"
      bind:value={from}
    />
    <div class="search-button-wrapper">
      <button type="submit" class="search-button">検索</button>
    </div>
  </form>

  <div id="mail-list">
    {#await search_result}
      <span>Loading...</span>
    {:then result}
      {#if !result.ok}
        <p>不正なSQL文です: {result.error}</p>
      {:else if result.mails.length === 0}
        <p>メールはありません。</p>
      {:else}
        {#each result.mails as mail}
          {@render mailItem(mail)}
        {/each}
      {/if}
    {:catch err}
      <p>エラー: {err}</p>
    {/await}
  </div>
{/snippet}

{#snippet mailItem(mail: Mail)}
  <div class="mail-container">
    <div class="mail-subject-date-container">
      <h2 class="mail-subject">
        {mail.subject}
      </h2>
      <p class="mail-date">
        {mail.date}
      </p>
    </div>
    <h3 class="mail-sender">
      {mail.from}
    </h3>
    <p class="mail-receiver">
      {mail.toType}: {mail.to}
    </p>
    <p class="mail-content">
      {@html mail.content}
    </p>
  </div>
{/snippet}

<svelte:head>
  <meta charset="utf-8" />
  <title>Ginkgo Mail</title>
  <link rel="icon" href="/sql/img/favicon.svg" />
</svelte:head>

<div class="side-mail-wrapper">
  <div class="sidebar">
    <img src="/sql/img/GinkgoMail_logo.svg" alt="" class="header_logo" />
    <button
      class="side-selector"
      style="display: block; width: calc(100% - 15px); text-align: left;"
      class:selected={selected === "all"}
      onclick={() => (search_result = search(""))}
    >
      <img
        src="/sql/img/all_mail_icon.svg"
        alt=""
        class="side_selector_icon"
        style="vertical-align: middle;"
      />
      <span style="font-size: 16px;"> 全てのメール </span>
    </button>
    <label for="from" style="font-size: 16px; width: 100%;">
      <div class="side-selector" class:selected={selected === "search"}>
        <img
          src="/sql/img/search_mail_icon.svg"
          alt=""
          class="side_selector_icon"
          style="height: 22px; align-self: center;"
        />
        差出人で絞り込み
      </div>
    </label>
  </div>
  <div class="mail-wrapper">
    <div class="mail-header">
      <div class="mail-header-user">
        <img
          src="/sql/img/user_icon.svg"
          alt=""
          class="mail-header-user-icon"
        />
        駒場 優
      </div>
    </div>
    {@render app()}
  </div>
</div>

<style>
  :global(body) {
    background-color: white;
  }
  .header_logo {
    width: 100%;
  }

  .mail-header {
    width: 100%;
    height: 8vh;
    max-height: 80px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .mail-header-user {
    display: flex;
    align-items: center;
  }

  .mail-header-user-icon {
    width: 50px;
  }

  .side-mail-wrapper {
    display: flex;
  }

  .sidebar {
    width: 20%;
    max-width: 300px;
    min-width: 273px;
    height: 110vh;
    box-shadow: 3px 3px 7px gainsboro;
  }

  .side-selector {
    margin: 15px 15px 15px 0px;
    font-weight: bold;
    color: black;
    text-decoration: none;
    background-color: white;
    padding: 8px;
    padding-left: 20px;
    border-bottom: 3px solid #4a6894;
    border-radius: 0px 50px 50px 0px;
    display: flex;
    align-items: center;
  }

  .side-selector.selected {
    background-color: #e4ecf7;
  }

  .side_selector_icon {
    margin: 0px 5px;
  }

  .mail-wrapper {
    width: 75%;
    margin: auto;
    margin-top: 0;
    padding: 1%;
    padding-top: 0px;
    background-color: white;
  }
  .search-bar-wrapper {
    width: 85%;
    display: flex;
    align-items: center;
  }

  .search-bar {
    margin: 15px;
    padding: 12px;
    width: 70%;
    border-radius: 50px;
    border: none;
    font-size: large;
    background: none;
    background-color: #e4ecf7;
  }

  .search-button {
    font-size: large;
    padding: 3px 15px;
    background: none;
    color: #4a6894;
    border: none;
    border-radius: 50px;
    border: solid 1.5px #4a6894;
  }

  .mail-container {
    width: 90%;
    margin: auto;
    margin-bottom: 2%;
    padding: 20px;
    border-radius: 5px;
    background-color: white;
    box-shadow: 3px 3px 7px gainsboro;
  }

  .mail-sender {
    margin: 0px;
  }

  .mail-subject {
    margin-top: 0px;
    border-bottom: solid gainsboro 2px;
    flex-grow: 5;
  }

  .mail-subject-date-container {
    display: flex;
    flex-flow: space-between;
  }

  .mail-date {
    margin-top: 0px;
    font-size: small;
    color: gray;
  }

  .mail-content {
    margin-bottom: 0px;
  }

  .mail-receiver {
    margin: 0px;
    font-size: small;
    color: gray;
  }
</style>
