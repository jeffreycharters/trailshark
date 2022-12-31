<script lang="ts">
	import { headingOneClasses } from '$lib/constants';
	import type { ActionData } from './$types';
</script>

<h1 class={headingOneClasses}>Password Reset</h1>

<div class="my-4">
	Enter your Trailshark email address and we'll send you a link to reset your password.
</div>

<form method="post">
	<div class="form-control w-full max-w-xs">
		<label class="label" for="ts-email">
			<span class="label-text">Account email</span>
		</label>
		<input
			type="text"
			name="ts-email"
			placeholder="Email!"
			class="input input-bordered w-full max-w-xs"
		/>
	</div>

	<button class="btn btn-primary w-full max-w-xs my-4">Send me password please</button>
</form>
