import { superValidate } from "sveltekit-superforms/server"
import type { Actions } from "./$types"
import { z } from "zod"
import { fail, redirect } from "@sveltejs/kit"
import { graphql } from "$houdini"

const schema = z.object({
	email: z.string().email()
})

const m_createUser = graphql(`
	mutation CreateUser($input: NewUserInput!) {
		createUser(input: $input) {
			id
			email
		}
	}
`)

export const actions = {
	default: async (event) => {
		const form = await superValidate(event.request, schema)

		if (!form.valid) return fail(400, { form })

		const res = await m_createUser.mutate({ input: form.data }, { event })
		if (res.errors) {
			return fail(400, { form })
		}

		throw redirect(302, "/users")
	}
} satisfies Actions
