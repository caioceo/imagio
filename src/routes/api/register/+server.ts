import { PrismaClient } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
