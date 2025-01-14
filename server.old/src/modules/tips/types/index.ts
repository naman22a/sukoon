import { IsLatitude, IsLongitude, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateTipDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsUrl()
    mediaFileUrl: string;

    @IsLatitude()
    latitude: number;

    @IsLongitude()
    longitude: number;
}
