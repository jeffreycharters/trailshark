import { getUserByUsername, updateUserById } from '$lib/server/api/users';
import { fail, type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { dev } from '$app/environment';
import { auth } from '$lib/server/lucia';

export const load = (async ({ locals, params }) => {
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
    editProfile: async ({ request, locals }) => {
        const data = await request.formData();
        const currentSessionUser = await locals.validateUser();
        const currentUserId = currentSessionUser?.user?.userId;

        const idToUpdate = data.get('user-id');
        if (idToUpdate != currentUserId) {
            return fail(403, { message: `Can't update other people's profiles.` })
        }

        const username = data.get('ts-username');
        if (typeof username != 'string' || username.length === 0) return fail(400, { id: "profile", message: 'Username is required?!?!' });

        const usernameRegex = /^[A-Za-z0-9_-]{3,18}$/;
        if (!usernameRegex.test(username)) return fail(400, { id: "profile", message: 'Invalid username' })


        const updatedUser = await updateUserById(idToUpdate, { username });

        return {
            id: "profile",
            success: true,
            updatedUsername: updatedUser.username
        }
    },

    changePassword: async ({ request, locals }) => {
        const data = await request.formData();
        const oldPass = data.get('current-password');
        const password = data.get('password');
        const confirm = data.get('password-confirm');

        if (!oldPass || !password || !confirm) return fail(400, { id: "change", message: "Missing input" })

        if (typeof oldPass != 'string' || typeof password != 'string' || typeof confirm != 'string') {
            return fail(400, { id: "change", message: 'Bad input' });
        }

        if (password != confirm) return fail(400, { id: "change", message: 'Passwords don\'t match' })

        const { user } = await locals.validateUser();
        if (!user) throw redirect(302, '/login')
        const passwordRegex = dev ? /^.{5,25}$/ : /^.{16,36}$/;
        if (!passwordRegex.test(password)) return fail(400, { id: "change", message: `Password is ${password.length} characters.` })
        try {
            await auth.updateUserPassword(user.userId, password);
            const session = await auth.createSession(user.userId);
            locals.setSession(session);
        } catch (e) {
            const error = e as Error
            console.log(error.message);
            return fail(500, { id: "change", message: "Unknown error" });
        }

        return {
            id: "change",
            success: true
        }

    }
}