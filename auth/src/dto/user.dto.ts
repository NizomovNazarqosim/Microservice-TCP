import { IsString, IsNotEmpty, IsEmail, Length } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @Length(6, 20)
    @IsNotEmpty()
    readonly password: string;
}
export class SingInUserDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @Length(6, 20)
    @IsNotEmpty()
    readonly password: string;
}