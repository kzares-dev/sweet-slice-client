<script lang="ts">
  import RowLayout from "@/components/layouts/RowLayout.svelte";
  import { steps } from "@/constants";
</script>

<svelte:head>
  <title>Home</title>
  <meta name="descsription" content="Svelte demo app" />
</svelte:head>

<section class="flex flex-col gap-3 h-auto ">
  <RowLayout>
    <div class="card flex-1 gap-5">
      <p class="text-4xl font-stretch-ultra-condensed font-extrabold">
        About <span class="text-pink-primary underline">Sweet</span> Slice:
      </p>

      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur molestias earum quos, repellendus eius voluptatem tempora reprehenderit harum quia repudiandae incidunt minima similique temporibus non, esse quibusdam accusantium aliquid voluptas.</p>

      <p class="text-center text-4xl font-stretch-condensed font-extrabold">Simple <span class="text-pink-primary font-extrabold underline">Workflow</span></p>

      <div class='flex items-center justify-between flex-row gap-2 pt-4'>
        {#each steps as step}
          <li class='flex items-center justify-center flex-col gap-2'> 
            <div class='w-20 h-20 shadow font-bold text-4xl text-gray-600 font-stretch-extra-condensed flex items-center justify-center rounded-full bg-pink-secondary'>
              {step.step}
            </div>
            <p class='font-bold font-stretch-extra-condensed'>{step.title}</p>
            <p class='text-center font-stretch-extra-condensed'>{step.description}</p>
          </li>
        {/each}
      </div>
    </div>
    <div class="card lg:min-w-[350px]"></div>
  </RowLayout>
</section>

<style>
</style>
