import { getNetworkStatus } from "$lib/server/api/statuses";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, params }) => {
    const statusId = params.id;
    const networkStatus = await getNetworkStatus(statusId);

    const { user } = await locals.validateUser();

    const isAuthor = networkStatus?.author.id === user?.userId;


    return {
        networkStatus,
        isAuthor
    }
}