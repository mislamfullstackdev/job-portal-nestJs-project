import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { orderBy } from 'lodash';
import { PrismaService } from 'src/prisma.service';
import { UpdateStatusDto } from './dto/application.dto';

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

    async appliedJobsByUser(applicantId: string){
        const appliedJobs = await this.prismaService.application.findMany({
            where:{applicantId},
            orderBy:{ createdAt: 'desc' },
            include:{job:{include:{ company:true }}},
        });
        if(!appliedJobs || appliedJobs?.length == 0){
            throw new NotFoundException("No applications found")
        }
        return appliedJobs;
    }
    async getApplicantsAppliedForAjob(jobId: string){
        const getApplicantsForAJob = await this.prismaService.job.findUnique({
            where:{id: jobId},
            include: {
                applicantions:{
                    orderBy: { createdAt: 'desc' },
                    include: { applicant: true },
                }
            },
        })
        if(!getApplicantsForAJob){
            throw new NotFoundException("No applications found")
        }
        return getApplicantsForAJob;

    }

    async updateApplicationStatus(id: string, updateStatusDto: UpdateStatusDto){
        const { status } = updateStatusDto;
        const application = await this.prismaService.application.findUnique({
            where:{id},
        });
        if (!application) {
            throw new NotFoundException("This application is not found")
        }
        const updateStatus = await this.prismaService.application.update({
            where: {id},
            data:{status: status?.toLowerCase()},
        });
        return updateStatus;
    }
}
