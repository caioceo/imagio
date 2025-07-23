import type { RequestHandler } from '@sveltejs/kit';
import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.formData();
    const file = data.get('file');

    if (!(file instanceof Blob)) {
        return new Response(JSON.stringify({ error: 'Arquivo inválido' }), { status: 400 });
    }

    if (!allowedTypes.includes(file.type)) {
        return new Response(JSON.stringify({ error: 'Tipo de arquivo não permitido' }), { status: 415 });
    }
    
}