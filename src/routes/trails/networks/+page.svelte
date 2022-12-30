<script lang="ts">
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

<h1 class="text-xl font-bold">Trail Network List</h1>

<div>
	Feel free to <a href="/trails/networks/add" class="link">add your network</a> if you don't see it.
</div>

<div class="form-control w-full max-w-xs">
	<label class="label" for="filter">
		<span class="label-text">Find in trail name:</span>
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
	<form method="post">
		<div class="border my-2 p-2 rounded shadow flex justify-between">
			{network.name} ({network.statusCount} Statuses)
			<input type="hidden" name="network-id" value={network.id} />
			<input type="hidden" name="subscribe" value={network.subscribed ? false : true} />
			<button class="btn btn-outline btn-sm"
				>{network.subscribed ? 'Unsubscribe' : 'Subscribe'}</button
			>
		</div>
	</form>
{/each}
