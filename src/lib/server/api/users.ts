import { prisma } from "../db"

// Exclude keys from user
const exclude = <User, Key extends keyof User>(
    user: User,
    keys: Key[]
): Omit<User, Key> => {
    for (let key of keys) {
        delete user[key]
    }
    return user
}


export const getUserByUsername = async (username: string) => {
    const user = await prisma.user.findUnique({
        where: {
            username
        }
    });
    return user;
}

interface UserParamsToUpdate {
    username?: string;
}

export const updateUserById = async (id: string, params: UserParamsToUpdate) => {
    const updatedUser = await prisma.user.update({
        where: {
            id
        },
        data: params
    });

    const userWithoutPassword = exclude(updatedUser, ['hashed_password']);
    return userWithoutPassword;
}