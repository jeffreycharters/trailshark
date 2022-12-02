<script>
	import { page } from '$app/stores';
</script>

<div class="p-4 flex justify-center items-center">
	<div class="mockup-code max-w-md">
		<pre data-prefix="$"><code>display error info</code></pre>
		<pre data-prefix=">" class="text-warning"><code>error {$page.status}</code></pre>
		<pre data-prefix=">" class="text-success"><code>{$page?.error?.message}.</code></pre>
	</div>
</div>
