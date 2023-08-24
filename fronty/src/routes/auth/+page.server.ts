import { superValidate } from "sveltekit-superforms/server"
import type { Actions } from "./$types"
import { z } from "zod"
import { fail } from "@sveltejs/kit"

const schema = z.object({
	email: z.string().email()
})

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, schema)
		console.log("POST", form)

		if (!form.valid) {
			return fail(400, { form })
		}

		// TODO: houdini this

		return { form }
	}
} satisfies Actions
