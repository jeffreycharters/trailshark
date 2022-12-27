import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { addTrailNetwork, toggleTrailNetworkApproval, getLatestTrailNetworks } from "./trails";
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
            userId: user.id,
        }
        const addedSystem = await addTrailNetwork(newSystem.name, newSystem.userId) as unknown as TrailNetwork;

        if (!addedSystem) return;

        const updatedSystem = await toggleTrailNetworkApproval(!addedSystem.isApproved, addedSystem.id);

        expect(updatedSystem.isApproved).toEqual(!addedSystem.isApproved);

    });

    it('latest systems function does not retrieve unapproved trails by default', async () => {
        for (let i = 0; i < 10; ++i) await prisma.trailNetwork.create({
            data: {
                name: `Trail System ${i}`,
                userId: user.id,
                isApproved: i < 5
            }
        })

        const latestTrailNetworks = await getLatestTrailNetworks(10);
        expect(latestTrailNetworks.length).toEqual(5)

    })

    it('latest systems function retrieves unapproved trails when requested', async () => {
        for (let i = 0; i < 10; ++i) await prisma.trailNetwork.create({
            data: {
                name: `Trail System ${i}`,
                userId: user.id,
                isApproved: i < 5
            }
        })

        const latestTrailNetworks = await getLatestTrailNetworks(10, false);
        expect(latestTrailNetworks.length).toEqual(10)

    });

});