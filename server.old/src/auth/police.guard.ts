import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from '../shared';

@Injectable()
export class PoliceGuard implements CanActivate {
    constructor(private usersService: UsersService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest() as Request;
        if (!req.session.userId) throw new UnauthorizedException();
        const user = await this.usersService.findOneById(req.session.userId!);
        if (user.role !== 'POLICE') throw new UnauthorizedException();
        return true;
    }
}
