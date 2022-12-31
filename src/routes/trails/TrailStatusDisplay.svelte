<script lang="ts">
	import type { Trail, TrailState, TrailStatus, TrailStatusComment } from '@prisma/client';

	export let trailStatus: TrailStatus & {
		trail: Trail;
		comment: TrailStatusComment & {
			state: TrailState;
		};
	};

	let icon: string;
	let iconClasses = 'h-4 w-4';
	switch (trailStatus.comment.state.textColour) {
		case 'error':
			icon = `<svg xmlns="http://www.w3.org/2000/svg" class="${iconClasses} stroke-error" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M8.7 3h6.6c.3 0 .5 .1 .7 .3l4.7 4.7c.2 .2 .3 .4 .3 .7v6.6c0 .3 -.1 .5 -.3 .7l-4.7 4.7c-.2 .2 -.4 .3 -.7 .3h-6.6c-.3 0 -.5 -.1 -.7 -.3l-4.7 -4.7c-.2 -.2 -.3 -.4 -.3 -.7v-6.6c0 -.3 .1 -.5 .3 -.7l4.7 -4.7c.2 -.2 .4 -.3 .7 -.3z"></path>
   <line x1="12" y1="8" x2="12" y2="12"></line>
   <line x1="12" y1="16" x2="12.01" y2="16"></line>
</svg>`;
			break;
		case 'warning':
			icon = `<svg xmlns="http://www.w3.org/2000/svg" class="${iconClasses} stroke-warning" viewBox="0 0 24 24" stroke-width="1.75" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <circle cx="12" cy="12" r="9"></circle>
   <line x1="12" y1="8" x2="12" y2="12"></line>
   <line x1="12" y1="16" x2="12.01" y2="16"></line>
</svg>`;
			break;
		case 'success':
			icon = `<svg xmlns="http://www.w3.org/2000/svg" class="${iconClasses} text-success" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <circle cx="12" cy="12" r="9"></circle>
   <path d="M9 12l2 2l4 -4"></path>
</svg>`;
	}
</script>

<div
	class="border border-l-2 border-{trailStatus.comment.state
		.textColour} py-1 px-2 rounded my-2 max-w-lg flex justify-between shadow bg-{trailStatus.comment
		.state.textColour} bg-opacity-10 text-sm"
>
	<div class="flex items-center gap-2">
		{@html icon || ''}<span class="font-bold text-primary-content italic"
			>{trailStatus.trail.name}</span
		>
	</div>
	<div class="text-primary-content opacity-80 ml-8">
		{trailStatus.comment.comment}
	</div>
</div>
