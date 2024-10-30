import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PostJobDto } from './dto/job.dto';
import { gte, lte } from 'lodash';
import { NotFoundError, retry } from 'rxjs';

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

    async getAjobById(id: string){
        const job = await this.prismaService.job.findUnique({
            where:{id}
        })
        if(!job){
            throw new NotFoundException("Job Not Found")
        }
        return job;
    }

    //Create Favorite Job
    async createFavorite(jobId: string, userId: string){
        let newFavriteJob: any;
        try {
            const favoriteJob = await this.prismaService.favorite.findFirst({
                where: {jobId, userId}
            }); 
            if(favoriteJob){
                throw new NotFoundException("This Job already added in Favorite");
            }
            newFavriteJob = await this.prismaService.favorite.create({
                data: {jobId, userId}
            })
            if(!newFavriteJob){
                throw new NotFoundException("Job is not added in Favorite")
            }
            return newFavriteJob;

        } catch (error) {     
        }
    }

    async getFavJobs(userId: string){
        try {
            const favJobs = await this.prismaService.favorite.findMany({
                where: { userId },
                //include: {job: {include: { company: true }}},
            });
            if(!favJobs?.length){
                throw new NotFoundException('Job not found');
            }
            return favJobs;
        } catch (error) {}
    }
}
// 671884ddf92c0c640437f02a
