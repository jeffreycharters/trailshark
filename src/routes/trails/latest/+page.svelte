<script lang="ts">
	import NetworkStatus from '../NetworkStatus.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { latestStatuses } = data;
</script>

<div class="sm:w-full sm:max-w-lg sm:mx-auto">
	<h1 class="text-3xl font-bold mb-8">Latest Trail Conditions</h1>

	<div class="mb-4">
		{#each latestStatuses as status (status.id)}
			<NetworkStatus {status} />
		{/each}
	</div>
</div>
