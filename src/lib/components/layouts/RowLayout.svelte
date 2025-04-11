<script lang="ts">
  import { cn } from "@/utils";

  let { class: className, children } = $props();
</script>

<div class={cn('flex flex-col lg:flex-row gap-4 lg:gap-10 px-2 h-full', className)}>
  {@render children()}
</div>
