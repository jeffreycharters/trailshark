import { getAllTrailNetworks } from "$lib/server/api/trails";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const trailNetworks = await getAllTrailNetworks(false);
    console.log(trailNetworks);

    trailNetworks.sort((a, b) => a.isApproved < b.isApproved ? 1 : -1)

    return {
        trailNetworks
    }
}