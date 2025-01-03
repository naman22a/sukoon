import {
    IsEmail,
    IsLatitude,
    IsLongitude,
    IsNotEmpty,
    MinLength,
} from 'class-validator';

export class RegisterDto {
    @IsEmail()
    email: string;

    @MinLength(6)
    password: string;

    @IsLatitude()
    latitude: number;

    @IsLongitude()
    longitude: number;
}

export class LoginDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}

export class LoginAdminDto extends LoginDto {}
