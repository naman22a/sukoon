import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { FieldError } from '../common/types';
import { UsersService } from '../shared';
import { LoginDto } from './types';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validate(
        loginDto: LoginDto,
    ): Promise<{ user?: User; errors?: FieldError[] }> {
        const { email, password } = loginDto;

        // check if user exists
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            return {
                errors: [{ field: 'email', message: 'user not found' }],
            };
        }

        // check if password is correct
        const isMatch = await argon2.verify(user.password, password);
        if (!isMatch) {
            return {
                errors: [{ field: 'password', message: 'wrong password' }],
            };
        }

        return { user };
    }
}
