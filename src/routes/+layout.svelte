<script lang="ts">
	import { page } from '$app/stores';
	import { getUser, handleSession, signOut } from '@lucia-auth/sveltekit/client';
	import { invalidateAll } from '$app/navigation';
	import '../app.css';

	handleSession(page);

	type Link = {
		text: string;
		href: string;
	};
	const menuLinks: Link[] = [{ text: 'Trail Conditions', href: '/trails/latest' }];

	const user = getUser();
</script>

<div class="min-h-full">
	<nav class="navbar bg-neutral border-b text-neutral-content">
		<div class="flex-1">
			<a href="/" class="btn btn-ghost normal-case text-2xl">Trailshark</a>
		</div>

		<div class="flex-none">
			{#if !$user}
				<div class="dropdown dropdown-end">
					<a href="/signup" class="btn btn-primary btn-sm">Sign up</a>
					<a href="/login" class="btn btn-ghost btn-sm hover:text-warning">Log in</a>
				</div>
			{:else}
				<div class="dropdown dropdown-end">
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label tabindex="0" class="avatar placeholder cursor-pointer">
						<div class="w-8 h-8 mask mask-squircle bg-base-200 text-accent-focus">
							<span class="text-sm font-bold">JC</span>
						</div>
					</label>
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<ul
						tabindex="0"
						class="menu dropdown-content dropdown-end p-2 shadow bg-base-100 rounded-box w-52 mt-4 text-primary-focus border border-base-200"
					>
						<li>
							<a href="/users/settings">Settings</a>
						</li>
						<li>
							<button
								on:click={async () => {
									await signOut();
									invalidateAll();
									window.location.href = '/';
								}}>Sign out</button
							>
						</li>
					</ul>
				</div>

				<!-- The hamburger menu -->
				<div class="dropdown dropdown-end lg:hidden">
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label tabindex="0" class="btn btn-ghost rounded-btn">
						<svg
							class="swap-off fill-current"
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							viewBox="0 0 512 512"
							><path
								d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"
							/></svg
						>
					</label>
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->

					<ul
						tabindex="0"
						class="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-primary-focus border border-base-200"
					>
						{#each menuLinks as link}
							<li><a href={link.href}>{link.text}</a></li>
						{/each}
					</ul>
				</div>
				<div class="dropdown dropdown-end mr-4 hidden lg:block">
					{#each menuLinks as link}
						<a href={link.href} class="btn btn-primary btn-outline">{link.text}</a>
					{/each}
				</div>
			{/if}
		</div>
	</nav>
	<div>
		<slot />
	</div>
</div>
