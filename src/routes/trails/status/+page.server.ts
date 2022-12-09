import { getTrailStates } from "$lib/server/api/statuses";
import { getAllTrailNetworks } from "$lib/server/api/trails";
import { invalid, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = () => {
    const allNetworks = getAllTrailNetworks();
    const trailStates = getTrailStates();
    return {
        traiNetworks: allNetworks,
        trailStates
    }
}


export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const body = Object.fromEntries(data);
        console.log(body);


        if (!body['network-id'] || body.state || !body.comments) return invalid(400, { message: "Missing required field" })
    }
}