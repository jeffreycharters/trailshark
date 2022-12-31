import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getUserByEmail, userExistsWithEmail } from '$lib/server/api/users';
import { getPasswordResetToken } from '$lib/server/users';
import { getTransporter } from '$lib/server/email';
import { EMAIL_SOURCE_ADDRESS } from '$env/static/private';

export const load = (async () => {
    return {
        title: "Send password reset email"
    };
}) satisfies PageServerLoad;


export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const email = data.get('ts-email');

        if (typeof email != 'string') return fail(400, { message: 'Couldn\'t read email' });

        const userExists = await userExistsWithEmail(email);

        if (userExists) {
            const user = await getUserByEmail(email);

            if (user) {
                const token = getPasswordResetToken(user.email);
                const emailer = await getTransporter();
                const mailOptions = {
                    from: EMAIL_SOURCE_ADDRESS,
                    to: email,
                    subject: "Trailshark Password Reset",
                    text: `Please click the link below or enter the address into your browser's location bar. It will expire in ten minutes.\r\n\r\nIf you have received this email in error, please ignore it.\r\n\r\nhttps://localhost:5173/login/password-reset/${token}`
                };
                if (mailOptions.to.includes("example")) throw redirect(302, `/login/password-reset/${token}`)
                emailer.sendMail(mailOptions, (err, result) => {
                    console.log({ err, result });

                });
                return { success: true, token }
            }
        }

        return {
            success: true,
        }
        // return redirect(302, '/login/password-sent')
    }
} satisfies Actions;