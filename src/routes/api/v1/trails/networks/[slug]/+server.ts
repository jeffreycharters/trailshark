import { prisma } from "$lib/server/db";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params }) => {
    const { slug } = params;

    const networkTrails = await prisma.trail.findMany({
        where: {
            trailNetwork: {
                slug
            },
        }
    })

    networkTrails.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)
    return json(networkTrails)

}