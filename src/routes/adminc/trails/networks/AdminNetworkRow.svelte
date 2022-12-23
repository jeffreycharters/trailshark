<script lang="ts">
	import { apiBaseUrl } from '$lib/constants';
	import type { TrailNetwork } from '@prisma/client';

	export let network: TrailNetwork;
	let { isApproved } = network;
	let isLoading: boolean = false;

	const toggleApproval = async () => {
		const addLoader = setTimeout(() => (isLoading = true), 250);
		const res = await fetch(`${apiBaseUrl}/trails/networks/`, {
			method: 'PATCH',
			body: JSON.stringify({ network: network.id, isApproved: !isApproved })
		});
		const updatedTrail = await res.json();
		isApproved = updatedTrail.isApproved;
		clearTimeout(addLoader);
		isLoading = false;
	};
</script>

<div class="border my-2 p-4 flex justify-between items-center">
	<div>
		{network.name}
	</div>
	<div>
		<button
			class="btn btn-primary btn-sm {isLoading ? 'loading' : ''}"
			type="button"
			on:click={toggleApproval}
		>
			{isApproved ? 'Unapprove' : 'Approve'}
		</button>
	</div>
</div>
