import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class PostJobDto{
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsArray()
    @IsString({each: true})
    requirements: string[];

    @IsNotEmpty()
    @IsNumber()
    salary: number;

    @IsNotEmpty()
    @IsString()
    location: string;

    @IsNotEmpty()
    @IsString()
    jobType: string;

    @IsNotEmpty()
    @IsString()
    experienceLevel: string;

    @IsNotEmpty()
    @IsNumber()
    position: number;

    @IsNotEmpty()
    @IsString()
    companyId: string;

    @IsNotEmpty()
    @IsString()
    createdById: string;
}

export class UpdateJobDto{
    @IsOptional()
    @IsString()
    title: string

    @IsOptional()
    @IsString()
    description: string

    @IsOptional()
    @IsArray({each: true})
    requirements: string[]

    @IsOptional()
    @IsNumber()
    salary: number

    @IsOptional()
    @IsString()
    location: string

    @IsOptional()
    @IsString()
    jobType: string
    
    @IsOptional()
    @IsString()
    experienceLevel: string

    @IsOptional()
    @IsNumber()
    position: number
}