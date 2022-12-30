<script lang="ts">
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
	const { trailNetworks, trailStates } = data;

	let selectedNetwork: string | undefined = form?.network?.toString() ?? undefined;
	let selectedState: number | undefined = form?.state ? +form.state : undefined;

	$: borderColour = trailStates.find((s) => s.id === selectedState)?.textColour;
	$: disableSubmit = !selectedNetwork || !selectedState;
</script>

<div>
	<h2 class="text-xl font-bold">Trail Network Status</h2>
	<p class="my-4 px-2">Update conditions for the trail network as a whole.</p>
	<p class="my-4 px-2">On the next page you'll be able to add updates for individual trails.</p>
	<form method="post">
		<select
			class="select select-bordered w-full max-w-xs my-2"
			name="network"
			bind:value={selectedNetwork}
		>
			<option disabled selected>Select Trail Network</option>
			{#each trailNetworks as trailNetwork}
				<option value={trailNetwork.id}>{trailNetwork.name}</option>
			{/each}
		</select>

		<select
			class="select select-bordered w-full max-w-xs my-2 border-{borderColour}"
			bind:value={selectedState}
			name="state"
		>
			<option disabled selected>Select State</option>
			{#each trailStates as trailState}
				<option value={trailState.id}>{trailState.description}</option>
			{/each}
		</select>

		<div class="form-control">
			<label class="label font-bold justify-start gap-2" for="comment">
				<span class="label-text">Comment</span>
				<span class="label-text text-primary italic tracking-wide">(Optional)</span>
			</label>
			<textarea
				name="comment"
				class="textarea textarea-bordered h-24 w-full max-w-xs"
				placeholder="Explain the state"
			/>
		</div>

		<div class="text-error text-sm mt-2">
			{form?.message ? form.message : ''}
		</div>

		<button class="btn btn-active btn-primary w-full my-4 max-w-xs" disabled={disableSubmit}
			>Add Status</button
		>
	</form>
</div>
