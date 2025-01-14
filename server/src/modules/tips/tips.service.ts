import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma';

@Injectable()
export class TipsService {
    constructor(private prisma: PrismaService) {}

    // Haversine formula
    async getNearbyTips(latitude: number, longitude: number): Promise<any> {
        const radiusInKm = 5;
        const earthRadiusInKm = 6371;

        return this.prisma.$queryRaw`
            SELECT *,
                   (
                       ${earthRadiusInKm} *
                       ACOS(
                           COS(RADIANS(${latitude})) *
                           COS(RADIANS(latitude)) *
                           COS(RADIANS(longitude) - RADIANS(${longitude})) +
                           SIN(RADIANS(${latitude})) * SIN(RADIANS(latitude))
                       )
                   ) AS distance
            FROM "Tip"
            WHERE (
                ${earthRadiusInKm} *
                ACOS(
                    COS(RADIANS(${latitude})) *
                    COS(RADIANS(latitude)) *
                    COS(RADIANS(longitude) - RADIANS(${longitude})) +
                    SIN(RADIANS(${latitude})) * SIN(RADIANS(latitude))
                )
            ) <= ${radiusInKm};
        `;
    }

    async create(dto: {
        title: string;
        description: string;
        latitude: number;
        longitude: number;
        mediaFileUrl: string;
    }) {
        await this.prisma.tip.create({ data: dto });
    }
}
