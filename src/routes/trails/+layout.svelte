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
			class="btn btn-outline bg-base-100 btn-sm shadow drawer-button lg:hidden fixed bottom-2 right-2"
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
				<a href="/trails/status/" on:click={closeModal}>Add Status Update</a>
			</li>
			<li><a href="/trails/" on:click={closeModal}>Add a Trail</a></li>
			<li><a href="/trails/networks/" on:click={closeModal}>Trail Networks</a></li>
			{#if $user?.isAdmin}
				<div class="divider" />
				<li>
					<a href="/adminc/" on:click={closeModal}>Admin Shit</a>
				</li>
			{/if}
		</ul>
	</div>
</div>
