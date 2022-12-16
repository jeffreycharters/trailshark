<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="flex flex-col items-center h-full w-full">
	<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
		Sign up for TrailShark!
	</h2>

	<div class="text-center mt-4">
		Or <a href="/login" class="text-primary font-medium hover:cursor-pointer hover:underline mt-4"
			>log in</a
		>
		if you already have an account.
	</div>
	<form
		class="flex flex-col items-center space-y-2 w-full pt-4"
		method="post"
		use:enhance={({ data, cancel }) => {
			form = { message: '' };
			const username = data.get('email')?.toString() || '';
			const password = data.get('password')?.toString() || '';
			if (!username || !password) {
				form.message = 'fail input';
				cancel();
			}
		}}
	>
		<div class="form-control w-full max-w-md">
			<label for="email" class="label font-medium pb-1">Email address</label>
			<input name="email" type="email" class="input input-bordered w-full max-w-md" />
		</div>

		<div class="form-control w-full max-w-md">
			<label for="password" class="label font-medium pb-1">Password</label>
			<input name="password" type="password" class="input input-bordered w-full max-w-md" />
		</div>

		<div class="w-full max-w-md pt-2">
			<button class="btn btn-primary w-full">Register</button>
		</div>
		<div class="text-error w-full max-w-md">{form?.message ? form.message : ''}</div>
	</form>
</div>
