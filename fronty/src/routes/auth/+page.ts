import type { PageLoad } from "./$types"
import { z } from "zod"
import { superValidate } from "sveltekit-superforms/server"

const schema = z.object({
	email: z.string().email()
})

export const load = (async () => {
	const form = await superValidate(schema)
	return {
		title: "create user",
		form
	}
}) satisfies PageLoad
