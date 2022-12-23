import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { toggleTrailApproval } from "$lib/server/api/trails";


export const PATCH: RequestHandler = async ({ request }) => {
    const { isApproved, trail } = await request.json();

    const updatedNetwork = await toggleTrailApproval(isApproved, trail);

    return json(updatedNetwork);
}