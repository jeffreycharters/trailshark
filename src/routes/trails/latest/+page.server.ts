import { getLatestNetworkStatuses, getLatestStatusesForUser } from "$lib/server/api/statuses";
import type { TrailNetworkWithTrailStatuses } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals }) => {
    const { user } = await locals.validateUser();

    let latestStatuses: TrailNetworkWithTrailStatuses[];
    if (!user) {
        latestStatuses = await getLatestNetworkStatuses();
    } else {
        latestStatuses = await getLatestStatusesForUser(user.userId);
    }
    return {
        latestStatuses,
        title: 'Latest trail conditions'
    }
}) satisfies PageServerLoad;