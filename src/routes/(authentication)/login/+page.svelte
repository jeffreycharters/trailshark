<script lang="ts">
	import { addMessage } from '$lib/messages';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	if (data.passwordChanged) {
		addMessage({ alertLevel: 'success', message: 'Password changed! Please log in now' });
	} else if (data.addStatus) {
		addMessage({ alertLevel: 'success', message: 'Log in to add a status!' });
	}
</script>

<div class="flex flex-col items-center h-full w-full">
	<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
		Log in to Trailshark
	</h2>

	<div class="text-center mt-4">
		Or <a href="/login" class="text-primary font-medium hover:cursor-pointer hover:underline mt-4"
			>sign up</a
		>
		if you don't have an account.
	</div>
	<form class="flex flex-col items-center space-y-2 w-full pt-4" method="post">
		<div class="form-control w-full max-w-md">
			<label class="label" for="email"><span class="label-text">Email</span></label><br />
			<input class="input input-bordered w-full max-w-md" id="email" type="email" name="email" /><br
			/>
		</div>
		<div class="form-control w-full max-w-md">
			<label class="label" for="password"><span class="label-text">Password</span></label><br />
			<input class="input input-bordered" type="password" id="password" name="password" /><br />
		</div>
		<p class="text-error">{form?.message || ''}</p>
		<button type="submit" class="btn w-full max-w-md mt-4">log in</button>
	</form>

	<div class="mt-4">
		Did you <a href="/login/password-reset/" class="link">forget your password</a>?
	</div>
</div>
