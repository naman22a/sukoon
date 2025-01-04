import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';

export class TipsDto {
    @ApiProperty()
    @IsLatitude()
    latitude: number;

    @ApiProperty()
    @IsLongitude()
    longitude: number;

    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;
}
