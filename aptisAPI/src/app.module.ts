import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { CoursesModule } from './courses/courses.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [UsersModule, AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CoursesModule,
    DashboardModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
