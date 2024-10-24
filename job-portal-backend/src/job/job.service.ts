import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PostJobDto } from './dto/job.dto';
import { gte, lte } from 'lodash';
import { NotFoundError } from 'rxjs';

@Injectable()
export class JobService {
    constructor(private readonly prismaService: PrismaService){}

    async postJob(createdById: string, postJobDto: PostJobDto){
        const {
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            experienceLevel,
            position,
            companyId,
        } = postJobDto;
        const job = await this.prismaService.job.create({
            data:{
                title,
                description,
                requirements,
                salary,
                location,
                jobType,
                experienceLevel,
                position,
                companyId,
                createdById,
            },
        })
        if(!job){
            throw new BadRequestException("Job posting failed")
        }
        return job; 
    }

    async getAllJobs(query: any){
        const {keyword, location, jobtype, salary} = query;
        const salaryRange = salary?.split('-')
        let jobs = []
        if(keyword || location || jobtype || salary ){
            jobs = await this.prismaService.job.findMany({
                where:{
                    ...(keyword && {
                        OR: [
                        {title: {contains: keyword, mode: "insensitive"}},
                        {description: {contains: keyword, mode: "insensitive"}},
                        ],
                    }),
                    ...(location && {
                        location: {contains: location, mode: "insensitive"},
                    }),
                    ...(jobtype && {
                        jobType: {contains: jobtype, mode: "insensitive"},
                    }),
                    ...(salary && 
                        salaryRange?.length && {
                            salary:{
                                gte: parseInt(salaryRange[0], 10),
                                lte: parseInt(salaryRange[1], 10),
                            },
                        }
                    ),
                },
                include: {company: true},
                orderBy: { createdAt: 'desc'},
            });
        }else{
            jobs = await this.prismaService.job.findMany({skip: 0, take: 6});
        }
        if(!jobs || jobs.length == 0 ){
            throw new NotFoundException("Job not found")
        }
        return jobs;
    }
}
