import type { Trail } from "@prisma/client";
import { writable, type Writable } from "svelte/store";

// boolean value to show spinner when loading a network's trails
export const trailsLoading: Writable<boolean> = writable(false);

// a list of Trails for a particular network. 
export const trailList: Writable<Trail[]> = writable([])


type AlertLevel = "info" | "warning" | "error" | "success"

export interface AlertMessage {
    alertLevel: AlertLevel;
    message: string;
    icon?: boolean;
}

// informative message queue
export const messages: Writable<AlertMessage[]> = writable([]);