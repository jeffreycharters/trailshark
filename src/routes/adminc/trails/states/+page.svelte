<script lang="ts">
	import type { ActionData, PageData } from './$types';

	export let form: ActionData;
	export let data: PageData;
	let colour: string = 'success';

	let stateEnums: Record<string, string> = {
		successBtn: 'btn-success',
		warningBtn: 'btn-warning',
		errorBtn: 'btn-error',
		successBorder: 'border-success',
		warningBorder: 'border-warning',
		errorBorder: 'border-error'
	};
</script>

<h3 class="font-bold mb-4">Available Trail States</h3>

{#each data.trailStates as state}
	<div class="btn w-full cursor-default my-2 {stateEnums[`${state.textColor}Btn`]}">
		{state.description}
	</div>
{/each}

<div class="divider">Add new</div>

<form method="POST">
	<div class="form-control w-full max-w-xs">
		<label class="label" for="description">
			<span class="label-text font-bold text-lg">State Description</span>
		</label>
		<input
			type="text"
			name="description"
			placeholder="Open, Caution, Closed, etc"
			class="input input-bordered w-full max-w-xs border-l-4 {stateEnums[`${colour}Border`]}"
		/>
	</div>

	<div class="mt-4 mb-2 font-bold text-lg">Display Color</div>
	<div class="form-control border rounded px-4 my-2">
		<label class="label cursor-pointer">
			<span class="label-text">Green - Oll Korrect</span>
			<input
				type="radio"
				name="text-colour"
				class="radio checked:bg-primary"
				value="success"
				bind:group={colour}
			/>
		</label>
	</div>
	<div class="form-control  border rounded px-4 my-2">
		<label class="label cursor-pointer">
			<span class="label-text">Amber - Warning/Caution</span>
			<input
				value="warning"
				type="radio"
				name="text-colour"
				class="radio checked:bg-warning"
				bind:group={colour}
			/>
		</label>
	</div>
	<div class="form-control  border rounded px-4 my-2">
		<label class="label cursor-pointer">
			<span class="label-text">Red - Closed</span>
			<input
				value="error"
				type="radio"
				name="text-colour"
				class="radio checked:bg-error"
				bind:group={colour}
			/>
		</label>
	</div>

	<div class="text-error mb-2">
		{form?.message || ''}
	</div>

	<button class="btn w-full max-w-xs mt-4">Add State</button>
</form>
