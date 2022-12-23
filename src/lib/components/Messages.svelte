<script lang="ts">
	import type { AlertMessage } from '$lib/stores';
	export let messages: AlertMessage[];
</script>

<div class="toast toast-start">
	{#each messages as message (message)}
		<div class="alert text-sm alert-{message.alertLevel}">
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="stroke-current flex-shrink-0 h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
				{@html message.message}
			</div>
		</div>
	{/each}
</div>
