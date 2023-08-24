<script lang="ts">
	import { Button } from "$lib/components/ui/button"
	import { Input } from "$lib/components/ui/input"
	import { Label } from "$lib/components/ui/label"
	import { slide } from "svelte/transition"
	import { superForm } from "sveltekit-superforms/client"
	import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte"
	import type { PageData } from "./$types"
	import { enhance } from "$app/forms"

	export let data: PageData

	const { form, errors, constraints } = superForm(data.form)
</script>

<h1>Create User</h1>
<form method="POST" use:enhance>
	<Label for="email">Email</Label>
	<Input
		type="email"
		name="email"
		aria-invalid={$errors.email ? "true" : undefined}
		{...$constraints.email}
		bind:value={$form.email} />
	{#if $errors.email}
		<div class="text-destructive pl-2 text-sm" transition:slide={{ duration: 200 }}>
			{$errors.email}
		</div>
	{/if}

	<div class="my-2">
		<Button type="submit" class="w-full">Submit</Button>
	</div>
</form>

<SuperDebug data={$form} />
