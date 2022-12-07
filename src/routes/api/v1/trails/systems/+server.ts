import { toggleTrailNetworkApproval, getTrailNetworkPage } from "$lib/server/api/trails";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types"

export const GET: RequestHandler = async ({ url }) => {
    let perPage: number = url.searchParams.get('per') as unknown as number ?? undefined;
    let page: number = url.searchParams.get('page') as unknown as number ?? undefined;

    if (isNaN(perPage) || isNaN(page)) throw error(400, { message: "Invalid parameters." });
    const newSystems = await getTrailNetworkPage(perPage, page);
    return json(newSystems)
}

export const PATCH: RequestHandler = async ({ request }) => {
    const { isApproved, systems } = await request.json();

    const updatedSystem = await toggleTrailNetworkApproval(isApproved, systems);

    return json(updatedSystem);
}