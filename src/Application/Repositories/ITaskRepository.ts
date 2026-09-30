import Task from "../../Domain/Entities/Task";

export interface ITaskRepository{
    GetTask(taskID:string):Promise<Task|null>;
    ListTasks():Promise<Task[]>;
    DeleteTask(taskID:string):Promise<boolean>;   
    UpdateTask(task:Task):Promise<boolean>; 
    CreateTask(task:Task):Promise<boolean>;
}