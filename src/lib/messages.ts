import { messages } from "$lib/stores";
import type { AlertMessage } from "$lib/stores";
import cuid from 'cuid';

export const removeMessageById = (id: string) => {
    messages.update(n => {
        return n.filter(n => n.id != id)
    })
}

export const addMessage = (alert: Omit<AlertMessage, 'id'>, timeout: number = 3000) => {

    const id = cuid();
    messages.update(n => {
        return [...n, { ...alert, id }]
    })
    setTimeout(() => removeMessageById(id), timeout)
}