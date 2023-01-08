<script lang="ts">
	import { enhance } from '$app/forms';
	import { headingOneClasses } from '$lib/constants';
	import { addMessage } from '$lib/messages';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	$: {
		if (form?.success && form?.deletedNetwork)
			addMessage({
				alertLevel: 'success',
				message: `Successfully removed <strong>${form?.deletedNetwork.name}</strong>`
			});
	}
</script>

<h1 class={headingOneClasses}>Remove Trail Networks</h1>

<div class="overflow-x-auto max-w-xl">
	<table class="table w-full">
		<!-- head -->
		<thead>
			<tr>
				<th />
				<th>Name</th>
				<th />
			</tr>
		</thead>
		<tbody>
			{#each data.unusedNetworks as network, index (network.id)}
				<tr>
					<th>{index + 1}</th>
					<td>
						<div>{network.name}</div>
					</td>
					<td>
						<form method="POST" use:enhance>
							<input type="hidden" name="network-id" value={network.id} />
							<button class="btn btn-error btn-sm">Remove</button>
						</form>
					</td>
				</tr>
			{:else}
				<tr>
					<th colspan="5">No available networks to delete. Sorry.</th>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
