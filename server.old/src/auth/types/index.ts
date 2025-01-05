import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsLatitude,
    IsLongitude,
    IsNotEmpty,
    MinLength,
} from 'class-validator';

export class RegisterDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @MinLength(6)
    password: string;

    @ApiProperty()
    @IsLatitude()
    latitude: number;

    @ApiProperty()
    @IsLongitude()
    longitude: number;
}

export class LoginDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;
}

export class LoginAdminDto extends LoginDto {}
