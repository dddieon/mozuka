import { Controller } from '@nestjs/common';
import { TaskService } from './tasks.service';

@Controller('api/tasks')
export class TasksController {
  constructor(private resultService: TaskService) {}

  // @Get()
  // async start() {
  //   console.log('START');
  //   return this.resultService.handleCron();
  // }
}
