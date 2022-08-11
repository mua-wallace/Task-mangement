;
import { CreateTaskDTO } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.status.enum';

import { UpdateTaskStatusDto } from './dto/update-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {

  @InjectRepository()
  constructor(private taskPepository: TaskRepository) {}
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskPepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const { title, description } = createTaskDTO;

    const task = this.taskPepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.taskPepository.save(task);
    return task;
  }
  // createTask(createTaskDTO: CreateTaskDTO): Task {
  //   const { title, description } = createTaskDTO;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.DONE,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // deleteTask(id: string): void {
  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  // }
  // updateTaskStatus(id: string, status: TaskStatus) {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
