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
    id: string;
}

// informative message queue
export const messages: Writable<AlertMessage[]> = writable([]);


export const removeMessageById = (id: string) => {
    messages.update(n => {
        return n.filter(n => n.id != id)
    })
}

export const addMessage = (alert: Omit<AlertMessage, 'id'>, timeout: number = 3000) => {
    const id = crypto.randomUUID();
    messages.update(n => {
        return [...n, { ...alert, id }]
    })
    setTimeout(() => removeMessageById(id), timeout)
}