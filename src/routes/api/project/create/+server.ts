import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

export const POST: RequestHandler = async ({ request }) => {

    const { name, desc, links, images, userID } = await request.json()

    if (
        typeof name !== 'string' ||
        typeof desc !== 'string' ||
        typeof userID !== 'string'
    ) {
        return new Response(JSON.stringify({ success: false, error: 'Invalid inputasdada' }), { status: 400 });
    }

    const images64: string[] = images;

    console.log(name)
    console.log(desc)



    const resp = await prisma.project.create({
        data: {
            desc: desc,
            name: name,
            link1: links[0] || null,
            link2: links[1] || null,
            user: { connect: { id: userID } },
            images: {
                create: images64.map((img64) => ({
                    url: img64
                }))
            }
        }
    });

    return new Response();
};