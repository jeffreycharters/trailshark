<script lang="ts">
	import { page } from '$app/stores';

	const basePath = $page.url.pathname;
</script>

<div class="flex flex-col gap-1">
	<ul>
		<li>
			<a class="link text-primary" href="{basePath}/trails/comments/">Add Trail comment</a>
		</li>
		<li>
			<a class="link text-primary" href="{basePath}/trails/states/">Add Trail state</a>
		</li>
	</ul>
</div>
