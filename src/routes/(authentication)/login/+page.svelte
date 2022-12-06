<script lang="ts">
	import { afterNavigate, invalidateAll } from '$app/navigation';
	import type { ActionData, PageData } from './$types';
	import { loginRedirectUrl } from '$lib/constants';

	export let form: ActionData;
	export let data: PageData;

	// This is to reset the navbar after logging in.
	afterNavigate(() => {
		if (form?.success || data.hasSession) {
			invalidateAll();
			window.location.href = loginRedirectUrl;
		}
	});
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
		<button type="submit" class="btn w-full max-w-md mt-4">log in</button>
	</form>
	<p class="text-error">{form?.message || ''}</p>
</div>
