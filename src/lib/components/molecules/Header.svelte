<script lang="ts">
  import CakeSlice from "@/images/Strawberry Cake.png";
  import { navigation } from "@/constants";
  import { cn } from "@/utils";
  import { page } from "$app/state";
  import AuthButton from "../atoms/AuthButton.svelte";
</script>

<header class="w-full flex flex-col items-center justify-between py-10 gap-2">
  <img src={CakeSlice} width={60} alt="" />
  <h1 class="font-bold text-4xl text-gray-700">Sweet Slice</h1>
  <ul
    class="flex py-5 mt-5 w-full flex-row items-center justify-between max-w-[700px] bg-pink-secondary px-5 rounded-xl border border-pink-primary shadow"
  >
    {#each navigation as { Icon, title, path }}
      <a
        href={path}
        class={cn(
          "flex flex-row gap-2 items-center  rounded-2xl",
          page.url.pathname === path ? "underline" : "text-gray-600"
        )}
      >
        <Icon />
        <p class="font-semibold">{title}</p>
      </a>
    {/each}

    <AuthButton />
  </ul>
</header>
