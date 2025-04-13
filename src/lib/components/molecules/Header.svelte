<script lang="ts">
  import CakeSlice from "@/images/Strawberry Cake.png";
  import { navigation } from "@/constants";
  import { cn } from "@/utils";
  import { page } from "$app/state";
  import AuthButton from "../atoms/AuthButton.svelte";
</script>

<header
  class="w-full flex flex-col items-center justify-between py-5 md:py-10 gap-2"
>
  <a href="/" class="flex flex-col items-center gap-3">
    <img src={CakeSlice} width={60} alt="" />
    <h1 class="font-bold text-4xl text-gray-700">Sweet Slice</h1>
  </a>
  {#if page.url.pathname !== "/auth"}
    <ul
      class="flex py-3 md:py-5 mt-5 w-full flex-row items-center justify-between max-w-[700px] bg-pink-secondary px-5 rounded-md border border-pink-primary shadow"
    >
      {#each navigation as { Icon, title, path }}
        <a
          href={path}
          class={cn(
            "flex flex-col md:flex-row gap-2 items-center  rounded-2xl",
            page.url.pathname === path ? "underline" : "text-gray-600"
          )}
        >
          <Icon />
          <p class="font-semibold">{title}</p>
        </a>
      {/each}

      <AuthButton />
    </ul>
  {/if}
</header>
