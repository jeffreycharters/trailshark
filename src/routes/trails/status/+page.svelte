<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { trailStates } from '$lib/constants';
	import { apiBaseUrl } from '$lib/constants';
	import { page } from '$app/stores';

	export let form: ActionData;
	export let data: PageData;
	let network: string = 'clbcwd3su0001fle9lr4f2yp9';
	let state: number = 1;
	let comment: string = 'testing';

	const cannedComments = [
		'No problems',
		'Wet/muddy, stay off',
		'Some wet sections but mostly good'
	];

	let cannedCommentsOpen: boolean = false;

	const getNetworkTrails = async (networkId: string) => {
		const hostUrl = $page.url.origin;
		const apiUrl = `${hostUrl}${apiBaseUrl}/statuses/`;
		const res = await fetch(apiUrl);
		console.log(res);
	};
</script>

<h1 class="text-xl font-bold mb-4">Update Trail Network conditions</h1>

<form method="post">
	<select
		class="select select-bordered w-full max-w-xs mb-4"
		bind:value={network}
		name="network-id"
	>
		<option disabled selected value="">Choose trail network</option>
		{#each data.traiNetworks as network}
			<option value={network.id}>{network.name}</option>
		{/each}
	</select>

	{#if network}
		<select class="select select-bordered w-full max-w-xs" bind:value={state} name="state">
			<option disabled selected value="">Overall trail state</option>
			{#each Object.keys(trailStates) as key}
				<option value={Number(key)}>{trailStates[Number(key)]}</option>
			{/each}
		</select>
	{/if}

	{#if state && network}
		<div class="form-control mt-4">
			<label class="label" for="comments">
				<span class="label-text">Comments</span>
			</label>
			<textarea
				class="textarea textarea-bordered h-24"
				placeholder="How are the trails?"
				name="comments"
				bind:value={comment}
			/>
		</div>

		<button
			type="button"
			class="btn btn-sm my-4"
			on:click={() => (cannedCommentsOpen = !cannedCommentsOpen)}
		>
			{cannedCommentsOpen ? 'Hide' : 'Show'} canned comments
		</button>

		{#if cannedCommentsOpen}
			<div class="flex flex-col items-start">
				{#each cannedComments as cannedComment}
					<button
						type="button"
						class="btn btn-outline btn-xs my-1 w-full max-w-xs"
						on:click={() => {
							comment = cannedComment;
							cannedCommentsOpen = false;
						}}
					>
						{cannedComment}
					</button>
				{/each}
			</div>
		{/if}
	{/if}

	{#if comment}
		<div class="divider text-lg font-bold">Trail Status (optional)</div>
		{#await getNetworkTrails(network)}
			Loading...
		{:then newTrails}
			Yay trails!
		{/await}
	{/if}

	<div class={form?.message ? 'text-error' : ''}>
		{form?.message || ' '}
	</div>

	{#if network && state}
		<div class="mt-4">
			<button type="submit" class="btn w-full max-w-xs {comment.length > 3 ? '' : 'btn-disabled'}">
				Send it!
			</button>
		</div>
	{/if}
</form>
