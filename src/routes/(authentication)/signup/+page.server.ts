import { auth } from '$lib/server/lucia';
import { fail, type Actions } from '@sveltejs/kit';
import crypto from 'crypto';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { dev } from '$app/environment';

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.validate();
    if (session) throw redirect(302, '/trails/latest');
    return {
        title: 'Sign up'
    };
};

export const actions = ({
    default: async ({ request, locals }) => {
        const form = await request.formData();
        const email = form.get('email');
        const password = form.get('password');
        if (!email || typeof email !== 'string' || email.length > 50 || email.length < 6) {
            return fail(400, {
                email,
                input: 'email',
                message: 'Improper email',
            });
        }
        const passworMinLength = dev ? 5 : 16;
        if (!password || typeof password !== 'string' || password.length > 36 || password.length < passworMinLength) {
            return fail(400, {
                email,
                input: 'password',
                message: 'Password too long or short or both.',
            });
        }
        try {
            const username = email.replace(/[+@].*/, "") + crypto.randomBytes(3).toString("hex");
            const user = await auth.createUser('email', email, {
                password,
                attributes: {
                    email,
                    username,
                    isAdmin: false,
                }
            });
            const session = await auth.createSession(user.userId);
            locals.setSession(session);
            throw redirect(302, '/trails/latest');
        } catch (e) {
            const error = e as Error;
            if (error.message === 'AUTH_DUPLICATE_PROVIDER_ID') {
                return fail(400, {
                    email,
                    message: 'Email already in use'
                });
            }
            console.error(error);
            return fail(500, {
                email,
                message: 'Unknown error occurred'
            });
        }
    }
}) satisfies Actions;