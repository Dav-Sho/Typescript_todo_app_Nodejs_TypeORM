import { Request, Response } from 'express';
import AppDataSource from '../../database/datasource';
import { Task } from '../models/task';
import {
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';
import { validationResult } from 'express-validator';
import { UpdateResult } from 'typeorm';

class TaskController {
  constructor(
    public taskRepository = AppDataSource.getRepository(
      Task,
    ),
  ) {}

  public async getAllTask(
    req: Request,
    res: Response,
  ): Promise<Response> {
    let tasks: Task[];

    try {
      tasks = await this.taskRepository.find({
        order: {
          date: 'ASC',
        },
      });

      console.log(tasks, ' Hello');

      tasks = instanceToPlain(tasks) as Task[];

      console.log(tasks, ' Hello');

      return res.status(200).json(tasks);
    } catch (error) {
      return res
        .status(200)
        .json({ error: 'Server Error' });
    }
  }

  public async createTask(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    const task = new Task();

    task.title = req.body.title;
    task.description = req.body.description;
    task.priority = req.body.priority;
    task.status = req.body.status;
    task.date = req.body.date;

    try {
      let createdTask: Task =
        await AppDataSource.getRepository(Task).save(task);

      createdTask = instanceToPlain(createdTask) as Task;

      return res.status(201).json(createdTask);
    } catch (error) {
      return res
        .status(500)
        .json({ errors: 'Server errors' });
    }
  }

  public async updateTask(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    let task: Task | null;
    try {
      task = await AppDataSource.getRepository(
        Task,
      ).findOne({
        where: { id: req.body.id },
      });

      if (!task) {
        res
          .status(404)
          .json({
            error: `The task with the id ${req.body.id} found`,
          });
      }

      let updateTask:UpdateResult

      try {
        updateTask =
          await AppDataSource.getRepository(
            Task,
          ).update(
            req.body.id,
            plainToInstance(Task, {
              status: req.body.status,
            }),
          );

        updateTask = instanceToPlain(
          updateTask,
        ) as UpdateResult;

        return res.status(200).json(updateTask);
      } catch (error) {
        return res
          .status(500)
          .json({ errors: 'Server errors' });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ errors: 'Server errors' });
    }
  }
}

export const taskController = new TaskController();
