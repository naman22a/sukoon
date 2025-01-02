import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    email: string;

    @MinLength(6)
    password: string;
}

export class LoginDto {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}
