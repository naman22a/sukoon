import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { excludeUserDetails } from '../../common/utils';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async findUsers() {
        const users = await this.usersService.findAll();
        return users.map((user) => excludeUserDetails(user));
    }
}
