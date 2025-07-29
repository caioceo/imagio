import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { getProjectById, getUserByProject } from '$lib/utils';

export const load = (async ({ params }) => {

    const id = params.number
    
    const projeto = await getProjectById(id)

    if (!projeto) {
        redirect(300, "/")
    }


    return { projeto };
}) satisfies PageServerLoad;