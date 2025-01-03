import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { Sos, Role } from '@prisma/client';

@Injectable()
export class SosService {
    constructor(private readonly prisma: PrismaService) {}

    async createSos(
        userId: number,
        latitude: number,
        longitude: number,
    ): Promise<Sos> {
        // 1. Create SOS record in the database
        const sos = await this.prisma.sos.create({
            data: {
                userId,
                latitude,
                longitude,
            },
        });

        // 2. Notify nearby users and police
        await this.notifyNearbyUsers(latitude, longitude);

        return sos;
    }

    private async notifyNearbyUsers(
        latitude: number,
        longitude: number,
    ): Promise<void> {
        // Find nearby users (within 5km radius)
        const nearbyUsers = await this.prisma.user.findMany({
            where: {
                role: { in: [Role.CITIZEN, Role.POLICE] },
            },
        });

        // Logic to calculate distances (Haversine formula or PostgreSQL extension)
        const usersWithinRadius = nearbyUsers.filter((user) => {
            const distance = this.calculateDistance(
                latitude,
                longitude,
                user.latitude,
                user.longitude,
            );
            return distance <= 5; // 5 km
        });

        // Notify nearby users (e.g., using WebSocket or push notifications)
        usersWithinRadius.forEach((user) => {
            // Emit WebSocket event or send notification
            console.log(`Notify user ${user.id}`);
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
