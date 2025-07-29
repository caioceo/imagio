import { prisma } from '$lib/server/prisma';

export async function getProjectById(id: string) {
    const projeto = await prisma.project.findUnique({
        where: {
            id: id
        },
        include: {
            images: true,
            
            user: {
                select: {
                    password: false,
                    username: true,
                    name: true,
                    email: true,
                    profilePic: true
                }
            }
        }
    })

    return projeto
}


export async function getUserByProject(id: string) {
    const user = await prisma.user.findUnique({
        where: {
            id: id
        },
        select: {
            password: false,
            username: true,
            name: true,
            email: true
        }
    })

    return user
}