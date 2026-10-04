import Accessory from "../domain/Accessory";
import Assignment from "../domain/Assignment";
import Department from "../domain/Department";
import Device from "../domain/Device";
import { IAssignmentRepository } from "../domain/IAssignmentRepository";
import User from "../domain/User";
import { AssignmentApi } from "./AssignmentApi";

export class HttpAssignmentRepository implements IAssignmentRepository {
   
    private assignmentApi: AssignmentApi;

    constructor() {
        this.assignmentApi = new AssignmentApi();
    }

    async GetAssignment(assignmentId: bigint): Promise<Assignment | null> {
        var result = await this.assignmentApi.GetAssignment(assignmentId);
        return result.data ?? null;
    }

    async CreateAssignment(assignment: Assignment): Promise<boolean> {
        var result = await this.assignmentApi.CreateAssignment(assignment);
        return result.success;
    }

    async UpdateAssignment(assignment: Assignment): Promise<boolean> {
        var result = await this.assignmentApi.UpdateAssignment(assignment);
        return result.success;
    }

    async DeleteAssignment(assignmentId: bigint): Promise<boolean> {
        var result = await this.assignmentApi.DeleteAssignment(assignmentId);
        return result.success;
    }

    async ListAssignments(): Promise<Assignment[]> {
        var result = await this.assignmentApi.ListAssignments();


        //generate fake data for testing purposes
        var fakeData = [
            new Assignment(BigInt(1),
                new Device(null,'MS Surface Pro 4','5CG952649Y','Win 10 Home 64 Bit','Core i7, 16 GB RAM, 1 TB NVMe',new Date('2020-05-19'),new Date('2025-05-22'),4800,0),
                new User(null,'Froilan Pagador',new Department(null,'Business Development')),
                new Date(),new Date(),
                 new User(null,'RAJ',new Department(null,'Business Development')),
                 [new Accessory(null,'Mouse',4,new Date('2020-05-19'))],
            'USB hub',null,new Date('2020-05-19')),
            new Assignment(BigInt(2),
                new Device(null,'Lenovo Thinkpad T16','5CG952649Y','Win 11 Pro 64 Bit','Ultra 7, 32 GB RAM, 1 TB NVMe',new Date('2020-05-19'),new Date('2025-05-22'),4800,0),
                new User(null,'Jafar Alzyod',new Department(null,'Corporate Services')),
                new Date(),new Date(),
                 new User(null,'RAJ',new Department(null,'Corporate Services')),
                 [new Accessory(null,'Keyboard',4,new Date('2020-05-19'))],
            'USB hub',null,new Date('2020-05-19')),
            new Assignment(BigInt(3),
                new Device(null,'Lenovo ThinkPad T14','PF48M3DY','Win 10 Home 64 Bit','Core i7, 16 GB RAM, 512 GB NVMe',new Date('2022-04-13'),new Date('2025-05-26'),4800,0),
                new User(null,'Fahed Saaidah',new Department(null,'Corporate Services')),
                new Date(),new Date(),
                 new User(null,'Ahmad Amaireh',new Department(null,'HR & Administration')),
                 [new Accessory(null,'Mouse & Keyboard',4,new Date('2020-05-19'))],
            'USB hub',null,new Date('2020-05-19')),
        ];  

        return fakeData;

        if (!Array.isArray(result.data)) 
            return [];
        return result.data ?? [];
    }
}