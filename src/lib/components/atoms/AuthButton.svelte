<script lang="ts">
  import { LogIn } from "lucide-svelte";
  import { page } from "$app/state";
  import { cn } from "@/utils";

  let isLoggedIn = false;
</script>

<a
  href="/auth"
  class={cn(
    "flex flex-col md:flex-row gap-2 items-center  rounded-2xl",
    page.url.pathname === '/auth' ? "underline" : "text-gray-600"
  )}
>
  <LogIn />
  <p class="font-semibold">Log In</p>
</a>
