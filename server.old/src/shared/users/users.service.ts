import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma';
import * as argon2 from 'argon2';
import { CreateUserDto } from './types';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<User[]> {
        return await this.prisma.user.findMany({
            orderBy: { createdAt: 'asc' },
        });
    }

    async findOneById(id: number): Promise<User | null> {
        return await this.prisma.user.findUnique({ where: { id } });
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: { email: email.toLowerCase() },
        });
    }

    async create(data: CreateUserDto): Promise<User> {
        const { password, email, ...rest } = data;
        const hashedPassword = await argon2.hash(password);
        return await this.prisma.user.create({
            data: {
                ...rest,
                email: email.toLowerCase(),
                password: hashedPassword,
            },
        });
    }
}
