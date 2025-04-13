<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import RowLayout from "@/components/layouts/RowLayout.svelte";
  import { formSchema, type FormSchema } from "./schema";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { Loader2 } from "lucide-svelte";
  import type { ActionResult } from "@sveltejs/kit";
  import { deserialize } from "$app/forms";
  import { toast } from "svelte-sonner";
  import { goto } from "$app/navigation";

  export let data: SuperValidated<Infer<FormSchema>>;
  let isSignIn = true;
  let isRequestLoading = false;

  const form = superForm(data, {
    dataType: "json",
    validators: zodClient(formSchema),
  });

  const { form: formData } = form;

  function toggleMode() {
    isSignIn = !isSignIn;
  }

  async function handleSubmit(
    event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
  ) {
    event.preventDefault();
    isRequestLoading = true;
    const data = new FormData(event.currentTarget);

    const response = await fetch(event.currentTarget.action, {
      method: "POST",
      body: data,
    });
    const result: ActionResult = deserialize(await response.text());
    console.log({ result });

    if (result.type === "failure") {
      isRequestLoading = false; 
      return toast.error(result.data?.error);
    }

    toast.success(isSignIn ? 'Login successfull' : 'User created succesfully.');
    isRequestLoading = false;
    
    // route to a new path
    goto('/')
  }
</script>

<RowLayout class="max-w-[700px] mx-auto">
  <div
    class="flex-1 w-full p-5 lg:p-8 max-w-md mx-auto bg-pink-secondary/80 border-pink-primary border rounded-xl"
  >
    <div class="flex-1 flex flex-col gap-2 pb-5">
      <h1 class="text-4xl font-extrabold underline-offset-2 underline">
        {isSignIn ? "Sign In" : "Register"}
      </h1>

      <button
        class=" cursor-pointer text-left font-semibold text-gray-500"
        onclick={toggleMode}
        type="button"
      >
        {isSignIn ? "Create new Account" : "Already have an Account? Sign In"}
      </button>
    </div>

    <form
      onsubmit={handleSubmit}
      action={isSignIn ? "?/signin" : "?/signup"}
      class="flex-1"
      method="POST"
    >
      {#if !isSignIn}
        <Form.Field {form} name="name">
          <Form.Control let:attrs>
            <Form.Label>Username</Form.Label>
            <Input {...attrs} bind:value={$formData.name} />
          </Form.Control>
          <Form.Description>This is your public display name.</Form.Description>
          <Form.FieldErrors />
        </Form.Field>
      {/if}
      <Form.Field {form} name="email">
        <Form.Control let:attrs>
          <Form.Label>Email address</Form.Label>
          <Input {...attrs} bind:value={$formData.email} />
        </Form.Control>
        <Form.Description>Your email address.</Form.Description>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="password">
        <Form.Control let:attrs>
          <Form.Label>Password</Form.Label>
          <Input {...attrs} bind:value={$formData.password} />
        </Form.Control>
        <Form.Description>Strong and secure password.</Form.Description>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Button
        class="flex flex-row gap-3 text-lg"
        disabled={isRequestLoading}
        variant="black"
      >
        Submit
        {#if isRequestLoading}
          <Loader2 size={20} class="animate-spin" />
        {/if}
      </Form.Button>
    </form>
  </div>
</RowLayout>
