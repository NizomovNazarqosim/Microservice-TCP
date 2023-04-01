import { IsString } from "class-validator";

export class CreatePostDto {
    @IsString()
    readonly title: string;
    
    @IsString()
    readonly from_user: string;

    @IsString()
    readonly to_whom: string;
}
export class UpdatePostDto {
    @IsString()
    readonly title: string;

    @IsString()
    readonly id: string;
}