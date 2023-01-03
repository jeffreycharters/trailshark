<script lang="ts">
	import NetworkListEntry from './NetworkListEntry.svelte';

	import { headingOneClasses } from '$lib/constants';
	import type { PageData } from './$types';

	export let data: PageData;
	let { trailNetworkList } = data;
	let networksToShow = trailNetworkList;

	let filterText = '';

	const filterNetworks = () => {
		networksToShow = trailNetworkList.filter((n) =>
			n.name.toLowerCase().includes(filterText.toLowerCase())
		);
	};
</script>

<div class="w-full md:max-w-lg mx-auto">
	<h1 class={headingOneClasses}>Trail Network List</h1>

	<div class="my-2">
		Feel free to <a href="/trails/networks/add" class="link text-primary">add your network</a> if you
		don't see it.
	</div>

	<div class="divider" />

	<div class="form-control w-full">
		<label class="label" for="filter">
			<span class="label-text italic">Filter trail names:</span>
		</label>
		<input
			type="text"
			name="filter"
			bind:value={filterText}
			class="input input-bordered w-full max-w-xs"
			on:input={filterNetworks}
		/>
	</div>

	{#each networksToShow as network}
		<NetworkListEntry {network} />
	{/each}
</div>
