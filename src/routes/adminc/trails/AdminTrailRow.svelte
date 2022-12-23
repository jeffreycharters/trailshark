<script lang="ts">
	import { apiBaseUrl } from '$lib/constants';
	import type { Trail, TrailNetwork } from '@prisma/client';

	export let trail: Trail & { trailNetwork: TrailNetwork };
	let { isApproved } = trail;
	let isLoading = false;

	const toggleApproval = async () => {
		const addLoader = setTimeout(() => (isLoading = true), 250);
		const res = await fetch(`${apiBaseUrl}/trails/`, {
			method: 'PATCH',
			body: JSON.stringify({ trail: trail.id, isApproved: !isApproved })
		});
		const updatedTrail = await res.json();
		isApproved = updatedTrail.isApproved;
		clearTimeout(addLoader);
		isLoading = false;
	};
</script>

<div class="flex justify-between items-center border my-2 p-4">
	<div class="flex flex-col">
		<div class="text-sm font-bold">
			{trail.trailNetwork.name}
		</div>
		<div class="text-primary-focus text-lg">
			{trail.name}
		</div>
	</div>
	<button
		type="button"
		on:click={toggleApproval}
		class="btn {isApproved ? 'btn-warning' : 'btn-success'} btn-sm {isLoading ? 'loading' : ''}"
	>
		{isApproved ? 'Unapprove' : 'Approve'}
	</button>
</div>
