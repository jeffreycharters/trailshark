<script lang="ts">
	import { getUser } from '@lucia-auth/sveltekit/client';
	import type { TrailNetwork } from '@prisma/client';

	export let network: TrailNetwork;
	let { isApproved } = network;

	const user = getUser();

	const toggleApproval = async (network: TrailNetwork) => {
		const res = await fetch('/api/v1/trails/networks/', {
			method: 'PATCH',
			body: JSON.stringify({ isApproved: !network.isApproved, networks: [network.id] }),
			headers: {
				'content-type': 'application/json'
			}
		});
		const updateCount = await res.json();

		if (updateCount.count === 1) {
			isApproved = !isApproved;
		}
	};
</script>

<div class="border-l-4 border-base-300 my-2 px-3 bg-base-100 flex justify-between">
	<div class="text-base-content link">
		<a href="/trails/networks/{network.slug}">{network.name}</a>
	</div>

	{#if $user?.isAdmin}
		<button class="btn btn-xs btn-primary" on:click={() => toggleApproval(network)}
			>{isApproved ? 'Unapprove' : 'Approve'}</button
		>
	{/if}
</div>
