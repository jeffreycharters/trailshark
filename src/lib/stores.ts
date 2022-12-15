import type { Trail } from "@prisma/client";
import { writable, type Writable } from "svelte/store";

// boolean value to show spinner when loading a network's trails
export const trailsLoading: Writable<boolean> = writable(false);

// a list of Trails for a particular network. 
export const trailsList: Writable<Trail[]> = writable([])