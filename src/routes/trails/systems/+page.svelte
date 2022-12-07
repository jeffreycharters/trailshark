<script lang="ts">
	import LatestTrailNetworks from '$lib/components/LatestTrailNetworks.svelte';
	import type { ActionData, PageData } from './$types';
	import { trailNetworksPerPage, apiBaseUrl } from '$lib/constants';
	import { page } from '$app/stores';
	export let form: ActionData;
	export let data: PageData;
	let { latestSystems, trailNetworkList } = data;
	let name = '';

	let currentPage = 1;
	const getMoreSystems = async (trailNetworksPerPage: number, currentPage: number) => {
		const url = `${
			$page.url.origin
		}${apiBaseUrl}/trails/systems/?page=${currentPage.toString()}&per=${trailNetworksPerPage.toString()}`;
		const res = await fetch(url);
		const newTrails = await res.json();
		console.log(currentPage);
		return newTrails;
	};

	const getMoreTrailNetworks = async () => {
		++currentPage;
		const moreSystems = await getMoreSystems(trailNetworksPerPage, currentPage);
		trailNetworkList = [...trailNetworkList, ...moreSystems];
	};
</script>

{#each trailNetworkList as system (system.id)}
	<div>{system.name}</div>
{/each}

<div on:click={getMoreTrailNetworks} on:keydown={getMoreTrailNetworks}>Get more trails</div>

<div class="lg:grid grid-cols-12 gap-4">
	<div class="col-start-1 col-span-7">
		<h2 class="text-lg font-bold">Add a trail system</h2>

		<div class="mt-4">
			Before you fill out this form, please make sure that the system doesn't exist under a similar
			name by using the <a href="/trails/systems/search" class="link link-primary"
				>Trail system search</a
			>.
		</div>

		<div class="mt-4">The system will need to be approved before any updates can be added.</div>

		<div class="divider" />

		<form method="post">
			<div class="form-control w-full max-w-md">
				<label class="label" for="name">
					<span class="label-text font-semibold">Trail System name</span>
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
		<LatestTrailNetworks {latestSystems} />
	</div>
</div>
