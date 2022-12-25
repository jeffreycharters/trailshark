import { getLatestStatusesForUser } from "$lib/server/api/statuses";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getUserSubscriptions } from "$lib/server/api/subscriptions";

export const load = (async ({ locals }) => {
    const { user } = await locals.validateUser();
    if (!user?.userId) throw redirect(302, "/login");

    const latestStatuses = await getLatestStatusesForUser(user?.userId)
    return {
        latestStatuses
    }
}) satisfies PageServerLoad;