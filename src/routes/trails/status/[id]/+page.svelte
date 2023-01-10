<script lang="ts">
	import { headingOneClasses } from '$lib/constants';
	import NetworkStatus from '../../NetworkStatus.svelte';
	import type { ActionData, PageData } from './$types';
	import TrailStatusForm from './TrailStatusForm.svelte';

	export let data: PageData;
	export let form: ActionData;
	const { networkStatus, isAuthor } = data;
	let { editing } = data;

	let { trailList, comments } = data;
	let statusList = data.existingTrailStatuses;

	statusList.forEach((s) => {
		trailList = trailList.filter((t) => t.id != s.trailId);
	});
</script>

<div class="mx-auto max-w-sm md:max-w-lg">
	{#if isAuthor && editing}
		<div class="mb-8">
			<h1 class={headingOneClasses}>Add trail updates</h1>

			<p class="my-2">Use the dropdowns below to update conditions on a per-trail basis.</p>
			<p class="my-2">These are optional. Click the 'done' button when you're finished.</p>
		</div>
	{/if}

	<NetworkStatus status={networkStatus} />

	{#if isAuthor && !editing}
		<button class="btn w-full max-w-sm md:max-w-md" type="button" on:click={() => (editing = true)}
			>Edit this status</button
		>
	{/if}

	{#if editing}
		<a class="btn w-full max-w-sm" href="/trails/latest">Done adding trails</a>

		{#if isAuthor && trailList.length > 0}
			<TrailStatusForm {trailList} {comments} {form} statusId={networkStatus.id} />
		{/if}
	{/if}
</div>
