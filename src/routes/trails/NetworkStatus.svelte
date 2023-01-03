<script lang="ts">
	import { page } from '$app/stores';
	import type { TrailNetworkWithTrailStatuses } from '$lib/types';
	import TrailStatusDisplay from './TrailStatusDisplay.svelte';

	export let status: TrailNetworkWithTrailStatuses;

	const path = $page.route.id;

	let vMargin = 'my-4';
	if (path?.includes('/status/[id]')) vMargin = 'mb-8';
</script>

<a href="/trails/status/{status.id}">
	<div
		class="border border-{status.state.textColour} border-l-4 rounded shadow  bg-{status.state
			.textColour} bg-opacity-5 p-4 w-full max-w-sm {vMargin}"
	>
		<div
			class="flex flex-col justify-between items-baseline {status.trailStatuses.length > 0
				? 'mb-4'
				: ''}"
		>
			<div class="flex justify-between w-full pr-4 items-center relative">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-8 w-8 stroke-base-200 absolute -z-10 -mt-2 opacity-80"
					viewBox="0 0 24 24"
					stroke-width="2.5"
					stroke="currentColor"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<circle cx="12" cy="11" r="3" />
					<path
						d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"
					/>
				</svg>
				<h2 class="text-lg font-bold ml-6">
					{status.network.name}
				</h2>
				<div class="text-lg">
					<span class="font-normal italic text-opacity-80">// {status.state.description}</span>
				</div>
			</div>

			<div class="text-md w-fit pl-4 relative mt-4 mb-2" id="comment-box">
				{status.comments}
			</div>
		</div>

		{#if status.trailStatuses?.length > 0}
			<h3 class="text-sm italic font-bold ml-2">Trail Reports</h3>
			{#each status.trailStatuses as trailStatus (trailStatus.id)}
				<TrailStatusDisplay {trailStatus} />
			{/each}
		{/if}
		<div
			class="italic text-sm text-base-content text-opacity-70 mt-4 ml-auto mr-0 flex gap-1 w-fit items-center"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="currentColor"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<circle cx="5" cy="18" r="3" />
				<circle cx="19" cy="18" r="3" />
				<polyline points="12 19 12 15 9 12 14 8 16 11 19 11" />
				<circle cx="17" cy="5" r="1" />
			</svg>
			<div>
				<a href="/user/{status.author.username}/updates" class="link">{status.author.username}</a>
				on {status.updatedAt?.toLocaleString('en-US', { month: 'long', day: 'numeric' })}
				at {status.updatedAt?.toLocaleString('en-US', {
					hour: 'numeric',
					hourCycle: 'h24',
					minute: 'numeric'
				})}
			</div>
		</div>
	</div>
</a>

<style lang="postcss">
	#comment-box::before,
	#comment-box::after {
		@apply text-base-300 text-3xl font-bold absolute -mt-1;
	}

	#comment-box::before {
		content: '“';
		@apply -ml-4;
	}
	#comment-box::after {
		content: ' ”';
		@apply ml-1;
	}
</style>
