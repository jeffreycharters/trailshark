<script lang="ts">
	import { headingOneClasses } from '$lib/constants';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	const { success } = data;

	export let form: ActionData;
</script>

{#if success}
	<h1 class={headingOneClasses}>Create new password</h1>

	<p class="my-4">
		You can now create a new password for your account. It must be 16-36 characters, otherwise I
		don't care.
	</p>
	<p class="my-4">I highly recommend using a password manager app.</p>

	<form method="post">
		<div class="form-control w-full max-w-xs my-2">
			<label class="label" for="password">
				<span class="label-text font-bold">New Password</span>
			</label>
			<input
				type="password"
				name="password"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
			/>
		</div>

		{#if form}
			<div class="text-error text-sm px-4">{form.message}</div>
		{/if}

		<button class="btn btn-primary my-2 w-full max-w-xs">Change password</button>
	</form>
{:else}
	<h1 class={headingOneClasses}>Bad news!</h1>

	<p class="my-4">
		There was a problem when loading this page, which can best be described as: <strong
			>{data.message}.</strong
		>
	</p>
	<p class="my-4">
		But fear not. Just go back to the <a class="link text-primary" href="/login/password-reset"
			>Password Reset page</a
		> and try again.
	</p>
{/if}
