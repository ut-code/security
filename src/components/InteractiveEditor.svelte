<script lang="ts">
export let html = "";
let output: HTMLDivElement;

$: {
	if (output) output.innerHTML = html;
}
</script>

<div id="wrapper">
  <div id="side-menu">
    <span>HTML</span>
    <textarea bind:value={html} rows="10" style="width: 100%;" />
  </div>
  <div id="emu">
    <div id="browser-header">
      <div id="url-box" />
    </div>
    <div bind:this={output} id="content" />
  </div>
</div>

<style>
  div {
    margin: 0px;
  }
  #emu {
    width: 100%;
    border: solid 1px black;
  }
  #browser-header {
    top: 0px;
    bottom: auto;
    height: 2rem;
    width: 100%;
    background-color: gray;
  }
  #url-box {
    position: relative;
    left: 1rem;
    right: 1rem;
    width: auto;
    background-color: darkgray;
    top: 0.5rem;
    height: 1rem;
    border-radius: 1rem;
  }
  #wrapper {
    display: flex;
  }
  #wrapper * {
    flex-grow: 1;
  }
  #side-menu {
    width: 100%;
  }
  #side-menu > * {
    display: block;
  }
  #side-menu > span {
    text-align: center;
  }
</style>
