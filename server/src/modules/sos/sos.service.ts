import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { Sos, Role } from '@prisma/client';
import { Socket } from 'socket.io';

@Injectable()
export class SosService {
    constructor(private readonly prisma: PrismaService) {}

    async createSos(
        userId: number,
        latitude: number,
        longitude: number,
    ): Promise<Sos> {
        const sos = await this.prisma.sos.create({
            data: {
                userId,
                latitude,
                longitude,
            },
        });

        return sos;
    }

    async notifyNearbyUsers(
        socket: Socket,
        latitude: number,
        longitude: number,
    ): Promise<void> {
        const nearbyUsers = await this.prisma.user.findMany({
            where: {
                role: { in: [Role.CITIZEN, Role.POLICE] },
            },
        });

        const usersWithinRadius = nearbyUsers.filter((user) => {
            const distance = this.calculateDistance(
                latitude,
                longitude,
                user.latitude,
                user.longitude,
            );
            return distance <= 5; // 5 km
        });

        usersWithinRadius.forEach((user) => {
            socket.emit('notify_sos', { userId: user.id, latitude, longitude });
        });
    }

    private calculateDistance(
        lat1: number,
        lon1: number,
        lat2: number,
        lon2: number,
    ): number {
        const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
        const R = 6371; // Earth's radius in km

        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) *
                Math.cos(toRadians(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    }
}
