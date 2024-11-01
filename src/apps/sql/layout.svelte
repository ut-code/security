<script lang="ts">
import type { Snippet } from "svelte";

type Props = {
	children: Snippet;
	selected: "all" | "search";
};
const { children, selected }: Props = $props();
</script>

<svelte:head>
  <meta charset="utf-8" />
  <title>Ginkgo Mail</title>
  <link rel="icon" href="/practice-sql/img/favicon.svg" />
</svelte:head>

{@render children()}
<div class="side-mail-wrapper">
  <div class="sidebar">
    <img
      src="/practice-sql/img/GinkgoMail_logo.svg"
      alt=""
      class="header_logo"
    />
    <a
      href="/practice-sql"
      class="side-selector"
      class:selected={selected === "all"}
    >
      <img
        src="/practice-sql/img/all_mail_icon.svg"
        alt=""
        class="side_selector_icon"
      />
      <div>全てのメール</div>
    </a>
    <div class="side-selector" class:selected={selected === "search"}>
      <img
        src="/practice-sql/img/search_mail_icon.svg"
        alt=""
        class="side_selector_icon"
      />
      <label for="from"> 差出人で絞り込み </label>
    </div>
  </div>
  <div class="mail-wrapper">
    <div class="mail-header">
      <div class="mail-header-user">
        <img
          src="/practice-sql/img/user_icon.svg"
          alt=""
          class="mail-header-user-icon"
        />
        駒場 優
      </div>
    </div>
  </div>
</div>

<style>
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
</style>
