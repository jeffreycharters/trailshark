<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { headingOneClasses } from '$lib/constants';
	import { addMessage, messages } from '$lib/stores';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
	const { user, canEdit } = data;

	let username = user?.username;
</script>

<h1 class={headingOneClasses}>User Profile</h1>

{#if canEdit}
	<form
		method="post"
		use:enhance={() => {
			return async ({ result, update }) => {
				if (result.type === 'success' && result.data) {
					goto(`/users/${result.data.updatedUsername}`);
					username = result.data.updatedUsername;
					addMessage({ alertLevel: 'success', message: 'Good stuff' });
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
		</div>

		<div class="text-error text-sm m-2">{form?.message ?? ''}</div>

		<button type="submit" class="btn mt-4">Save changes</button>
	</form>
{:else}
	<div>
		Username: {user?.username}
	</div>
{/if}
