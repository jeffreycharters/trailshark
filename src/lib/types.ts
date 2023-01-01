import type { NetworkStatus, Trail, TrailNetwork, TrailState, TrailStatus, TrailStatusComment, User } from "@prisma/client";

export type ColourPlace = "button" | "border" | "background" | undefined;

export interface PendingTrailStatus {
    id: string;
    editing: boolean;
    trail?: Trail;
    comment?: TrailStatusComment;
}

export interface TrailNetworkWithTrailStatuses extends NetworkStatus {
    network: TrailNetwork;
    author: User;
    state: TrailState;
    trailStatuses: (TrailStatus & {
        trail: Trail;
        comment: TrailStatusComment & {
            state: TrailState;
        };
    })[];
}