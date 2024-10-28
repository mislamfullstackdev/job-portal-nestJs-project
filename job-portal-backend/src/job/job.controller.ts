import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
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

    @Get(':id')
    async getAjobById(@Param('id') jobId: string){
        const job = await this.jobService.getAjobById(jobId);
        return{
            job,
            success: true, 
        }
    }

    //get job by userId
    @UseGuards(JwtAuthGuard)
    @Post('favorite/:id')
    async getJobByUserId(@Req() res: any, @Param('id') jobId: string){
        const userId = res.user.id
        const favJob = await this.jobService.createFavorite(userId, jobId);
        return{
            favJob,
            success: true, 
        }
    }

    

    
}
