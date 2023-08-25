import { message, superValidate } from "sveltekit-superforms/server"
import type { Actions } from "./$types"
import { fail, redirect } from "@sveltejs/kit"
import { graphql } from "$houdini"
import { schema } from "./schema"

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
		const form = await superValidate(event, schema)

		if (!form.valid) return fail(400, { form })

		const res = await m_createUser.mutate({ input: form.data }, { event })
		console.log(res.errors)
		if (res.errors && res.errors.length) {
			return message(form, res.errors[0].message, { status: 400 })
		}
		throw redirect(302, "/users")
	}
} satisfies Actions
