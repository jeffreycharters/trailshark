import { toggleTrailNetworkApproval, getTrailNetworkPage } from "$lib/server/api/trails";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types"

export const GET: RequestHandler = async ({ url }) => {
    let perPage: number = url.searchParams.get('per') as unknown as number ?? undefined;
    let page: number = url.searchParams.get('page') as unknown as number ?? undefined;

    if (isNaN(perPage) || isNaN(page)) throw error(400, { message: "fail parameters." });
    const newNetworks = await getTrailNetworkPage(perPage, page);
    return json(newNetworks)
}

export const PATCH: RequestHandler = async ({ request }) => {
    const { isApproved, network } = await request.json();

    const updatedNetwork = await toggleTrailNetworkApproval(isApproved, network);

    return json(updatedNetwork);
}