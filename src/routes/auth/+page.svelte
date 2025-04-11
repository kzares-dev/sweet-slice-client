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
  
    export let data: SuperValidated<Infer<FormSchema>>;
  
    const form = superForm(data, {
      validators: zodClient(formSchema),
    });
  
    const { form: formData, enhance } = form;
  
    let isSignIn = true;
  
    function toggleMode() {
      isSignIn = !isSignIn;
    }
  </script>
  
  <div class='border border-dashed my-5 max-w-[800px] mx-auto'></div>
  
  <RowLayout class="max-w-[900px] p-8 mx-auto bg-pink-secondary/80 border-pink-primary border rounded-2xl">
    <div class="flex-1 flex flex-col gap-5">
      <h1 class="text-4xl font-extrabold underline-offset-2 underline">
        {isSignIn ? 'Sign In' : 'Sign Up'}
      </h1>
      <button
        class="text-blue-500 underline bg-transparent border-0 cursor-pointer"
        on:click={toggleMode}
        type="button"
      >
        {isSignIn ? 'Create new Account' : 'Already have an Account? Sign In'}
      </button>
    </div>
  
    <form class="flex-1" method="POST" use:enhance>
      <Form.Field {form} name="email">
        <Form.Control let:attrs>
          <Form.Label>Email address</Form.Label>
          <Input {...attrs} bind:value={$formData.email} />
        </Form.Control>
        <Form.Description>This is your public display name.</Form.Description>
        <Form.FieldErrors />
      </Form.Field>
  
      <Form.Field {form} name="password">
        <Form.Control let:attrs>
          <Form.Label>Password</Form.Label>
          <Input {...attrs} bind:value={$formData.password} />
        </Form.Control>
        <Form.Description>This is your public display name.</Form.Description>
        <Form.FieldErrors />
      </Form.Field>
  
      {#if !isSignIn}
        <Form.Field {form} name="confirmPassword">
          <Form.Control let:attrs>
            <Form.Label>Confirm Password</Form.Label>
            <Input {...attrs} bind:value={$formData.confirmPassword} />
          </Form.Control>
          <Form.Description>Repeat your password for confirmation.</Form.Description>
          <Form.FieldErrors />
        </Form.Field>
      {/if}
  
      <Form.Button variant='black'>Submit</Form.Button>
    </form>
  </RowLayout>
  