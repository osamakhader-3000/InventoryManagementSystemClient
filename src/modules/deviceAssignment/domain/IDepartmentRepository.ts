import Department from './Department';

export interface IDepartmentRepository {
    ListDepartments(): Promise<Department[]>;
    CreateDepartment(department: Department): Promise<boolean>;
    UpdateDepartment(department: Department): Promise<boolean>;
    DeleteDepartment(departmentId: string): Promise<boolean>;
    GetDepartment(departmentId: string): Promise<Department|null>;
}
