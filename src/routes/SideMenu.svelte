<script lang="ts">
	import { fly } from 'svelte/transition';
	import { messages } from '$lib/stores';
	import { browser } from '$app/environment';
	import Messages from '$lib/components/Messages.svelte';
	import { getUser } from '@lucia-auth/sveltekit/client';
	let visible = false;
	const closeModal = () => {
		visible = false;
	};

	const user = getUser();
</script>

{#if $messages && browser}
	<Messages messages={$messages} />
{/if}

<div class="drawer drawer-mobile">
	<input id="trails-menu-drawer" type="checkbox" class="drawer-toggle" bind:checked={visible} />
	<div class="drawer-content flex flex-col">
		<!-- Page content here -->

		<label
			for="trails-menu-drawer"
			class="btn btn-outline bg-base-100 bg-opacity-40 btn-sm shadow drawer-button lg:hidden fixed bottom-2 right-2 background-blur-10"
			>Menu</label
		>
		<div class="p-4">
			<slot />
		</div>
	</div>
	<div class="drawer-side lg:border-r-2" in:fly={{ x: -500, duration: 200 }}>
		<label for="trails-menu-drawer" class="drawer-overlay" />
		<ul class="menu p-4 w-80 bg-base-200 text-base-content">
			<!-- Sidebar content here -->
			<li>
				<a href="/trails/latest" on:click={closeModal}>
					{#if $user}
						My Trail Networks
					{:else}
						Latest Conditions
					{/if}
				</a>
			</li>
			<li><a href="/trails/networks" on:click={closeModal}>Trail Network List</a></li>
			<li>
				<a href="/trails/status" on:click={closeModal}>Add Status Update</a>
			</li>
			<div class="divider" />
			<li>
				<a href="/users/{$user?.username}" on:click={closeModal}>User Profile</a>
			</li>
			{#if $user?.isAdmin}
				<li>
					<a href="/adminc" on:click={closeModal}>Admin Shit</a>
				</li>
			{/if}
		</ul>
	</div>
</div>
