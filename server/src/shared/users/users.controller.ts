import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { excludeUserDetails } from '../../common/utils';
import { AuthGuard } from '../../auth/auth.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async findUsers() {
        const users = await this.usersService.findAll();
        return users.map((user) => excludeUserDetails(user));
    }

    @UseGuards(AuthGuard)
    @Get('me')
    async findCurrentUser(@Req() req: Request) {
        const user = await this.usersService.findOneById(req.session.userId!);
        return excludeUserDetails(user);
    }
}
