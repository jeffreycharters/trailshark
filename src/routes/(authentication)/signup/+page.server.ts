import { auth } from '$lib/server/lucia';
import { fail, type Actions } from '@sveltejs/kit';
import crypto from 'crypto';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.validate();
    if (session) throw redirect(302, '/trails/latest');
    return {
        title: 'Sign up'
    };
};

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
            const username = email.replace(/[+@].*/, "") + crypto.randomBytes(3).toString("hex");
            const user = await auth.createUser('email', email, {
                password,
                attributes: {
                    username,
                    isAdmin: false,
                    email
                }
            });
            const session = await auth.createSession(user.userId);
            locals.setSession(session);
            throw redirect(302, '/trails/latest');
        } catch (e) {
            const error = e as Error;
            if (error.message === 'AUTH_DUPLICATE_PROVIDER_ID') {
                return fail(400, {
                    message: 'Email already in use'
                });
            }
            console.error(error);
            return fail(500, {
                message: 'Unknown error occurred'
            });
        }
    }
};