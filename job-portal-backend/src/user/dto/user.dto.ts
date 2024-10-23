import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class RegisterUserDto {
    @IsNotEmpty()
    @IsString()
    fullname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    phoneNumber: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    role?: any;

    @IsOptional()
    @IsString()
    profileBio: string;

    @IsOptional()
    @IsArray()
    @IsString({each: true})
    profileSkills?: string[]

    @IsOptional()
    @IsUrl()
    profileResume?: string;

    @IsOptional()
    @IsString() 
    profileResumeOriginalName?: string; 

    @IsOptional()
    @IsString()
    profilePhoto?: string;
}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    fullname?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsString()
    role?: any;

    @IsOptional()
    @IsString()
    profileBio?: string;

    @IsOptional()
    @IsArray()
    @IsString({each: true})
    profileSkills?: string[]

    @IsOptional()
    @IsUrl()
    profileResume?: string;

    @IsOptional()
    @IsString() 
    profileResumeOriginalName?: string; 

    @IsOptional()
    @IsString()
    profilePhoto?: string;
}

export class UserResponseDto{
    import { second } from 'first'
    fullname: string
    email: string
    phoneNumber: string
    password: string
    role?: any
    profileBio: string
    profileSkills?: string[]
    profileResume?: string
    profileResumeOriginalName?: string
    profilePhoto?: string
    profileCompanyId?: string
    profilePhoto?: string  
    createdAt?: Date  
    updatedAt                 DateTime      @updatedAt
    Company                   Company[]
    Application               Application[]
    Favorite 
}