import Task from "../../../Domain/Entities/Task";
import { GeneralApiResult } from "../../../shared/infrastructure/DataTransferObjects/GeneralApiResult";

export interface ITaskApi{
    ListTasks():Promise<GeneralApiResult<Task[]>>;

    UpdateTask(task:Task):Promise<GeneralApiResult<boolean>>;

    GetTask(taskID:string):Promise<GeneralApiResult<Task>>;

    DeleteTask(taskID:string):Promise<GeneralApiResult<boolean>>;

    CreateTask(task:Task):Promise<GeneralApiResult<boolean>>;
}