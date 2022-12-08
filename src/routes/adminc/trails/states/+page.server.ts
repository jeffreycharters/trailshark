import { addTrailState, getTrailStates } from "$lib/server/api/statuses"
import { invalid, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async () => {
    const trailStates = await getTrailStates();
    return {
        trailStates
    }
}

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const description: unknown = data.get('description')
        const textColour: unknown = data.get('text-colour')

        if (typeof description != "string" || typeof textColour != "string") return invalid(400, { message: "What even is this?" })
        if (description?.length < 3) return invalid(400, { message: "Description must be 3 or more characters" })
        const newState = await addTrailState(description, textColour)
        if (!newState) return invalid(500, { message: "Unknown error" })
        return {
            success: true
        }
    }
}