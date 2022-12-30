<script lang="ts">
	import { trailsLoading, trailsList } from '$lib/stores';
	import type { PendingTrailStatus } from '$lib/types';
	import type { TrailState, TrailStatusComments } from '@prisma/client';
	import { createEventDispatcher, tick } from 'svelte';
	export let comments: (TrailStatusComments & { state: TrailState })[];
	export let status: PendingTrailStatus;

	let { id } = status;

	const dispatch = createEventDispatcher();

	let selectedComment = status.comment?.id;
	$: comment = comments?.find((c) => c.id === selectedComment);
	let selectedTrail = status.trail?.id;
	$: trail = $trailsList?.find((t) => t.id === selectedTrail);

	const dispatchTrailUpdate = async (fieldName: string) => {
		await tick();
		dispatch('trailUpdate', {
			field: fieldName,
			id: id,
			payload: fieldName === 'comment' ? comment : trail
		});

		if (!!selectedComment && !!selectedTrail) editing = false;
	};
</script>

<div class="border-base-300 border p-4 rounded my-2">
	{#if editing}
		<div class="form-control w-full max-w-xs">
			<select
				class="select select-bordered w-full max-w-xs"
				bind:value={selectedTrail}
				on:change={() => dispatchTrailUpdate('trail')}
			>
				{#if $trailsLoading}
					<option disabled selected class="text-base-300" value="">Loading trails...</option>
				{:else}
					<option disabled selected value="">Select Trail</option>
					{#each $trailsList as trailItem}
						<option value={trailItem.id}>{trailItem.name}</option>
					{/each}
				{/if}
			</select>
		</div>

		<div class="form-control w-full max-w-xs">
			<select
				bind:value={selectedComment}
				class="select select-bordered w-full max-w-xs border-l-4 my-2 border-{comment?.state
					.textColour}"
				on:change={() => dispatchTrailUpdate('comment')}
			>
				<option disabled selected value="">Select Comment</option>
				{#each comments as comment}
					<option value={comment?.id} class="">{comment.comment}</option>
				{/each}
			</select>
		</div>
	{:else}
		<div class="border-l-4 border-{comment?.state.textColour} rounded px-4 flex my-2">
			<div>
				<div class="text-lg font-bold">
					{trail?.name}
				</div>
				<div class="text-sm">
					{comment?.comment}
				</div>
			</div>
			<button type="button" class="btn btn-xs" on:click={() => dispatch('deleteStatus', { id })}
				>del</button
			>
		</div>
		<input type="hidden" name="comment-{id}" value={comment?.id} />
		<input type="hidden" name="trail-{id}" value={trail?.id} />
	{/if}
</div>
