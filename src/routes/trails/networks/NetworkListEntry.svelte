<script lang="ts">
	import type { StatusCountAndSubscription } from '$lib/types';
	import type { TrailNetwork } from '@prisma/client';

	export let network: TrailNetwork & StatusCountAndSubscription;
</script>

<div class="my-4">
	{#if network.subscribed}
		<form method="post" class="w-full max-w-sm">
			<div class="border my-2 p-4 rounded shadow flex justify-between items-center">
				{network.name} ({network.statusCount ?? '0'} Status{network.statusCount === 1 ? '' : 'es'})
				<input type="hidden" name="network-id" value={network.id} />
				<input type="hidden" name="subscribe" value={network.subscribed ? false : true} />
				<button class="btn btn-sm btn-{network.subscribed ? 'warning' : 'success'}"
					>{network.subscribed ? 'Unsubscribe' : 'Subscribe'}</button
				>
			</div>
		</form>
	{:else}
		<div class="border my-2 p-3 rounded shadow flex justify-between items-center">
			<div class="flex gap-2 font-semibold">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 stroke-primary-focus"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M16 5l3 3l-2 1l4 4l-3 1l4 4h-9" />
					<line x1="15" y1="21" x2="15" y2="18" />
					<path d="M8 13l-2 -2" />
					<path d="M8 12l2 -2" />
					<path d="M8 21v-13" />
					<path
						d="M5.824 15.995a3 3 0 0 1 -2.743 -3.69a2.998 2.998 0 0 1 .304 -4.833a3 3 0 0 1 4.615 -3.707a3 3 0 0 1 4.614 3.707a2.997 2.997 0 0 1 .305 4.833a3 3 0 0 1 -2.919 3.695h-4z"
					/>
				</svg>
				{network.name}
			</div>
			<div class="text-sm text-base-content text-opacity-80 italic">
				{network.statusCount ?? '0'} Status{network.statusCount === 1 ? '' : 'es'}
			</div>
		</div>
	{/if}
</div>
