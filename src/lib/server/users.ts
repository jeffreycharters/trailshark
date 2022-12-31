import { SECRET_KEY } from '$env/static/private';
import jwt from 'jsonwebtoken';

export const getPasswordResetToken = (userId: string) => {
    const token = jwt.sign({ "reset-password": userId }, SECRET_KEY, { expiresIn: "10m" });
    return token
}

export const verifyPasswordResetToken = (token: string) => {
    try {
        const payload = jwt.verify(token, SECRET_KEY);
        return payload;

    } catch (err) {
        const error = err as Error;
        return error;
    }

}