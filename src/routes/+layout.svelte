<script lang="ts">
  import Header from "@/components/molecules/Header.svelte";
  import "../app.css";

  let { children } = $props();
</script>

<div class="min-h-screen p-2 w-full bg-background">
  <main class="max-w-screen-xl mx-auto">
    <Header />
    {@render children()}
  </main>
</div>
