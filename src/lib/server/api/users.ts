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
    if (user) return exclude(user, ["hashed_password", "provider_id"])
    return null;
}

export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if (user) return exclude(user, ["hashed_password", "provider_id", "isAdmin"])
    return null;
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

    const userWithoutPassword = exclude(updatedUser, ['hashed_password', "provider_id", "isAdmin"]);
    return userWithoutPassword;
}

export const userExistsWithEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    return !!user;
}