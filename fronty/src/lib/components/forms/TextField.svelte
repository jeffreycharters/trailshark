<script lang="ts">
	import { slide } from "svelte/transition"

	import Input from "../ui/input/input.svelte"

	import type { FormPathLeaves, ZodValidation } from "sveltekit-superforms"
	import { formFieldProxy, type SuperForm } from "sveltekit-superforms/client"
	import type { AnyZodObject, z } from "zod"
	import { Label } from "../ui/label"

	type T = $$Generic<AnyZodObject>

	export let form: SuperForm<ZodValidation<T>, unknown>
	export let field: FormPathLeaves<z.infer<T>>
	export let label: string
	export let type = "text"

	const { value, errors, constraints } = formFieldProxy(form, field)
</script>

<Label for={field}>
	{label}
	<Input
		name={field}
		{type}
		aria-invalid={$errors ? "true" : undefined}
		bind:value={$value}
		{...$constraints}
		{...$$restProps} />
</Label>

{#if $errors}
	<div transition:slide={{ duration: 200 }} class="text-warning ml-2 text-sm">
		{$errors}
	</div>
{/if}
