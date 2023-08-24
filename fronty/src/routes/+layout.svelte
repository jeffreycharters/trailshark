<script>
	import { page } from "$app/stores"
	import { onMount } from "svelte"
	import "../app.postcss"

	onMount(() => {
		document.body.classList.add("started")
	})
</script>

<svelte:head>
	<title>{$page.data.title ?? "Beep beep"} // trail_shark</title>
</svelte:head>

<div class="p-4">
	<slot />
</div>
