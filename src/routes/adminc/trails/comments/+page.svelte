<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let selectedState: string;
	let comment: string = '';

	$: disabled = !selectedState || comment.length <= 2;
</script>

<details>
	<summary class="mb-4 cursor-pointer"> Add new trail comment </summary>
	<p class="my-4">
		Trail comments are short canned items that could be used to explain certain trail conditions.
	</p>

	<p class="my-4">
		These will be used along with the trail state to give an at-a-glance idea of trail conditions.
		Some examples include "Wet spots", "Trail work" or "Obstruction removed".
	</p>
</details>

<details>
	<summary>Current Comments</summary>
	{#each data.trailComments as comment}
		<div class="border border-l-4 rounded p-2 my-2 border-{comment.state.textColour}">
			{comment.comment}
		</div>
	{/each}
</details>

<form method="post">
	<div class="font-bold w-full max-w-xs">Related Trail State</div>
	{#each data.trailStates as state}
		<div class="form-control w-full max-w-xs my-2 rounded border border-{state.textColour} px-4">
			<label class="label cursor-pointer">
				<span class="label-text">{state.description}</span>
				<input
					on:click={() => (selectedState = state.textColour)}
					type="radio"
					name="state"
					class="radio checked:bg-{selectedState}"
					value={state.id}
				/>
			</label>
		</div>
	{/each}

	<div class="mt-4">
		<label for="comment" class="font-bold">Comment</label>
		<input
			bind:value={comment}
			name="comment"
			type="text"
			placeholder="Obstruction on trail, Muddy, etc"
			class="input input-bordered w-full max-w-xs"
		/>
	</div>

	<button type="submit" class="btn mt-4 w-full max-w-xs" {disabled}>Add Comment</button>
</form>
