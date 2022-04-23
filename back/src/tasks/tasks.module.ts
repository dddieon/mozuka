import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [TaskService],
  controllers: [TasksController],
})
export class TasksModule {}
