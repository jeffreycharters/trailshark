import type { ValidationError } from "@sveltejs/kit";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { addTrailSystem, toggleTrailSystemApproval } from "./trails";
import { prisma } from "../db";
import type { TrailSystem, User } from "@prisma/client";

describe('trail systems', () => {
    let user: User;
    beforeAll(async () => {
        user = await prisma.user.create({
            data: {
                provider_id: "email:user@example.com",
                username: "hi",
            }
        })
    });
    afterEach(async () => {
        prisma.trailSystem.deleteMany({})
    });

    afterAll(async () => {
        await prisma.user.deleteMany({})
    })

    it('can add new system', async () => {
        const newSystem = {
            name: "New Trail",
            userId: user.id
        }
        const addedSystem = await addTrailSystem(newSystem.name, newSystem.userId);

        expect(addedSystem?.name).toEqual(newSystem.name);
        expect(addedSystem?.userId).toEqual(user.id);
    });

    it('no name gives an error', async () => {
        const newSystem = {
            name: "",
            userId: user.id
        }
        const addedSystem = await addTrailSystem(newSystem.name, newSystem.userId);
        expect(addedSystem).toBe(null);
    })

    it('toggling isApproved works properly', async () => {
        const newSystem = {
            name: "New Trail",
            userId: user.id
        }
        const addedSystem = await addTrailSystem(newSystem.name, newSystem.userId);

        if (!addedSystem) return;

        const updatedSystem = await toggleTrailSystemApproval(addedSystem);

        expect(updatedSystem.isApproved).toEqual(!addedSystem.isApproved);


    });
});