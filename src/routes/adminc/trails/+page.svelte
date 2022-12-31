<script lang="ts">
	import type { PageData } from './$types';
	import AdminTrailRow from './AdminTrailRow.svelte';

	export let data: PageData;
	const { unapprovedTrails } = data;
</script>

<h1 class="text-xl font-bold">Approve Trails</h1>

{#each unapprovedTrails as trail (trail.id)}
	<AdminTrailRow {trail} />
{:else}
	<div class="my-4 font-bold italic text-primary-focus">None at the moment!</div>
{/each}
