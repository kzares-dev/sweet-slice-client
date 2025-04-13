<script lang="ts">
  import Header from "@/components/molecules/Header.svelte";
  import { Toaster } from "@/components/ui/sooner";
  import "../app.css";

  let { children } = $props();
</script>

<Toaster />

<div class="min-h-screen p-2 w-full bg-background">
  <main class="max-w-screen-xl mx-auto">
    <Header />
    {@render children()}
  </main>
</div>
