import { auth } from '$lib/server/lucia';
import { invalid, type Actions } from '@sveltejs/kit';
import crypto from 'crypto';

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
            const username = email.replace(/[+@].*/, "") + crypto.randomBytes(3).toString("hex");
            const user = await auth.createUser('email', email, {
                password,
                attributes: {
                    username,
                    isAdmin: false
                }
            });
            const session = await auth.createSession(user.userId);
            locals.setSession(session);
        } catch (e) {
            const error = e as Error;
            if (error.message === 'AUTH_DUPLICATE_PROVIDER_ID') {
                return invalid(400, {
                    message: 'Email already in use'
                });
            }
            console.error(error);
            return invalid(500, {
                message: 'Unknown error occurred'
            });
        }
    }
};

import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { LuciaError } from 'lucia-auth';

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.getSession();
    if (session) throw redirect(302, '/');
    return {};
};