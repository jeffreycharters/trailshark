import { dev } from "$app/environment";
import { PrismaClient } from "@prisma/client";

let options = {};

if (dev) {
    options = {
        log: ['query', 'info', 'warn', 'error'],
    }
}

export const prisma = new PrismaClient(options);