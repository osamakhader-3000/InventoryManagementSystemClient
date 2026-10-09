import Assignment from "../domain/Assignment";
import urls from '../../../shared/infrastructure/http/urls.json'
import { GeneralApi } from "../../../shared/infrastructure/http/GeneralApi";
import { GeneralApiResult } from "../../../shared/infrastructure/DataTransferObjects/GeneralApiResult";

export class AssignmentApi extends GeneralApi {
    private baseUrl:string;

    constructor(){
        super();
        this.baseUrl = urls['inventory-management-system-app'];
    }

    async ListAssignments(): Promise<GeneralApiResult<Assignment[]>> {
        let url = `${this.baseUrl}${urls['assignments-list']}`;
        let result = await this.SecureApiCaller<Assignment[]>('GET', url);
        return result;
    }

    async GetAssignment(assignmentID: bigint): Promise<GeneralApiResult<Assignment>> {
        let url = `${this.baseUrl}${urls['assignment-get']}/${assignmentID.toString()}`;
        let result = await this.SecureApiCaller<Assignment>('GET', url);
        return result;
        
    }

    async CreateAssignment(assignment: Assignment): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}${urls['assignment-create']}`;
        let result = await this.SecureApiCaller<boolean>('POST', url, assignment);
        return result;
    }

    async UpdateAssignment(assignment: Assignment): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}${urls['assignment-update']}`;
        let result = await this.SecureApiCaller<boolean>('PUT', url, assignment);
        return result;
    }

    async DeleteAssignment(assignmentID: bigint): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}${urls['assignment-delete']}/${assignmentID.toString()}`;
        let result = await this.SecureApiCaller<boolean>('DELETE', url);
        return result;
    }

}