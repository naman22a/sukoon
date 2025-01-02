import { Role } from '@prisma/client';

export class CreateUserDto {
    role: Role;
    email: string;
    password: string;
}
