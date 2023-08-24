/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
	schemaPath: "./schema.gql",
	plugins: {
		"houdini-svelte": {
			client: "./src/lib/client.ts"
		}
	}
}

export default config
