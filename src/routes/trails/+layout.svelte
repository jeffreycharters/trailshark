<script lang="ts">
	import { getUser } from '@lucia-auth/sveltekit/client';
	import { fly } from 'svelte/transition';

	let visible = false;

	const closeModal = () => {
		visible = false;
	};

	const user = getUser();
</script>

<div class="drawer drawer-mobile">
	<input id="trails-menu-drawer" type="checkbox" class="drawer-toggle" bind:checked={visible} />
	<div class="drawer-content flex flex-col">
		<!-- Page content here -->

		<label
			for="trails-menu-drawer"
			class="btn btn-outline btn-sm shadow drawer-button lg:hidden fixed bottom-2 right-2"
			>Open Trails menu</label
		>
		<div class="p-4">
			<slot />
		</div>
	</div>
	<div class="drawer-side lg:border-r-2" in:fly={{ x: -500, duration: 250 }}>
		<label for="trails-menu-drawer" class="drawer-overlay" />
		<ul class="menu p-4 w-80 bg-base-200 text-base-content">
			<!-- Sidebar content here -->
			<li>
				<a href="/trails/status/add" on:click={closeModal}>Add Status Update</a>
			</li>
			<li><a href="/trails/systems/add" on:click={closeModal}>Add Trail System</a></li>
			<li><a href="/trails/systems/add" on:click={closeModal}>Add Trail</a></li>
			{#if $user?.isAdmin}
				<div class="divider" />
				<li>Admin Shit</li>
			{/if}
		</ul>
	</div>
</div>
