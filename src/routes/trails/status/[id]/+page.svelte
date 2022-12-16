<script lang="ts">
	import type { PendingTrailStatus } from '$lib/types';
	import { each } from 'svelte/internal';
	import type { PageData } from './$types';
	import TrailStatusForm from './TrailStatusForm.svelte';

	export let data: PageData;
	const { networkStatus, isAuthor } = data;
	const hasBeenUpdated = networkStatus?.createdAt.getTime() != networkStatus?.updatedAt?.getTime();

	const generatePendingTrailStatus = () => {
		return { id: crypto.randomUUID(), editing: true };
	};

	const deleteStatus = (event: CustomEvent) => {
		const { id } = event.detail;
		const filteredList = statusList.filter((s) => s.id != id);
		statusList = filteredList.length === 0 ? [generatePendingTrailStatus()] : filteredList;
	};

	let starterStatus = generatePendingTrailStatus();
	let statusList: PendingTrailStatus[] = [starterStatus];
</script>

<div class="border border-{data.networkStatus?.state.textColor} p-4 rounded">
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

{#if isAuthor}
	<div class="m-4">Add trail-specific comments:</div>
	{#each statusList as status (status.id)}
		<TrailStatusForm {status} on:deleteStatus={deleteStatus} />
	{/each}
{/if}
