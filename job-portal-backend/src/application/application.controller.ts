import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateStatusDto } from './dto/application.dto';

@Controller('application')
export class ApplicationController {
    constructor(private readonly applicationService: ApplicationService){}

    @UseGuards(JwtAuthGuard)
    @Post(':id')
    async applyJob(@Req() req: any, @Param('id') jobId: string){
        const userId = req.user.id;
        const application = await this.applicationService.applyJob(userId, jobId)
        return {
            application,
            succcess: true,
            message: "Your Application submitted successfully"
        }
    }

    //get the applied joblist by a user
    @UseGuards(JwtAuthGuard)
    @Get()
    async appliedJobsByUser(@Req() req: any){
        const userId = req.user.id;
        const appliedJobs = await this.applicationService.appliedJobsByUser(userId);
        return{
            appliedJobs,
            seccess: true,
        }
    }
    //get applicants are applied for a job
    @Get(':id')
    async getApplicantsAppliedForAjob(@Param('id') jobId: string){
        const jobs = await this.applicationService.getApplicantsAppliedForAjob(jobId);
        return{
            jobs,
            seccess: true,
        }
    }
    //Update status
    @UseGuards(JwtAuthGuard)
    @Put("update-status/:id")
    async updateApplicationStatus(@Param('id') id: string, @Body() updateStatusDto : UpdateStatusDto){
        const updateStatus = await this.applicationService.updateApplicationStatus(id, updateStatusDto);
        return {
            message: "Updated the status successfully ",
            updateStatus,
            success: true,
        }
    }
}
