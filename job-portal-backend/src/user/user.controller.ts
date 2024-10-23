import { Body, Controller, Delete, Get, Patch, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}
    @Post("register")
    async register(@Body() registerUserDto: RegisterUserDto ){
        return this.userService.register(registerUserDto);
    }
    @Post("login")
    async login(@Body() body, @Res() res: Response){
        const { email, password, role} = body;
        try {
            const userResonse = await this.userService.login( 
                email, 
                password, 
                role,
            );
            res.cookie("token", userResonse?.token,{
                maxAge: 1 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "strict",
            });
            return res.status(200).json(userResonse);
        } catch (error) {
            return res.status(error.status || 500).json({
                message: error.message || 'Internal server error',
                success: false,
            });
        }
    } 
    // @Get()
    // @Patch()
    // @Delete()

}
