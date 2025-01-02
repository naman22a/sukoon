import {
    Body,
    Controller,
    HttpCode,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './types';
import { Request, Response } from 'express';
import { OkResponse } from '../common/types';
import { UsersService } from '../shared';
import * as argon2 from 'argon2';
import { __prod__, COOKIE_NAME } from '../common/constants';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private usersService: UsersService) {}

    @HttpCode(201)
    @Post('register')
    async register(
        @Body() body: RegisterDto,
        @Req() req: Request,
    ): Promise<OkResponse> {
        const { email } = body;

        // check if user already exists
        const userExists = await this.usersService.findOneByEmail(email);
        if (userExists) {
            return {
                ok: false,
                errors: [{ field: 'email', message: 'Email already in use' }],
            };
        }

        // save user to database
        const user = await this.usersService.create({
            ...body,
            role: 'CITIZEN',
        });

        // login: create a session
        req.session.userId = user.id;

        return { ok: true };
    }

    @Post('login')
    async login(
        @Body() body: LoginDto,
        @Req() req: Request,
    ): Promise<OkResponse> {
        const { email, password } = body;

        // check if user exists in database
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            return {
                ok: false,
                errors: [{ field: 'email', message: 'User not found' }],
            };
        }

        // check if password is correct
        const isMatch = await argon2.verify(user.password, password);
        if (!isMatch) {
            return {
                ok: false,
                errors: [{ field: 'password', message: 'Incorrect password' }],
            };
        }

        // login: create a session
        req.session.userId = user.id;

        return { ok: true };
    }

    @Post('logout')
    @UseGuards(AuthGuard)
    logout(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ): Promise<OkResponse> {
        return new Promise((resolve) =>
            req.session.destroy((error) => {
                if (error) {
                    resolve({
                        ok: false,
                        errors: [
                            {
                                field: 'server',
                                message: 'Something went wrong',
                            },
                        ],
                    });
                }
                res.clearCookie(COOKIE_NAME);
                resolve({ ok: true });
            }),
        );
    }
}
