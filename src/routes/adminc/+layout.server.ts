import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ locals }) => {
    const sessionUser = await locals.validateUser();
    if (!sessionUser?.user?.isAdmin) return redirect(302, '/trails/latest/')
}