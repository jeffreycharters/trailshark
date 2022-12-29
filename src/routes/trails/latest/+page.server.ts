import { getLatestStatusesForUser } from "$lib/server/api/statuses";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals }) => {
    const { user } = await locals.validateUser();
    if (!user?.userId) throw redirect(302, "/login");

    const latestStatuses = await getLatestStatusesForUser(user?.userId)
    return {
        latestStatuses,
        title: 'Latest trail conditions'
    }
}) satisfies PageServerLoad;