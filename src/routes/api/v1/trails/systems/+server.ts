import { toggleTrailSystemApproval } from "$lib/server/api/trails";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types"

export const PATCH: RequestHandler = async ({ request }) => {
    const { isApproved, systems } = await request.json();

    const updatedSystem = await toggleTrailSystemApproval(isApproved, systems);

    return json(updatedSystem);
}