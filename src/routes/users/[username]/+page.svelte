<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { headingOneClasses } from '$lib/constants';
	import { addMessage } from '$lib/messages';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
	const { user, canEdit } = data;

	let username = user?.username;

	if (form?.success && form?.id === 'profile') {
		addMessage({ alertLevel: 'success', message: 'Changes saved' });
	}
	if (form?.success && form?.id === 'change') {
		addMessage({ alertLevel: 'success', message: 'Password successfully changed' });
	}
</script>

<h1 class={headingOneClasses}>User Profile</h1>

{#if canEdit}
	<form
		method="post"
		action="?/editProfile"
		use:enhance={() => {
			return async ({ result, update }) => {
				if (result.type === 'success' && result.data) {
					goto(`/users/${result.data.updatedUsername}`, { invalidateAll: true });
					username = result.data.updatedUsername;
					addMessage({ alertLevel: 'success', message: 'Changes saved' });
				} else {
					update();
				}
			};
		}}
	>
		<input type="hidden" value={user?.id} name="user-id" />
		<div class="form-control w-full max-w-xs mt-4">
			<label class="label" for="ts-username">
				<span class="label-text">Username</span>
			</label>
			<input
				type="text"
				name="ts-username"
				placeholder="Hmmm..."
				bind:value={username}
				class="input input-bordered w-full max-w-xs"
			/>
			<label class="label" for="ts-username">
				<span class="label-text-alt"
					>3-18 alphanumeric characters and <kbd class="kbd kbd-xs">-</kbd> or
					<kbd class="kbd kbd-xs">_</kbd> only
				</span></label
			>
		</div>

		{#if form?.id === 'profile'}
			<div class="text-error text-sm m-2">{form?.message ?? ''}</div>
		{/if}

		<button type="submit" class="btn mt-4">Save changes</button>
	</form>

	<form
		method="post"
		action="?/changePassword"
		use:enhance={() => {
			return async ({ result, update }) => {
				if (result.type === 'success') {
					addMessage({ alertLevel: 'success', message: 'Password successfully updated' });
				} else {
					update();
				}
			};
		}}
	>
		<h2 class="mt-10 mb-4 {headingOneClasses}">Change password</h2>

		<p><strong>Password rules:</strong> 16 to 36 characters. Otherwise I don't care.</p>

		<p>
			For heck's sake, it's time to start using a password manager. Or just enter your normal
			password twice.
		</p>

		<div class="form-control w-full max-w-xs">
			<label class="label" for="current-password">
				<span class="label-text">Current Password</span>
			</label>
			<input
				type="password"
				name="current-password"
				placeholder="password1234"
				class="input input-bordered w-full max-w-xs"
				value="testpass123"
			/>
		</div>

		<div class="form-control w-full max-w-xs">
			<label class="label" for="password">
				<span class="label-text">New Password</span>
			</label>
			<input
				type="password"
				name="password"
				placeholder="18 to 36 characters"
				class="input input-bordered w-full max-w-xs"
				value="testpass123"
			/>
		</div>

		<div class="form-control w-full max-w-xs">
			<label class="label" for="password-confirm">
				<span class="label-text">Confirm New Password</span>
			</label>
			<input
				type="password"
				name="password-confirm"
				placeholder="Same as last one 👆"
				class="input input-bordered w-full max-w-xs"
				value="testpass123"
			/>
		</div>

		{#if form?.id === 'change'}
			<div class="text-error text-sm m-2">{form?.message ?? ''}</div>
		{/if}

		<button type="submit" class="btn mt-4">Change password</button>
	</form>
{:else}
	<div>
		Username: {user?.username}
	</div>
{/if}

<style lang="postcss">
	p {
		@apply my-4 max-w-md;
	}
</style>
