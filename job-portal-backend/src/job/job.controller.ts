import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JobService } from './job.service';
import { PostJobDto } from './dto/job.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('job')
export class JobController {
    constructor(private readonly jobService: JobService){}

    @UseGuards(JwtAuthGuard)
    @Post()
    async postJob(@Req() req: any, @Body() postJobDto: PostJobDto){
        const userId = req.user.id;
        const job = await this.jobService.postJob(userId, postJobDto);
        return{
            job,
            message: "Job is posted successfully",
            success: true,
        }
    }
    @Get()
    async getAllJobs(@Query() query: string){
        const jobs = await this.jobService.getAllJobs(query);
        return{
            jobs,
            success: true,
        }
    }
    
}
