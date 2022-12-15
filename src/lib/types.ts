import type { Trail, TrailStatusComments } from "@prisma/client";

export type ColourPlace = "button" | "border" | "background" | undefined;

export interface PendingTrailStatus {
    id: string;
    editing: boolean;
    trail?: Trail;
    comment?: TrailStatusComments;
}