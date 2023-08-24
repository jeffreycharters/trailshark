import { HoudiniClient } from "$houdini"

const endpoint = "http://localhost:3320/api/query"

export default new HoudiniClient({
	url: endpoint ?? ""
})
