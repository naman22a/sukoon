import { User } from '@prisma/client';

export const excludeUserDetails = (user: User) => {
    const { password, ...rest } = user;
    return rest;
};
