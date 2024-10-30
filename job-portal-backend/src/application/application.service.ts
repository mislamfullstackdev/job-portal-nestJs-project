import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ApplicationService {
    constructor( private readonly prismaService: PrismaService){}

    async applyJob(applicantId: string, jobId: string){
        if(!jobId){
            throw new BadRequestException("Job is required")
        }
        const alreadyApplied = await this.prismaService.application.findFirst({
            where:{applicantId, jobId}
        });
        if(alreadyApplied){
            throw new BadRequestException("Already applied this job")
        }
        // find the job
        const job = await this.prismaService.job.findUnique({
            where:{ id: jobId}
        })

        if(!job){
            throw new BadRequestException("job not found")
        }

        const newApplication = await this.prismaService.application.create({
            data: { 
                applicantId, 
                jobId 
            }
        });
        return newApplication;
    } 
}
