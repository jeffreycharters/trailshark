<script lang="ts">
	import type { TrailNetwork } from '@prisma/client';
	import TrailNetworkCard from './TrailNetworkCard.svelte';

	export let latestNetworks: TrailNetwork[] = [];
	export let shadow: boolean = true;
</script>

<div class="section border rounded-md max-w-md py-2 px-4 min-w-xs mt-4 {shadow ? 'shadow' : ''}">
	<h2 class="text-xl font-bold mb-4">Latest Trail Networks</h2>

	{#each latestNetworks as network (network.id)}
		<TrailNetworkCard {network} />
	{/each}
</div>
