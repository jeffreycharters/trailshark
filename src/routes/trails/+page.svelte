<script lang="ts">
	import { browser } from '$app/environment';
	import { addMessage, messages } from '$lib/stores';
	import type { ActionData, PageData } from './$types';

	export let form: ActionData;
	export let data: PageData;
	let { trailNetworkList } = data;

	if (form?.success && browser) {
		addMessage({
			alertLevel: 'success',
			message: `Successfully added trail: <strong>${form?.newTrail?.name}</strong>`,
			icon: true
		});
	}
</script>

<div class="flex flex-col">
	<div class="">
		<h2 class="text-lg font-bold">Add a Trail!</h2>

		<div class="mt-4">The trail will need to be approved before any updates can be added.</div>

		<div class="divider" />

		<form method="post">
			<label for="network" class="label">Trail network</label>

			<select name="network" class="select select-bordered w-full max-w-xs">
				{#each trailNetworkList as network}
					<option value={network.id}>{network.name}</option>
				{/each}
			</select>

			<div class="form-control w-full max-w-md">
				<label class="label" for="name">
					<span class="label-text font-semibold">Trail name</span>
				</label>
				<input
					name="name"
					type="text"
					placeholder="Trail name"
					class="input input-bordered w-full max-w-md"
				/>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span class="label-text-alt text-error">{form?.message ? form.message : ''}</span>
				</label>
			</div>
			<button type="submit" class="btn btn-primary mt-2 w-full max-w-md">Submit for Approval</button
			>
		</form>
	</div>
</div>
