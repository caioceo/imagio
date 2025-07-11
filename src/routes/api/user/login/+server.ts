import { prisma } from '$lib/server/prisma';

import type { RequestHandler } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

export const POST: RequestHandler = async ({ request, cookies }) => {

    const formData = await request.formData();

    const email = formData.get('email');
    const password = formData.get('password');

    if (
        typeof email !== 'string' ||
        typeof password !== 'string' ||
        !email || !password
    ) {
        console.log('incorrect data')
        return new Response(
            JSON.stringify({ success: false }),
            { status: 401 }
        );
    }

    const userID = await prisma.user.findUnique({ where: { email } });

    if (!userID) {
        return new Response(
            JSON.stringify({ success: false}),
            { status: 409 }
        );
    }

    const passwordVerify = await bcrypt.compare(password, userID.password)

    if (!passwordVerify) {
        console.log('email or password are incorrect')
        return new Response(JSON.stringify({ success: false }), { status: 409 });
    }
    else {
        cookies.set('auth_token', userID.id, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 3600 * 24 * 30
        });
        console.log("successful login")
        return new Response(JSON.stringify({ success: true }), { status: 201 });
    }
};

