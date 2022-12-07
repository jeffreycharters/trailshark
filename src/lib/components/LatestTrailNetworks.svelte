<script lang="ts">
	import type { TrailNetwork } from '@prisma/client';
	import TrailNetworkCard from './TrailNetworkCard.svelte';

	export let latestSystems: TrailNetwork[] = [];
	export let shadow: boolean = true;
</script>

<div class="section border rounded-md max-w-md py-2 px-4 min-w-xs {shadow ? 'shadow' : ''}">
	<h2 class="text-xl font-bold mb-4">Latest Trail Systems</h2>

	{#each latestSystems as system (system.id)}
		<TrailNetworkCard {system} />
	{/each}
</div>
