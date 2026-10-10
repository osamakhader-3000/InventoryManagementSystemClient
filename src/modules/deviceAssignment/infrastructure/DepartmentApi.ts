import Department from '../domain/Department';
import urls from '../../../shared/infrastructure/http/urls.json'
import { GeneralApi } from "../../../shared/infrastructure/http/GeneralApi";
import { GeneralApiResult } from "../../../shared/infrastructure/DataTransferObjects/GeneralApiResult";

export default class DepartmentApi extends GeneralApi {
    private baseUrl:string;

    constructor(){
        super();
        this.baseUrl = `${urls['inventory-management-system-app']}${urls['assignments-domain']}${urls['departments']}`;
    }

    async ListDepartments(): Promise<GeneralApiResult<Department[]>> {
        let url = `${this.baseUrl}${urls['departments-list']}`;
        let result = await this.SecureApiCaller<Department[]>('GET',url);
        return result;
    }

    async CreateDepartment(department: Department): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}${urls['department-create']}`;
        let result = await this.SecureApiCaller<boolean>('POST', url, department);
        return result;
    }

    async UpdateDepartment(department: Department): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}${urls['department-update']}`;
        let result = await this.SecureApiCaller<boolean>('PUT', url, department);
        return result;
    }

    async DeleteDepartment(departmentId: string): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}${urls['department-delete']}?id=${departmentId}`;
        let result = await this.SecureApiCaller<boolean>('DELETE', url);
        return result;
    }

    async GetDepartment(departmentId: string): Promise<GeneralApiResult<Department>> {
        let url = `${this.baseUrl}${urls['department-get']}?id=${departmentId}`;
        let result = await this.SecureApiCaller<Department>('GET', url);
        return result;
    }
   
}