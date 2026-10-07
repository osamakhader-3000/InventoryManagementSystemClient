import Task from "../../Domain/Entities/Task";
import { ITaskRepository } from "../../Application/Repositories/ITaskRepository";
import { ITaskApi } from "../api/Interfaces/ITaskApi";

export class TaskRepository implements ITaskRepository{

    taskApi:ITaskApi;

    constructor(taskApi:ITaskApi){
        this.taskApi = taskApi;
    }

    async ListTasks(): Promise<Task[]> {
        let result = await this.taskApi.ListTasks();
        return result?.data ?? [];
    }

    async GetTask(taskID: string): Promise<Task|null> {
        let result = await this.taskApi.GetTask(taskID);
        return result?.data ?? null;
    }

    async DeleteTask(taskID: string): Promise<boolean> {
        let result = await this.taskApi.DeleteTask(taskID);
        return result?.success ?? false;
    }

    async UpdateTask(task: Task): Promise<boolean> {
        let result = await this.taskApi.UpdateTask(task);
        return result?.success ?? false;
    }

    async CreateTask(task: Task): Promise<boolean> {
        let result = await this.taskApi.CreateTask(task);
        return result?.success ?? false;
    }




}
