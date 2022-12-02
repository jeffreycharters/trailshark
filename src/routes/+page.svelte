<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const user: PageData['user'] = data.session.user;
</script>

<div class="p-4">
	<h2 class="text-xl font-bold mb-4">Keeping you outside</h2>

	<p class="py-2">We're only here to keep you moving.</p>
	<p class="py-2">What are the <strong>Guelph Lake</strong> trails like?</p>

	<p class="py-2">Boom! Now you know, go ride!</p>
</div>
