import { z } from "zod"

export const schema = z.object({
	username: z
		.string()
		.min(2, { message: "min 2 characters" })
		.max(20, { message: "max 20 characters" })
		.regex(/^[a-zA-Z0-9_]+$/, { message: "letters, numbers, underscores" }),
	email: z.string().email()
})
