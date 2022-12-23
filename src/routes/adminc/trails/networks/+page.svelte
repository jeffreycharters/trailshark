<script lang="ts">
	import type { PageData } from './$types';
	import AdminNetworkRow from './AdminNetworkRow.svelte';

	export let data: PageData;
	let { trailNetworks } = data;
</script>

<h1>Approve Trail Networks</h1>

{#each trailNetworks as network}
	<AdminNetworkRow {network} />
{/each}
