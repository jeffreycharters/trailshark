<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { apiBaseUrl } from '$lib/constants';
	import { page } from '$app/stores';
	import TrailStatusForm from '$lib/components/TrailStatusForm.svelte';
	import { trailsLoading, trailsList } from '$lib/stores';
	import type { PendingTrailStatus } from '$lib/types';

	export let form: ActionData;
	export let data: PageData;
	let network: string = 'clbcwd3su0001fle9lr4f2yp9';
	let state: number = 1;
	let comment: string = 'testing';

	const getRandomId = () => {
		return crypto.randomUUID();
	};

	let trailStatuses: PendingTrailStatus[] = [{ id: getRandomId(), editing: true }];

	const cannedComments = [
		'No problems',
		'Wet/muddy, stay off',
		'Some wet sections but mostly good'
	];

	let cannedCommentsOpen: boolean = false;

	$: stateTextColour = data.trailStates.find((t) => t.id === state)?.textColor;

	const getNetworkTrails = async () => {
		trailsLoading.set(true);
		const networkSlug = data.traiNetworks.find((n) => n.id === network)?.slug;
		if (!networkSlug) return;
		const hostUrl = $page.url.origin;
		const apiUrl = `${hostUrl}${apiBaseUrl}/trails/networks/${networkSlug}/`;
		const res = await fetch(apiUrl);
		trailsList.set(await res.json());
		setTimeout(() => trailsLoading.set(false), 250);
	};

	type FieldName = 'comment' | 'trail';

	const updateTrailStatus = async (event: CustomEvent) => {
		const { field, id, payload } = event.detail;
		const statusToUpdate = trailStatuses.find((s) => s.id === id);
		if (!statusToUpdate) return;

		statusToUpdate[field as FieldName] = payload;
		trailStatuses = trailStatuses;
	};

	const deleteStatus = async (event: string) => {
		let updatedStatuses = trailStatuses.filter((s) => s.id != event);

		if (updatedStatuses.length === 0) {
			trailStatuses = [{ editing: true, id: getRandomId() }];
		} else {
			trailStatuses = updatedStatuses;
		}
	};
</script>

<h1 class="text-xl font-bold mb-4">Update Trail Network conditions</h1>

<form method="post">
	<select
		class="select select-bordered w-full max-w-xs mb-4"
		bind:value={network}
		name="network-id"
		on:change={getNetworkTrails}
	>
		<option disabled selected value="">Choose trail network</option>
		{#each data.traiNetworks as network}
			<option value={network?.id}>{network?.name}</option>
		{/each}
	</select>

	{#if network}
		<select
			class="select select-bordered w-full max-w-xs border-{stateTextColour}"
			bind:value={state}
			name="state"
		>
			<option disabled selected value="">Overall trail state</option>
			{#each data.trailStates as trailState}
				<option value={trailState.id}>{trailState.description}</option>
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
		<div class="divider text-lg font-bold">Trail Statuses</div>

		<p>
			Add a comment to let others know the conditions of specific trails. <strong>Optional</strong>.
		</p>

		{#each trailStatuses as status (status?.id)}
			<button type="button" on:click={() => deleteStatus(status?.id)}>
				{status.id}
			</button>
		{/each}

		<input type="hidden" name="trail-comment-count" value={trailStatuses?.length || 0} />

		<div>
			<button
				class="btn btn-sm"
				type="button"
				on:click={() => (trailStatuses = [...trailStatuses, { editing: true, id: getRandomId() }])}
			>
				+ Add Another
			</button>
		</div>
	{/if}

	<div class={form?.message ? 'text-error' : ''}>
		{form?.message || ''}
	</div>

	{#if network && state}
		<div class="mt-4 mb-12">
			<button type="submit" class="btn w-full max-w-xs {comment.length > 3 ? '' : 'btn-disabled'}">
				Send it!
			</button>
		</div>
	{/if}
</form>
