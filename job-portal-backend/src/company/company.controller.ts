import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RegisterCompanyDto, UpdateCompanyDto } from './dto/company.dto';

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
    // delete company by id
    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async deleteCompanyById(@Param('id') companyId: string){
        const result = await this.companyService.deleteCompanyById(companyId);
        return {
            result,
            success:true
        }
    }

    //Update company
    @UseGuards(JwtAuthGuard)
    @Put(":id")
    async updateCompany(@Param('id') compnyId: string, @Body() updateCompanyDto: UpdateCompanyDto){
        const result = await this.companyService.updateCompany(compnyId, updateCompanyDto);
        return {
            result,
            success: true,
            message: "This company updated successfully",
        }
    }
}
