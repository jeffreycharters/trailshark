import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { addTrailNetwork, toggleTrailNetworkApproval } from "./trails";
import { prisma } from "$lib/server/db";
import type { TrailNetwork, User } from "@prisma/client";

describe('trail networks', () => {
    let user: User;
    beforeAll(async () => {
        user = await prisma.user.create({
            data: {
                provider_id: "email:user@example.com",
                username: "hi",
            }
        })
    });
    beforeEach(async () => {
        await prisma.trailNetwork.deleteMany({})
    });

    afterAll(async () => {
        await prisma.user.deleteMany({})
    })

    it('can add new system', async () => {
        const newSystem = {
            name: "New Trail",
            userId: user.id
        }
        const addedSystem = await addTrailNetwork(newSystem.name, newSystem.userId) as unknown as TrailNetwork;

        expect(addedSystem?.name).toEqual(newSystem.name);
        expect(addedSystem?.userId).toEqual(user.id);
    });

    it('no name gives an error', async () => {
        const newSystem = {
            name: "",
            userId: user.id
        }
        const addedSystem = await addTrailNetwork(newSystem.name, newSystem.userId);
        expect(addedSystem).toThrowError(Error)
    })

    it('toggling isApproved works properly', async () => {
        const newSystem = {
            name: "New Trail",
            userId: user.id
        }
        const addedSystem = await addTrailNetwork(newSystem.name, newSystem.userId) as unknown as TrailNetwork;

        if (!addedSystem) return;

        const payload = await toggleTrailNetworkApproval(addedSystem.isApproved, [addedSystem.id]);

        expect(payload.count).toEqual(1);


    });
});