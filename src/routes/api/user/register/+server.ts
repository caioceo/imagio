import { PrismaClient } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {

        const formData = await request.formData();

        const email = formData.get('email');
        const name = formData.get('name');
        const username = formData.get('username');
        const password = formData.get('password');
        
        if (
            typeof email !== 'string' ||
            typeof name !== 'string' ||
            typeof username !== 'string' ||
            typeof password !== 'string' ||
            !email || !name || !username || !password
        ) {
            return new Response(
                JSON.stringify({ success: false, error: 'Dados inválidos.' }),
                { status: 401 }
            );
        }

        const emailVerify = await prisma.user.findUnique({ where: { email } });
        const usernameVerify = await prisma.user.findUnique({ where: { username } });

        if (emailVerify) {
            return new Response(
                JSON.stringify({ success: false, error: 'Email já cadastrado.' }),
                { status: 409 }
            );
        }

        if (usernameVerify) {
            return new Response(
                JSON.stringify({ success: false, error: 'Username já está em uso.' }),
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                username,
                password: hashedPassword
            }
        });

        if (!newUser){
            return new Response(JSON.stringify({ success: false }), { status: 501 });
        }
        else{
            return new Response(JSON.stringify({ success: true}), { status: 201});
        }
};

// duvidas e respostas:

        // bcrtpy é uma função assincrona?? que recebe a senha e salt (tipo uma seed)
        // hashedPassword vai esperar o return da promise feita no bcrypt.hash

        // prisma.user.findUnique faz uma promise e por isso usamos await
        // essa promise retorna um objeto com os dados do usuario que bate com o email e usuario
        // logo se emailVerify significa que foi encontrado o usuario com este email
        // e em !emailVerify ele é nulo, ou seja, sem usuario cadastrado.

        // talvez o ideal seja fazer a verificação individual de cada parte,
        // para entender de fato onde está o erro 400


