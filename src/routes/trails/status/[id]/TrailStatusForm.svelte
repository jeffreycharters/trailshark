<script lang="ts">
	import type { Trail, TrailStatusComment } from '@prisma/client';
	import type { ActionData } from './$types';

	export let comments: TrailStatusComment[];
	export let trailList: Trail[];
	export let form: ActionData;
	export let statusId: string;

	let selectedTrailId: string;
	let selectedCommentId: string;

	let thisForm: HTMLFormElement;

	const validateAndSubmit = () => {
		if (selectedTrailId && selectedCommentId) thisForm.submit();
	};
</script>

<div class="border p-4 bg-base-200 rounded my-2 w-full max-w-sm">
	<div class="font-bold text-sm">Create trail-specific comments:</div>
	<form method="post" bind:this={thisForm} on:change={validateAndSubmit}>
		<select
			class="select select-bordered w-full max-w-xs my-2"
			bind:value={selectedTrailId}
			name="trail"
		>
			<option disabled selected value="">Select Trail</option>
			{#each trailList as t (t.id)}
				<option value={t.id}>{t.name}</option>
			{/each}
		</select>
		<select
			class="select select-bordered w-full max-w-xs my-2"
			bind:value={selectedCommentId}
			name="comment"
		>
			<option disabled selected value="">Select Comment</option>
			{#each comments as comment (comment.id)}
				<option value={comment.id}>{comment.comment}</option>
			{/each}
		</select>

		<div class="text-sm text-error px-4">
			{form?.message ?? ''}
		</div>

		<input type="hidden" name="network-status-id" value={statusId} />

		<div class="text-right">
			<button class="btn btn-primary w-full max-w-xs my-2">+ Add</button>
		</div>
	</form>
</div>
