<script lang="ts">
	import type {
		NetworkStatus,
		TrailNetwork,
		TrailState,
		TrailStatusComment,
		TrailStatus,
		Trail,
		User
	} from '@prisma/client';
	import TrailStatusDisplay from './TrailStatusDisplay.svelte';

	export let status: NetworkStatus & {
		network: TrailNetwork;
		state: TrailState;
		author: User;
		trailStatuses: Array<
			TrailStatus & {
				trail: Trail;
				comment: TrailStatusComment & {
					state: TrailState;
				};
			}
		>;
	};
</script>

<div
	class="border border-{status.state
		.textColour} my-8 p-4 border-l-4 rounded shadow min-w-md max-w-xl bg-{status.state
		.textColour} bg-opacity-5 ml-8"
>
	<div class="flex justify-between items-baseline {status.trailStatuses.length > 0 ? 'mb-4' : ''}">
		<h2 class="text-2xl font-bold">
			{status.network.name}
			<span class="font-normal italic text-opacity-80">// {status.state.description}</span>
		</h2>
		<div class="text-lg font-bold">
			{status.comments}
		</div>
	</div>
	{#if status.trailStatuses?.length > 0}
		{#each status.trailStatuses as trailStatus (trailStatus.id)}
			<TrailStatusDisplay {trailStatus} />
		{/each}
	{/if}
	<div class="italic text-sm text-base-content text-opacity-70 mt-4 text-right">
		Reported by <a href="/user/{status.author.username}/updates" class="link"
			>{status.author.username}</a
		>
		at {status.updatedAt?.toLocaleString()}
	</div>
</div>
