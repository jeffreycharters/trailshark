<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="p-8">
	<h2 class="text-xl font-bold">Sign in</h2>
	<form
		method="post"
		action="?/login"
		use:enhance={({ data, cancel }) => {
			form = { message: '' };
			const email = data.get('email')?.toString() || '';
			const password = data.get('password')?.toString() || '';
			if (!email || !password) {
				form.message = 'Invalid input';
				cancel();
			}
		}}
	>
		<div class="form-control w-full max-w-xs">
			<label class="label" for="email"><span class="label-text">email</span></label><br />
			<input class="input input-bordered w-full max-w-xs" id="email" type="email" name="email" /><br
			/>
		</div>
		<div class="form-control w-full max-w-xs">
			<label class="label" for="password"><span class="label-text">password</span></label><br />
			<input class="input input-bordered" type="password" id="password" name="password" /><br />
		</div>
		<button type="submit" class="btn w-full max-w-xs mt-4">log in</button>
	</form>
	<p class="text-error">{form?.message || ''}</p>
	<a href="/signup" class="btn btn-outline w-full max-w-xs mt-4">Create a new account</a>
</div>
