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

    //Create Favorite
    @UseGuards(JwtAuthGuard)
    @Post('favorite/:id')
    async createFavorite(@Req() res: any, @Param('id') jobId: string){
        const userId = res.user.id
        const favJob = await this.jobService.createFavorite(jobId, userId);
        return{
            favJob,
            success: true, 
        }
    }

    // Get favorite jobs
    @UseGuards(JwtAuthGuard)
    @Post('favorites')
    async getFavoriteJob(@Req() req: any){
        const userId = req.user.id;
        console.log("userId", userId)
        const result = this.jobService.getFavJobs(userId);
        return{
            result,
            success: true
        }
    }
}
