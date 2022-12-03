<script lang="ts">
	import type { TrailSystem } from '@prisma/client';
	import TrailSystemCard from './TrailSystemCard.svelte';

	export let latestSystems: TrailSystem[] = [];
</script>

<div class="section border rounded-md max-w-md p-4">
	<h2 class="text-xl font-bold mb-4">Latest Trails</h2>

	{#each latestSystems as system (system.id)}
		<TrailSystemCard {system} />
	{/each}
</div>
