import Task from "../../Domain/Entities/Task";
import { ITaskRepository } from "../../Application/Repositories/ITaskRepository";
import { ITaskApi } from "../api/Interfaces/ITaskApi";
import { IAuthService } from "../Commons/IAuthService";
import { GeneralApiResult } from "../../shared/infrastructure/DataTransferObjects/GeneralApiResult";

export class TaskRepository implements ITaskRepository{

    taskApi:ITaskApi;
    authService: IAuthService;

    constructor(taskApi:ITaskApi,authService: IAuthService){
        this.taskApi = taskApi;
        this.authService = authService;
    }

    async ListTasks(): Promise<Task[]> {
        let result = await this.authService.ProtectedAccess<Promise<GeneralApiResult<Task[]>>>(async () => {
       return this.taskApi.ListTasks();
        });
        return result?.data ?? [];
    }

    async GetTask(taskID: string): Promise<Task|null> {
        let result = await this.authService.ProtectedAccess<Promise<GeneralApiResult<Task>>>(async () => {
            return this.taskApi.GetTask(taskID);
        });
        return result?.data ?? null;
    }

    async DeleteTask(taskID: string): Promise<boolean> {
        let result = await this.authService.ProtectedAccess<Promise<GeneralApiResult<boolean>>>(async () => {
            return this.taskApi.DeleteTask(taskID);
        });
        return result?.success ?? false;
    }

    async UpdateTask(task: Task): Promise<boolean> {
        let result = await this.authService.ProtectedAccess<Promise<GeneralApiResult<boolean>>>(async () => {
            return this.taskApi.UpdateTask(task);
        });
        return result?.success ?? false;
    }

    async CreateTask(task: Task): Promise<boolean> {
        let result = await this.authService.ProtectedAccess<Promise<GeneralApiResult<boolean>>>(async () => {
            return this.taskApi.CreateTask(task);
        });
        return result?.success ?? false;
    }




}
