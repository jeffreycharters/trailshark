import { verifyPasswordResetToken } from '$lib/server/users';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { dev } from '$app/environment';
import type { JwtPayload } from 'jsonwebtoken';
import { getUserByEmail } from '$lib/server/api/users';
import { auth } from '$lib/server/lucia';

export const load = (async ({ params }) => {
    const { token } = params;

    if (!token || typeof token != 'string') {
        return { title: "Invalid Token", success: false, message: "Invalid Token" };
    }

    const payload = verifyPasswordResetToken(token);
    if (payload instanceof Error) {
        let errorMessage: string = '';
        if (payload.message === 'invalid signature') errorMessage = "Invalid token";
        if (payload.message === 'jwt expired') errorMessage = "Token expired";
        return { title: "Password Reset Problem", success: false, message: errorMessage }
    }


    return { title: "Reset pAssword!", success: true };
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request, params }) => {
        const { token } = params;
        const data = await request.formData();
        const password = data.get('password');

        if (typeof password != 'string') return { message: "Error getting password" }

        const passwordRegex = dev ? /^.{5,25}$/ : /^.{16,36}$/;
        if (!passwordRegex.test(password)) return fail(400, { message: "Password must be 16-36 characters" })


        const payload = verifyPasswordResetToken(token);
        if (payload instanceof Error) {
            throw redirect(302, './')
        }

        const goodPayload = payload as JwtPayload;
        const email = goodPayload['reset-password'];

        if (!email) {
            return fail(400, { message: "Error getting user email" })
        }

        const user = await getUserByEmail(email);

        if (!user) {
            return fail(400, { message: "Error getting user from database" })
        }

        try {
            await auth.updateUserPassword(user.id, password);
        } catch (e) {
            const error = e as Error
            console.log(error.message);
            return fail(500, { id: "change", message: "Unknown error" });
        }

        throw redirect(302, '/login?password=true')
    }
} satisfies Actions;