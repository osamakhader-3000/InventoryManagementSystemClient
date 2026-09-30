import Task from "../../Domain/Entities/Task";
import { ITaskService } from "../Interfaces/ITaskService";
import { ITaskRepository } from "../Repositories/ITaskRepository";


export class TaskService implements ITaskService{

    taskRepository:ITaskRepository;

    constructor(taskRepository:ITaskRepository){
        this.taskRepository = taskRepository;
    }

    async ListTask(): Promise<Task[]> {
        return this.taskRepository.ListTasks();
    }

    async DeleteTask(taskID: string): Promise<boolean> {
        return this.taskRepository.DeleteTask(taskID);
    }

    async CreateTask(task: Task): Promise<boolean> {
        return this.taskRepository.CreateTask(task);
    }

    async UpdateTask(task: Task): Promise<boolean> {
        return this.taskRepository.UpdateTask(task);
    }


    async GetTask(taskID:string):Promise<Task|null> {
       return this.taskRepository.GetTask(taskID);
    }

    



}


