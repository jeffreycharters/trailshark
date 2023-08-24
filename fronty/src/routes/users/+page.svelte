<script lang="ts">
	import { derived } from "svelte/store"
	import type { PageData } from "./$types"

	export let data: PageData

	let UserList = data.UserList
	$: ({ UserList } = data)

	const users = derived(UserList, (users) => users.data?.users ?? [])
</script>

<h1 class="h1 mb-2">User List</h1>

{#each $users as user (user.id)}
	<div>{user.email}</div>
{/each}
