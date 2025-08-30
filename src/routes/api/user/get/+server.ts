import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const username = url.searchParams.get('username');

	if (!username) {
		return new Response(
			JSON.stringify({ error: 'username requerido' }),
			{ status: 400, headers: { 'content-type': 'application/json' } }
		);
	}

	const user = await prisma.user.findUnique({
		where: { username },
		select: {
			id: true,
			username: true,
			email: true,
			profilePic: true,
			url1: true,
			url2: true,
			plano: true
		}
	});

	if (!user) {
		return new Response(
			JSON.stringify({ user: null }),
			{ status: 404, headers: { 'content-type': 'application/json' } }
		);
	}

	return new Response(
		JSON.stringify({ user }),
		{ status: 200, headers: { 'content-type': 'application/json' } }
	);
};

