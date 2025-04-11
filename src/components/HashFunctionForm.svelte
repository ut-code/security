<script lang="ts">
  let input1 = $state("");
  let input2 = $state("");
  let result1 = $state("");
  let result2 = $state("");

  async function digestMessage(message: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hash = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return hashHex;
  }
</script>

<div id="wrapper">
  <div class="input-container">
    <input
      type="text"
      placeholder="文を入力してください"
      bind:value={input1}
      onblur={() => {
        console.log("blur", input1);
        digestMessage(input1)
          .then((hash) => {
            result1 = hash;
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }}
    />
    <div class="result-cointainer">
      結果：
      <div class="result">
        {result1}
      </div>
    </div>
  </div>
  <div class="input-container">
    <input
      type="text"
      placeholder="文を入力してください"
      bind:value={input2}
      onblur={() => {
        console.log("blur", input2);
        digestMessage(input2)
          .then((hash) => {
            result2 = hash;
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }}
    />
    <div class="result-cointainer">
      結果：
      <div class="result">
        {result2}
      </div>
    </div>
  </div>
</div>

<style>
  div {
    margin: 0px;
  }

  #wrapper {
    display: flex;
    flex-direction: column;
    margin-top: 5px;
  }
  #wrapper * {
    flex-grow: 1;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    align-items: left;
    border-style: solid;
    border-width: 2px;
    padding: 10px;
  }

  .result-cointainer {
    display: flex;
    white-space: nowrap;
  }

  .result {
    overflow-x: auto;
  }
</style>
