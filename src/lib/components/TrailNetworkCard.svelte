<script lang="ts">
	import { getUser } from '@lucia-auth/sveltekit/client';
	import type { TrailNetwork } from '@prisma/client';

	export let network: TrailNetwork;
	let { isApproved } = network;

	const user = getUser();

	const toggleApproval = async () => {
		const res = await fetch('/api/v1/trails/networks/', {
			method: 'PATCH',
			body: JSON.stringify({
				isApproved: !isApproved,
				network: network.id
			}),
			headers: {
				'content-type': 'application/json'
			}
		});
		const updatedTrail = await res.json();

		if (updatedTrail.isApproved != isApproved) {
			isApproved = !isApproved;
		}
	};
</script>

<div class="border-l-4 border-base-300 my-2 px-3 bg-base-100 flex justify-between">
	<div class="text-base-content link">
		<a href="/trails/networks/{network.slug}">{network.name}</a>
	</div>

	{#if $user?.isAdmin}
		<button class="btn btn-xs btn-primary" on:click={toggleApproval}
			>{isApproved ? 'Unapprove' : 'Approve'}</button
		>
	{/if}
</div>
