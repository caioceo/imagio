import { prisma } from '$lib/server/prisma';
import { type RequestHandler } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

export const POST: RequestHandler = async ({ request }) => {

    const formData = await request.formData();

    const email = formData.get('email');
    const name = formData.get('name');
    const username = formData.get('username');
    const password = formData.get('password');

    // EMAIL FIELD
    // entender esse emailRegex.test(email)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== 'string' || !email || !emailRegex.test(email)) {
        return new Response(JSON.stringify({ success: false, error: 'Digite email valido' }),
            { status: 406 }
        );
    }
    const emailVerify = await prisma.user.findUnique({ where: { email } });
    if (emailVerify) {
        return new Response(
            JSON.stringify({ success: false, error: 'Email já cadastrado.' }),
            { status: 409 }
        );
    }
    // NAME FIELD
    const nameRegex = /^[A-Za-z ]{1, 50}$/
    if (typeof name !== 'string' || !name || nameRegex.test(name)){
        return new Response(JSON.stringify({ success: false, error: 'Caracteres invalidos' }),
            { status: 406 }
        );
    }

    // USERNAME FIELD
    const usernameRegex = /^[A-Za-z0-9._]{1,20}$/;
    if (typeof username !== 'string' || !username || !usernameRegex.test(username)) {
        return new Response(JSON.stringify({ success: false, error: 'Digite username valido' }),
            { status: 406 }
        );
    }
    const usernameVerify = await prisma.user.findUnique({ where: { username } });
    if (usernameVerify) {
        return new Response(
            JSON.stringify({ success: false, error: 'Username já está em uso.' }),
            { status: 409 }
        );
    }

    // PASSWORD FIELD
    const passwordRegex = /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{1,32}$/;
    if (typeof password !== 'string' || !password || !passwordRegex.test(password)) {
        return new Response(JSON.stringify({ success: false, error: 'Digite uma senha valida' }),
            { status: 406 }
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

    if (!newUser) {
        return new Response(JSON.stringify({ success: false }), { status: 501 });
    }
    else {
        return new Response(JSON.stringify({ success: true }), { status: 201 });
    };
}

// duvidas e respostas:

// bcrtpy é uma função assincrona?? que recebe a senha e salt (tipo uma seed)
// hashedPassword vai esperar o return da promise feita no bcrypt.hash

// prisma.user.findUnique faz uma promise e por isso usamos await
// essa promise retorna um objeto com os dados do usuario que bate com o email e usuario
// logo se emailVerify significa que foi encontrado o usuario com este email
// e em !emailVerify ele é nulo, ou seja, sem usuario cadastrado.

// talvez o ideal seja fazer a verificação individual de cada parte,
// para entender de fato onde está o erro 400


