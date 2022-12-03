<script lang="ts">
	import type { TrailSystem } from '@prisma/client';

	export let system: TrailSystem;
</script>

<div>
	<a href="/trails/systems/{system.slug}">
		<span class="text-secondary font-bold">{system.name}</span>
	</a>
</div>
