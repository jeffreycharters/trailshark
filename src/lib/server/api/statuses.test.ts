import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { addTrailNetwork, toggleTrailNetworkApproval } from "./trails";
import { prisma } from "$lib/server/db";
import type { TrailNetwork, TrailState, User } from "@prisma/client";
import { addTrailState } from "./statuses";

describe('trail networks', () => {
    beforeEach(async () => {
        await prisma.trailState.deleteMany({})
    });

    it('can add new state', async () => {
        const newState = {
            description: "Some descipription",
            textColor: "warning"
        }
        const addedState = await addTrailState(newState.description, newState.textColor) as unknown as TrailState;

        expect(addedState?.description).toEqual(newState.description);
        expect(addedState?.textColor).toEqual(newState.textColor);
    });
});
