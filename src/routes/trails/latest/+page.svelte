<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { latestStatuses } = data;
</script>

<h2>Latest Trail Conditions</h2>

{#each latestStatuses as status (status.id)}
	<div class="border border-{status.state.textColor} my-2 p-4 border-l-4 rounded shadow">
		{status.network.name}: {status.comments}
		{#if status.trailStatuses?.length > 0}
			{#each status.trailStatuses as trailStatus (trailStatus.id)}
				<div>
					{trailStatus.trail.name} - {trailStatus.comment.comment}
				</div>
			{/each}
		{/if}
	</div>
{/each}
