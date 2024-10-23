import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { RegisterCompanyDto } from './dto/company.dto';

@Injectable()
export class CompanyService {
    constructor(
        private readonly prismaService: PrismaService,
        private jwtService: JwtService,
    ){}
    async registerCompany(userId: string, registerCompanyDto: RegisterCompanyDto){
        const {
            name,
            description,
            website,
            location,
            logo
        } = registerCompanyDto;

        const companyExist = await this.prismaService.company.findUnique({
            where: {name}
        }) 
        if (companyExist) {
            throw new BadRequestException("This company is already added")
        }
        const company = await this.prismaService.company.create({
            data: {
                name,
                description,
                website,
                location,
                logo,
                userId,
            },
        });
        return company;
    }

    //Get all companies
    async getCompanies(userId: string){
        const companies = await this.prismaService.company.findMany({
            where: {userId}
        })
        if(!companies || companies?.length == 0){
            throw new NotFoundException("Company not found")
        }
        return companies;
    }

    // get company by id
    async getCompanyById(id: string){
        const company = await this.prismaService.company.findUnique({
            where:{id},
        });
        if(!company){
            throw new NotFoundException("Company not found")
        }
        return company;
    }
}
