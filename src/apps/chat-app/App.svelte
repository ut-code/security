<script lang="ts">
  import "~/tailwind.css";
  import { Menu, Moon, Send, Sun } from "lucide-svelte";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { type User, messages } from "./data";

  let { user }: { user: User } = $props();
  let scrollArea: HTMLDivElement;
  let newMessage = $state("");
  let theme = $state("dark");
  let sidebarOpen = $state(false);
  $effect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  });

  function handleSendMessage(event: SubmitEvent) {
    event.preventDefault();
    if (newMessage.trim() !== "") {
      $messages = [
        ...$messages,
        {
          id: $messages.length + 1,
          text: newMessage,
          sender: "user",
          timestamp: new Date(),
        },
      ];
      newMessage = "";
    }
  }

  function toggleTheme() {
    theme = theme === "light" ? "dark" : "light";
  }

  function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
  }

  onMount(() => {
    scrollArea.scrollTop = scrollArea.scrollHeight;
  });

  $effect(() => {
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  });

  function formatTimestamp(date: Date) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
</script>

<div class="flex h-screen bg-base-200">
  <!-- Sidebar -->
  <div
    class="w-64 flex-shrink-0 bg-base-300 {sidebarOpen
      ? 'block'
      : 'hidden'} md:block"
  >
    <div class="p-4">
      <h2 class="mb-4 text-xl font-bold">Contacts</h2>
      <ul>
        <li class="mb-2">
          <a href="#" class="hover:text-primary">John Doe</a>
        </li>
        <li class="mb-2">
          <a href="#" class="hover:text-primary">Jane Smith</a>
        </li>
        <li class="mb-2">
          <a href="#" class="hover:text-primary">Bob Johnson</a>
        </li>
      </ul>
    </div>
  </div>

  <!-- Main Chat Area -->
  <div class="flex flex-grow flex-col">
    <div class="daisy-navbar bg-base-300">
      <div class="flex-none md:hidden">
        <button
          class="daisy-btn daisy-btn-square daisy-btn-ghost"
          onclick={toggleSidebar}
        >
          <Menu size={20} />
        </button>
      </div>
      <div class="flex-1">
        <h1 class="daisy-btn daisy-btn-ghost text-xl normal-case">
          DaisyUI Chat
        </h1>
      </div>
      <span>
        {user.name}
      </span>
      <div class="flex-none">
        <button
          class="daisy-btn daisy-btn-square daisy-btn-ghost"
          onclick={() => toggleTheme()}
        >
          {#if theme === "light"}
            <Sun size={20} />
          {:else}
            <Moon size={20} />
          {/if}
        </button>
      </div>
    </div>

    <div bind:this={scrollArea} class="flex-grow overflow-y-auto p-4">
      {#each messages as message (message.id)}
        <div
          transition:fade
          class="chat {message.sender === 'user' ? 'chat-end' : 'chat-start'}"
        >
          <div class="daisy-avatar daisy-chat-image">
            <div class="w-10 rounded-full">
              <img
                src={message.sender === "user"
                  ? "/user-avatar.jpg"
                  : "/other-avatar.jpg"}
                alt=""
              />
            </div>
          </div>
          <div class="chat-header">
            {message.sender === "user" ? "You" : "John Doe"}
            <time class="text-xs opacity-50"
              >{formatTimestamp(message.timestamp)}</time
            >
          </div>
          <div
            class="chat-bubble {message.sender === 'user'
              ? 'chat-bubble-primary'
              : 'chat-bubble-secondary'}"
          >
            {message.text}
          </div>
        </div>
      {/each}
    </div>

    <form onsubmit={handleSendMessage} class="bg-base-300 p-4">
      <div class="daisy-input-group flex">
        <input
          type="text"
          placeholder="Type a message..."
          bind:value={newMessage}
          class="daisy-input daisy-input-bordered flex-grow"
        />
        <button type="submit" class="daisy-btn daisy-btn-primary">
          <Send size={20} />
          <span class="sr-only">Send</span>
        </button>
      </div>
    </form>
  </div>
</div>

<style>
  :global(html) {
    height: 100%;
  }

  :global(body) {
    height: 100%;
    margin: 0;
  }
</style>
