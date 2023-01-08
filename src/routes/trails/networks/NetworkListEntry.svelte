<script lang="ts">
	import { enhance } from '$app/forms';
	import type { StatusCountAndSubscription } from '$lib/types';
	import { getUser } from '@lucia-auth/sveltekit/client';
	import type { TrailNetwork } from '@prisma/client';

	export let network: TrailNetwork & StatusCountAndSubscription;

	const user = getUser();
</script>

<div class="my-4">
	<div class="border my-2 p-3 rounded shadow flex justify-between items-center w-full">
		<div class="flex w-full justify-between {$user ? 'flex-col' : 'items-center'}">
			<div class="flex gap-2 font-semibold justify-start items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 stroke-primary-focus shrink-0"
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
				<div>
					{network.name}
				</div>
			</div>

			<div class="text-sm text-base-content text-opacity-80 italic ml-4">
				{network.statusCount ?? '0'} Status{network.statusCount === 1 ? '' : 'es'}
			</div>
		</div>
		{#if $user}
			<div>
				<form
					method="post"
					class="w-full max-w-sm"
					use:enhance={() => {
						return async ({ result }) => {
							if (result.status === 204) network.subscribed = !network.subscribed;
						};
					}}
				>
					<input type="hidden" name="network-id" value={network.id} />
					<input type="hidden" name="subscribe" value={network.subscribed ? false : true} />
					<button class="btn btn-sm sm:btn-sm btn-{network.subscribed ? 'warning' : 'success'}"
						>{network.subscribed ? 'Unsubscribe' : 'Subscribe'}</button
					>
				</form>
			</div>
		{/if}
	</div>
</div>
