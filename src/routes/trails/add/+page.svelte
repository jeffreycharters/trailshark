<script lang="ts">
	import LatestTrailSystems from '$lib/components/LatestTrailSystems.svelte';
	import type { ActionData, PageData } from './$types';
	export let form: ActionData;
	export let data: PageData;
	let { latestSystems } = data;
</script>

<div class="grid grid-cols-12 gap-4">
	<div class="col-start-1 col-span-7">
		<h2 class="text-lg font-bold">Add a Trail!</h2>

		<div class="mt-4">
			Before you fill out this form, please make sure that the trail doesn't exist under a similar
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
			<button class="btn btn-primary mt-2 w-full max-w-md">Submit for Approval</button>
		</form>
	</div>
	<div class="col-start-9 col-span-3">
		<LatestTrailSystems {latestSystems} />
	</div>
</div>
