<script lang="ts">
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import LatestTrailNetworks from '$lib/components/LatestTrailNetworks.svelte';
	import { addMessage } from '$lib/messages';
	import type { TrailNetwork } from '@prisma/client';
	import type { ActionData, PageData } from './$types';
	export let form: ActionData;
	export let data: PageData;
	let { latestNetworks } = data;
	let name = '';

	$: {
		if ($page.form?.trail) {
			addMessage({
				alertLevel: 'success',
				message: `Added <strong>${$page.form?.trail.name}</strong>`
			});
			const newTrail: TrailNetwork = $page.form?.trail;
			latestNetworks = [newTrail, ...latestNetworks];
		}
	}
</script>

<div class="lg:grid grid-cols-12 gap-4">
	<div class="col-start-1 col-span-7">
		<h2 class="text-lg font-bold">Add a trail network</h2>

		<div class="mt-4">
			Before you fill out this form, please make sure that the system doesn't exist under a similar
			name by using the <a href="/trails/networks/search" class="link link-primary"
				>Trail network search</a
			>.
		</div>

		<div class="mt-4">The system will need to be approved before any updates can be added.</div>

		<div class="divider" />

		<form method="post" use:enhance>
			<div class="form-control w-full max-w-md">
				<label class="label" for="name">
					<span class="label-text font-semibold">Trail Network name</span>
				</label>
				<input
					bind:value={name}
					name="name"
					type="text"
					placeholder="Don't include &quot;trails&quot in the name"
					class="input input-bordered w-full max-w-md"
				/>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span class="label-text-alt text-error">{form?.message ? form.message : ''}</span>
				</label>
			</div>
			<button class="btn btn-primary mt-2 w-full max-w-md {name.length <= 2 ? 'btn-disabled' : ''}"
				>Submit for Approval</button
			>
		</form>
	</div>
	<div class="col-start-9 col-span-3 lg:mt-0 mt-16">
		<LatestTrailNetworks {latestNetworks} />
	</div>
</div>
