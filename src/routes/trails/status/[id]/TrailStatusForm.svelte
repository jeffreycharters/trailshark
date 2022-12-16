<script lang="ts">
	import type { PendingTrailStatus } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let status: PendingTrailStatus;
	const dispatch = createEventDispatcher();
</script>

<div>
	<form>
		{status.id}<button type="button" on:click={() => dispatch('deleteStatus', { id: status.id })}
			>Delete</button
		>
	</form>
</div>
