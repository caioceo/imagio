import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

export const POST: RequestHandler = async ({ request }) => {

    const { name, desc, links, images, userID, ytURL } = await request.json()

    if (
        typeof name !== 'string' ||
        typeof desc !== 'string' ||
        typeof userID !== 'string' ||
        typeof ytURL !== 'string'
    ) {
        return new Response(JSON.stringify({ success: false, error: 'Invalid input' }), { status: 400 });
    }

    if (
        !name ||
        !desc ||
        !images
    ) {
        return new Response(JSON.stringify({ success: false, error: 'Invalid input' }), { status: 400 });
    }

    const images64: string[] = images;

    if (images64.length < 3){
        return new Response(JSON.stringify({ success: false, error: 'Need more images' }), { status: 400 });
    }

    console.log(name)
    console.log(desc)

    function getYouTubeVideoId(url:string) {
        const regex =
            /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    const ytID = getYouTubeVideoId(ytURL)




    const resp = await prisma.project.create({
        data: {
            desc: desc,
            name: name,
            link1: links[0] || null,
            link2: links[1] || null,
            ytID: ytID || null,
            user: { connect: { id: userID } },
            images: {
                create: images64.map((img64) => ({
                    url: img64
                }))
            }
        }
    });

    return new Response(JSON.stringify({ success: true, error: 'Success' }), { status: 200 });
    
};