import { invalid, type Actions } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    const session = locals.getSession();
    return {
        hasSession: true
    }
}

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const form = await request.formData();
        const email = form.get('email');
        const password = form.get('password');
        if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
            return invalid(400, {
                message: 'Invalid input'
            });
        }
        try {
            const user = await auth.authenticateUser('email', email, password);
            const session = await auth.createSession(user.userId);
            locals.setSession(session);
            return {
                success: true
            }
        } catch (e) {
            const error = e as Error;
            if (
                error.message === 'AUTH_INVALID_PROVIDER_ID' ||
                error.message === 'AUTH_INVALID_PASSWORD'
            ) {
                return invalid(400, {
                    message: 'Incorrect username or password.'
                });
            }
            // database connection error
            console.error(error);
            return invalid(500, {
                message: 'Unknown error occurred'
            });
        }
    }
};
