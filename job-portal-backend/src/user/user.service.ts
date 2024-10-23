import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { RegisterUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt'; 
import { use } from 'passport';
import { omit } from 'lodash';

@Injectable()
export class UserService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
    ){}
    async register(registerUserDto: RegisterUserDto) {
        const {
            fullname,
            email,
            phoneNumber,
            password,
            role,
            profileBio,
            profileSkills,
            profileResume,
            profileResumeOriginalName,
            profilePhoto,
        } = registerUserDto;

        if (!fullname || !email || !phoneNumber || !password) {
            throw new BadRequestException("All fields are required");
        }
        const existingUser = await this.prismaService.user.findUnique({
            where: {email}
        });

        if(existingUser){
            throw new BadRequestException("email is already exist");
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.prismaService.user.create({
            data: {
                fullname,
                email,
                phoneNumber,
                password: hashedPassword,
                profileBio,
                profileResume,
                profileResumeOriginalName,
                profilePhoto,
                profileSkills, 
                role,
            },
        });
        if(!user){
            throw new BadRequestException("Unexpected error occoured. User not created");
        }
        return {user, success: true, message: 'User is created successfully'}
    }

    async login(email: string, password: string, role: string){
        if(!email || !password || !role){
            throw new BadRequestException("All request are required")
        }
        const user = await this.prismaService.user.findUnique({
            where: {email}
        })
        if(!user){
            throw new BadRequestException("User not exist");
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new BadRequestException("Incorrect Pasword");            
        }
        if(role != user.role){
            throw new BadRequestException("Account not exist with this role");
        }

        const token = this.jwtService.sign(
            {userId: user.id}, 
            {secret:process.env.SECRET_KEY, expiresIn: "1d"},
        );

        //omit password when return user
        const userWithoutPassowrdField = omit(user, ['password']);

        return {token, user: userWithoutPassowrdField, success: true, message: "login successful"}
    }
}
