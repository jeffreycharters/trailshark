<script lang="ts">
	import { getUser } from '@lucia-auth/sveltekit/client';
	import type { TrailNetwork } from '@prisma/client';

	export let system: TrailNetwork;
	let approved = system.isApproved;

	const user = getUser();

	const toggleApproval = async (system: TrailNetwork) => {
		const res = await fetch('/api/v1/trails/systems/', {
			method: 'PATCH',
			body: JSON.stringify({ isApproved: system.isApproved, systems: [system.id] }),
			headers: {
				'content-type': 'application/json'
			}
		});
		const updateCount = await res.json();

		if (updateCount.count === 1) {
			approved = !approved;
		}
	};
</script>

<div class="border-l-4 border-base-300 my-2 px-3 bg-base-100 flex justify-between">
	<div class="text-base-content link">
		<a href="/trails/systems/{system.slug}">{system.name}</a>
	</div>

	{#if $user?.isAdmin}
		<button class="btn btn-xs btn-primary" on:click={() => toggleApproval(system)}
			>{approved ? 'Unapprove' : 'Approve'}</button
		>
	{/if}
</div>
