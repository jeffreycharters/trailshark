import { getUserByUsername, updateUserById } from '$lib/server/api/users';
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params, url }) => {
    const { username } = params;
    const { user } = await locals.validateUser();

    const loadedUser = await getUserByUsername(username);


    let canEdit = false;
    if (username === user?.username) {
        canEdit = true
    }
    return {
        canEdit,
        user: loadedUser,
        title: `${canEdit ? 'Editing ' : ''} ${user?.username}'s Profile`,
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const data = await request.formData();
        const currentSessionUser = await locals.validateUser();
        const currentUserId = currentSessionUser?.user?.userId;

        const idToUpdate = data.get('user-id');
        if (idToUpdate != currentUserId) {
            return fail(403, { message: `Can't update other people's profiles.` })
        }

        const username = data.get('ts-username');
        if (typeof username != 'string' || username.length === 0) return fail(400, { message: 'Username is required?!?!' });

        const updatedUser = await updateUserById(idToUpdate, { username })

        return {
            success: true,
            updatedUsername: updatedUser.username
        }
    }
}