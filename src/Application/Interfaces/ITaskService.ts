import Task from "../../Domain/Entities/Task";

export interface ITaskService{
    ListTask():Promise<Task[]>;
    DeleteTask(taskID:string):Promise<boolean>;
    GetTask(taskID:string):Promise<Task|null>;
    CreateTask(task:Task):Promise<boolean>;
    UpdateTask(task:Task):Promise<boolean>;
}