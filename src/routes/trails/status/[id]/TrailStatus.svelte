<script lang="ts">
	import type { Trail, TrailState, TrailStatus, TrailStatusComment } from '@prisma/client';

	export let status: TrailStatus & {
		trail: Trail;
		comment: TrailStatusComment & { state: TrailState };
	};

	$: stateColour = status.comment.state.textColour;
</script>

<div class="border-2 border-{stateColour} p-4 font-bold my-2 rounded">
	{status.trail.name} - {status.comment.comment}
</div>
