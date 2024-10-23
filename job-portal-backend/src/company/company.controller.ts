import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RegisterCompanyDto } from './dto/company.dto';

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService){}

    @UseGuards(JwtAuthGuard)
    @Post("register")
    async registerCompany(
        @Req() req,
        @Body() registerCompanyDto: RegisterCompanyDto,
    ){
        const userId = req.user.id;
        const result = await this.companyService.registerCompany(userId, registerCompanyDto);
        return{
            message: "company created successfully",
            result,
            success: true
        }
    }

    // get all companies
    @UseGuards(JwtAuthGuard)
    @Get()
    async getCompanies(@Req() req: any){
        const userId = req.user.id;
        const result = await this.companyService.getCompanies(userId);

        return {
            result,
            success:true
        }
    }
    // get company by id
    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async getCompanyById(@Param('id') companyId: string){
        const result = await this.companyService.getCompanyById(companyId);
        return {
            result,
            success:true
        }
    }
}
