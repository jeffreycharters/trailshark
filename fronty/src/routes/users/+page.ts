import { load_UserList } from "$houdini"
import type { PageLoad } from "./$types"

export const load = (async (event) => {
	return { title: "user list", ...(await load_UserList({ event })) }
}) satisfies PageLoad
