import { fail, type Actions, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import type { PageServerLoad } from './$types';
import { loginRedirectUrl } from '$lib/constants';

export const load: PageServerLoad = async ({ locals, url }) => {
    const passwordChanged = url.searchParams.get('password')
    const session = await locals.validate();
    return {
        hasSession: !!session,
        title: 'Login',
        passwordChanged
    }
}

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const form = await request.formData();
        const email = form.get('email');
        const password = form.get('password');
        if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
            return fail(400, {
                message: 'fail input'
            });
        }
        try {
            const user = await auth.authenticateUser('email', email, password);
            const session = await auth.createSession(user.userId);

            locals.setSession(session);
        } catch (e) {
            const error = e as Error;
            if (
                error.message === 'AUTH_fail_PROVIDER_ID' ||
                error.message === 'AUTH_fail_PASSWORD'
            ) {
                return fail(400, {
                    message: 'Incorrect username or password.'
                });
            }
            // database connection error
            console.error(error);
            return fail(500, {
                message: 'Unknown error occurred'
            });
        }
        throw redirect(302, loginRedirectUrl)
    }
};
