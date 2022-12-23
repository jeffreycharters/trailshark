import { getUnapprovedTrails } from "$lib/server/api/trails";

export const load = async () => {
    const unapprovedTrails = await getUnapprovedTrails();

    return {
        unapprovedTrails
    }
}