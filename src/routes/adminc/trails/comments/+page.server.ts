import { addTrailComment, getTrailComments, getTrailStates } from "$lib/server/api/statuses";
import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export let load: PageServerLoad = async () => {
    const trailStates = await getTrailStates();
    const trailComments = await getTrailComments();
    return { trailStates, trailComments };
}

export let actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const body = Object.fromEntries(data);

        await addTrailComment(body.comment.toString(), Number(body.state));

        throw redirect(302, "/adminc/trails/comments/")
    }
}