<script lang="ts">
	interface Link {
		url: string;
		text: string;
	}
	const baseAdminUrl = '/adminc';

	const links: Link[] = [
		{
			url: 'trails/comments',
			text: 'Add Trail comment'
		},
		{
			url: 'trails/states',
			text: 'Add Trail State'
		},
		{
			url: 'trails/networks',
			text: 'Approve Networks'
		},
		{
			url: 'trails',
			text: 'Approve Trails'
		}
	];
</script>

<div class="flex flex-col gap-1">
	<ul>
		{#each links as link (link.url)}
			<li class="my-2 list-disc text-primary-focus mx-2">
				<a class="link text-primary" href="{baseAdminUrl}/{link.url}">{link.text}</a>
			</li>
		{/each}
	</ul>
</div>
