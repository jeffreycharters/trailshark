import { toggleTrailSystemApproval } from "$lib/server/api/trails";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types"

export const PATCH: RequestHandler = async ({ request }) => {
    const { system } = await request.json();

    const updatedSystem = await toggleTrailSystemApproval(system);

    return json(updatedSystem);
}