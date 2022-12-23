<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import TrailStatus from './TrailStatus.svelte';
	import TrailStatusForm from './TrailStatusForm.svelte';

	export let data: PageData;
	export let form: ActionData;
	const { networkStatus, isAuthor } = data;

	const hasBeenUpdated = networkStatus?.createdAt.getTime() != networkStatus?.updatedAt?.getTime();

	let { trailList, comments } = data;
	let statusList = data.existingTrailStatuses;

	statusList.forEach((s) => {
		trailList = trailList.filter((t) => t.id != s.trailId);
	});
</script>

<div class="border-2 border-{data.networkStatus?.state.textColor} p-4 rounded">
	<span class="font-bold">
		<span class="text-{networkStatus?.state.textColor}">{networkStatus?.state.description}</span>
		{networkStatus?.network.name}
	</span>
	<div class="">{networkStatus?.comments}</div>

	<div class="flex justify-between">
		<div class="text-sm text-slate-500">{networkStatus?.author.username}</div>
		<div class="text-sm">{networkStatus?.createdAt.toLocaleString()}</div>
		<div class="text-sm">
			{hasBeenUpdated ? networkStatus?.updatedAt?.toLocaleString() : ''}
		</div>
	</div>
</div>

{#if statusList.length > 0}
	Updates per-trail:
	{#each statusList as status (status.id)}
		<TrailStatus {status} />
	{/each}
{/if}

{#if isAuthor && trailList.length > 0}
	<div class="m-4">Add trail-specific comments:</div>

	<TrailStatusForm {trailList} {comments} {form} statusId={networkStatus.id} />
{/if}
