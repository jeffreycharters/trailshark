<script lang="ts">
	import type { TrailSystem } from '@prisma/client';
	import { createEventDispatcher } from 'svelte';

	export let system: TrailSystem;

	const dispatch = createEventDispatcher();

	const toggleApproval = async (system: TrailSystem) => {
		const res = await fetch('/api/v1/trails/systems/', {
			method: 'PATCH',
			body: JSON.stringify({ isApproved: system.isApproved, systems: [system.id] }),
			headers: {
				'content-type': 'application/json'
			}
		});

		const updateCount = await res.json();
		if (updateCount.count === 1) {
			dispatch('toggleApproved', {
				id: system.id
			});
		}
	};
</script>

<div class="border-l-4 border-base-300 my-2 px-3 bg-base-100 flex justify-between">
	<div class="text-base-content link">
		<a href="/trails/systems/{system.slug}">{system.name}</a>
	</div>

	<button class="btn btn-xs btn-primary" on:click={() => toggleApproval(system)}
		>{system.isApproved ? 'Unapprove' : 'Approve'}</button
	>
</div>
