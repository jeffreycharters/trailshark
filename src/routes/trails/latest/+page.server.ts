import { getLatestStatusesForUser } from "$lib/server/api/statuses";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const { user } = await locals.validateUser();
    const latestStatuses = await getLatestStatusesForUser(user.id)
    return {
        latestStatuses
    }
}