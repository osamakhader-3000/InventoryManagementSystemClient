
import { IDepartmentRepository } from "../domain/IDepartmentRepository";
import Department from "../domain/Department";
import  DepartmentApi  from "./DepartmentApi";

export class HttpDepartmentRepository implements IDepartmentRepository {
    private departmentApi: DepartmentApi;

    constructor() {
        this.departmentApi = new DepartmentApi();
    }

    async ListDepartments(): Promise<Department[]> {


           let fakeData =  [
            new Department("1", "Corporate Services"),
            new Department("2", "Chairman's Office"),
            new Department("3", "HR & Administration"),
            new Department("4", "Technology and Consulting Services"),
            new Department("5", "Finance")
        ];

        return fakeData;


        let result = await this.departmentApi.ListDepartments();
     

        if (!Array.isArray(result.data)) 
            return [];
        return result.data ?? [];
    }

    async CreateDepartment(department: Department): Promise<boolean> {
        let result = await this.departmentApi.CreateDepartment(department);
        return result.success;
    }

    async UpdateDepartment(department: Department): Promise<boolean> {
        let result = await this.departmentApi.UpdateDepartment(department);
        return result.success;
    }

    async DeleteDepartment(departmentId: string): Promise<boolean> {
        let result = await this.departmentApi.DeleteDepartment(departmentId);
        return result.success;
    }

    async GetDepartment(departmentId: string): Promise<Department|null> {
        let result = await this.departmentApi.GetDepartment(departmentId);
        return result.data ?? null;
    }
}