import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { CompanyModule } from './company/company.module';
import { JobModule } from './job/job.module';
import { ApplicationModule } from './application/application.module';
import { ApplicationService } from './application/application.service';
import { JobService } from './job/job.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.stategy';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: "jwt"}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory:async(configService:ConfigService)=>({
        secret: configService.get<string>('SECRET_KEY'),
        signOptions:{expiresIn: 'id'}
      }),
      inject:[ConfigService],
    }),
    ConfigModule, 
    UserModule, 
    CompanyModule, 
    JobModule, 
    ApplicationModule
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    UserService, 
    PrismaService, 
    ApplicationService, 
    JobService,
    JwtStrategy,
  ],
})
export class AppModule {}