import type { PageLoad } from "./$types"
import { superValidate } from "sveltekit-superforms/server"
import { schema } from "./schema"

export const load = (async () => {
	const form = await superValidate(schema)
	return {
		title: "authenticate thyself",
		form
	}
}) satisfies PageLoad
